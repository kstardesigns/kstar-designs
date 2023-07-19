const roll = document.querySelector('.roll'),
      dice = document.querySelectorAll('.die'),
      holdRow = document.querySelector('.hold-buttons'),
      holds = document.querySelectorAll('.hold'),
      hold1 = document.querySelector('.hold--1'),
      hold2 = document.querySelector('.hold--2'),
      hold3 = document.querySelector('.hold--3'),
      hold4 = document.querySelector('.hold--4'),
      hold5 = document.querySelector('.hold--5'),
      hold6 = document.querySelector('.hold--6'),
      helds = document.querySelectorAll('.held'),
      held1 = document.querySelector('.held--1'),
      held2 = document.querySelector('.held--2'),
      held3 = document.querySelector('.held--3'),
      held4 = document.querySelector('.held--4'),
      held5 = document.querySelector('.held--5'),
      held6 = document.querySelector('.held--6'),
      rollNumber = document.querySelector('#roll-no'),
      turnNumber = document.querySelector('#turn-no'),
      chooseMessage = document.querySelector('#choose-message'),
      currentScore = document.querySelector('#current-score'),
      chooseScoreButtons = document.querySelectorAll('.choose-score'),
      notChosenButtons = document.querySelectorAll('.choose-score:not(.already-chosen)');

let scoreCard = {
    ones: 0,
    twos: 0,
    threes: 0,
    fours: 0,
    fives: 0,
    sixes: 0,
    threeOfAKind: 0,
    fourOfAKind: 0,
    fullHouse: 0,
    smallStraight: 0,
    largeStraight: 0,
    chance: 0,
    yahtzee: 0
}

let possibleScores = {
    ones: 0,
    twos: 0,
    threes: 0,
    fours: 0,
    fives: 0,
    sixes: 0,
    threeOfAKind: 0,
    fourOfAKind: 0,
    fullHouse: 0,
    smallStraight: 0,
    largeStraight: 0,
    chance: 0,
    yahtzee: 0
}

let results = [],
    turnNo = 1, //out of 13
    rollNo = 0; //out of 3

