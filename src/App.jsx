import React, { useState } from 'react';
import './App.css';
import Words from './words';
import axios from 'axios';

export default function App() {

  const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  const [inputWord, setInputWord] = useState('');
  const [wordData, setWordData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${apiUrl}${inputWord}`);
      const data = response.data;

      if (data && data.length > 0) {
        setWordData(data[0]);
        setError(null);
      } else {
        setWordData(null);
        setError('Couldn\'t find the word');
      }
    } catch (error) {
      setWordData(null);
      setError('Couldn\'t find the word');
    }
  };

  return (
    <div className='wholebody'>
    <h1 className="text-4xl font-bold m-5 text-black">Dictionary App</h1>
    <div className="content">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search here"
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="result">
        {error && <h3 className="error">{error}</h3>}
        {wordData && (
          <Words
            word={wordData.word}
            partOfSpeech={wordData.meanings[0].partOfSpeech}
            phonetic={wordData.phonetic}
            definition={wordData.meanings[0].definitions[0].definition}
            example={wordData.meanings[0].definitions[0].example || ""}
          />
        )}
      </div>
    </div>
    </div>
  )
}