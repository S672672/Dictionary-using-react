import React from 'react'
import './App.css'

export default function Words({ word, partOfSpeech, phonetic, definition, example}) {
  return (

    <div>
    <div className="word">
      <h3>{word}</h3>
    </div>
    <div className="details">
      <p>{partOfSpeech}</p>
      <p>/{phonetic}/</p>
    </div>
    <p className="word-meaning">{definition}</p>
    <p className="word-example">{example}</p>
  </div>
    
  )
}