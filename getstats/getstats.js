//useful endpoints:
//player info: http://statsapi.mlb.com/api/v1/people/518876/
//gameLog: https://statsapi.mlb.com/api/v1/people/518876/stats?stats=gameLog&group=hitting
//career: https://statsapi.mlb.com/api/v1/people/518876/stats?stats=career&group=hitting 
//schedule: http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&date=05/13/2021 
//player in specific game: http://statsapi.mlb.com/api/v1/people/518692/stats/game/{gameId}
//current game id for specific team: http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&date=05/13/2021&teamId=144, then: data.dates[0].games[0].gamePk


//Update playerTeam and playerId using the numbers below
//braves = 144
//dbacks = 109
//freddie freeman = 518692
//merrill kelly = 518876
    
let playerTeam = 109,
    playerId = 518876,
    playerName = 'Merrill Kelly',
    outputText = '',
    date = new Date(),
    month = `${date.getMonth() + 1}`.padStart(2, '0'),
    day = `${date.getDate()}`.padStart(2, '0'),
    year = date.getFullYear(),
    fullDate = `${month}/${day}/${year}`,
    todaysPA = 0, todaysAB = 0, todaysH = 0, todaysK = 0, todaysBB = 0, todaysSB = 0, todays2B = 0, todays3B = 0, todaysHR = 0, todaysGO = 0, todaysFO = 0,
    playerButtons = document.querySelectorAll('.player-button');

const fetchStats = function(playerId) {
    //fetch id of current game
    fetch(`https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&date=${fullDate}&teamId=${playerTeam}`).then(function (response) {
        return response.json();
    }).then(function (data) {
        const todaysGameId = data.dates[0].games[0].gamePk;

        //fetch player's stats from current game
        return fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats/game/${todaysGameId}`);
    }).then(function (response) {
        return response.json();
    }).then(function (data) {

        //to get player's stats from current game
        // console.log(data.stats[0].splits[2].stat); // all stats for game

        if (data.stats[0].splits[2] !== undefined && data.stats[0].splits[2].stat.plateAppearances ) {
            console.log('undefined?');
            todaysAB = data.stats[0].splits[2].stat.atBats;
            todaysH = data.stats[0].splits[2].stat.hits;
            todaysPA = data.stats[0].splits[2].stat.plateAppearances;
            todaysK = data.stats[0].splits[2].stat.strikeOuts;
            todaysBB = data.stats[0].splits[2].stat.baseOnBalls;
            todaysSB = data.stats[0].splits[2].stat.sacBunts;
            todays2B = data.stats[0].splits[2].stat.doubles;
            todays3B = data.stats[0].splits[2].stat.triples;
            todaysHR = data.stats[0].splits[2].stat.homeRuns;
            todaysGO = data.stats[0].splits[2].stat.groundOuts;
            todaysFO = data.stats[0].splits[2].stat.flyOuts;
        } 

        const createOutputText = function() {
            outputText += `${playerName} stat tracker:<br><br>𝚃𝚘𝚍𝚊𝚢<br>${todaysH}-${todaysAB}`;

            const optionalStats = [todaysPA, todaysK, todaysBB, todays2B, todays3B, todaysHR, todaysGO, todaysFO, todaysSB],
                  optionalStatAliases = ['PA', 'K', 'BB', '2B', '3B', 'HR', 
                                        todaysGO == 1 ? 'groundout' : 'groundouts', 
                                        todaysFO == 1 ? 'flyout' : 'flyouts', 
                                        todaysSB == 1 ? 'sac bunt' : 'sac bunts'];

            optionalStats.forEach(function (optionalStat, i) {
                if (optionalStat > 0) {
                    outputText += `, ${optionalStat} ${optionalStatAliases[i]}`;
                }
            });

            document.getElementById('output').innerHTML = outputText;
        }

        createOutputText();
        //fetch player's season stats
        return fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=season&year=${year}&group=hitting`);
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        //to get player's season stats
        // console.log(data.stats[0].splits[0].stat) // all stats for season
        
        const seasonAB = data.stats[0].splits[0].stat.atBats + todaysAB,
              seasonH = data.stats[0].splits[0].stat.hits + todaysH,
              seasonPA = data.stats[0].splits[0].stat.plateAppearances + todaysPA,
              seasonK = data.stats[0].splits[0].stat.strikeOuts + todaysK,
              seasonBB = data.stats[0].splits[0].stat.baseOnBalls + todaysBB,
              seasonSB = data.stats[0].splits[0].stat.sacBunts + todaysSB,
              seasonAVG = (seasonH / seasonAB).toFixed(3).substring(1); // to be more precise

        const addSeasonToOutputText = function() {
            outputText += `<br><br>𝟸𝟶𝟸𝟷<br>${seasonH}-${seasonAB}`;
            outputText += `, ${seasonPA} PA`;

            const optionalStats = [seasonK, seasonBB, seasonSB],
                  optionalStatAliases = ['K', 'BB', 
                                        seasonSB == 1 ? 'sac bunt' : 'sac bunts'];

            optionalStats.forEach(function (optionalStat, i) {
                if (optionalStat > 0) {
                    outputText += `, ${optionalStat} ${optionalStatAliases[i]}`;
                }
            });

            outputText += `, ${seasonAVG} AVG`;
            document.getElementById('output').innerHTML = outputText;
        }
        addSeasonToOutputText();

        //fetch player's career stats
        return fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=career&group=hitting`);

    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        //to get player's career stats
        // console.log(data.stats[0].splits[0].stat); // all stats for career
        const careerAB = data.stats[0].splits[0].stat.atBats,
              careerH = data.stats[0].splits[0].stat.hits,
              careerPA = data.stats[0].splits[0].stat.plateAppearances,
              careerK = data.stats[0].splits[0].stat.strikeOuts,
              careerBB = data.stats[0].splits[0].stat.baseOnBalls,
              careerSB = data.stats[0].splits[0].stat.sacBunts,
              careerAVG = data.stats[0].splits[0].stat.avg,
              careerAVGprecise = (careerH / careerAB).toFixed(5).substring(1), // to be more precise
              careerOBP = data.stats[0].splits[0].stat.obp,
              careerSLG = data.stats[0].splits[0].stat.slg,
              careerOPS = data.stats[0].splits[0].stat.ops;

        const addCareerToOutputText = function() {
            outputText += `<br><br>𝙲𝚊𝚛𝚎𝚎𝚛<br>${careerH}-${careerAB}`;
            outputText += `, ${careerPA} PA`;
            
            const optionalStats = [careerK, careerBB, careerSB],
                optionalStatAliases = ['K', 'BB', 'sac bunts'];

            optionalStats.forEach(function (optionalStat, i) {
                if (optionalStat > 0) {
                    outputText += `, ${optionalStat} ${optionalStatAliases[i]}`;
                }
            });

            outputText += `<br>${careerAVG}/${careerOBP}/${careerSLG}/${careerOPS}`;
            outputText += `<br>Precise AVG: ${careerAVGprecise}`

            document.getElementById('output').innerHTML = outputText;
        }
        addCareerToOutputText();

        const twitterText = `https://twitter.com/intent/tweet?text=${outputText}`;//here
        document.getElementById('twitter-share').setAttribute('href', twitterText.replace(/<br\s*[\/]?>/gi, '%0a'));
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });               
}
window.addEventListener('DOMContentLoaded', (event) => {
    fetchStats(playerId, playerTeam);
});

