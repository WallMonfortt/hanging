import './App.css'
import { useEffect, useState } from "react";
import { letters } from "./helpers/letters";
import {getWord} from "./helpers/getWord";
import { HangImage } from './components/HangImage';
import { Modal } from './helpers/Modal';

function App() {
  const [word, setWord] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [ lose, setLose ] = useState<boolean>(false);
  const [ win, setWin ] = useState<boolean>(false);

  useEffect(() => {
    if (attempts >= 9) {
      setLose(true);
    }
  }, [attempts]);

  const  newWord = async() => {
    setLose(false);
    setWin(false);
    const data = await getWord();

    // delete accents
    const word = data.body.Word.normalize("NFD").replace(/[\u0300-\u036f]\s/g, "");
    setWord(word.toUpperCase());
    setHiddenWord('_ '.repeat(word.length));
    setAttempts(0);

  }

  const [hiddenWord, setHiddenWord ] = useState( '_ '.repeat(word.length));

  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if (currentHiddenWord === word && word !== '') {
      setWin(true);
    }
  }, [ hiddenWord]);

  const checkLetter = (letter: string) => {
    if( word.length === 0 ) return (alert('Click on Start Game'));
    if( lose || win ) return (alert('Click on New Word'));
    if (!word.includes(letter)) {
      setAttempts(Math.min(attempts + 1, 9));
      return;
    }
    
    let newHiddenWordArray = hiddenWord.split(' ');

    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        newHiddenWordArray[i] = letter;
      }
    }

    setHiddenWord(newHiddenWordArray.join(' '));
  }

  

  
  return (
    <div className="App">
      {/* Imagenes */}
      <HangImage attempts={attempts} />

      {/* Palabra oculta */}
      <h3> {hiddenWord} </h3>
      
      {/* Contador de intentos */}
      <h3> Intentos : {attempts}</h3>
      {/* Mensaje de perder */}
      {lose && <Modal {...{show: lose}}>
      
        <h1>Perdiste</h1>
        <h2>La palabra era: {word}</h2>
        <button onClick={newWord}>New Word</button>
      </Modal>}

      {/* Mensaje de ganar */}
      {win && <Modal {...{show: win}}>

        <h1>Felicidades!!!</h1>
        <h2>Ganaste</h2>
        <button onClick={newWord}>New Word</button>
      </Modal>}

      {/* Botones de letras */}
      {
        letters.map( letter => (
          <button key={letter} className="btn btn-primary"  onClick = {() => checkLetter(letter)}>
            { letter }
          </button>
        ))
      }
      

      {/* Boton de nuevo juego */}
      <br/>
      <button onClick={newWord}>{(word.length == 0) ? 'Start game' : 'New word'}</button>

    </div>
  )
}

export default App
