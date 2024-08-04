import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './styles.scss'; 

function App() {
  const [count, setCount] = useState(0);
  const [wordValue, setWordValue] = useState('');
  const letters1 = 'eaionrtlsu';
  const letters2 = 'dg';
  const letters3 = 'bcmp';
  const letters4 = 'fhvwy';
  const letters5 = 'k';
  const letters8 = 'jx';
  const letters10 = 'qz';
  const letters0 = ' ';



  const handleWordChange = (event) => {
    setWordValue(event.target.value);
  }



  return (
    <div>

      <div className="wrap">
        <input type="text" className="word" autoFocus value={wordValue} onChange={handleWordChange} />
        <div>
          {
          wordValue.split("").map((letter, index) => (
            <span key={index} className="letter">{letter}</span>
          ))}
        </div>
      </div>


      <div>
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
