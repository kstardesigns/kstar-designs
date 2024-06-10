let timeout = null,
    activeCat1 = '',
    activeSubcat1 = '',
    activeCat2 = '',
    activeSubcat2 = '',
    activeBox,
    activeButton;

let categoryList = [
    { 
        'cat': 'characters', 
        'subcat': 1, 
        'description': 'Character name in title' 
    },
    { 
        'cat': 'game_modes', 
        'subcat': 2, 
        'description': 'Multiplayer' 
    },
    { 
        'cat': 'release_dates', 
        'subcat': '1996, 1997, 1998, 1999, 2000', 
        'description': 'Released 1996-2000' 
    },
    { 
        'cat': 'platforms', 
        'subcat': 4, 
        'description': 'Nintendo 64' 
    },
    { 
        'cat': 'platforms', 
        'subcat': 29, 
        'description': 'Sega Genesis' 
    },
    { 
        'cat': 'franchises', 
        'subcat': 596, 
        'description': 'Legend of Zelda franchise' 
    }
];

window.addEventListener('load', (event) => {
    setCategories();
});

function setCategories() {

    //set category attributes on buttons
    const horiRow1 = document.querySelectorAll('[data-button-hori="1"]'),
          horiRow2 = document.querySelectorAll('[data-button-hori="2"]'),
          horiRow3 = document.querySelectorAll('[data-button-hori="3"]'),
          vertCol1 = document.querySelectorAll('[data-button-vert="1"]'),
          vertCol2 = document.querySelectorAll('[data-button-vert="2"]'),
          vertCol3 = document.querySelectorAll('[data-button-vert="3"]');

    horiRow1.forEach(box => {
        box.setAttribute('data-cat1', categoryList[0].cat);
        box.setAttribute('data-subcat1', categoryList[0].subcat);
    });

    horiRow2.forEach(box => {
        box.setAttribute('data-cat1', categoryList[1].cat);
        box.setAttribute('data-subcat1', categoryList[1].subcat);
    });

    horiRow3.forEach(box => {
        box.setAttribute('data-cat1', categoryList[2].cat);
        box.setAttribute('data-subcat1', categoryList[2].subcat);
    });

    vertCol1.forEach(box => {
        box.setAttribute('data-cat2', categoryList[3].cat);
        box.setAttribute('data-subcat2', categoryList[3].subcat);
    });

    vertCol2.forEach(box => {
        box.setAttribute('data-cat2', categoryList[4].cat);
        box.setAttribute('data-subcat2', categoryList[4].subcat);
    });

    vertCol3.forEach(box => {
        box.setAttribute('data-cat2', categoryList[5].cat);
        box.setAttribute('data-subcat2', categoryList[5].subcat);
    });

    //set labels
    const categoryLabels = document.querySelectorAll('.categories-label');
    categoryLabels.forEach((label, i) => {
        document.getElementById(`cat-text-${i+1}`).innerHTML = categoryList[i].description;
    });
}



