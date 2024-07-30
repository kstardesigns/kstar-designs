//define deck of cards
let cards = ['♠A','♠2','♠3','♠4','♠5','♠6','♠7','♠8','♠9','♠10','♠J','♠Q','♠K',
            '♦A','♦2','♦3','♦4','♦5','♦6','♦7','♦8','♦9','♦10','♦J','♦Q','♦K',
            '♣A','♣2','♣3','♣4','♣5','♣6','♣7','♣8','♣9','♣10','♣J','♣Q','♣K',
            '♥A','♥2','♥3','♥4','♥5','♥6','♥7','♥8','♥9','♥10','♥J','♥Q','♥K'];

//define leftovers list which starts with X wildcards
let extraCards = ['wc', 'wc', 'wc'];

let currentHand = 1;

//store hands
let hands = {
	hand1: [],
	hand2: [],
	hand3: [],
	hand4: [],
	hand5: [],
	hand6: [],
	hand7: [],
	hand8: [],
	hand9: [],
	hand10: [],
}

//store scores
let handScores = {
	hand1: 0,
	hand2: 0,
	hand3: 0,
	hand4: 0,
	hand5: 0,
	hand6: 0,
	hand7: 0,
	hand8: 0,
	hand9: 0,
	hand10: 0
}

//store hand names
let handNames = {
	hand1: '',
	hand2: '',
	hand3: '',
	hand4: '',
	hand5: '',
	hand6: '',
	hand7: '',
	hand8: '',
	hand9: '',
	hand10: ''
}

const baseValues = {
	'high card': 5,
	'pair': 10,
	'2 pair': 20,
	'3 of a kind': 30,
	'straight': 40,
	'flush': 50,
	'full house': 60,
	'4 of a kind': 80,
	'straight flush': 100,
	'royal flush': 100
}

const deal = () => {
	//loop through deck of cards 10 times, getting 5 random remaining cards for each hand
	for (let handNo = 1; handNo <= 10; handNo++) {
		hands[`hand${handNo}`] = [];
		for (let card = 0; card < 5; card++) {
			const randomCard = Math.floor(Math.random() * cards.length);
			hands[`hand${handNo}`].push(cards[randomCard]);
			cards.splice(randomCard, 1);
		}
	}
	
	//move leftover 2 cards to the extra cards list
	extraCards.unshift(cards[1]);
	cards.splice(1, 1);
	extraCards.unshift(cards[0]);
	cards.splice(0, 1);
	
	// console.log(hands);
	// console.log(extraCards);
	
	//TODO: show full deck on right before 1st deal
	//TODO: function to separate deck into 10 piles, slide them down next to each row
	//TODO: function to slide all piles to the left, into 5 cards in a row
	
	
	//show 1st hand
	createCards(hands["hand1"]);
	calcHandScore(currentHand);
	// confirmHand();
}

const createCards = (array) => {
	const cardGroup = document.createElement('ul');
	cardGroup.classList.add('hand');
	cardGroup.dataset.hand = currentHand;
	
	array.forEach((cardToCreate) => {
		const cardLi = document.createElement('li'),
					cardSuit = cardToCreate[0],
					cardNo = cardToCreate.substring(1, cardToCreate.length);
		
		if (cardToCreate != 'wc') {
			cardLi.innerHTML = `<span class="card-first-no">${cardNo}</span>
													<span class="card-suit">${cardSuit}</span>
													<span class="card-second-no">${cardNo}</span>`;
			cardLi.classList.add('card');
			cardLi.setAttribute('data-number', `${cardNo}`);

			switch(cardSuit) {
				case '♠':
					cardLi.classList.add('spade');
					cardLi.setAttribute('data-suit', 'spade');
					break;
				case '♦':
					cardLi.classList.add('diamond');
					cardLi.setAttribute('data-suit', 'diamond');
					break;
				case '♣':
					cardLi.classList.add('club');
					cardLi.setAttribute('data-suit', 'club');
					break;
				case '♥':
					cardLi.classList.add('heart');
					cardLi.setAttribute('data-suit', 'heart');
					break;
			}
			cardGroup.append(cardLi);
		} else { //is wild card
			//TODO: create/style wild card
		}
		
		//TODO: animation to shrink cards to 0 width so it looks like they're flipping (?), before they're revealed
		document.querySelector('.card-area').append(cardGroup);
		//TODO: append a "confirm hand" button (checkmark?) that will score current hand after row
	});
	
	const handConfirm = document.createElement('div');
	handConfirm.classList.add('hand-confirm-wrap');
	// handConfirm.innerHTML = `<button type="button" class="hand-confirm" onclick="confirmHand()">Play hand</button>`;
	document.querySelector(`.hand[data-hand="${currentHand}"]`).append(handConfirm);
	
}

