const roll = document.querySelector('.roll'),
      dice = document.querySelectorAll('.die'),
      holdRow = document.querySelector('.hold-buttons'),
      holds = document.querySelectorAll('.hold'),
      hold1 = document.querySelector('.hold--1'),
      hold2 = document.querySelector('.hold--2'),
      hold3 = document.querySelector('.hold--3'),
      hold4 = document.querySelector('.hold--4'),
      hold5 = document.querySelector('.hold--5'),
      helds = document.querySelectorAll('.held'),
      held1 = document.querySelector('.held--1'),
      held2 = document.querySelector('.held--2'),
      held3 = document.querySelector('.held--3'),
      held4 = document.querySelector('.held--4'),
      held5 = document.querySelector('.held--5'),
      rollNumber = document.querySelector('#roll-no'),
      turnNumber = document.querySelector('#turn-no'),
      chooseMessage = document.querySelector('#choose-message'),
      currentScore = document.querySelector('#current-score'),
      chooseScoreButtons = document.querySelectorAll('.choose-score'),
      highScoreText = document.querySelector('#high-score');

const cookieLength = 365,
      cookieLengthYear = 365;

//tracks current score for each category
let scoreCard = {
    ones: null,
    twos: null,
    threes: null,
    fours: null,
    fives: null,
    sixes: null,
    threeOfAKind: null,
    fourOfAKind: null,
    fullHouse: null,
    smallStraight: null,
    largeStraight: null,
    chance: null,
    yahtzee: null,
    yahtzeeBonus: null
}

//to show possible scores to choose after each roll
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

//set these to true when chosen
let scorePicked = {
    ones: 'false',
    twos: 'false',
    threes: 'false',
    fours: 'false',
    fives: 'false',
    sixes: 'false',
    threeOfAKind: 'false',
    fourOfAKind: 'false',
    fullHouse: 'false',
    smallStraight: 'false',
    largeStraight: 'false',
    chance: 'false',
    yahtzee: 'false',
    yahtzeeBonus: 'false'
}


//track dice, turn number, roll number, current score
let results = [],
    diceHeld = ['false', 'false', 'false', 'false', 'false'],
    turnNo = 1, //out of 13
    rollNo = 0, //out of 3
    currScore = 0,
    topScore = 0,
    topBonus = false,
    yahtzeeBonus = 0,
    highScore = 0,
    bonusMessage = 'bonus!',
    newHighMessage = 'new!';

//reload current game from cookies
window.addEventListener('DOMContentLoaded', (event) => {
    resetScoreboard();
});

