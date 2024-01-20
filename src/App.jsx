import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [keyWord, setKeyWord] = useState("");

  const [result, setResult] = useState(null);

  const api = "https://api.dictionaryapi.dev/api/v2/entries/en";

  async function handleSearch() {
    try {
      const res = await axios.get(`${api}/${keyWord}`);
      console.log(res, "res");
      setResult(res.data[0]);
    } catch (e) {
      console.log({ e });
    }
  }

  function handleClear() {
    setKeyWord("");
    setResult(null);
  }
  return (
    <div className="wholebody">
      <h1 className="text-4xl font-bold m-5">Dictionary App</h1>
      <div className="content">
        <input
          className="input"
          placeholder="Search here"
          onChange={(e) => setKeyWord(e.target.value)}
          value={keyWord}
        ></input>
        <button className="button" type='submit' onClick={handleSearch}>Search</button>
        

      </div>
    </div>
  );
}
