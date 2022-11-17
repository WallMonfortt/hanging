import './App.css'
import { useState } from "react";
import { letters } from "./helpers/letters";
import {getWord} from "./helpers/getWord";
import { HangImage } from './components/HangImage';

function App() {
  const [word, setWord] = useState<string>("");


  const  newWord = async() => {
    const data = await getWord();
    // delete accents
    const word = data.body.Word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    setWord(word.toUpperCase());
    console.log(data.body.Word);

  }

  

  
  return (
    <div className="App">
      {/* Imagenes */}
      <HangImage attempts={4} />

      {/* Palabra oculta */}
      <h3> _ _ _ _ _ _ _ _ _ </h3>
      
      {/* Contador de intentos */}
      <h3> Intentos : 0</h3>

      {/* Botones de letras */}
      {
        letters.map( letter => (
          <button key={letter} className="btn btn-primary">
            { letter }
          </button>
        ))
      }
      

      <h1> test word: {word} </h1>
      <button onClick={newWord}>New word</button>

    </div>
  )
}

export default App