async function fetchGamesList(query) {
    try {
        const response = await fetch(`/games?search=${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const games = await response.json();
        return games;
    } catch (error) {
        console.error('Error fetching games:', error);
        return [];
    }
}

async function fetchGameDetails(gameId) {
    try {
        const response = await fetch(`/game?id=${gameId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const game = await response.json();

        closeDialog('bh-dialog');
        
        let ratingsArray = [];
        let companiesArray = [];
        let charactersArray = [];

        if (activeCat1 == 'age_ratings' || activeCat2 == 'age_ratings') {
            const ratingIds = game[0].age_ratings.map(ratingObj => ratingObj.id);
            console.log('ratingIds', ratingIds);
            const ratings = await fetchGameRatings(ratingIds);
            ratingsArray = ratings;
        }

        if (activeCat1 == 'publisher' || activeCat1 == 'developer' || activeCat2 == 'publisher' || activeCat2 == 'developer') {
            let companyIds;

            if (activeCat1 == 'publisher' || activeCat2 == 'publisher') {
                companyIds = game[0].involved_companies.filter(companyObj => companyObj.publisher).map(companyObj => companyObj.id);
                console.log('companyIds', companyIds);
            } else if (activeCat1 == 'developer' || activeCat2 == 'developer') {
                companyIds = game[0].involved_companies.filter(companyObj => companyObj.developer).map(companyObj => companyObj.id);
                console.log('companyIds', companyIds);
            }
            const companies = await fetchCompanies(companyIds);
            companiesArray = companies;
        } 

        if (activeCat1 === 'characters' || activeCat2 === 'characters') {
            const searchTerms = game[0].name
                .replace(/[^a-zA-Z]/g, ' ')
                .trim()
                .split(/\s+/)
                .map(term => term.trim().toLowerCase())
                .filter(term => term.length >= 3 && term !== 'the');
            const characters = await fetchCharacters(searchTerms);
            charactersArray = characters;
        }

        checkAnswer(game, ratingsArray, companiesArray, charactersArray);

        console.log(game);
        // return game;
    } catch (error) {
        console.error('Error fetching game details:', error);
        return [];
    }
}

async function fetchGameRatings(ratingIds) {
    console.log('ratingIds:', ratingIds);

    try {
        const response = await fetch(`/age_ratings?ids=${ratingIds.join(',')}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const ratings = await response.json();
        console.log('ratings:');
        console.log(ratings);

        const ratingsOnly = ratings.map(entry => entry.rating);
        console.log('ratingsOnly: ', ratingsOnly);
        return ratingsOnly;
        
    } catch (error) {
        console.error('Error fetching game ratings:', error);
        return [];
    }
}

async function fetchCompanies(companyIds) {
    try {
        const response = await fetch(`/involved_companies?ids=${companyIds.join(',')}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const companies = await response.json();
        console.log('companies:');
        console.log(companies);

        const namesOnly = companies.map(entry => entry.company.name);
        console.log('namesOnly: ', namesOnly);
        return namesOnly;
        
    } catch (error) {
        console.error('Error fetching companies:', error);
        return [];
    }
}


const fetchCharacters = async (searchTerms) => {
    try {
        const response = await fetch(`/characters?searchTerms=${searchTerms.join(',')}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching characters:', error);
        return [];
    }
};

document.getElementById('search').addEventListener('input', (event) => {
    loader('show');

    const query = event.target.value.trim();

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(async () => {
        if (query.length > 2) {
            const games = await fetchGamesList(query);
            displayGames(games);
        } else {
            displayGames([]);
            loader('show');
        }
    }, 300); // Adjust the delay as needed
});

function displayGames(games) {
    loader('hide');
    const results = document.getElementById('results');
    results.innerHTML = '';

    games.forEach(game => {
        const li = document.createElement('li');
        li.classList.add('results-list-item');
        const gameName = game.name || 'Unknown name';
        const gameId = game.id || 'Unknown id';
        const gameCover = game.cover ? game.cover.url.replace('thumb', 'cover_small_2x') : 'assets/default-cover.jpg';
        const gameFirstRelease = game.first_release_date || 0;
        const img = document.createElement('img');
        img.src = gameCover;
        img.alt = gameName;
        img.classList.add('results-cover');
        const span = document.createElement('span');
        span.classList.add('results-title');
        span.textContent = gameName;
        const button = document.createElement('button');
        button.classList.add('results-button');
        button.dataset.id = gameId;
        button.dataset.release = gameFirstRelease;
        button.append(img);
        button.append(span);
        button.addEventListener('click', () => fetchGameDetails(gameId));
        li.append(button);
        results.appendChild(li);
    });

    //sorts the game results by first release date
    let gameButtons = Array.from(document.querySelectorAll('.results-button'));
    gameButtons.sort(function(a, b) {
        return parseInt(a.dataset.release) - parseInt(b.dataset.release);
    });
    document.getElementById('results').innerHTML = '';
    gameButtons.forEach(button => {
        const li = button.closest('li');
        results.appendChild(li);
    });

    if (gameButtons.length == 0) {
        loader('show');
    }
}

//when a grid box is chosen to solve, store values and go to search
const gridButtons = document.querySelectorAll('.grid-button');
gridButtons.forEach((button) => {
    button.classList.remove('wrong');
    button.classList.remove('active');

    button.addEventListener('click', (event) => {
        console.log(`cat1: ${button.dataset.cat1}`);
        console.log(`cat2: ${button.dataset.cat2}`);

        gridButtons.forEach((otherButton) => {
            otherButton.classList.remove('wrong');
            otherButton.classList.remove('active');
        });

        button.classList.add('active');
        activeCat1 = button.dataset.cat1;
        activeSubcat1 = button.dataset.subcat1;
        activeCat2 = button.dataset.cat2;
        activeSubcat2 = button.dataset.subcat2;
        activeHori = button.dataset.buttonHori;
        activeVert = button.dataset.buttonVert;
        activeBox = button.closest('.grid-box');
        activeButton = button;

        //show category names in search modal
        switch (activeHori) {
            case '1':
                document.getElementById('active-category-1').innerHTML = document.getElementById('cat-text-1').innerHTML;
                break;
            case '2':
                document.getElementById('active-category-1').innerHTML = document.getElementById('cat-text-2').innerHTML;
                break;
            case '3':
                document.getElementById('active-category-1').innerHTML = document.getElementById('cat-text-3').innerHTML;
                break;
            default:
                console.log(`nah.`);
        }

        switch (activeVert) {
            case '1':
                document.getElementById('active-category-2').innerHTML = document.getElementById('cat-text-4').innerHTML;
                break;
            case '2':
                document.getElementById('active-category-2').innerHTML = document.getElementById('cat-text-5').innerHTML;
                break;
            case '3':
                document.getElementById('active-category-2').innerHTML = document.getElementById('cat-text-6').innerHTML;
                break;
            default:
                console.log(`nah.`);
        }

        //enable & focus search field
        document.getElementById('search').removeAttribute('disabled');
        document.getElementById('search').focus();
        openDialog('bh-dialog');
    });
});

async function checkAnswer(game, ratings, companies, characters) {
    //check if each category matches
    let cat1matches, cat2matches;

    if (activeCat1 == 'release_dates') { 
        //see if release dates match one of our given release dates
        subcat1array = activeSubcat1.split(',').map(Number);

        cat1matches = subcat1array.some(y =>
            game[0][activeCat1].some(date => date.y === y)
        );
    } else if (activeCat1 == 'aggregated_rating') {
        cat1matches = game[0][activeCat1] >= Number(activeSubcat1);
    } else if (activeCat1 == 'age_ratings') {
        cat1matches = ratings.includes(Number(activeSubcat1));
    } else if (activeCat1 == 'dlcs') {
        cat1matches = (game[0][activeCat1] || game[0]['expansions'] || game[0]['parent_game']);
    } else if (activeCat1 == 'remakes') {
        cat1matches = (game[0][activeCat1] || game[0]['remasters'] || game[0]['ports']);
    } else if (activeCat1 == 'publisher' || activeCat1 == 'developer') {
        const activeSubcat1Lower = activeSubcat1.toLowerCase();
        cat1matches = companies.some(element => element.toLowerCase().includes(activeSubcat1));
    } else if (activeCat1 === 'characters') {
        const gameNameArray = game[0].name
                                .toLowerCase()  // Convert to lowercase
                                .replace(/[^a-zA-Z]/g, ' ') // Replace non-letters with spaces
                                .trim() // Trim leading and trailing whitespace
                                .split(/\s+/) // Split by one or more whitespace characters
                                .filter(word => word.length >= 3 && word !== 'the'); // Filter out words less than 3 characters and 'the'
        console.log('gameNameArray', gameNameArray);
        cat1matches = characters.some(character =>
        gameNameArray.some(term =>
                character.name.toLowerCase().includes(term) ||
                (character.akas || []).some(aka => aka.toLowerCase().includes(term))
            )
        );
    } else { //check if id matches id of given category
        if (game[0][activeCat1]) {
            cat1matches = game[0][activeCat1].includes(Number(activeSubcat1));
        } else {
            cat1matches = false;
        }
    }

    if (activeCat2 == 'release_dates') { 
        //see if release dates match one of our given release dates
        subcat2array = activeSubcat2.split(',').map(Number);

        cat2matches = subcat2array.some(y =>
            game[0][activeCat2].some(date => date.y === y)
        );
    } else if (activeCat2 == 'aggregated_rating') {
        cat2matches = game[0][activeCat2] >= Number(activeSubcat2);
    } else if (activeCat2 == 'age_ratings') {
        cat2matches = ratings.includes(Number(activeSubcat2));
    } else if (activeCat2 == 'dlcs') {
        cat2matches = (game[0][activeCat2] || game[0]['expansions'] || game[0]['parent_game']);
    } else if (activeCat2 == 'remakes') {
        cat2matches = (game[0][activeCat2] || game[0]['remasters'] || game[0]['ports']);
    } else if (activeCat2 == 'publisher' || activeCat2 == 'developer') {
        const activeSubcat2Lower = activeSubcat2.toLowerCase();
        cat2matches = companies.some(element => element.toLowerCase().includes(activeSubcat2));
    } else if (activeCat2 === 'characters') {
        const gameNameArray = game[0].name
                                .toLowerCase()  // Convert to lowercase
                                .replace(/[^a-zA-Z]/g, ' ') // Replace non-letters with spaces
                                .trim() // Trim leading and trailing whitespace
                                .split(/\s+/) // Split by one or more whitespace characters
                                .filter(word => word.length >= 3 && word !== 'the'); // Filter out words less than 3 characters and 'the'

        console.log('gameNameArray', gameNameArray);
        cat1matches = characters.some(character =>
        gameNameArray.some(term =>
                character.name.toLowerCase().includes(term) ||
                (character.akas || []).some(aka => aka.toLowerCase().includes(term))
            )
        );
    } else { //check if id matches id of given category
        if (game[0][activeCat2]) {
            cat2matches = game[0][activeCat2].includes(Number(activeSubcat2));
        } else {
            cat2matches = false;
        }
    }

    console.log(cat1matches);
    console.log(cat2matches);
    

    if (cat1matches && cat2matches) {
        const gameCover = game[0].cover.url.replace('thumb', 'cover_small_2x');
        activeBox.style.backgroundImage = `url(${gameCover})`;
        activeButton.remove();

    } else {
        // alert('1 or both of them didnt match');
        //TODO: show red box around box or something to indicate it was incorrect
        activeButton.classList.remove('active');
        activeButton.classList.add('wrong');
    }

    //TODO: decrement allowed guesses
    
    //disable search again until next box is chosen
    document.getElementById('search').value = '';
    document.getElementById('search').setAttribute('disabled', true);
    document.getElementById('results').innerHTML = '';
}   




//testing

const testButtons = document.querySelectorAll('.change-cat');
testButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const catToChange = button.getAttribute('data-change-cat'),
                newCat = document.getElementById('change-cat1').value,
                newSubcat = document.getElementById('change-subcat1').value,
                newText = document.getElementById('change-text').value;
        console.log(catToChange);

        let gridButtons;

        switch (catToChange) {
            case '1':
                gridButtons = document.querySelectorAll('[data-button-hori="1"]');
                gridButtons.forEach(button => {
                    button.setAttribute('data-cat1', newCat);
                    button.setAttribute('data-subcat1', newSubcat);
                });
                document.getElementById('cat-text-1').textContent = newText;
                break;
            case '2':
                gridButtons = document.querySelectorAll('[data-button-hori="2"]');
                gridButtons.forEach(button => {
                    button.setAttribute('data-cat1', newCat);
                    button.setAttribute('data-subcat1', newSubcat);
                });
                document.getElementById('cat-text-2').textContent = newText;
                break;
            case '3':
                gridButtons = document.querySelectorAll('[data-button-hori="3"]');
                gridButtons.forEach(button => {
                    button.setAttribute('data-cat1', newCat);
                    button.setAttribute('data-subcat1', newSubcat);
                });
                document.getElementById('cat-text-3').textContent = newText;
                break;
            case '4':
                gridButtons = document.querySelectorAll('[data-button-vert="1"]');
                gridButtons.forEach(button => {
                    button.setAttribute('data-cat2', newCat);
                    button.setAttribute('data-subcat2', newSubcat);
                });
                document.getElementById('cat-text-4').textContent = newText;
                break;
            case '5':
                gridButtons = document.querySelectorAll('[data-button-vert="2"]');
                gridButtons.forEach(button => {
                    button.setAttribute('data-cat2', newCat);
                    button.setAttribute('data-subcat2', newSubcat);
                });
                document.getElementById('cat-text-5').textContent = newText;
                break;
            case '6':
                gridButtons = document.querySelectorAll('[data-button-vert="3"]');
                gridButtons.forEach(button => {
                    button.setAttribute('data-cat2', newCat);
                    button.setAttribute('data-subcat2', newSubcat);
                });
                document.getElementById('cat-text-6').textContent = newText;
                break;
            default:
                console.log(`nah.`);
        }

    });
});

const loader = (toggle) => {
    const loader = document.getElementById('waiting');
    if (toggle == 'hide') {
        loader.style.display = 'none';
    } else if (toggle == 'show') {
        loader.style.display = 'block';
    }
}

//Credit:
//Modified version of accessible dialog by Ire Aderinokun:
//https://raw.githubusercontent.com/ireade/accessible-modal-dialog/gh-pages/Dialog.js

function Dialog(dialogEl) {
	this.dialogEl = document.querySelector(`#${dialogEl}`);
	this.focusedElBeforeOpen;
	this.close();
}

Dialog.prototype.open = function(dialogId) {
	var Dialog = this,
        dialogOverlay, 
        openDialogs = document.querySelectorAll('.bh-dialog[aria-hidden="false"]');

    this.dialogEl = dialogId ? document.querySelector(`#${dialogId}`) : this.dialogEl;
	this.focusedElBeforeOpen = document.activeElement;

    this.focusableEls = [...this.dialogEl.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]')];
	// this.focusableEls = Array.prototype.slice.call(this.focusableEls);
	this.firstFocusableEl = this.focusableEls[0];
	this.lastFocusableEl = this.focusableEls[ this.focusableEls.length - 1 ];

    //check for data attributes
    if (this.dialogEl.hasAttribute('data-bh-dialog-top')) {
        var topAmt = this.dialogEl.getAttribute('data-bh-dialog-top');
        this.dialogEl.style.top = topAmt + 'px';
    }

    //prevent page scrolling
    document.body.classList.add('bh-dialog-fixed-page');

    //create the background div that covers the rest of the content, append the dialog to it
    if (document.getElementsByClassName('bh-dialog-overlay').length == 0) {
        dialogOverlay = document.createElement('div');
        dialogOverlay.classList.add('bh-dialog-overlay');
        document.body.appendChild(dialogOverlay);
    } else {
        dialogOverlay = document.querySelector('.bh-dialog-overlay');
        dialogOverlay.style.display = '';
    }

    //different styles for full mobile variation
    if (this.dialogEl.classList.contains('bh-dialog--mobile-full')) {
        dialogOverlay.classList.add('bh-dialog-overlay--mobile-full');
    } else {
        dialogOverlay.classList.remove('bh-dialog-overlay--mobile-full');
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
    var dialogOverlay = document.getElementsByClassName('bh-dialog-overlay')[0];

    document.body.classList.remove('bh-dialog-fixed-page');

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
        closeDialogEls = document.querySelectorAll(`#${openDialogSel} ${closeDialogSel}`);

    if (openDialogEl) {
        openDialogEl.addEventListener('click', function(e) { 
            Dialog.open();
        });
    }

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

var dialogs = document.getElementsByClassName('bh-dialog');

window.addEventListener('DOMContentLoaded', () => {
    for (var i = 0; i < dialogs.length; i++) {
        var myDialog = new Dialog(dialogs[i].id);
        myDialog.addEventListeners(dialogs[i].id, '.bh-dialog-close');
    }
});