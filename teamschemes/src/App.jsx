import { useState, useEffect, useRef } from 'react';
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
  const [colorChecked, setColorChecked] = useState(() => {
    const savedValue = localStorage.getItem('colorChecked');
    return savedValue !== null ? savedValue === 'true' : true; // default to true if no value found
  });
  const [hexChecked, setHexChecked] = useState(() => {
    const savedValue = localStorage.getItem('hexChecked');
    return savedValue === 'true'; // default to false if no value found
  });
  const [logoChecked, setLogoChecked] = useState(() => {
    const savedValue = localStorage.getItem('logoChecked');
    return savedValue !== null ? savedValue === 'true' : true; // default to true if no value found
  });
  const [cssChecked, setCssChecked] = useState(() => {
    const savedValue = localStorage.getItem('cssChecked');
    return savedValue === 'true'; // default to false if no value found
  });
  const [menuOpen, setMenuOpen] = useState(() => {
    if (window.innerWidth < 1000) {
      if (window.innerWidth < 480) {
        return false; //close menu by default always on mobile
      }

      const savedValue = localStorage.getItem('menuOpen');
      return savedValue === 'true'; // default to false if no value found
    }

    const savedValue = localStorage.getItem('menuOpen');
    return savedValue !== null ? savedValue === 'true' : true; // default to true if no value found
  });
  const [selectedColor, setSelectedColor] = useState('');

  const handleColorChecked = () => {
    const newValue = !colorChecked;
    setColorChecked(newValue);
    localStorage.setItem('colorChecked', newValue);
  };

  const handleHexChecked = () => {
    const newValue = !hexChecked;
    setHexChecked(newValue);
    localStorage.setItem('hexChecked', newValue);
  };

  const handleLogoChecked = () => {
    const newValue = !logoChecked;
    setLogoChecked(newValue);
    localStorage.setItem('logoChecked', newValue);
  };

  const handleCssChecked = () => {
    setSelectedColor('');
    const newValue = !cssChecked;
    setCssChecked(newValue);
    localStorage.setItem('cssChecked', newValue);
  };

   //select - common color change
   const handleCommonColorChange = (event) => {
    setCssChecked(false);
    setSelectedColor(event.target.value);
  }

  const menuRef = useRef(null);

  useEffect(() => {
    const detailsElement = menuRef.current; //add toggle event listener to the details element

    const handleToggle = () => {
      const isOpen = detailsElement.open;
      setMenuOpen(isOpen);
      localStorage.setItem('menuOpen', isOpen);
    };

    if (detailsElement) {
      detailsElement.addEventListener('toggle', handleToggle);
    }

    return () => { //clean up the event listener on unmount
      if (detailsElement) {
        detailsElement.removeEventListener('toggle', handleToggle);
      }
    };
  }, []);

  const changeColor = (league, teamId) => {
    const newTeam = colorData.leagues[league].find(team => team.id === teamId);
    setCurrentTeam(newTeam);
  }

  //runs on mount and when currentTeam changes
  useEffect(() => {

    //reset selected color if there is one
    setSelectedColor('');

    //update color variables
    document.documentElement.style.setProperty('--theme-color', currentTeam.colors[0].hex);
    document.documentElement.style.setProperty('--accent-color', currentTeam.colors[0].hex);
    const metaThemeColor = document.querySelector('#dynamic-theme');
    metaThemeColor.setAttribute('content', currentTeam.colors[0].hex);

    //update the favicon
    const faviconLink = document.querySelector('#dynamic-favicon');
    faviconLink.href = `./assets/${currentTeam.logo}`;

    //close menu on mobile to see team update
    if (window.innerWidth < 480) {
      setMenuOpen(false);
    }

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

  //ignore team names in color that will only be repeated because of that 1 team
  const ignoredWords = ['49ers', 'dream', 'titans', 'mercury'];
  const wordCounts = {};

  //gather color counts for dropdown
  Object.values(colorData.leagues).forEach((teams) => {
    teams.forEach((team) => {
      team.colors.forEach((color) => {
        const words = color.name.split(' ');
        words.forEach((word) => {
          if (!ignoredWords.includes(word.toLowerCase())) {
            if (wordCounts[word]) {
              wordCounts[word] += 1;
            } else {
              wordCounts[word] = 1;
            }
          }
        });
      });
    });
  });

  //convert color counts into array of dropdown options
  const colorOptions = Object.entries(wordCounts)
    .filter(([_, count]) => count > 1)
    .sort((a, b) => b[1] - a[1])
    .map(([word, count]) => (
    <option key={word} value={word}>
      {word} ({count})
    </option>
  ));

  //show all teams with selected color
  const teamsWithSelectedColor = selectedColor ? Object.values(colorData.leagues).flatMap((teams) =>
    teams.filter((team) =>
      team.colors.some((color) => color.name.toLowerCase().includes(selectedColor.toLowerCase()))
    )
  ) : [];

  //set favicon as a color
  const setFaviconColor = (hexColor) => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    context.fillStyle = hexColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const faviconURL = canvas.toDataURL('image/png');
    let faviconLink = document.querySelector('#dynamic-favicon');
    faviconLink.href = faviconURL;

    const metaThemeColor = document.querySelector('#dynamic-theme');
    metaThemeColor.setAttribute('content', hexColor);
  }

  //when selected color changes, change the favicon also
  useEffect(() => {

    if (selectedColor) {
      //use first matching team's color as favicon color
      const matchingTeam = teamsWithSelectedColor.find(team =>
        team.colors.some(color => color.name.toLowerCase().includes(selectedColor.toLowerCase()))
      );
      const color = matchingTeam.colors.find(color => color.name.toLowerCase().includes(selectedColor.toLowerCase()));
      if (color) {
        setFaviconColor(color.hex);
      }

      //close menu on mobile to see color update
      if (window.innerWidth < 480) {
        //setMenuOpen(false);//here
      }
    } else {
      //update the favicon back to team logo
      const faviconLink = document.querySelector('#dynamic-favicon');
      faviconLink.href = `./assets/${currentTeam.logo}`;
    }
  }, [selectedColor, teamsWithSelectedColor]);
  
  return (
    <main>
      
      { !selectedColor && 
        <div className={ `grid grid--${currentTeam.colors.length}` }>

        { currentTeam.colors.map((color, colorIndex) => (
          <div className="color"
            key={ colorIndex }
            style={{ backgroundColor: color.hex }}
          >

            <div className="color-box">
              { colorChecked && 
                <button type="button" onClick={(event) => { copyColor(color.name, event.currentTarget); }} className="color-name" style={{ color: /^[0-7]/.test(color.hex[1]) || /^[0-7]/.test(color.hex[3]) ? 'var(--white)' : 'var(--black)' }}>{ color.name }</button>
              }

              { hexChecked && 
                <button type="button" onClick={(event) => { copyColor(color.hex, event.currentTarget); }} className="color-hex" style={{ color: /^[0-7]/.test(color.hex[1]) || /^[0-7]/.test(color.hex[3])
                   ? 'var(--white)' : 'var(--black)' }}>{ color.hex }</button>
              }
            </div>

            { logoChecked && 
              <img className="logo" src={ `./assets/${currentTeam.logo}` } title={`${ currentTeam.name }`} alt={`${ currentTeam.name } logo`} />
            }

          </div> 
        ))}
        </div>
      }
      
      { selectedColor &&

        <div className={ `grid grid--${teamsWithSelectedColor.length}` }>

        { teamsWithSelectedColor.map((team, index) => (
          team.colors
            .filter((color) => color.name.toLowerCase().includes(selectedColor.toLowerCase()))
            .map((color, colorIndex) => (
              <div className="color"
                key={ colorIndex }
                style={{ backgroundColor: color.hex }}
              >
                <div className="color-box">
                  {/* <div className="color-team" style={{ color: /^[0-7]/.test(color.hex[1]) || /^[0-7]/.test(color.hex[3]) ? 'var(--white)' : 'var(--black)' }}>{ team.name}</div> */}
                  <button type="button" onClick={(event) => { copyColor(color.name, event.currentTarget); }} className="color-name" style={{ color: /^[0-7]/.test(color.hex[1]) || /^[0-7]/.test(color.hex[3]) ? 'var(--white)' : 'var(--black)' }}>{ color.name }</button>
                  <button type="button" onClick={(event) => { copyColor(color.hex, event.currentTarget); }} className="color-hex" style={{ color: /^[0-7]/.test(color.hex[1]) || /^[0-7]/.test(color.hex[3])
                      ? 'var(--white)' : 'var(--black)' }}>{ color.hex }</button>
                </div>
                <img className="logo" src={ `./assets/${team.logo}` } title={`${ team.name }`} alt={`${ currentTeam.name } logo`} />
              </div> 
            ))
        ))}
        </div>
      }
      
      { !menuOpen && 
        <button className="main-random" type="button" title="random" onClick={() => setCurrentTeam(getRandomTeam())}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M592 192H473.26c12.69 29.59 7.12 65.2-17 89.32L320 417.58V464c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V240c0-26.51-21.49-48-48-48zM480 376c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm-46.37-186.7L258.7 14.37c-19.16-19.16-50.23-19.16-69.39 0L14.37 189.3c-19.16 19.16-19.16 50.23 0 69.39L189.3 433.63c19.16 19.16 50.23 19.16 69.39 0L433.63 258.7c19.16-19.17 19.16-50.24 0-69.4zM96 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"/></svg>
        </button>
      }
      <details className="sidebar" ref={menuRef} open={menuOpen}>
        <summary className="sidebar-trigger">
          <svg className="burger" aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path fillRule="evenodd" clipRule="evenodd" d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM3 12C3 12.5523 3.44772 13 4 13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H4C3.44772 11 3 11.4477 3 12ZM3 17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17C21 16.4477 20.5523 16 20 16H4C3.44772 16 3 16.4477 3 17Z" fill="#37393d" />
            </g>
          </svg>
          <span className="sidebar-trigger-words">Teams</span>
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
              <label htmlFor="color-name" className="settings-label">Color name</label>
            </div>
            <div className="settings-group">
              <input type="checkbox" className="settings-checkbox" name="color-hex" id="color-hex" checked={hexChecked} onChange={handleHexChecked} role="checkbox" aria-checked={hexChecked} />
              <label htmlFor="color-hex" className="settings-label">HEX</label>
            </div>
            <div className="settings-group">
              <input type="checkbox" className="settings-checkbox" name="color-logo" id="color-logo" checked={logoChecked} onChange={handleLogoChecked} role="checkbox" aria-checked={logoChecked} />
              <label htmlFor="color-logo" className="settings-label">Logo</label>
            </div>
            <button className="settings-random" type="button" title="random" onClick={() => setCurrentTeam(getRandomTeam())}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M592 192H473.26c12.69 29.59 7.12 65.2-17 89.32L320 417.58V464c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V240c0-26.51-21.49-48-48-48zM480 376c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm-46.37-186.7L258.7 14.37c-19.16-19.16-50.23-19.16-69.39 0L14.37 189.3c-19.16 19.16-19.16 50.23 0 69.39L189.3 433.63c19.16 19.16 50.23 19.16 69.39 0L433.63 258.7c19.16-19.17 19.16-50.24 0-69.4zM96 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"/></svg>
            </button>
          </div>
          
      {
        Object.keys(leagues).map((leagueKey, leagueIndex) => (
          <details key={leagueIndex}>
            {/* Display the name of the league */}
            <summary>{ leagueKey.toUpperCase() }</summary>
            <div>      
              <ul>  
                { leagues[leagueKey].map((team, teamIndex) => (

                  <li key={ teamIndex }> 
                    <button type="button" onClick={() => changeColor(leagueKey, team.id)} className={!selectedColor && (team.id === currentTeam.id) ? 'active' : ''} data-id={team.id}> { /* add click function and pass league and team id */ }
                      <span className="logo-box">
                        <img className="logo" src={ `./assets/${team.logo}` } alt={`${ team.name } logo`} />
                      </span>
                      <span className="team-name">{team.name}</span>

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

          <details className="misc" open>
            <summary>Misc. stuff</summary>
            <div className="misc-content">
              <div className="settings-row">
                <div className="settings-group">
                  <input type="checkbox" className="settings-checkbox" name="css-var" id="css-vars" checked={cssChecked} onChange={handleCssChecked} role="checkbox" aria-checked={cssChecked} />
                  <label htmlFor="css-vars" className="settings-label">{ selectedColor ? '' : currentTeam.name } CSS variables</label>
                </div>
                <div className="settings-group">
                  {/* TBD */}
                </div>
              </div>

              { cssChecked && 
                <div className="css-vars">
                  <code className="css-vars-code" style={{ border: `1px solid ${currentTeam.colors[0].hex}`, color: currentTeam.colors[0].hex, backgroundColor: /^[0-7]/.test(currentTeam.colors[0].hex[1]) || /^[0-7]/.test(currentTeam.colors[0].hex[3]) ? 'var(--white)' : 'var(--black)' }}>
                    <pre id="css-output">
                      :root {'{'}
                      {
                        currentTeam.colors.map((color) => {

                          let initialVarName = `${currentTeam.id}-${color.name.replace(/\s+/g, '-')}`;
                          let varNameWithoutDupes = initialVarName.split('-').filter((word, index, arr) => arr.indexOf(word) === index).join('-');
                          let finalVarName = varNameWithoutDupes.replace('-nfl', '').replace('-nhl', '').replace('-mlb', '').replace('-wnba', '').replace('-nba', '');

                          return `\n  --${finalVarName}: ${color.hex};`;
                        })
                      }
                      {'\n}'}
                    </pre>
                  </code>
                  <button type="button" onClick={(event) => { copyColor(document.getElementById('css-output').textContent.trim(), event.currentTarget); }} className="code-copy" style={{ color: currentTeam.colors[0].hex}} title="Copy">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={currentTeam.colors[0].hex}><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
                  </button>
                </div>
              }

              <div className="settings-row">
                <div className="settings-group settings-group--stacked">
                  <label htmlFor="common-colors">Common colors</label>
                  <select id="common-colors" onChange={handleCommonColorChange} className="color-select" value={selectedColor}>
                    <option value="">Select a color</option>
                    {colorOptions}
                  </select>
                </div>
                <div className="settings-group settings-group--stacked">
                  {/* TBD */}
                </div>
              </div>

              <p className="disclaimer">Site last updated: 12/2024</p>
            </div>
          </details>
        </div>
      </details>
    </main>
  )
}

export default App;