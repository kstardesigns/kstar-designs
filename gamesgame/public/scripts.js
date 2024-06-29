let timeout = null,
    activeCat1 = '',
    activeSubcat1 = '',
    activeCat2 = '',
    activeSubcat2 = '',
    activeBox,
    activeButton,
    guessesRemaining = 9,
    correctAnswers = 0;

let categoryList = [
    { 
        'cat': 'one_word', 
        'subcat': 1, 
        'description': '1-word title',
        'helper': `The title of the game has only 1 word`
    },
    { 
        'cat': 'age_rating_content_descriptions', 
        'subcat': 21, 
        'description': 'Strong language',
        'helper': 'ESRB rating: includes strong language'
    },
    { 
        'cat': 'game_modes', 
        'subcat': '2', 
        'description': 'Multiplayer',
        'helper': ''
    },
    { 
        'cat': 'platforms', 
        'subcat': 4, 
        'description': 'Nintendo 64',
        'helper': ''
    },
    { 
        'cat': 'release_dates', 
        'subcat': '2015, 2016, 2017, 2018, 2019', 
        'description': 'Released 2015-2019',
        'helper': 'Originally released between 2015-2019'
    },
    { 
        'cat': 'genres', 
        'subcat': 32, 
        'description': 'Indie',
        'helper': ''
    }
];

window.addEventListener('load', (event) => {
    setCategories();
    setAvailableTests();
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
        box.setAttribute('data-description1', categoryList[0].description);
    });

    horiRow2.forEach(box => {
        box.setAttribute('data-cat1', categoryList[1].cat);
        box.setAttribute('data-subcat1', categoryList[1].subcat);
        box.setAttribute('data-description1', categoryList[1].description);

    });

    horiRow3.forEach(box => {
        box.setAttribute('data-cat1', categoryList[2].cat);
        box.setAttribute('data-subcat1', categoryList[2].subcat);
        box.setAttribute('data-description1', categoryList[2].description);
    });

    vertCol1.forEach(box => {
        box.setAttribute('data-cat2', categoryList[3].cat);
        box.setAttribute('data-subcat2', categoryList[3].subcat);
        box.setAttribute('data-description2', categoryList[3].description);

    });

    vertCol2.forEach(box => {
        box.setAttribute('data-cat2', categoryList[4].cat);
        box.setAttribute('data-subcat2', categoryList[4].subcat);
        box.setAttribute('data-description2', categoryList[4].description);
    });

    vertCol3.forEach(box => {
        box.setAttribute('data-cat2', categoryList[5].cat);
        box.setAttribute('data-subcat2', categoryList[5].subcat);
        box.setAttribute('data-description2', categoryList[5].description);
    });

    const gridButtons = document.querySelectorAll('.grid-button');
    gridButtons.forEach((button) => {
        button.setAttribute('aria-label', `${button.dataset.description1} + ${button.dataset.description2}`);
        button.removeAttribute('data-description1');
        button.removeAttribute('data-description2');
    });

    //set labels
    const categoryLabels = document.querySelectorAll('.categories-label');
    categoryLabels.forEach((label, i) => {
        const innerLabel = document.querySelector(`#cat-text-${i+1} span`);

        //set up tooltip if there is one, otherwise just add in the description
        if (categoryList[i].helper) {

            if (innerLabel) {
                innerLabel.innerHTML = categoryList[i].description;
                innerLabel.setAttribute('data-kooltip', categoryList[i].helper);
            } else {
                document.querySelector(`#cat-text-${i+1}`).innerHTML = categoryList[i].description;
            }
            
        } else {
            document.getElementById(`cat-text-${i+1}`).innerHTML = categoryList[i].description;
        }

    });
}

