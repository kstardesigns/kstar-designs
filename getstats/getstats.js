//useful endpoints:
//player info: http://statsapi.mlb.com/api/v1/people/518876/
//gameLog: https://statsapi.mlb.com/api/v1/people/518876/stats?stats=gameLog&group=hitting
//career: https://statsapi.mlb.com/api/v1/people/518876/stats?stats=career&group=hitting 
//schedule: http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&date=05/13/2021 
//player in specific game: http://statsapi.mlb.com/api/v1/people/518692/stats/game/{gameId}
//team stats: https://statsapi.mlb.com/api/v1/teams/109/stats?stats=season&group=hitting
//current game id for specific team: http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&date=05/13/2021&teamId=144, then: data.dates[0].games[0].gamePk


//Update playerTeam and playerId using the numbers below
//braves = 144
//dbacks = 109
//freddie freeman = 518692
//merrill kelly = 518876
//corbin carroll = 682998
    
let playerTeam = 109,
    playerId = 682998,
    playerName = 'Corbin Carroll',
    outputText = '',
    date = new Date(),
    month = `${date.getMonth() + 1}`.padStart(2, '0'),
    day = `${date.getDate()}`.padStart(2, '0'),
    today = new Date(),
    year = date.getFullYear(),
    fullDate = `${month}/${day}/${year}`,
    todaysPA = 0, todaysAB = 0, todaysH = 0, todaysK = 0, todaysBB = 0, todaysSB = 0, todays2B = 0, todays3B = 0, todaysHR = 0, todaysGO = 0, todaysFO = 0, todaysRBI = 0, todaysStB = 0, todaysR = 0, todaysIBB = 0, todaysHBP = 0, todaysSF = 0, todays1B = 0,
    playerButtons = document.querySelectorAll('.player-button'),
    teamGamesPlayed,
    multiplier,
    whichDay = '𝚃𝚘𝚍𝚊𝚢';

document.getElementById('yesterday-button').addEventListener('click', function() {
    outputText = '';
    // day = `${date.getDate()}`.padStart(2, '0'),
    // year = date.getFullYear(),
    // fullDate = `${month}/${day}/${year}`,
    whichDay = '𝚈𝚎𝚜𝚝𝚎𝚛𝚍𝚊𝚢';
    fetchStats(playerId);
    //TODO: 
});