const rollDice = () => {

    //remove lower opacity style from first roll
    document.querySelector('.dice').classList.remove('first-roll');

    //if there's results from previous roll, change non-held results to 0
    if (results.length) {
        helds.forEach((held, i) => {
            if (!held.classList.contains('yes')) {
                results[i] = 0;
            }
        });
    }

    //disable hold & roll buttons
    holdRow.classList = 'hold-buttons disabled';
    holds.forEach((hold) => {
        hold.querySelector('.hold-button').disabled = true;
    });
    roll.disabled = true;

    //increase roll number and do roll-related checks
    rollNo++;

    if (rollNo == 2 || rollNo == 3) {
        rollNumber.textContent = rollNo;
        document.querySelector('.roll-no').classList.remove('hidden');
        document.querySelector('.next-turn').classList.add('hidden');
    }

    if (rollNo == 3) {
        chooseMessage.style.display = 'block';
        roll.style.display = 'none';
    } else {
        chooseMessage.style.display = 'none';
    }

    if (rollNo == 4) {
        helds.forEach((held, i) =>{
            held.classList.remove('yes');
            diceHeld[i] = 'false';
            setCookie(`held${i+1}`, diceHeld[i], cookieLength);
        });
        rollNo = 1;
        rollNumber.textContent = rollNo;
        document.querySelector('.roll-no').classList.remove('hidden');
        document.querySelector('.next-turn').classList.add('hidden');
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
        chooseScoreButtons.forEach((button) => {
            button.style.display = 'none';
        });

        setTimeout(() => {
            let tempResults = Math.floor(Math.random() * (7 - 1)) + 1;
            document.querySelector('.die--one').classList = `die die--one r${tempResults}`;
            die1Count--;

            if (0 < die1Count) {
                rollDie1();
            } else {
                results[0] = tempResults;
                // console.log(`all 5 dice: ${results}`);
            }

            if (die1Count == 0 && results.length == 5 && !results.includes(0)) {
                showPossibleScores(results);
                roll.disabled = false;
            }
        }, countDelay); 
    }

    function rollDie2() {
        chooseScoreButtons.forEach((button) => {
            button.style.display = 'none';
        });

        setTimeout(() => {
            let tempResults = Math.floor(Math.random() * (7 - 1)) + 1;
            document.querySelector('.die--two').classList = `die die--two r${tempResults}`;

            die2Count--;
            if (0 < die2Count) {
                rollDie2();
            } else {
                results[1] = tempResults;
                // console.log(`all 5 dice: ${results}`);
            }

            if (die2Count == 0 && results.length == 5 && !results.includes(0)) {
                showPossibleScores(results);
                roll.disabled = false;
            }
        }, countDelay);
    }

    function rollDie3() {
        chooseScoreButtons.forEach((button) => {
            button.style.display = 'none';
        });

        setTimeout(() => {
            let tempResults = Math.floor(Math.random() * (7 - 1)) + 1;
            document.querySelector('.die--three').classList = `die die--three r${tempResults}`;

            die3Count--;
            if (0 < die3Count) {
                rollDie3();
            } else {
                results[2] = tempResults;
                // console.log(`all 5 dice: ${results}`);
            }

            if (die3Count == 0 && results.length == 5 && !results.includes(0)) {
                showPossibleScores(results);
                roll.disabled = false;
            }
        }, countDelay);
    }

    function rollDie4() {
        chooseScoreButtons.forEach((button) => {
            button.style.display = 'none';
        });

        setTimeout(() => {
            let tempResults = Math.floor(Math.random() * (7 - 1)) + 1;
            document.querySelector('.die--four').classList = `die die--four r${tempResults}`;

            die4Count--;
            if (0 < die4Count) {
                rollDie4();
            } else {
                results[3] = tempResults;
                // console.log(`all 5 dice: ${results}`);
            }

            if (die4Count == 0 && results.length == 5 && !results.includes(0)) {
                showPossibleScores(results);
                roll.disabled = false;
            }
        }, countDelay);
    }

    function rollDie5() {
        chooseScoreButtons.forEach((button) => {
            button.style.display = 'none';
        });

        setTimeout(() => {
            let tempResults = Math.floor(Math.random() * (7 - 1)) + 1;
            document.querySelector('.die--five').classList = `die die--five r${tempResults}`;

            die5Count--;

            if (0 < die5Count) {
                rollDie5();
            } else {
                results[4] = tempResults;
                // console.log(`all 5 dice: ${results}`);
            }

            if (die5Count == 0 && results.length == 5 && !results.includes(0)) {
                showPossibleScores(results);
                roll.disabled = false;
            }
        }, countDelay);
    }    
}

roll.addEventListener('click', rollDice);