playerButtons.forEach(async function(playerButton) {
    playerButton.addEventListener('click', (event) => {
        outputText = '';
        playerId = playerButton.getAttribute('data-playerid');
        playerTeam = playerButton.getAttribute('data-playerteam');
        playerName = playerButton.innerHTML;
        fetchStats(playerId, playerTeam);
    });
});

//[input] *player games played*
//[input] *team games played*
//[input] *current stat* to multiply to get pace
//[button] get pace results

//get *team games remaining*:  162 -  (*team games played*)
    // (118)
//get *pace multiplier*: *player games played* / *current stat* 
    // (45 / 32)
//get *pace results* = (*teams game remaining* / *pace multiplier*) + *current stat*  
    //(118 / 1.4063) + 32 = 115.91

const getPaceButton = document.getElementById('get-pace')
      playerGames = document.getElementById('player-games'),
      teamGames = document.getElementById('team-games'),
      currentStat = document.getElementById('current-stat'),
      paceResult = document.getElementById('pace-result');

getPaceButton.addEventListener('click', function() {
    const teamGamesRemaining = 162 - parseInt(teamGames.value);
    console.log(teamGamesRemaining);
    const paceMultiplier = (parseInt(playerGames.value) / parseInt(currentStat.value)).toFixed(3);
    console.log('paceMultiplier :>> ', paceMultiplier);
    const paceResults = ((teamGamesRemaining / paceMultiplier) + parseInt(currentStat.value)).toFixed(2);
    console.log(paceResults);
    paceResult.innerHTML = `On pace for... <strong>${paceResults}</strong>`;
});