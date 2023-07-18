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
      score1 = document.querySelector('#score-1'),
      score2 = document.querySelector('#score-2'),
      score3 = document.querySelector('#score-3'),
      score4 = document.querySelector('#score-4'),
      score5 = document.querySelector('#score-5'),
      score6 = document.querySelector('#score-6'),
      score3OfAKind = document.querySelector('#score-3-kind'),
      score4OfAKind = document.querySelector('#score-4-kind'),
      scoreFullHouse = document.querySelector('#score-full-house'),
      scoreSmallStraight = document.querySelector('#score-sm-straight'),
      scoreLargeStraight = document.querySelector('#score-lg-straight'),
      scoreChance = document.querySelector('#score-chance'),
      scoreYahtzee = document.querySelector('#score-lg-yahtzee');

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

let results = [],
    turnNo = 1, //out of 13
    rollNo = 0; //out of 3

const rollDice = function() {
    holdRow.style.display = 'none';
    roll.disabled = true;

    rollNo++;

    if (rollNo == 2 || rollNo == 3) {
        rollNumber.textContent = rollNo;
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

    let baseCount = 8,
        countDelay = 100,
        die1Count = baseCount,
        die2Count = baseCount + 2,
        die3Count = baseCount + 4,
        die4Count = baseCount + 6,
        die5Count = baseCount + 8;

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
        setTimeout(function() {
            results[0] = Math.floor(Math.random() * (7 - 1)) + 1;
            document.querySelector('.die--one').textContent = results[0];
            die1Count--;
            if (0 < die1Count) {
                rollDie1();
            };
        }, countDelay);
    }

    function rollDie2() {
        setTimeout(function() {
            results[1] = Math.floor(Math.random() * (7 - 1)) + 1;
            document.querySelector('.die--two').textContent = results[1];
            die2Count--;
            if (0 < die2Count) {
                rollDie2();
            };
        }, countDelay);
    }

    function rollDie3() {
        setTimeout(function() {
            results[2] = Math.floor(Math.random() * (7 - 1)) + 1;
            document.querySelector('.die--three').textContent = results[2];
            die3Count--;
            if (0 < die3Count) {
                rollDie3();
            };
        }, countDelay);
    }

    function rollDie4() {
        setTimeout(function() {
            results[3] = Math.floor(Math.random() * (7 - 1)) + 1;
            document.querySelector('.die--four').textContent = results[3];
            die4Count--;
            if (0 < die4Count) {
                rollDie4();
            };
        }, countDelay);
    }

    function rollDie5() {
        setTimeout(function() {
            results[4] = Math.floor(Math.random() * (7 - 1)) + 1;
            document.querySelector('.die--five').textContent = results[4];
            die5Count--;
            if (0 < die5Count) {
                rollDie5();
            } else {
                if (rollNo < 3) {
                    holdRow.style.display = 'flex';
                }
            };
        }, countDelay);
    }

    
    // TODO: re-enable roll button after score is chosen
    roll.disabled = false;
}

roll.addEventListener('click', rollDice);


holds.forEach(function(hold) {
    hold.addEventListener('click', function() {
        document.querySelector(`.held--${hold.dataset.holdDie}`).classList.toggle('yes');
    });
});
