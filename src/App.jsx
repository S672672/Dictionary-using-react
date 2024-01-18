import React, { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'

export default function App() {
  const[words,setWord] = useState('')
  useEffect(()=>{
    const response = axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/<word>`)
    setWord(response.data);
    console.log(response.data)
  })
  return (
    <div className='wholebody'>
    <h1 className='text-4xl font-bold m-5'>Dictionary App</h1>
      <div className='content'>
      <input className='input' placeholder='Search here'></input>
      <button className='button'>Search</button>
      </div>
    </div>
  )
}

