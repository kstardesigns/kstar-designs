import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './styles.scss'; 

function App() {
  const [count, setCount] = useState(0);
  const [wordValue, setWordValue] = useState('');
  let [total, setTotal] = useState(0);
  const letterScores = {
    letters1: 'eaionrtlsu',
    letters2: 'dg',
    letters3: 'bcmp',
    letters4: 'fhvwy',
    letters5: 'k',
    letters8: 'jx',
    letters10: 'qz',
    letters0: ' ',
  };

  const handleWordChange = (event) => {
    setWordValue(event.target.value.toLowerCase());
  }

  const getLetterScore = (letter) => {
    for (const [key, value] of Object.entries(letterScores)) {
      if (value.includes(letter)) {
        return Number(key.replace('letters',''));
      }
    }
    return 0;
  }

  useEffect(() => {
    let newTotal = 0;
    wordValue.split('').forEach((letter) => {
      newTotal += getLetterScore(letter);
    });
    setTotal(newTotal);

  },[wordValue]);

  return (
    <div>

      <div className="wrap">
        <div className="output">
          {
          wordValue.split("").map((letter, index) => (
            <div key={index} className="tile">
              <span className="letter">{letter}</span>
              <span className="value">{getLetterScore(letter) == 0 ? '' : getLetterScore(letter)}</span>
            </div>
          ))
          }
        </div>
        <input type="text" className="word" autoFocus value={wordValue} onChange={handleWordChange} />
      </div>
      <div className="total">total: {total}</div>


      <div className="reactstuff">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App;