const confirmHand = () => {
	if (currentHand < 10) {
		currentHand++;
		console.log(`current hand: ${currentHand}`);
		createCards(hands[`hand${currentHand}`]);
	} else {
		//TODO: disable or hide confirm & score button
	}

	calcHandScore(currentHand);
}

const moveInHand = () => {
	//TODO: click & drag card left and right [find codepens on how to do this]
	//check if dragged card left point is below previous card's right point
		//show card silhouette where card will be (shift other cards to new place)
		//if click released, move card there (and officially move other cards)
	//check if dragged card right point is higher than next card's left point
		//show card silhouette where card will be (shift other cards to new place)
		//if click released, move card there (and officially move other cards)
}

const moveToPrevHand = () => {
	//TODO: click & drag card to previous hand (row above)
	//if hand > 1
		//check if dragged card top point is above previous hand's bottom point
		//show card silhouette in place of previous
		//if click released, move card there
		//calcHandScore for previous hand
}

const calcHandScore = (scoredHand) => {
	//see what's in each hand
	const suits = hands[`hand${scoredHand}`].map(item => { return item[0] });
	const ranks = hands[`hand${scoredHand}`].map(item => { return item.substring(1, item.length) });
	const uniqueSuits = new Set(suits).size;
	const uniqueRanks = new Set(ranks).size;
	const straights = [['A', '2', '3', '4', '5'], ['2', '3', '4', '5', '6'], ['3', '4', '5', '6', '7'], 
										 ['4', '5', '6', '7', '8'], ['5', '6', '7', '8', '9'], ['6', '7', '8', '9', '10'], 
										 ['7', '8', '9', '10', 'J'], ['8', '9', '10', 'J', 'Q'], ['9', '10', 'J', 'Q', 'K'], ['10', 'J', 'Q', 'K', 'A']];
	const royal = straights[9];
	const handIsRoyal = ranks.every(i => royal.includes(i));
	// console.log(`suits: ${suits}`);
	// console.log(`ranks: ${ranks}`);
	// console.log(`unique suits: ${uniqueSuits}`);
	// console.log(`unique ranks: ${uniqueRanks}`);

	//hand possibilities
	const handIsFlush = Number(uniqueSuits) == 1;
	const handIsRoyalFlush = handIsRoyal && handIsFlush;
	let handIsStraightFlush = false;
	let handIs4ofaKind = false;
	let handIsFullHouse = false;
	let handIsStraight = false; 	
	let handIs3ofaKind = false;
	let handIsTwoPair = false;
	let handIsPair = false;
	const handIsHighCard = true;
	
	//check for a pair
	const dupes = ranks.filter((element, index) => {
			return ranks.indexOf(element) !== index;
	});
	
	if (new Set(dupes).size >= 1) { 
		handIsPair = true;		
	}
	
	//check for straights
	if (uniqueRanks == 5) {
		let straightCheck = [];
		straights.forEach((straight, index) => {
			straightCheck[index] = ranks.every(i => straight.includes(i));
			if (straightCheck[index] == true) {
				handIsStraight = true;

                if (handIsFlush) {
                    handIsStraightFlush = true;
                }
			}
		});
	}
	
	//check for 3 of a kind or 2 pair
	if (uniqueRanks == 3) {
		const dupes = ranks.filter((element, index) => {
			return ranks.indexOf(element) !== index;
		});
				
		if (new Set(dupes).size == 2) { //two pair
			handIsTwoPair = true;
			handIsPair = true;
		} else { //3 of a kind
			handIs3ofaKind = true;
			handIsPair = true;
		}
	}
	
	//check for full house and 4 of a kind
	if (uniqueRanks == 2) {
		const dupes = ranks.filter((element, index) => {
			return ranks.indexOf(element) !== index;
		});
		
		if (new Set(dupes).size == 2) { //full house;
			const handIsFullHouse = true;
			handIsPair = true;
			handIsTwoPair = true;
			handIs3ofaKind = true;
		} else { //4 of a kind
			handIs4ofaKind = true;
			handIs3ofaKind = true;
			handIsPair = true;
		}
	}
	
	let handType;
	let handScore;
	
	//only score highest hand
	if (handIsRoyalFlush) {
		handType = 'royal flush';
	} else if (handIsStraightFlush) {
		handType = 'straight flush';
	} else if (handIs4ofaKind) {
		handType = '4 of a kind';
	} else if (handIsFullHouse) {
		handType = 'full house';
	} else if (handIsFlush) {
		handType = 'flush';
	} else if (handIsStraight) {
		handType = 'straight';
	} else if (handIs3ofaKind) {
		handType = '3 of a kind';
	} else if (handIsTwoPair) {
		handType = '2 pair';
	} else if (handIsPair) {
		handType = 'pair';
	} else { //high card
		handType = 'high card';
	}
	
	//store hand type & show result 
	handNames[`hand${currentHand}`] = handType;
	document.querySelector(`.hand[data-hand="${currentHand}"] .hand-confirm-wrap`).innerHTML = `<div class='hand-result'>${handType}</div>`;
	
	// console.log('handNames:');
	// console.log(handNames);
	
	//score result
	handScores[`hand${currentHand}`] = baseValues[handType];
	// console.log('handScores:');
	// console.log(handScores);
}

