import { useState, useEffect } from 'react';
import colorData from './colors.json';
import './_styles.scss'; 

function App() {

  const leagues = colorData.leagues;
  const leagueKeys = Object.keys(colorData.leagues);

  const getRandomTeam = () => {
    const randomLeagueKey = leagueKeys[Math.floor(Math.random() * leagueKeys.length)];
    const randomLeagueTeams = leagues[randomLeagueKey];
    const randomTeam = randomLeagueTeams[Math.floor(Math.random() * randomLeagueTeams.length)];
    return randomTeam;
  };


  let [currentTeam, setCurrentTeam] = useState(getRandomTeam()); 
  const [colorChecked, setColorChecked] = useState(true);
  const [hexChecked, setHexChecked] = useState(false);

  const handleColorChecked = () => {
    setColorChecked(!colorChecked);
  };

  const handleHexChecked = () => {
    setHexChecked(!hexChecked);
  };

  const changeColor = (league, teamId) => {
    const newTeam = colorData.leagues[league].find(team => team.id === teamId);
    setCurrentTeam(newTeam);
  }

  //runs on mount and when currentTeam changes
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', currentTeam.colors[0].hex);
    document.documentElement.style.setProperty('--accent-color', currentTeam.colors[0].hex);
  }, [currentTeam]);

  const copyColor = (text, element) => {
    navigator.clipboard.writeText(text).then(() => {
      element.classList.add('copied');
      setTimeout(() => {
        element.classList.remove('copied');
      }, 1500);

    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
  
  return (
    <main>
      <div className={ `grid grid--${currentTeam.colors.length}` }>
      {
        currentTeam.colors.map((color, colorIndex) => (
          <div className="color"
            key={ colorIndex }
            style={{ backgroundColor: color.hex }}
          >

            <div className="color-box">
              { colorChecked === true && 
                <button type="button" onClick={(event) => { copyColor(color.name, event.currentTarget); }} className="color-name" style={{ color: /^[0-9]/.test(color.hex[1]) ? 'var(--white)' : 'var(--black)' }}>{ color.name }</button>
              }

              { hexChecked === true && 
                <button type="button" onClick={(event) => { copyColor(color.hex, event.currentTarget); }} className="color-hex" style={{ color: /^[0-9]/.test(color.hex[1]) ? 'var(--white)' : 'var(--black)' }}>{ color.hex }</button>
              }

              {/* Later, for showing all similar colors together:
                <span>{ currentTeam.name}</span>
               */}
            </div>


          </div> 
        ))
      }
      </div>

      <details className="sidebar" open>
        <summary className="sidebar-trigger">
          <svg className="burger" aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path fillRule="evenodd" clipRule="evenodd" d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM3 12C3 12.5523 3.44772 13 4 13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H4C3.44772 11 3 11.4477 3 12ZM3 17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17C21 16.4477 20.5523 16 20 16H4C3.44772 16 3 16.4477 3 17Z" fill="#37393d" />
            </g>
          </svg>
          <svg className="close" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false">
            <g stroke="none" strokeWidth="1" fill="#37393D" fillRule="evenodd">
              <polygon points="19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12"></polygon>
            </g>
          </svg>
        </summary>
        <div className="settings">
          <h1>Team color schemes</h1>
          <div className="settings-row">
            <div className="settings-group">
              <input type="checkbox" className="settings-checkbox" name="color-name" id="color-name" checked={colorChecked} onChange={handleColorChecked} role="checkbox" aria-checked={colorChecked} />
              <label htmlFor="color-name" className="settings-label">Show color name</label>
            </div>
            <div className="settings-group">
              <input type="checkbox" className="settings-checkbox" name="color-hex" id="color-hex" checked={hexChecked} onChange={handleHexChecked} role="checkbox" aria-checked={hexChecked} />
              <label htmlFor="color-hex" className="settings-label">Show HEX</label>
            </div>
            <button className="settings-random" type="button" title="random" onClick={() => setCurrentTeam(getRandomTeam())}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M592 192H473.26c12.69 29.59 7.12 65.2-17 89.32L320 417.58V464c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V240c0-26.51-21.49-48-48-48zM480 376c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm-46.37-186.7L258.7 14.37c-19.16-19.16-50.23-19.16-69.39 0L14.37 189.3c-19.16 19.16-19.16 50.23 0 69.39L189.3 433.63c19.16 19.16 50.23 19.16 69.39 0L433.63 258.7c19.16-19.17 19.16-50.24 0-69.4zM96 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"/></svg>
            </button>
          </div>
          
      {
        Object.keys(leagues).map((leagueKey, leagueIndex) => (
          <details key={leagueIndex} open>
            {/* Display the name of the league */}
            <summary>{ leagueKey.toUpperCase() }</summary>
            <div>      
              <ul>  
                { leagues[leagueKey].map((team, teamIndex) => (

                  <li key={ teamIndex }> 
                    <button type="button" onClick={() => changeColor(leagueKey, team.id)} className={team.id === currentTeam.id ? 'active' : ''} data-id={team.id}> { /* add click function and pass league and team id */ }
                      <span className="logo-box">
                        <img className="logo" src={ `./assets/${team.logo}` } alt={`${ team.name } logo`} />
                      </span>
                      <span>{team.name}</span>

                      <span className="team-colors">
                      { team.colors.map((color, colorIndex) => (
                        <span
                          key={ colorIndex }
                          style={{ backgroundColor: color.hex }}
                          className={ `team-color ${color.name}` }
                        >
                        </span>
                      )) }
                      </span>
                    </button>
                  </li>
                  
                  )) 
                }
              </ul>
            </div>

          </details>
        ))
      }
        </div>

      </details>
    </main>
  )
}

export default App;