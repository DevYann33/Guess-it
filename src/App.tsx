import { useState } from 'react'
import words from './data/words'
import './App.css'
import GuessInput from './components/GuessInput'
import GuessHistory from './components/GuessHistory'
import type { Word } from './types'


function App() {
  // const words= wordData as Word[]

  const [currentWord, setCurrentWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );

  const [history, setHistory] = useState([]);
  
  function handleGuess(guess: string) {

    const userGuess = guess;
    const proximity =
      currentWord.closeWords[userGuess] || 0;
    
    setHistory([
      ...history,
      {
      guess: userGuess,
      proximity: proximity
      }
    ]);
    
    if (userGuess === currentWord.word) {
      alert("Bravo !");
    
        nextWord();
        return;
    }
    else if(userGuess === proximity) {
      return; 
    }
    
  }
  
  function nextWord() {
    setHistory([])
    let newWord;

    do {
      newWord = words[Math.floor(Math.random() * words.length)];
    } while (newWord.word === currentWord.word);

    setCurrentWord(newWord);
    }


  return (
    <>
      <h1>Guess the word</h1>
      
      <img className='image'
        src={currentWord.image}
        alt='mystery word'
        width="400"
        />
      <GuessInput onSubmit= {handleGuess}/> 
      <GuessHistory history={history}/> 
    </>
  )
}

export default App
