import { useEffect, useState } from 'react'
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
  const [timeLeft, setTimeLeft] = useState(30);
  const [goodAnswer, setGoodAnswer] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  function handleGuess(guess: string) {

    const userGuess = guess;
    const proximity = currentWord.closeWords[userGuess] || 0;
     
    
    setHistory([
      ...history,
      {
      guess: userGuess,
      proximity: proximity
      }
    ]);

    if (userGuess === currentWord.word) {
      setGoodAnswer(true);
      return;
    } 
  }
  
  function nextWord() {
    

    let newWord;

    do {
      newWord = words[Math.floor(Math.random() * words.length)];
    } while (newWord.word === currentWord.word);
    setGoodAnswer(false);
    setCurrentWord(newWord);
    setHistory([]);
    setTimeLeft(30);
    
    }

    useEffect(() => {
      if (!gameStarted) {
      return;
      };

      if (goodAnswer) {
        return;
      };

      const interval = setInterval(() => {
      setTimeLeft((previousTime) => {
        
        if (previousTime <= 1) {
          nextWord();
          return 30;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [goodAnswer, gameStarted]);


  return (
    <>
      {!gameStarted && (
        <div>
        <button onClick={() => setGameStarted(true)}>
          Start
        </button>
        </div>
      )}
      <h1>Guess the word</h1>
      <h2 className='timer'>Time left : {timeLeft}s</h2>
      <div className='image-wrapper'>
      <img style={{
        filter: goodAnswer ? "blur(0px)" : "blur(12px)"
        }} className='image'
        src={currentWord.image}
        alt='mystery word'
        width="400"
        />
      </div>

      

      <div> 
      {goodAnswer && 
        (
          <div>
            <h2>Bravo !</h2>
            <button onClick={nextWord}>next word</button>
          </div>  
        )
      }
      </div> 
      <GuessInput onSubmit= {handleGuess}/> 
      <GuessHistory history={history}/> 
    </>
  )
}

export default App
