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
      held1 = document.querySelector('.held--1'),
      held2 = document.querySelector('.held--2'),
      held3 = document.querySelector('.held--3'),
      held4 = document.querySelector('.held--4'),
      held5 = document.querySelector('.held--5'),
      held6 = document.querySelector('.held--6');

let results = [],
    turn = 1, //out of 13
    rollNo = 1; //out of 3

const rollDice = function() {
    holdRow.style.display = 'none';

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
                holdRow.style.display = 'flex';
            };
        }, countDelay);
    }

    //disable rollDice button here. re-enable it after score is chosen
    
}

roll.addEventListener('click', rollDice);


holds.forEach(function(hold) {
    hold.addEventListener('click', function() {
        document.querySelector(`.held--${hold.dataset.holdDie}`).classList.toggle('yes');
    });
});