const rollDice = function() {

    //if there's results from previous roll, change non-held results to 0
    if (results.length) {
        helds.forEach(function(held, i){
            if (!held.classList.contains('yes')) {
                results[i] = 0;
            }
        });
    }

    //hide hold buttons
    holdRow.style.display = 'none';
    roll.disabled = true;

    //increase roll number and do roll-related checks
    rollNo++;

    if (rollNo == 2 || rollNo == 3) {
        rollNumber.textContent = rollNo;
    }

    if (rollNo == 3) {
        chooseMessage.style.display = 'block';
        roll.style.display = 'none';
    } else {
        chooseMessage.style.display = 'none';
    }

    if (rollNo == 4) {
        helds.forEach(function(held){
            held.classList.remove('yes');
        });
        rollNo = 1;
        rollNumber.textContent = rollNo;
        turnNo++;
        turnNumber.textContent = turnNo;
    }

    //how many times to shuffle dice before showing actual result
    let baseCount = 8,
        countDelay = 100,
        die1Count = baseCount,
        die2Count = baseCount + 2,
        die3Count = baseCount + 4,
        die4Count = baseCount + 6,
        die5Count = baseCount + 8;

    //roll non-held dice
    if (!held1.classList.contains('yes')) {
        rollDie1();
    }
    if (!held2.classList.contains('yes')) {
        rollDie2();
    }
    if (!held3.classList.contains('yes')) {
        rollDie3();
    }
    if (!held4.classList.contains('yes')) {
        rollDie4();
    }
    if (!held5.classList.contains('yes')) {
        rollDie5();
    }

    function rollDie1() {
        chooseScoreButtons.forEach(function(button) {
            button.style.display = 'none';
        });

        setTimeout(function() {
            let tempResults = Math.floor(Math.random() * (7 - 1)) + 1;
            document.querySelector('.die--one').textContent = tempResults;
            die1Count--;

            if (0 < die1Count) {
                rollDie1();
            } else {
                results[0] = tempResults;
                console.log(`all 5 dice: ${results}`);
            }

            if (die1Count == 0 && !results.includes(0)) {
                showPossibleScores(results);
                roll.disabled = false;
            }
        }, countDelay); 
    }

    function rollDie2() {
        chooseScoreButtons.forEach(function(button) {
            button.style.display = 'none';
        });

        setTimeout(function() {
            let tempResults = Math.floor(Math.random() * (7 - 1)) + 1;
            document.querySelector('.die--two').textContent = tempResults;
            die2Count--;
            if (0 < die2Count) {
                rollDie2();
            } else {
                results[1] = tempResults;
                console.log(`all 5 dice: ${results}`);
            }

            if (die2Count == 0 && !results.includes(0)) {
                showPossibleScores(results);
                roll.disabled = false;
            }
        }, countDelay);
    }

    function rollDie3() {
        chooseScoreButtons.forEach(function(button) {
            button.style.display = 'none';
        });

        setTimeout(function() {
            let tempResults = Math.floor(Math.random() * (7 - 1)) + 1;
            document.querySelector('.die--three').textContent = tempResults;
            die3Count--;
            if (0 < die3Count) {
                rollDie3();
            } else {
                results[2] = tempResults;
                console.log(`all 5 dice: ${results}`);
            }

            if (die3Count == 0 && !results.includes(0)) {
                showPossibleScores(results);
                roll.disabled = false;
                
            }
        }, countDelay);
    }

    function rollDie4() {
        chooseScoreButtons.forEach(function(button) {
            button.style.display = 'none';
        });

        setTimeout(function() {
            let tempResults = Math.floor(Math.random() * (7 - 1)) + 1;
            document.querySelector('.die--four').textContent = tempResults;
            die4Count--;
            if (0 < die4Count) {
                rollDie4();
            } else {
                results[3] = tempResults;
                console.log(`all 5 dice: ${results}`);
            }

            if (die4Count == 0 && !results.includes(0)) {
                showPossibleScores(results);
                roll.disabled = false;
            }
        }, countDelay);
    }

    function rollDie5() {
        chooseScoreButtons.forEach(function(button) {
            button.style.display = 'none';
        });

        setTimeout(function() {
            let tempResults = Math.floor(Math.random() * (7 - 1)) + 1;
            document.querySelector('.die--five').textContent = tempResults;
            die5Count--;

            if (0 < die5Count) {
                rollDie5();
            } else {
                results[4] = tempResults;
                console.log(`all 5 dice: ${results}`);
            }

            if (die5Count == 0 && !results.includes(0)) {
                showPossibleScores(results);
                roll.disabled = false;
            }
        }, countDelay);
    }    
}

roll.addEventListener('click', rollDice);

