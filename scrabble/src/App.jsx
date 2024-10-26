import { useState, useEffect, useCallback } from 'react';
import BonusCheckbox from './components/bonus/Bonus';
import Tile from './components/tile/Tile';
import useScreenSize from './hooks/Resize';
import './_styles.scss'; 

const App = () => {
  const [wordValue, setWordValue] = useState('');
  let [total, setTotal] = useState(0);
  const [bonus, setBonus] = useState(false);
  const [showBonus, setShowBonus] = useState(false);
  const [letterMults, setLetterMults] = useState({});
  const [wordMults, setWordMults] = useState({});
  let [boardWidth, setBoardWidth] = useState('765');
  const isBelow800 = useScreenSize(800);
  const isBelow640 = useScreenSize(640);
  const isBelow450 = useScreenSize(450);
  const isBelow380 = useScreenSize(380);
  let [respClass, setRespClass] = useState('resp-default');
  const apiKey = import.meta.env.VITE_API_KEY;
  const [checking, setChecking] = useState(false);
  const [validityMessage, setValidityMessage] = useState('');
  const [valid, setValid] = useState(false);
  const [definition, setDefinition] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);
  const searchDelay = 1000;

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

  const clearWord = (event) => {
    setWordValue('');
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

    // Combine word multipliers
    const combinedWordMult = Object.values(wordMults).reduce((acc, mult) => acc * mult, 1);
    newTotal *= combinedWordMult;

    //add on bonus
    if (bonus) {
      newTotal += 50;
    }

    if (valid) {
      setTotal(newTotal);
    } else {
      setTotal(0);
    }
  }

  //after word is updated, show bonus checkbox if applicable and update score
  useEffect(() => {
    getNewTotal(bonus);
  }, [valid, wordMults]);

  //if bonus checkbox is changed, recalculate total score to include (or don't include) 50 point bonus
  useEffect(() => {
    if (showBonus) {
      getNewTotal(bonus);
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

  // set respClass based on screen size
  useEffect(() => {
    if (isBelow380) {
      setRespClass('resp380');
      setBoardWidth(316);
    } else if (isBelow450) {
      setRespClass('resp450');
      setBoardWidth(360);
    } else if (isBelow640) {
      setRespClass('resp640');
      setBoardWidth(402);
    } else if (isBelow800) {
      setRespClass('resp800');
      setBoardWidth(564);
    } else {
      setRespClass('resp-default');
    }
  }, [isBelow800, isBelow640, isBelow450, isBelow380]);

  //callback function to handle word multiplier changes from Tile component
  const handleBonusSquareChange = (index, newLetterMult, newWordMult) => {
    setLetterMults(prev => ({ ...prev, [index]: newLetterMult }));
    setWordMults(prev => ({ ...prev, [index]: newWordMult }));
  };

  //allow fewer letters in word on smaller screens for ui simplicity
  let maxLength = 10;
  if (isBelow380) {
    maxLength = 7;
  } else if (isBelow450) {
    maxLength = 8;
  } else if (isBelow640) {
    maxLength = 9;
  } else if (isBelow800) {
    maxLength = 9;
  }

  // debounced validity check
  const validityCheck = useCallback(async () => {
    try {

      if (wordValue.length > 1 && !wordValue.includes(' ')) {
        const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${wordValue}?key=${apiKey}`);
        const data = await response.json();
        console.log('Response data:', data);
        setChecking(false);

        if (data.length === 0 || typeof data[0] === 'string') {
          setValidityMessage(`${wordValue} is not a valid word.`);
          setDefinition('');
          setValid(false);
        } else if (Array.isArray(data)) {

          if (data[0].shortdef && data[0].shortdef.length > 0) {
            let def = data[0].shortdef[0];

            //cleanup
            if (def.endsWith(':')) {
              def = def.substring(0, def.length - 1);
            }

            if (def.includes(': such as')) {
              def = def.replace(': such as', '');
            }

            if (def.startsWith('—')) {
              def = def.substring(1, def.length);
            }

            setDefinition(def);
          }

          setValidityMessage(`✓ ${wordValue} is a valid word.`);
          setValid(true);
        } else {
          setDefinition('Unexpected response structure');
        }
      } else if (wordValue.length == 1) {
        setChecking(false);
        setValid(false);
        setValidityMessage('Word must be at least 2 letters long.')
      } else if (wordValue.includes(' ')) {
        setChecking(false);
        setValid(true);
        setValidityMessage('');
      } else {
        setChecking(false);
        setValid(false);
        setValidityMessage('');
      }

    } catch (err) {
      setDefinition('');
      console.error('Fetch error:', err);
    }
  }, [wordValue, apiKey]);

  //effect to handle debounce and call validityCheck
  useEffect(() => {
    setValidityMessage('');
    setDefinition('');
    setChecking(true);

    if (wordValue.length > 0 && !wordValue.includes(' ')) {
      setValidityMessage('Checking word validity...');
    }

    //clear previous timer if it exists
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    //set up a new timer
    const timer = setTimeout(() => {
      validityCheck();
    }, searchDelay);

    setDebounceTimer(timer); //save the new timer ID
  }, [wordValue]);

  return (
    <>
      <h1 className="header">
        Type a word below to see its Scrabble score
        <span className="subheader">Space = blank tile</span>
      </h1>
      <div className={`controls ${respClass}`} style={{ '--board-width': boardWidth + 'px' }}>
        <div className="total">Word score: <span className="total-number">{total}</span></div>

        { wordValue.length >= 1 &&
          <button type="button" className="clear" onClick={clearWord}>Clear word</button>
        }
      </div>
      <div className={`wrap ${respClass}`} style={{ '--board-width': boardWidth + 'px' }}>
        <input type="text" className="word" value={wordValue.replace(/[^a-zA-Z\s]/g, '')} onChange={handleWordChange} maxLength={maxLength} spellCheck={false}/>
        <div className="output">
          {
            wordValue.split("").map((letter, index) => (
              
              <Tile 
                letter={letter}
                key={index}
                index={index}
                number={getLetterScore(letter)}
                onBonusSquareChange={handleBonusSquareChange}
                wordLength={wordValue.length}
              />

            ))
          }
        </div>

      </div>

      { wordValue.length > 0 &&
        <p className="bonus-square-description">⌃ <span id="click">Click</span> <span id="tap">Tap</span> to toggle bonus squares</p>
      }


      { showBonus === true && 
        <BonusCheckbox 
          bonus={bonus}
          onStateChange={handleBonusStateChange}
        />
      }

    { validityMessage && 
      <div className="validity">
        { checking ? 
          <p className="validity-message">
            <span className="progress-indicator progress-indicator-circular"></span> {validityMessage}
          </p> :
          <p className="validity-message">
            {validityMessage}
          </p>
        } 

        { definition && <p className="validity-definition"><em>{definition}</em></p> }
      </div>
    }
      

      <p className="disclaimer">SCRABBLE® is a registered trademark. All intellectual property rights in and to the game are owned in the U.S.A. and Canada by Hasbro Inc., and otherwise by Mattel Inc. Word validation thanks to dictionaryapi.com.</p>
    </>
  )
}

export default App;