function setAvailableTests() {
    const categoriesToTest = [
        { optionText: 'Genre', optionVal: 'genres'},
        { optionText: 'Platform/console', optionVal: 'platforms'},
        { optionText: '# of players', optionVal: 'game_modes'},
        { optionText: 'Release date', optionVal: 'release_dates'},
        { optionText: 'Themes', optionVal: 'themes'},
        { optionText: 'Player perspective', optionVal: 'player_perspectives'},
        { optionText: 'Franchise', optionVal: 'franchises'},
        { optionText: 'ESRB rating', optionVal: 'age_ratings'},
        { optionText: 'Has DLC/expansion', optionVal: 'dlcs'},
        { optionText: 'Is a remake/remaster', optionVal: 'remakes'},
        { optionText: 'Publisher', optionVal: 'publisher'},
        { optionText: 'Developer', optionVal: 'developer'},
        { optionText: 'Character name in title', optionVal: 'characters'},
        { optionText: 'Age rating descriptions', optionVal: 'age_rating_content_descriptions'},
        { optionText: '1 word title', optionVal: 'one_word'},
        { optionText: '2+ word title', optionVal: 'two_words'}
    ]
    var selectEl = document.getElementById('change-cat1');

    categoriesToTest.forEach((category, i) => {
        var option = document.createElement('option');
        option.text = categoriesToTest[i].optionText;
        option.value = categoriesToTest[i].optionVal;
        selectEl.add(option);
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

        closeDialog('bh-dialog-guess');
        
        let ratingsArray = [];
        let companiesArray = [];
        let charactersArray = [];
        let contentDescriptionsArray = [];

        //if a category is age_ratings, call age_ratings endpoint
        if (activeCat1 == 'age_ratings' || activeCat2 == 'age_ratings') {
            const ratingIds = game[0].age_ratings.map(ratingObj => ratingObj.id);
            console.log('ratingIds', ratingIds);
            const ratings = await fetchGameRatings(ratingIds);
            ratingsArray = ratings;
        }

        //if a category is age_rating_content_descriptions, call that endpoint
        if (activeCat1 == 'age_rating_content_descriptions' || activeCat2 == 'age_rating_content_descriptions') {

            const ageRatings = game[0].age_ratings || [];
            let contentDescriptionIds = [];
            ageRatings.forEach(rating => {
                if (rating.content_descriptions) {
                    console.log('Found content description:', rating.content_descriptions);
                    contentDescriptionIds.push(rating.content_descriptions);
                    console.log(contentDescriptionIds);
                } else {
                    console.log('No content description for this rating.');
                }
            });

            console.log('contentDescriptionIds', contentDescriptionIds);

            if (contentDescriptionIds.length > 0) {
                const contentDescriptions = await fetchContentDescriptions(contentDescriptionIds);
                contentDescriptionsArray = contentDescriptions;
            }
        }

        //if a category has publisher or developer, filter and check involved_companies
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

        //if a category is characters, call the characters endpoint to see if a character is in the title
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

        checkAnswer(game, ratingsArray, companiesArray, charactersArray, contentDescriptionsArray);

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

async function fetchContentDescriptions(contentDescriptionIds) {
    console.log('contentDescriptionIds:', contentDescriptionIds);

    try {
        const response = await fetch(`/age_rating_content_descriptions?ids=${contentDescriptionIds.join(',')}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentDescriptions = await response.json();
        console.log('contentDescriptions:');
        console.log(contentDescriptions);

        const categoriesOnly = contentDescriptions.map(entry => entry.category);
        console.log('categoriesOnly: ', categoriesOnly);
        return categoriesOnly;
        
    } catch (error) {
        console.error('Error fetching content descriptions:', error);
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
    results.innerHTML = '';

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

    if (games.length > 0) {

        games.forEach(game => {
            const li = document.createElement('li');
            li.classList.add('results-list-item');
            const gameName = game.name || 'Unknown name';
            const gameId = game.id || 'Unknown id';
            const gameCover = game.cover ? game.cover.url.replace('thumb', 'cover_med_2x') : 'assets/default-cover.jpg';
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
    } else {
        loader('hide');
        results.innerHTML = '0 results found.<br>dying sonic gif coming soon';
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

        if (document.querySelector('#active-category-1 .categories-label-span')) {
            document.querySelector('#active-category-1 .categories-label-span').removeAttribute('data-kooltip');
            document.querySelector('#active-category-1 .categories-label-span').removeAttribute('tabindex');
        }

        if (document.querySelector('#active-category-2 .categories-label-span')) {
            document.querySelector('#active-category-2 .categories-label-span').removeAttribute('data-kooltip');
            document.querySelector('#active-category-2 .categories-label-span').removeAttribute('tabindex');
        }

        //enable & focus search field
        document.getElementById('search').removeAttribute('disabled');
        document.getElementById('search').focus();
        openDialog('bh-dialog-guess');
    });
});

async function checkAnswer(game, ratings, companies, characters, contentDescriptions) {
    //check if each category matches
    let cat1matches, cat2matches;

    const catsNotInAPI = ['publisher', 'developer', 'characters', 'one_word', 'two_words'];

    if (game[0][activeCat1] || catsNotInAPI.includes(activeCat1)) { 
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
        } else if (activeCat1 == 'age_rating_content_descriptions') { 
            cat1matches = contentDescriptions.includes(Number(activeSubcat1));
        } else if (activeCat1 == 'dlcs') {
            cat1matches = (game[0][activeCat1] || game[0]['expansions'] || game[0]['parent_game']);
        } else if (activeCat1 == 'remakes') {
            cat1matches = (game[0][activeCat1] || game[0]['remasters']);
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
        } else if (activeCat1 === 'one_word') {
            cat1matches = game[0].name.indexOf(' ') == -1;
        } else if (activeCat1 === 'two_words') {
            cat1matches = game[0].name.indexOf(' ') >= 0;
        } else { //check if id matches id of given category
            cat1matches = game[0][activeCat1].includes(Number(activeSubcat1));
        }
    } else {
        cat1matches = false;
    }

    if (game[0][activeCat2] || catsNotInAPI.includes(activeCat2)) { 
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
        } else if (activeCat2 == 'age_rating_content_descriptions') { 
            cat2matches = contentDescriptions.includes(Number(activeSubcat2));
        } else if (activeCat2 == 'dlcs') {
            cat2matches = (game[0][activeCat2] || game[0]['expansions'] || game[0]['parent_game']);
        } else if (activeCat2 == 'remakes') {
            cat2matches = (game[0][activeCat2] || game[0]['remasters']);
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
        } else if (activeCat2 === 'one_word') {
            cat2matches = game[0].name.indexOf(' ') == -1;
        } else if (activeCat2 === 'two_words') {
            cat2matches = game[0].name.indexOf(' ') >= 0;
        } else { //check if id matches id of given category
            cat2matches = game[0][activeCat2].includes(Number(activeSubcat2));
        }
    } else {
        cat2matches = false;
    }

    console.log(cat1matches);
    console.log(cat2matches);
    

    if (cat1matches && cat2matches) { //guess is correct!
        const gameCover = game[0].cover.url.replace('thumb', 'cover_small_2x');
        const gameTitle = document.createElement('div');
        gameTitle.classList.add('grid-box-title');
        gameTitle.textContent = game[0].name;
        activeBox.append(gameTitle);
        activeBox.style.backgroundImage = `url(${gameCover})`;
        activeButton.remove();
        correctAnswers++;
        document.getElementById('correct-answers').textContent = correctAnswers;
    } else { //guess is incorrect
        activeButton.classList.remove('active');
        activeButton.classList.add('wrong');
    }

    //update remaining guesses
    guessesRemaining--;
    document.getElementById('guesses-remaining').textContent = guessesRemaining;
    console.log(typeof(guessesRemaining));

    //TODO: FOR TESTING ONLY
    if (game[0].url) {
        //guessed-links
        const newLink = document.createElement('li');
        newLink.innerHTML = `<a href="${game[0].url}" target="_blank">${game[0].name}</a>`;
        document.getElementById('guessed-links').append(newLink);
    }
    
    //TODO: FOR TESTING ONLY

    if (guessesRemaining == 0) {
        //TODO:
        //display end game modal here
        const gridButtons = document.querySelectorAll('.grid-button');
        gridButtons.forEach((button) => {
            button.remove();
        });
    }
    
    //disable search again until next box is chosen
    document.getElementById('search').value = '';
    document.getElementById('search').setAttribute('disabled', true);
    document.getElementById('results').innerHTML = '';
}   

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

    if (document.querySelector('.grid-button.active')) {
        const activeButton = document.querySelector('.grid-button.active');
        console.log(activeButton);
        activeButton.classList.remove('active');
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

const kooltip = {},
      toolTipTriggers = document.querySelectorAll('[data-kooltip]');

//step 1 - on mouseenter/touchstart/focus - get tooltip copy from trigger data attribute, append it to bottom of the page
//step 2 - get trigger x, y, w, h to prep for positioning
kooltip.createTooltip = function() {
	//remove a tip that's currently shown (ie. if user is focused on one tip, then hovers over another trigger)
	kooltip.removeTooltip();
	
	let tipContent = this.dataset.kooltip,
			tipTriggerW = this.getBoundingClientRect().width,
			tipTriggerH = this.getBoundingClientRect().height,
			tipTriggerX = this.getBoundingClientRect().left + window.scrollX,
			tipTriggerY = this.getBoundingClientRect().top + window.scrollY,
			tipId = this.getAttribute('aria-describedby'),
			tip = document.createElement('span');
	
	tip.classList.add('kooltip');
	tip.setAttribute('id', tipId);
	tip.setAttribute('aria-hidden', false);
	
	document.body.appendChild(tip);
	document.querySelector('.kooltip').textContent = tipContent;
	kooltip.triggerWidth = tipTriggerW;
	kooltip.triggerHeight = tipTriggerH;
	kooltip.triggerX = tipTriggerX;
	kooltip.triggerY = tipTriggerY;
	kooltip.positionTooltip(tip);
}

//step 3 - position tooltip centered above the trigger, check for instances where the tooltip flows off the page
kooltip.positionTooltip = function(tip) {
	
	tip.style.left = (kooltip.triggerX + //position tip at left side of trigger
									 (kooltip.triggerWidth / 2)) //center it at middle of trigger
									 + 'px';
	
	let tipW = tip.getBoundingClientRect().width,
			tipH = tip.getBoundingClientRect().height;
	
	kooltip.tipWidth = tipW;
	kooltip.tipHeight = tipH;
	
	tip.style.top = (kooltip.triggerY - kooltip.tipHeight - 5) + 'px';

	let tipX = tip.getBoundingClientRect().left + window.scrollX,
			tipY = tip.getBoundingClientRect().top + window.scrollY;
	
	tip.style.left = tipX - (kooltip.tipWidth / 2) + 'px'; //shift tip to left so the tip arrow is centered over center of trigger
	
	tip.style.top = (kooltip.triggerY - kooltip.tipHeight - 5) + 'px';
	kooltip.tipHeight = tipH;
	
	kooltip.tipX = tipX - (kooltip.tipWidth / 2);
	kooltip.tipY = tipY;
	
	//checks if tooltip is within 5px of edge of viewport, if so, runs repositionTooltip function
	if (kooltip.tipX < 5 || (kooltip.tipX + kooltip.tipWidth) > (window.innerWidth - 5) 
			|| kooltip.tipY < 5 || (kooltip.tipY + kooltip.tipHeight) > (window.innerHeight - 5)) 
	{
		kooltip.repositionTooltip(tip);
	}
}

//step 4 - reposition tooltip if it flows off the page
kooltip.repositionTooltip = function(tip) {
	
	//helper function to make a tip that is flowing off the page multiple lines so it fits on the page
	kooltip.makeMultiline = function(tip) {
		tip.classList.add('multiline');
		kooltip.tipHeight = tip.getBoundingClientRect().height;
		kooltip.tipWidth = tip.getBoundingClientRect().width;
		
		//now that text is multiline, adjust its width to better fit its text
		const textNode = tip.firstChild,
					range = document.createRange();
		range.selectNodeContents(textNode);
		
		const rects = range.getClientRects();
		if (rects.length > 0) {
				let sidePadding = window.getComputedStyle(tip,null).getPropertyValue('padding-left').match(/\d+/);
				tip.style.width = rects[0].width + (sidePadding * 2) + 'px';
				kooltip.tipWidth = tip.getBoundingClientRect().width;
		}
	}
	
	//overflows on left
	if (kooltip.tipX < 5) {
		kooltip.tipX = parseInt(5);
		tip.style.left = '5px';
		tip.classList.add('kooltip--left-aligned');
		let centerOfTrigger = (parseInt(kooltip.triggerX) - 5) + (parseInt(kooltip.triggerWidth / 2)) - 8; //8 is the width of the triangle itself
		tip.style.setProperty('--left-arrow', centerOfTrigger + 'px');
	}
	
	//overflows on right
	if ((kooltip.tipX + kooltip.tipWidth) > (window.innerWidth - 5)) {
		
		if (tip.classList.contains('kooltip--left-aligned')) {
			kooltip.makeMultiline(tip);
		} else {
			kooltip.tipX = window.innerWidth - kooltip.tipWidth + 5; 
			tip.style.left = `calc(100% - ${kooltip.tipWidth + 5}px`;
			tip.classList.add('kooltip--right-aligned');
			let centerOfTrigger = (parseInt(kooltip.triggerX) - parseInt(kooltip.tipX)) + (parseInt(kooltip.triggerWidth / 2));
			tip.style.setProperty('--right-arrow', centerOfTrigger + 'px');
			
			//overflows on left
			if (kooltip.tipX < 5) {
				kooltip.makeMultiline(tip);
				tip.style.left = '5px';
				
				centerOfTrigger = (parseInt(kooltip.triggerX) + 8);
				tip.style.setProperty('--right-arrow', centerOfTrigger + 'px');
				kooltip.tipHeight = tip.getBoundingClientRect().height;
			}
		}
	}
		
	//helper function to check if the tip is flowing off the top of the page
	kooltip.checkTopOverflow = function() {
		kooltip.tipY = kooltip.triggerY + kooltip.triggerHeight + 8;
		tip.style.top = kooltip.triggerY + kooltip.triggerHeight + 8 + 'px';
		tip.classList.add('kooltip--top-aligned');
	}
	
	//overflow on top
	if (kooltip.tipY < 5) {
		kooltip.checkTopOverflow();
	}
	
	//if it's now a multiline tip and not top aligned, it will need to be shifted up according to its new multiline height
	if (tip.classList.contains('multiline') && !tip.classList.contains('kooltip--top-aligned')) {
		kooltip.tipY = kooltip.tipY - kooltip.tipHeight + 21;
		tip.style.top = kooltip.tipY + 'px';
		
		if (kooltip.tipY < 5) {
			kooltip.checkTopOverflow();
		}
	}
}

//step 4 - on mouseleave/touchleave/blur - remove tooltip from page completely, reset object data
kooltip.removeTooltip = function() {
	const tip = document.querySelector('.kooltip');
	if (tip) {
		document.body.removeChild(tip);
	}
	kooltip.triggerWidth = '';
	kooltip.triggerHeight = '';
	kooltip.triggerX = '';
	kooltip.triggerY = '';
	kooltip.tipWidth = '';
	kooltip.tipHeight = '';
	kooltip.tipX = '';
	kooltip.tipY = '';
}

//event listeners
toolTipTriggers.forEach((toolTipTrigger, i) => {
	toolTipTrigger.setAttribute('aria-describedby', `kooltip-${i}`);
	toolTipTrigger.setAttribute('tabindex', '0');
	toolTipTrigger.addEventListener('mouseenter', kooltip.createTooltip, false);
	toolTipTrigger.addEventListener('focus', kooltip.createTooltip, false);
	toolTipTrigger.addEventListener('mouseleave', kooltip.removeTooltip, false);
	toolTipTrigger.addEventListener('blur', kooltip.removeTooltip, false);
});

//test buttons
const testButtons = document.querySelectorAll('.change-cat');
testButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const catToChange = button.getAttribute('data-change-cat'),
                newCat = document.getElementById('change-cat1').value,
                newSubcat = document.getElementById('change-subcat1').value,
                newText = document.getElementById('change-text').value;
        console.log(catToChange);

        categoryList[`${catToChange-1}`]['cat'] = newCat;
        categoryList[`${catToChange-1}`]['subcat'] = newSubcat;
        categoryList[`${catToChange-1}`]['description'] = newText;
        setCategories();
        alert(`changed category #${catToChange}!\nthe category is now ${newCat}, looking for games matching value ${newSubcat} (${newText})`);
    });
});