const showPossibleScores = function(results) {
    chooseScoreButtons.forEach(function(button) {
        button.style.display = 'block';
    });

    //here ^ instead of chooseScoreButtons, it should be availableScoreButtons (add a class to buttons already picked)

    if (rollNo < 3) {
        holdRow.style.display = 'flex';
    }

    //get all of each number and add them together
    possibleScores.ones = results.filter(result => result == 1).reduce((partialSum, a) => partialSum + a, 0);
    possibleScores.twos = results.filter(result => result == 2).reduce((partialSum, a) => partialSum + a, 0);
    possibleScores.threes = results.filter(result => result == 3).reduce((partialSum, a) => partialSum + a, 0);
    possibleScores.fours = results.filter(result => result == 4).reduce((partialSum, a) => partialSum + a, 0);
    possibleScores.fives = results.filter(result => result == 5).reduce((partialSum, a) => partialSum + a, 0);
    possibleScores.sixes = results.filter(result => result == 6).reduce((partialSum, a) => partialSum + a, 0);

    //find duplicates for 3 of a kind, 4 of a kind, full house
    const findDuplicates = results => results.filter((item, index) => results.indexOf(item) !== index)
    const dupes = findDuplicates(results);
    const find3and4 = findDuplicates(dupes);

    //3 of a kind
    const is3OfAKind = find3and4.length > 0 ? true : false;
    possibleScores.threeOfAKind = is3OfAKind ? results.reduce((partialSum, a) => partialSum + a, 0) : 0;

    //4 of a kind
    const is4OfAKind = find3and4.length == 2 ? true : false;
    possibleScores.fourOfAKind = is4OfAKind ? results.reduce((partialSum, a) => partialSum + a, 0) : 0; //TODO

    //full house
    const isFullHouse = dupes.length == 3 && find3and4.length == 1 ? true : false; //NOT WORKING YET
    possibleScores.fullHouse = isFullHouse ? 25 : 0;

    //small straight
    const smStraight1 = [1, 2, 3, 4];
    const smStraight2 = [2, 3, 4, 5];
    const smStraight3 = [3, 4, 5, 6];
    const isSmStraight = smStraight1.every(i => results.includes(i)) || smStraight2.every(i => results.includes(i)) || smStraight3.every(i => results.includes(i));  
    possibleScores.smallStraight = isSmStraight ? 30 : 0;

    //large straight
    const lgStraight1 = [1, 2, 3, 4, 5];
    const lgStraight2 = [2, 3, 4, 5, 6];
    const isLgStraight = lgStraight1.every(i => results.includes(i)) || lgStraight2.every(i => results.includes(i));  
    possibleScores.largeStraight = isLgStraight ? 40 : 0;
    possibleScores.chance = results.reduce((partialSum, a) => partialSum + a, 0);

    const isYahtzee = results.every( (val, i, arr) => val === arr[0]);
    possibleScores.yahtzee = isYahtzee ? 50 : 0;


    //log current possible scores, display them in scorecard
    // console.log('scores:');
    for (const [key, value] of Object.entries(possibleScores)) {
        // console.log(`${key}: ${value}`);
        document.querySelector(`#score-${key}`).textContent = value;
    }
}

chooseScoreButtons.forEach(function(button) {
    button.addEventListener('click', function() {

        //hide hold buttons, other choose buttons, choose message
        holdRow.style.display = 'none';
        chooseMessage.style.display = 'none';
        chooseScoreButtons.forEach(function(button) {
            button.style.display = 'none';
        });

        //update score with chosen score, display it
        const chosenScore = button.getAttribute('id').split('-').pop();
        scoreCard[chosenScore] = possibleScores[chosenScore];
        button.classList.add('already-chosen');
        button.disabled = true;
        document.querySelector(`#final-score-${chosenScore}`).textContent = scoreCard[chosenScore];

        //update current total score
        const currScore = Object.values(scoreCard).reduce((a, b) => a + b, 0);
        currentScore.textContent = currScore;

        //ending turn early if they didn't use all 3 rolls
        rollNo = 3;

        //empty current dice results
        results = []

        //don't show roll after last turn
        if (turnNo < 13) {
            roll.style.display = 'block';
        } else {
            roll.style.display = 'none';
        }
    });
});


holds.forEach(function(hold) {
    hold.addEventListener('click', function() {
        document.querySelector(`.held--${hold.dataset.holdDie}`).classList.toggle('yes');
    });
});

//todo:
//- cache all values every time results array updates and scoreCard
//- joker calculations and scoring
//- top and bottom bonus calculations
//- yahtzee animation across the letters like the video: https://www.youtube.com/watch?v=U5G88KPJ6iY&ab_channel=UKKRAUTGAMING
//- in modal: same scoring rules as on back of electronic game like in youtube link above (~6 mins)
//- optional sound? rip it from youtube video (8 mins)

//bugs:
// incrementing turn and roll numbers may display incorrectly