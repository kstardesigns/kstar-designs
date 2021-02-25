const shuffleButton = document.querySelector('.shuffler');
let cardList = ['♠A','♠2','♠3','♠4','♠5','♠6','♠7','♠8','♠9','♠10','♠J','♠Q','♠K',
                '♦A','♦2','♦3','♦4','♦5','♦6','♦7','♦8','♦9','♦10','♦J','♦Q','♦K',
                '♣A','♣2','♣3','♣4','♣5','♣6','♣7','♣8','♣9','♣10','♣J','♣Q','♣K',
                '♥A','♥2','♥3','♥4','♥5','♥6','♥7','♥8','♥9','♥10','♥J','♥Q','♥K'],
		deckCount = 0,
		highlightedDecks = [],
		highlightedCards1 = [],
		highlightedCards2 = [];

const shuffleNewDeck = () => {
  let newDeck = [].concat(cardList),
			currentIndex = newDeck.length, 
			temporaryValue, 
			randomIndex;
	
	deckCount++;

	//create a new deck and highlight it
	const deckRow = document.createElement('ul');
	deckRow.id = `deck-${deckCount}`;
	deckRow.classList = 'deck';
	
	if (highlightedDecks.length > 1) {
		highlightedDecks.splice(0,1);
	}
	
	highlightedDecks.push(deckRow);
		
	//un-highlight previously highlighted decks, and highlight the most recent 2
	const pastHighlightedDecks = document.querySelectorAll('.highlighted');
	pastHighlightedDecks.forEach(function(deck) {
		deck.classList.remove('highlighted');
	});
	
	highlightedDecks.forEach(function(deck) {
		deck.classList.add('highlighted');
	});
	
	//randomize the order of the cards in the new deck
  while (0 !== currentIndex) {
    const randomCard = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = newDeck[currentIndex];
    newDeck[currentIndex] = newDeck[randomCard];
    newDeck[randomCard] = temporaryValue;
  }	
	
	//add each card to the deck ul
	newDeck.forEach(function(card, index) {
			const cardLi = document.createElement('li'),
						cardSuit = card[0],
						cardNo = card.substring(1, card.length);
			
			cardLi.innerHTML = `${cardNo} <span>${cardSuit}<span>`;
			cardLi.setAttribute('data-card', `${cardSuit}${cardNo}`);
			cardLi.classList.add('card');
		
			switch(cardSuit) {
					case '♠':
						cardLi.classList.add('spade');
						break;
					case '♦':
						cardLi.classList.add('diamond');
						break;
					case '♣':
						cardLi.classList.add('club');
						break;
					case '♥':
						cardLi.classList.add('heart');
						break;
			}
			
			deckRow.append(cardLi);
	});
	document.querySelector('.decks').append(deckRow);
	
	//add a results area to the left of each new deck, and highlight it to match its deck
	const resultsLi = document.createElement('li'),
				resultsArea = document.querySelector('.results-area');
	resultsLi.classList = 'result';
	resultsLi.setAttribute('data-deck-results', `deck-${deckCount}`);
	resultsArea.append(resultsLi);
	matchResultsHeight();
	
	//if we have at least 2 decks, compare them. otherwise, just highlight deck 1's result area since it won't be done in the comparison function
	if (highlightedDecks.length > 1) {
		compareHighlightedDecks();
	} else {
		document.querySelector('[data-deck-results="deck-1"]').classList.add('highlighted');
	}
}
shuffleButton.addEventListener('click', shuffleNewDeck);

//match the results list item to the height of the sample deck to keep everything in line
const matchResultsHeight = function() {
	const results = document.querySelectorAll('.result'),
				sampleDeckHeight = document.querySelector('.decks .sample-deck').offsetHeight;

	results.forEach(function(result) {
		result.style.height = sampleDeckHeight + 'px';
	});
}
window.addEventListener('DOMContentLoaded', matchResultsHeight);
window.addEventListener('resize', matchResultsHeight);
	
//if there are 2 decks highlighted, log and compare their cards
const compareHighlightedDecks = function() {
	const allCards1 = highlightedDecks[0].querySelectorAll('.card'),
				allCards2 = highlightedDecks[1].querySelectorAll('.card'),
				matchedCards = document.querySelectorAll('.matched'),
				resultsListItems = document.querySelectorAll('.result:not(.sample-deck)');

	//empty the highlight cards log, remove the matched styling, empty the results log
	highlightedCards1 = [];
	highlightedCards2 = [];
	matchedCards.forEach(function(card) {
		card.classList.remove('matched');
	});
	resultsListItems.forEach(function(item) {
		item.innerHTML = '';
	});

	//highlight the results area of highlighted deck
	highlightedDecks.forEach(function(deck) {
		const deckId = deck.id;
		document.querySelector(`[data-deck-results="${deckId}"]`).classList.add('highlighted');
	});

	//push each card's attribute to a div to comapre to the other deck
	allCards1.forEach(function(card) {
		highlightedCards1.push(card.getAttribute('data-card'));
	});

	allCards2.forEach(function(card) {
		highlightedCards2.push(card.getAttribute('data-card'));
	});

	//count the cards that are in the same spot in each deck
	let matchCount = 0;
	for (i = 0; i < 52; i++) {
		if (highlightedCards1[i] === highlightedCards2[i]) {
			matchCount++;
			highlightedDecks[0].querySelector(`[data-card="${highlightedCards1[i]}"]`).classList.add('matched');
			highlightedDecks[1].querySelector(`[data-card="${highlightedCards2[i]}"]`).classList.add('matched');
		}
	}

	//output the data next to the deck
	const deckId = highlightedDecks[1].id,
				matchCardCount = `${matchCount} ${(matchCount == 1 ? 'card matches' : 'cards match')}`,
				matchPercentage = matchCount == 0 ? '0' : (Math.round(matchCount * 100) / 52).toFixed(1);
	document.querySelector(`[data-deck-results="${deckId}"]`).innerHTML = `${matchCardCount} <br>${matchPercentage}%`;
}

//called when clicking on a new deck, changes the least recent selected deck to the new one (so 2 are still compared)
const updateHighlightedDecks = function(deck) {
	const selectedDeck = deck.closest('.deck'),
				deckIsAlreadyHighlighted = highlightedDecks.indexOf(selectedDeck) > -1;
	
	//see if this id is already in highlightedDecks
	if (deckIsAlreadyHighlighted) {
		highlightedDecks.splice(highlightedDecks.indexOf(selectedDeck), 1);
		highlightedDecks.push(selectedDeck);
	} else {
		//add new deck to highlighted array
		highlightedDecks.push(selectedDeck);
		selectedDeck.classList.add('highlighted');

		//remove earliest highlighted deck from array
		highlightedDecks[0].classList.remove('highlighted');
		document.querySelector(`[data-deck-results="${highlightedDecks[0].id}"]`).classList.remove('highlighted');
		highlightedDecks.splice(0,1);
	}
	
	compareHighlightedDecks();
}
document.addEventListener('click', function(e){
	if (e.target.classList.contains('deck') || e.target.closest('.deck')) {
		updateHighlightedDecks(e.target);
	}
});

//show a sample shuffle on initial page load
window.addEventListener('DOMContentLoaded', function() {
	document.querySelector('.shuffler').click();
	document.querySelector('[data-deck-results="deck-1"]').innerHTML = 'First shuffle';
});