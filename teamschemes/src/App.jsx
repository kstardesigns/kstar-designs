import { useState } from 'react';
import colorData from './colors.json';
import './_styles.scss'; 

function App() {

  const leagues = colorData.allColors;
  const wnba = colorData.allColors.wnba;
  let [currentTeam, setCurrentTeam] = useState(wnba.find(team => team.id === 'lynx')); 
  //TODO: change this to random team on load

  const changeColor = (league, teamId) => {
    const newTeam = colorData.allColors[league].find(team => team.id === teamId);
    setCurrentTeam(newTeam);
  }

  return (
    <main>
      <div className={ `grid grid--${currentTeam.colors.length}` }>
      {
        currentTeam.colors.map((color, colorIndex) => (
          <div
            key={ colorIndex }
            style={{ backgroundColor: color.hex }}
          >
            { color.name }<br/>
            { color.hex }
          </div> 
        ))
      }
      </div>

      <div className="sidebar">
      {
        /* sample full loop of all teams in a league */

        Object.keys(leagues).map((leagueKey, leagueIndex) => (
          <details key={leagueIndex} open>
            {/* Display the name of the league */}
            <summary>{ leagueKey.toUpperCase() }</summary>
            <div>      
              <ul>  
                { leagues[leagueKey].map((team, teamIndex) => (

                  <li key={ teamIndex }> 
                    <button type="button" onClick={() => changeColor(leagueKey, team.id)} > { /* add click function and pass league and team id */ }
                      <img className="logo" src={ `./assets/${team.logo}` } alt={`${ team.name } logo`} />
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
    </main>
  )
}

export default App;