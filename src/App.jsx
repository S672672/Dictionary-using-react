import React, { useState, useEffect } from 'react';
import './App.css';
import Words from './words';
import axios from 'axios';

export default function App() {
  const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  const [inputWord, setInputWord] = useState('');
  const [wordData, setWordData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('./src/assets/image.jpg');

  useEffect(() => {
    setBackgroundImage('./src/assets/image.jpg');
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setErrorLoading(false);
      const response = await axios.get(`${apiUrl}${inputWord}`);
      const data = response.data;

      if (data && data.length > 0) {
        setWordData(data[0]);
        setError(null);
        setBackgroundImage('./src/assets/changed-image.jpg');
      } else {
        setWordData(null);
        setErrorLoading(true);
      }
    } catch (error) {
      setWordData(null);
      setErrorLoading(true);
      setBackgroundImage('./src/assets/animated.jpg')
    } finally {
      setLoading(false);
      setErrorLoading(false);
    }
  };

  return (
    <div className={`wholebody ${errorLoading ? 'error-state' : ''}`}>
      <h1 className="text-4xl font-bold m-5 text-purple-700">Dictionary</h1>
      <div className={`content ${errorLoading ? 'error-state' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
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
          {(loading || errorLoading) && (
            <div className="loading-overlay">
              {errorLoading ? (
                <img
                  src="./src/assets/notfound.jpg"
                  alt="Error"
                  className={`error-image ${errorLoading ? 'error-state' : ''}`}
                />
              ) : (
                <div className="loading-spinner"></div>
              )}
            </div>
          )}

          {inputWord.trim() && !loading && !errorLoading && (
            <Words
              word={wordData?.word}
              partOfSpeech={wordData?.meanings[0]?.partOfSpeech}
              phonetic={wordData?.phonetic}
              definition={wordData?.meanings[0]?.definitions[0]?.definition}
              example={wordData?.meanings[0]?.definitions[0]?.example || ""}
            />
          )}
          {error && !loading && !errorLoading && (
            <h3 className="error"></h3>
          )}
        </div>
      </div>
    </div>
  );
}