const showPossibleScores = (results) => {
    chooseScoreButtons.forEach((button) => {
        button.style.display = 'block';
    });

    if (rollNo < 3) {
        holdRow.classList = 'hold-buttons enabled';
        holds.forEach((hold) => {
            hold.querySelector('.hold-button').disabled = false;
        });
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
    const is4OfAKind = (find3and4.length == 2 || find3and4.length == 3) ? true : false;
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

    //yahtzee
    const isYahtzee = results.every( (val, i, arr) => val === arr[0]);
    possibleScores.yahtzee = isYahtzee ? 50 : 0;

    //show yahtzee animation
    if (isYahtzee) {
        document.querySelector('.yahtzee-logo-header').classList.add('active');
    }

    //if they roll another yahtzee when they already have at least one
    if (isYahtzee && scoreCard.yahtzee == 50) {
        calcBonusYahtzeeScore();
    }

    //log current possible scores, display them in scorecard
    for (const [key, value] of Object.entries(possibleScores)) {
        document.querySelector(`#score-${key}`).textContent = value;
    }

    //set cookies:
    updateCookies();
}

//choosing a score category
chooseScoreButtons.forEach((button) => {
    button.addEventListener('click', () => {

        //stop yahtzee animation & hide joker text
        document.querySelector('.yahtzee-logo-header').classList.remove('active');
        document.querySelector('#joker-text').style.display = 'none';

        //hide hold buttons, other choose buttons, choose message
        holdRow.classList = 'hold-buttons disabled';
        holds.forEach((hold) => {
            hold.querySelector('.hold-button').disabled = true;
        });
        chooseMessage.style.display = 'none';
        chooseScoreButtons.forEach((button) => {
            button.style.display = 'none';
        });
        
        document.querySelector('.roll-no').classList.add('hidden');
        document.querySelector('.next-turn').classList.remove('hidden');


        //update score with chosen score, display it
        const chosenScore = button.getAttribute('id').split('-').pop();
        scoreCard[chosenScore] = possibleScores[chosenScore].toString();
        scorePicked[chosenScore] = 'true';
        button.classList.add('already-chosen');
        button.disabled = true;
        document.querySelector(`#final-score-${chosenScore}`).textContent = scoreCard[chosenScore];
        
        //check for top bonus
        updateTopScore();

        //update current total score
        updateCurrentScore();

        //ending turn early if they didn't use all 3 rolls
        rollNo = 3;

        updateCookies();

        //empty current dice results
        results = [];


        //don't show roll after last turn
        if (turnNo < 13) {
            roll.style.display = 'block';
        } else {
            roll.style.display = 'none';
            endGame();
        }
    });
});


holds.forEach((hold) => {
    hold.addEventListener('click', () => {
        if (holdRow.classList.contains('enabled')) {
            //add hold class
            let heldDie = hold.dataset.holdDie;
            document.querySelector(`.held--${heldDie}`).classList.toggle('yes');

            //store held dice and save them to a cookie
            if (document.querySelector(`.held--${heldDie}`).classList.contains('yes')) {
                diceHeld[(heldDie-1)] = 'true';
            } else {
                diceHeld[(heldDie-1)] = 'false';
            }
            setCookie(`held${heldDie}`, diceHeld[(heldDie-1)], cookieLength);

            //check if all dice are held
            const firstDieHeld = diceHeld[0] == 'true';
            const allEqual = diceHeld => diceHeld.every(val => val === diceHeld[0]);

            if (firstDieHeld && allEqual(diceHeld)) {
                console.log('all dice are held');
                chooseMessage.style.display = 'block';
                roll.style.display = 'none';
            } else {
                console.log('at least 1 die isnt held');
                chooseMessage.style.display = 'none';
                roll.style.display = 'block';
            }
        }
    });
});

const setCookie = (cookieName, value, days) => {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = cookieName + '=' + (value || '')  + expires + '; path=/';
}

const updateCookies = () => {
    setCookie('turnNumber', turnNo, cookieLength);
    setCookie('rollNumber', rollNo, cookieLength);
    setCookie('currentRollResults', results, cookieLength);
    console.log('current roll just set to cookies:');
    console.log(getCookie('currentRollResults'));
    //todo: get cookie on reload, save held results? 

    for (const [key, value] of Object.entries(scorePicked)) {
        setCookie(`picked${key}`, `${value}`, cookieLength);
    }

    for (const [key, value] of Object.entries(scoreCard)) {
        if (scorePicked[key] == 'true') {
            setCookie(`${key}`, `${value}`, cookieLength);
            console.log(`cookie ${key} updated and its value is ${value}`);
        }
    }
}

const resetScoreboard = () => {
    //get and update high score
    if (getCookie('highScore') !== null) {
        highScore = getCookie('highScore');
        highScoreText.textContent = highScore;
        console.log(`highscore from cookie: ${highScore}`);
    } else {
        highScoreText.textContent = highScore;
        setCookie('highScore', '0', cookieLengthYear);
        console.log(`highscore NOT from cookie: ${highScore}`);
    }

    //get and update turn number
    if (getCookie('turnNumber') !== null) {
        turnNo = getCookie('turnNumber');
        turnNumber.textContent = turnNo;
    } else {
        turnNumber.textContent = turnNo;
    }

    //get and update roll number
    if (getCookie('rollNumber') !== null) {
        rollNo = getCookie('rollNumber');
        rollNumber.textContent = rollNo;
        document.querySelector('.roll-no').classList.remove('hidden');
        document.querySelector('.next-turn').classList.add('hidden');
    } else {
        rollNumber.textContent = 1;
    }

    //get and update each die's held status
    for (let i = 1; i <= diceHeld.length; i++) { 
        if (getCookie(`held${i}`)) {
            diceHeld[(i-1)] = getCookie(`held${i}`);
            
            if (getCookie(`held${i}`) == 'true') {
                document.querySelector(`.held--${i}`).classList.add('yes');
            } else {
                document.querySelector(`.held--${i}`).classList.remove('yes');
            }
        }
    }

    let categoriesFilled = 0;

    //update which scores have been kept
    for (const key in scorePicked) {
        if (getCookie(`picked${key}`) == 'true') {
            scoreCard[key] = getCookie(key);
            scorePicked[key] = 'true';
            document.querySelector(`#final-score-${key}`).textContent = scoreCard[key];
            document.querySelector(`#score-${key}`).classList.add('already-chosen');
            categoriesFilled++;
        } else {
            
        }
    }

    //update checkmarks from yahtzee bonuses
    if (getCookie('yahtzeeBonus') !== null) {
        yahtzeeBonus = (getCookie('yahtzeeBonus') / 100);
        for (let i = 0; i < yahtzeeBonus; i++ ) {
            document.querySelector('#yahtzee-bonus').textContent += '✓';
            document.querySelector('#yz-dialog-yahtzees').textContent += '✓';
        }
    }

    //check if category was chosen for a turn but the turnNo hadn't incremented yet
    // if (rollNo == 3 && turnNo == categoriesFilled) {
    //     turnNo++;
    //     turnNumber.textContent = turnNo;
    // }

    //if at least 1 roll has been done, get it from cookies and display it.
    if (getCookie('currentRollResults') !== null) {
        resultsStrings = getCookie('currentRollResults').split(','); 
        results = resultsStrings.map(Number);
        console.log('currentRollResults');
        console.log(results);

        dice.forEach((die) => {
            die.classList.remove('r1', 'r2', 'r3', 'r4', 'r5', 'r6');
        });

        document.querySelector('.die--one').classList.add(`r${results[0]}`);
        document.querySelector('.die--two').classList.add(`r${results[1]}`);
        document.querySelector('.die--three').classList.add(`r${results[2]}`);
        document.querySelector('.die--four').classList.add(`r${results[3]}`);
        document.querySelector('.die--five').classList.add(`r${results[4]}`);

        //check if at least 1 roll was made this turn and a score was not yet chosen
        if (rollNo > 0 && turnNo != categoriesFilled) {
            showPossibleScores(results);

            if (rollNo == 3) {
                chooseMessage.style.display = 'block';
                roll.style.display = 'none';
            }
        }

        //if category score was chosen and next turn hasn't been started 
        if (turnNo == categoriesFilled) {
            chooseMessage.style.display = 'none';
            roll.style.display = 'block';
            document.querySelector('.roll-no').classList.add('hidden');
            document.querySelector('.next-turn').classList.remove('hidden');
        }
    } else {
        document.querySelector('.die--one').classList.add('r1');
        document.querySelector('.die--two').classList.add('r2');
        document.querySelector('.die--three').classList.add('r3');
        document.querySelector('.die--four').classList.add('r4');
        document.querySelector('.die--five').classList.add('r5');
    }

    updateTopScore();
    updateCurrentScore();
    
    // console.log('scoreCard:'); 
    // console.log(scoreCard); 
}

const updateTopScore = () => {
    topScore = Number(scoreCard['ones'])
             + Number(scoreCard['twos'])
             + Number(scoreCard['threes'])
             + Number(scoreCard['fours']) 
             + Number(scoreCard['fives']) 
             + Number(scoreCard['sixes']);
    
    if (topScore >= 63) {
        document.querySelector('#top-bonus').textContent = bonusMessage;
        document.querySelector('#top-bonus-final').textContent = bonusMessage;
        topBonus = true;
        topScore += 35;
    }

    document.querySelector('#current-top').textContent = topScore;
    return topScore;
}

const updateCurrentScore = () => {
    currScore = Object.values(scoreCard).reduce((a, b) => Number(a) + Number(b), 0);
    if (topBonus) {
        currScore = currScore + 35;
    }
    currentScore.textContent = currScore;
}

const calcBonusYahtzeeScore = () => {
    yahtzeeBonus++;
    document.querySelector('#yahtzee-bonus').textContent += '✓';
    document.querySelector('#yz-dialog-yahtzees').textContent += '✓';
    scoreCard.yahtzeeBonus = 100 * yahtzeeBonus;
    scorePicked.yahtzeeBonus = 'true';
    updateCurrentScore();
    updateCookies();

    //joker scoring which allows for a bonus yahtzee to count as other categories
    document.querySelector('#joker-text').style.display = 'block';
    roll.style.display = 'none';
    chooseMessage.style.display = 'block';
    holdRow.classList = 'hold-buttons disabled';
    holds.forEach((hold) => {
        hold.querySelector('.hold-button').disabled = true;
    });
    possibleScores.fullHouse = 25;
    possibleScores.smallStraight = 30;
    possibleScores.largeStraight = 40;
    document.querySelector('#score-fullHouse').textContent = possibleScores.fullHouse;
    document.querySelector('#score-smallStraight').textContent = possibleScores.smallStraight;
    document.querySelector('#score-largeStraight').textContent = possibleScores.largeStraight;
}

const endGame = () => {
    //show final score & high score
    document.querySelector('#yz-dialog-final-score').textContent = currScore;
    document.querySelector('#yz-dialog-subtotal-score').textContent = topScore;

    //check for new high score
    if (currScore > highScore) {
        highScore = currScore;
        document.querySelector('#yz-new-high').textContent = newHighMessage;
        highScoreText.textContent = highScore;
    }
    document.querySelector('#yz-dialog-high-score').textContent = highScore;

    console.log(`highScore was saved in cookies as ${highScore}`);

    setCookie('highScore', highScore, cookieLengthYear);

    //add 1st yahtzee as a checkmark
    if (scoreCard.yahtzee == '50') {
        document.querySelector('#yz-dialog-yahtzees').textContent += '✓';
    } else {
        document.querySelector('#yz-dialog-yahtzees').textContent += '0';
    }

    updateCookies();
    
    //show scores modal
    openDialog('yz-scores');
}

const getCookie = (cookieName) => {
    var nameEQ = cookieName + '=';
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

const eraseCookie = (cookieName) => {   
    document.cookie = cookieName +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//TESTING
const testYahtzee = () => {
    rollDice();

    setTimeout(() => {
        fakeResults = [5, 5, 5, 5, 5];
        document.querySelector('.die--one').textContent = 5;
        document.querySelector('.die--two').textContent = 5;
        document.querySelector('.die--three').textContent = 5;
        document.querySelector('.die--four').textContent = 5;
        document.querySelector('.die--five').textContent = 5;
        showPossibleScores(fakeResults);
        if (scoreCard.yahtzeeBonus == 50) {
            calcBonusYahtzeeScore();
            updateCurrentScore();
            updateCookies();
        }
    }, 3000);
}

const testBonus = () => {
    document.querySelector('#top-bonus').textContent = bonusMessage;
    document.querySelector('#top-bonus-final').textContent = bonusMessage;
    topBonus = true;
}

const newGame = () => {
    var cookies = document.cookie.split(";");
    console.log(cookies);
    for (var i = 0; i < cookies.length; i++) {

        let cookieToDelete = cookies[i].split("=")[0];
        
        if (!cookieToDelete.includes('highScore')) {
            console.log('cookie to delete: ' + cookieToDelete);
            eraseCookie(cookieToDelete);
        } else {
            console.log('HIGH SCORE NOT DELETED');
        }
    }
    location.reload();
    document.querySelector('.dice').classList.add('first-roll');

}

//modal
//Credit:
//Modified version of accessible dialog by Ire Aderinokun:
//https://raw.githubusercontent.com/ireade/accessible-modal-dialog/gh-pages/Dialog.js

function Dialog(dialogEl) {
	this.dialogEl = document.querySelector(`#${dialogEl}`);
	this.focusedElBeforeOpen;

	var focusableEls = this.dialogEl.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
	this.focusableEls = Array.prototype.slice.call(focusableEls);

	this.firstFocusableEl = this.focusableEls[0];
	this.lastFocusableEl = this.focusableEls[ this.focusableEls.length - 1 ];

	this.close();
}

Dialog.prototype.open = function(dialogId) {
	var Dialog = this,
        dialogOverlay, 
        openDialogs = document.querySelectorAll('.yz-dialog[aria-hidden="false"]');

    this.dialogEl = dialogId ? document.querySelector(`#${dialogId}`) : this.dialogEl;
	this.focusedElBeforeOpen = document.activeElement;

    //check for data attributes
    if (this.dialogEl.hasAttribute('data-yz-dialog-top')) {
        var topAmt = this.dialogEl.getAttribute('data-yz-dialog-top');
        this.dialogEl.style.top = topAmt + 'px';
    }

    //prevent page scrolling
    document.body.classList.add('yz-dialog-fixed-page');

    //create the background div that covers the rest of the content, append the dialog to it
    if (document.getElementsByClassName('yz-dialog-overlay').length == 0) {
        dialogOverlay = document.createElement('div');
        dialogOverlay.classList.add('yz-dialog-overlay');
        document.body.appendChild(dialogOverlay);
    } else {
        dialogOverlay = document.querySelector('.yz-dialog-overlay');
        dialogOverlay.style.display = '';
    }

    //different styles for full mobile variation
    if (this.dialogEl.classList.contains('yz-dialog--mobile-full')) {
        dialogOverlay.classList.add('yz-dialog-overlay--mobile-full');
    } else {
        dialogOverlay.classList.remove('yz-dialog-overlay--mobile-full');
    }

    //close other open dialogs
    for (var i = 0; i < openDialogs.length; i++) {
        openDialogs[i].setAttribute('aria-hidden', true);
    }

    //show dialog
    dialogOverlay.appendChild(this.dialogEl);
    this.dialogEl.setAttribute('aria-hidden', false);
    dialogOverlay.setAttribute('aria-hidden', false);
    dialogOverlay.scrollTop = 0;

	this.dialogEl.addEventListener('keydown', function(e) {
		Dialog._handleKeyDown(e);
	});

	dialogOverlay.addEventListener('click', function(event) {
        if (dialogOverlay !== event.target) return;
		Dialog.close();
	});

	if (this.firstFocusableEl) {
        this.firstFocusableEl.focus();
    }
};

Dialog.prototype.close = function(dialogId) {
    var dialogOverlay = document.getElementsByClassName('yz-dialog-overlay')[0];

    document.body.classList.remove('yz-dialog-fixed-page');

    if (dialogId) {
        if (document.querySelector(`#${dialogId}`).getAttribute('aria-hidden') === 'false') {
            document.querySelector(`#${dialogId}`).setAttribute('aria-hidden', true);
        } else {
            return;
        }
    } else {
        this.dialogEl.setAttribute('aria-hidden', true);
    }

    if (dialogOverlay) {
        dialogOverlay.setAttribute('aria-hidden', true);
    }

	if (this.focusedElBeforeOpen) {
		this.focusedElBeforeOpen.focus();
	}
};

Dialog.prototype._handleKeyDown = function(e) {
	var Dialog = this;
	var KEY_TAB = 9;
	var KEY_ESC = 27;

	function handleBackwardTab() {
		if (document.activeElement === Dialog.firstFocusableEl) {
			e.preventDefault();
			Dialog.lastFocusableEl.focus();
		}
	}
	function handleForwardTab() {
		if (document.activeElement === Dialog.lastFocusableEl) {
			e.preventDefault();
			Dialog.firstFocusableEl.focus();
		}
	}

	switch(e.keyCode) {
	case KEY_TAB:
		if (Dialog.focusableEls.length === 1) {
			e.preventDefault();
			break;
		} 
		if (e.shiftKey) {
			handleBackwardTab();
		} else {
			handleForwardTab();
		}
		break;
	case KEY_ESC:
		Dialog.close();
		break;
	default:
		break;
	}
};

Dialog.prototype.addEventListeners = function(openDialogSel, closeDialogSel) {
	var Dialog = this,
        openDialogEl = document.querySelector(`[data-dialog-trigger="${openDialogSel}"]`),
        closeDialogEls = document.querySelectorAll(`${closeDialogSel}`);

    openDialogEl.addEventListener('click', function(e) { 
        Dialog.open();
    });

	for (var i = 0; i < closeDialogEls.length; i++) {
		closeDialogEls[i].addEventListener('click', function() {
            Dialog.close();
		});
	}
};

var openDialog = function(dialogId) {
    Dialog.prototype.open(dialogId);
}

var closeDialog = function(dialogId) {
    Dialog.prototype.close(dialogId);
}

var dialogs = document.getElementsByClassName('yz-dialog');

window.addEventListener('DOMContentLoaded', () => {
    for (var i = 0; i < dialogs.length; i++) {
        var myDialog = new Dialog(dialogs[i].id);
        myDialog.addEventListeners(dialogs[i].id, '.yz-dialog-close');
    }
});