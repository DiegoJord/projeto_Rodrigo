import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [nomePet, setNomePet] = useState('')
  const [dataNasci, setDataNasci] = useState('')
  const [dataAd, setDataAd] = useState('')
  const [pets, setPets] = useState([])
  const url = import.meta.env.VITE_BASE_URL

  const cadastroNovoPet = async () => {
    var novoPet = {
      name: nomePet,
      birthday: dataNasci,
      adoptionDate: dataAd
    }

    try{
      const response = await fetch(url,{ 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoPet)
      })

      setNomePet('')
      setDataNasci('')
      setDataAd('')

     fetchPet()
    }catch (error){}
  }
const fetchPet = async () => {
      const response = await fetch(url)
      const data = await response.json();
      setPets(data)
      console.log(data)

    }

 useEffect(() => {
    

    fetchPet();
  }, [])

  return (
    <>
    <div className='cadastroPet'>
      <div className='cadastro'>
        <h1>Quem é seu pet?</h1>

        <div className='campos'>
        <p>Nome do pet:</p>
        <input type="text" value={nomePet} onChange={(e) => setNomePet(e.target.value)} />
        </div>

        <div className='campos'>
        <p>Data de nascimento:</p>
        <input type="date" value={dataNasci} onChange={(e) => setDataNasci(e.target.value)} />
        </div>

        <div className='campos'>
        <p>Data da adoção:</p>
        <input type="date" value={dataAd} onChange={(e) => setDataAd(e.target.value)} />
        </div>

        <button className='primeiroBotao' onClick={cadastroNovoPet} >Cadastrar</button>
      </div>
      <div className='listaPets'>
        {pets.map((pet, index) => (
            <div key={index} className='nomesDosPets'>
              <p>🐾 Nome: {pet.name}</p>
              <p>🎂 Nascimento: {pet.birthday.slice(0, 10).split('-').reverse().join('/')}</p>
              <p>🏠 Adoção: {pet.adoptionDate.slice(0, 10).split('-').reverse().join('/')}</p>
              <hr />
            </div>
          ))}
      </div>
    </div>
    </>
  )
}

export default App