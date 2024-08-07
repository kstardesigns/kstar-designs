import { useState, useEffect } from 'react';
import BonusCheckbox from './components/bonus/Bonus';
import Tile from './components/tile/Tile';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './_styles.scss'; 

const App = () => {
  const [wordValue, setWordValue] = useState('');
  let [total, setTotal] = useState(0);
  const [bonus, setBonus] = useState(false);
  const [showBonus, setShowBonus] = useState(false);
  const [letterMults, setLetterMults] = useState({});
  const [wordMults, setWordMults] = useState({});

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
    setWordValue(event.target.value.replace(/[^a-zA-Z\s]/g, '').toLowerCase());
  }

  const getLetterScore = (letter) => {
    for (const [key, value] of Object.entries(letterScores)) {
      if (value.includes(letter)) {
        return Number(key.replace('letters',''));
      }
    }
    return 0;
  }

  const handleBonusStateChange = (newValue) => {
    setBonus(newValue);
  };

  const getNewTotal = (bonus) => {
    const wordLength = wordValue.length;
    let newTotal = 0;

    //if 7 tiles or more, show the optional bonus checkbox
    wordLength >= 7 ? setShowBonus(true) : setShowBonus(false);

    //add up score
    wordValue.split('').forEach((letter, index) => {
      const letterScore = getLetterScore(letter);
      const letterMult = letterMults[index] || 1;
      newTotal += letterScore * letterMult;
    });

    //add on bonus
    if (bonus) {
      newTotal += 50;
    }

    // Combine word multipliers
    const combinedWordMult = Object.values(wordMults).reduce((acc, mult) => acc * mult, 1);
    newTotal *= combinedWordMult;

    setTotal(newTotal);
  }

  //after word is updated, show bonus checkbox if applicable and update score
  useEffect(() => {
    getNewTotal(bonus);
  },[wordValue, wordMults]);

  //if bonus checkbox is changed, recalculate total score to include (or don't include) 50 point bonus
  useEffect(() => {
    if (showBonus) {
      if (bonus) {
        getNewTotal(true);
      } else {
        getNewTotal(false);
      }
    }
  },[bonus]);

  //if word length changes and drops below 7, remove the bonus and recalculate score
  useEffect(() => {
    const wordLength = wordValue.length;

    if (wordLength < 7) {
      setBonus(false);
      getNewTotal(false);
    }
  },[showBonus]);

  //callback function to handle word multiplier changes from Tile component
  const handleBonusSquareChange = (index, newLetterMult, newWordMult) => {
    setLetterMults(prev => ({ ...prev, [index]: newLetterMult }));
    setWordMults(prev => ({ ...prev, [index]: newWordMult }));
  };

  return (
    <>
      <h1 className="header">
        Type a word below to see its Scrabble score
        <span className="subheader">Spacebar = blank tile</span>
      </h1>
      <div className="wrap">
        <input type="text" className="word" autoFocus value={wordValue.replace(/[^a-zA-Z\s]/g, '')} onChange={handleWordChange} />
        <div className="output">
          {
            wordValue.split("").map((letter, index) => (
              
              <Tile 
                letter={letter}
                key={index}
                index={index}
                number={getLetterScore(letter)}
                onBonusSquareChange={handleBonusSquareChange}
              />

            ))
          }
        </div>

      </div>

      { wordValue.length > 0 &&
        <p className="bonus-square-description">⌃ Click to toggle bonus squares</p>
      }


      { showBonus === true && 
        <BonusCheckbox 
          bonus={bonus}
          onStateChange={handleBonusStateChange}
        />
      }

      <div className="total">Word score: {total}</div>




      <div className="reactstuff">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </>
  )
}

export default App;