window.addEventListener('DOMContentLoaded', () => {
    deal();
});

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




//TESTS
const reset = () => {
	currentHand = 1;
	document.querySelector('.card-area').innerHTML = '';
}
const testroyalflush = () => {
	reset();
	hands['hand1'] = ['♥A','♥10','♥J','♥Q','♥K'];
	createCards(['♥A','♥10','♥J','♥Q','♥K']);
}

const testfullhouse = () => {
	reset();
	hands['hand1'] = ['♥A','♠A','♦A','♥7','♦7'];
	createCards(['♥A','♠A','♦A','♥7','♦7']);
}

const test4ofakind = () => {
	reset();
	hands['hand1'] = ['♥A','♠A','♦A','♣A','♦2'];
	createCards(['♥A','♠A','♦A','♣A','♦2']);
}

const testflush = () => {
	reset();
	hands['hand1'] = ['♥A','♥K','♥6','♥4','♥2'];
	createCards(['♥A','♥K','♥6','♥4','♥2']);
}

const test3ofakind = () => {
	reset();
	hands['hand1'] = ['♥A','♦A','♥6','♣A','♥2'];
	createCards(['♥A','♦A','♥6','♣A','♥2']);
}

const test2pair = () => {
	reset();
	hands['hand1'] = ['♥A','♦A','♥6','♣6','♥2'];
	createCards(['♥A','♦A','♥6','♣6','♥2']);
}

const teststraight = () => {
	reset();
	hands['hand1'] = ['♥A','♦2','♥3','♣4','♥5'];
	createCards(['♥A','♦2','♥3','♣4','♥5']);
}

const teststraightflush = () => {
	reset();
	hands['hand1'] = ['♦5','♦6','♦9','♦8','♦7'];
	createCards(['♦5','♦6','♦9','♦8','♦7']);
}