const fetchStats = function(playerId) {
    //fetch number of team games played
    fetch(`https://statsapi.mlb.com/api/v1/teams/${playerTeam}/stats?stats=season&group=hitting`).then(function (response) {
        return response.json();
    }).then(function (data) {
        teamGamesPlayed = data.stats[0].splits[0].stat.gamesPlayed;
        multiplier = 162 / teamGamesPlayed;
        console.log(multiplier);
        console.log(teamGamesPlayed);
        return fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=season&year=${year}&group=hitting`);
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        //to get player's season stats for HR / SB rates
        console.log(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=season&year=${year}&group=hitting`);
        const seasonHR = data.stats[0].splits[0].stat.homeRuns;
        const seasonSB = data.stats[0].splits[0].stat.stolenBases;

        outputText += `𝚃𝚑𝚒𝚜 𝚜𝚎𝚊𝚜𝚘𝚗: `;
        outputText += ` ${seasonHR} HR / ${seasonSB} SB<br><br>`;

        outputText += `𝙿𝚊𝚌𝚎: `;
        outputText += ` ${Math.floor(seasonHR * multiplier)} HR / ${Math.floor(seasonSB * multiplier)} SB<br><br>`;

        return fetch(`https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&date=${fullDate}&teamId=${playerTeam}`);
    }).then(function (response) {//fetch id of current game
        return response.json();
    }).then(function (data) {
        const todaysGameId = data.dates[0].games[0].gamePk;
        console.log('todays game but really yesterdays')
        console.log(`https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&date=${fullDate}&teamId=${playerTeam}`);
        //fetch player's stats from current game
        return fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats/game/${todaysGameId}`);
    }).then(function (response) {
        return response.json();
    }).then(function (data) {

        //to get player's stats from current game
        console.log('game:');
         console.log(data.stats[0].splits[2].stat); // all stats for game

        if (data.stats[0].splits[2] !== undefined && data.stats[0].splits[2].stat.plateAppearances ) {
            console.log('undefined?');
            todaysAB = data.stats[0].splits[2].stat.atBats;
            todaysH = data.stats[0].splits[2].stat.hits;
            todaysPA = data.stats[0].splits[2].stat.plateAppearances;
            todaysK = data.stats[0].splits[2].stat.strikeOuts;
            todaysBB = data.stats[0].splits[2].stat.baseOnBalls;
            todaysSB = data.stats[0].splits[2].stat.sacBunts;
            todaysSF = data.stats[0].splits[2].stat.sacFlies;
            todaysStB = data.stats[0].splits[2].stat.stolenBases;
            todays2B = data.stats[0].splits[2].stat.doubles;
            todays3B = data.stats[0].splits[2].stat.triples;
            todaysHR = data.stats[0].splits[2].stat.homeRuns;
            todays1B = todaysH - todays2B - todays3B - todaysHR;
            todaysHBP = data.stats[0].splits[2].stat.hitByPitch;
            todaysIBB = data.stats[0].splits[2].stat.intentionalWalks;
            todaysRBI = data.stats[0].splits[2].stat.rbi;
            todaysR = data.stats[0].splits[2].stat.runs;
            todaysTB = data.stats[0].splits[2].stat.totalBases;
            // todaysGO = data.stats[0].splits[2].stat.groundOuts;
            // todaysFO = data.stats[0].splits[2].stat.flyOuts;
        } 

        const createOutputText = function() {
            outputText += `${whichDay}<br>${todaysH}-${todaysAB} (${todaysPA} PA)<br>`;
            //atBats, baseOnBalls, doubles, hitByPitch, hits, homeRuns, intentionalWalks, plateAppearances, rbi, runs, sacBunts, sacFlies, stolenBases, strikeOuts, totalBases, triples

            //todaysPA, 
            //todaysH, todaysAB
            //todaysHR, todays3B, todays2B, todaysRBI, todaysTB
            //todaysStB, todaysR, todaysBB, todaysIBB, todaysHBP, todaysK, todaysSB, todaysSF 

            const optionalStats = [
                todaysHR, todays3B, todays2B, todays1B, todaysRBI],
            optionalStatAliases = ['HR', '3B', '2B', '1B', 'RBI'];

            optionalStats.forEach(function (optionalStat, i) {
                if (optionalStat > 0) {
                    outputText += `${optionalStat} ${optionalStatAliases[i]}, `;
                }    
            });

            const optionalStats2 = [
                todaysStB, todaysR, todaysBB, todaysIBB, todaysHBP, todaysK, todaysSB, todaysSF
            ],
            optionalStatAliases2 = ['SB', 'R', 'BB', 'IBB', 'HBP', 'K', 'SH', 'SF'];

            optionalStats2.forEach(function (optionalStat, i) {
                if (optionalStat > 0) {
                    outputText += `${optionalStat} ${optionalStatAliases2[i]}, `;
                }
            });

            let last2 = outputText.slice(-2);

            if (last2.includes(',')) {
                outputText = outputText.substring(0, outputText.length-2);
            }
            document.getElementById('output').innerHTML = outputText;
        }

        createOutputText();
        //fetch player's season stats
        return fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=season&year=${year}&group=hitting`);
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        //to get player's season stats
        console.log('season:');
         console.log(data.stats[0].splits[0].stat) // all stats for season
        
        const seasonG = data.stats[0].splits[0].stat.gamesPlayed,
              seasonAB = data.stats[0].splits[0].stat.atBats,
              seasonH = data.stats[0].splits[0].stat.hits,
              seasonPA = data.stats[0].splits[0].stat.plateAppearances,
              seasonK = data.stats[0].splits[0].stat.strikeOuts,
              seasonBB = data.stats[0].splits[0].stat.baseOnBalls,
              seasonIBB = data.stats[0].splits[0].stat.intentionalWalks,
              seasonHBP = data.stats[0].splits[0].stat.hitByPitch,
              seasonStB = data.stats[0].splits[0].stat.stolenBases,
              seasonSB = data.stats[0].splits[0].stat.sacBunts,
              seasonSF = data.stats[0].splits[0].stat.sacFlies,
              season2B = data.stats[0].splits[0].stat.doubles,
              season3B = data.stats[0].splits[0].stat.triples,
              seasonHR = data.stats[0].splits[0].stat.homeRuns,
              seasonRBI = data.stats[0].splits[0].stat.rbi,
              seasonR = data.stats[0].splits[0].stat.runs,
              seasonTB = data.stats[0].splits[0].stat.tb,
              seasonAVG = data.stats[0].splits[0].stat.avg,
              seasonOBP = data.stats[0].splits[0].stat.obp,
              seasonSLG = data.stats[0].splits[0].stat.slg,
              seasonOPS = data.stats[0].splits[0].stat.ops;
              seasonBBP = (seasonBB / seasonPA * 100).toFixed(1);
              seasonKP = (seasonK / seasonPA * 100).toFixed(1);

              //atBats, baseOnBalls, doubles, hitByPitch, hits, homeRuns, intentionalWalks, plateAppearances, rbi, runs, sacBunts, sacFlies, stolenBases, strikeOuts, totalBases, triples
              //avg, babip, gamesPlayed, obp, ops, slg, stolenBasePercentage, 
        const addSeasonToOutputText = function() {
            let year = date.getFullYear();
            console.log(year);
            switch(year) {
                case 2023:
                    year = '𝟸𝟶𝟸𝟹';
                    break;
                case 2024:
                    year = '𝟸𝟶𝟸𝟺';
                    break;
                case 2025:
                    year = '𝟸𝟶𝟸𝟻';
                    break;
                case 2026:
                    year = '𝟸𝟶𝟸𝟼';
                    break;
                case 2027:
                    year = '𝟸𝟶𝟸𝟽';
                    break;
                case 2028:
                    year = '𝟸𝟶𝟸𝟾';
                    break;
                case 2029:
                    year = '𝟸𝟶𝟸𝟿';
                    break;
                case 2030:
                    year = '𝟸𝟶𝟹𝟶';
                    break;
                case 2031:
                    year = '𝟸𝟶𝟹𝟷';
                    break;
                case 2032:
                    year = '𝟸𝟶𝟹𝟸';
                    break;
                case 2033:
                    year = '𝟸𝟶𝟹𝟹';
                    break;
                case 2034:
                    year = '𝟸𝟶𝟹𝟺';
                    break;
                case 2035:
                    year = '𝟸𝟶𝟹𝟻';
                    break;
                default:
                    break;
            }
            outputText += `<br><br>${year}<br>`;
            outputText += `${seasonG} G, ${seasonPA} PA<br>${seasonH}-${seasonAB}`;

            //todaysHR, todays3B, todays2B, todaysRBI, todaysTB
            //todaysStB, todaysR, todaysBB, todaysIBB, todaysHBP, todaysK, todaysSB, todaysSF 

            const optionalStats = [seasonBBP, seasonKP],
                  optionalStatAliases = ['BB%', 'K%'];

                //atBats, baseOnBalls, doubles, hitByPitch, hits, homeRuns, intentionalWalks, plateAppearances, rbi, runs, sacBunts, sacFlies, stolenBases, strikeOuts, totalBases, triples
              //avg, babip, gamesPlayed, obp, ops, slg, stolenBasePercentage,
            optionalStats.forEach(function (optionalStat, i) {
                if (optionalStat > 0) {
                    outputText += `, ${optionalStat} ${optionalStatAliases[i]}`;
                }
            });

            // outputText += '<br>';

            // const optionalStats2 = [
            //     seasonStB, seasonR, seasonBB, seasonIBB, seasonHBP, seasonK, seasonSB, seasonSF
            // ],
            // optionalStatAliases2 = ['SB', 'R', 'BB', 'IBB', 'HBP', 'K', 'SH', 'SF'];

            // optionalStats2.forEach(function (optionalStat, i) {
            //     if (optionalStat > 0) {
            //         outputText += `${optionalStat} ${optionalStatAliases2[i]}, `;
            //     }
            // });

            let last2 = outputText.slice(-2);

            if (last2.includes(',')) {
                outputText = outputText.substring(0, outputText.length-2);
            }

            outputText += `<br>${seasonAVG} / ${seasonOBP} / ${seasonSLG}<br>${seasonOPS} OPS`;
            
            document.getElementById('output').innerHTML = outputText;
        }
        addSeasonToOutputText();

        //fetch player's career stats
        return fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=career&group=hitting`);

    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        //to get player's career stats
        console.log('career:');
         console.log(data.stats[0].splits[0].stat); // all stats for career
        const careerG = data.stats[0].splits[0].stat.gamesPlayed,
              careerAB = data.stats[0].splits[0].stat.atBats,
              careerH = data.stats[0].splits[0].stat.hits,
              careerHBP = data.stats[0].splits[0].stat.hitByPitch,
              careerPA = data.stats[0].splits[0].stat.plateAppearances,
              careerK = data.stats[0].splits[0].stat.strikeOuts,
              careerBB = data.stats[0].splits[0].stat.baseOnBalls,
              careerIBB = data.stats[0].splits[0].stat.intentionalWalks,
              careerSB = data.stats[0].splits[0].stat.sacBunts,
              careerSF = data.stats[0].splits[0].stat.sacFlies,
              career2B = data.stats[0].splits[0].stat.doubles,
              career3B = data.stats[0].splits[0].stat.triples,
              careerHR = data.stats[0].splits[0].stat.homeRuns,
              careerRBI = data.stats[0].splits[0].stat.rbi,
              careerR = data.stats[0].splits[0].stat.runs,
              careerStB = data.stats[0].splits[0].stat.stolenBases,
              careerTB = data.stats[0].splits[0].stat.totalBases,
              careerAVG = data.stats[0].splits[0].stat.avg,
              careerOBP = data.stats[0].splits[0].stat.obp,
              careerSLG = data.stats[0].splits[0].stat.slg,
              careerOPS = data.stats[0].splits[0].stat.ops;

              //atBats, baseOnBalls, doubles, hitByPitch, hits, homeRuns, intentionalWalks, plateAppearances, rbi, runs, sacBunts, sacFlies, stolenBases, strikeOuts, totalBases, triples
              //avg, babip, gamesPlayed, obp, ops, slg, stolenBasePercentage, 

        const addCareerToOutputText = function() {
            outputText += `<br><br>𝙲𝚊𝚛𝚎𝚎𝚛<br>`;
            outputText += `${careerG} G, ${careerPA} PA<br>`;

            const optionalStats = [careerHR, careerStB],
                optionalStatAliases = ['HR', 'SB'];

            optionalStats.forEach(function (optionalStat, i) {
                if (optionalStat > 0) {
                    outputText += `${optionalStat} ${optionalStatAliases[i]}, `;
                }
            });

            // outputText += '<br>';

            // const optionalStats2 = [
            //     careerStB, careerR, careerBB, careerIBB, careerHBP, careerK, careerSB, careerSF
            // ],
            // optionalStatAliases2 = ['SB', 'R', 'BB', 'IBB', 'HBP', 'K', 'SH', 'SF'];

            // optionalStats2.forEach(function (optionalStat, i) {
            //     if (optionalStat > 0) {
            //         outputText += `${optionalStat} ${optionalStatAliases2[i]}, `;
            //     }
            // });

            let last2 = outputText.slice(-2);

            if (last2.includes(',')) {
                outputText = outputText.substring(0, outputText.length-2);
            }

            outputText += `<br>${careerAVG} / ${careerOBP} / ${careerSLG} <br>${careerOPS} OPS`;
            outputText += '<br><br>🐍';

            document.getElementById('output').innerHTML = outputText;
        }
        addCareerToOutputText();

        const twitterText = `https://twitter.com/intent/tweet?text=${outputText}&hashtags=Dbacks`;//here
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