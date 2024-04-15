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

const baseValues = { //TODO: change these values
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
	handConfirm.innerHTML = `<button type="button" class="hand-confirm" onclick="confirmHand()">Play hand</button>`;
	document.querySelector(`.hand[data-hand="${currentHand}"]`).append(handConfirm);
	
}

const confirmHand = () => {
	calcHandScore(currentHand);
	
	if (currentHand < 10) {
		currentHand++;
		console.log(`current hand: ${currentHand}`);
		createCards(hands[`hand${currentHand}`]);
	} else {
		//TODO: disable or hide confirm & score button
	}
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