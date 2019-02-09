//classes for loops
const buttons = document.querySelectorAll('.show-stat');
const toggles = document.querySelectorAll('.update-stat');
const results = document.querySelectorAll('.result');
const outResults = document.querySelectorAll('.out-result');
const playTypes = document.querySelectorAll('.play');
const subplayTypes = document.querySelectorAll('.show-subcats');
const subGroups = document.querySelectorAll('.button-subgroup');
const subcategories = document.querySelectorAll('.button-subgroup-subcategory');
const positions = document.querySelectorAll('.position');

//baselines
const baselines = document.querySelectorAll('.baseline');
const baseline1 = document.querySelector('.single');
const baseline2 = document.querySelector('.double');
const baseline3 = document.querySelector('.triple');
const filled = document.querySelector('.homerun');

// results
const double = document.querySelector('#double');
const strikeout = document.querySelector('#strikeout');
const grdouble = document.querySelector('#grdouble');

//play checkers
const grdoubleCheck = document.querySelector('#grdouble-check');
const klookingCheck = document.querySelector('#klooking-check');
const homerunCheck = document.querySelector('#homerun-check');
const sacflyCheck = document.querySelector('#sacfly-check');
const dpCheck = document.querySelector('#dp-check');
const tpCheck = document.querySelector('#tp-check');
const errorCheck = document.querySelector('#error-check');
const walkCheck = document.querySelector('#walk-check');
const iwalkCheck = document.querySelector('#iwalk-check');
const hbpCheck = document.querySelector('#hbp-check');
const dropCheck1 = document.querySelector('#drop-type1');
const dropCheck2 = document.querySelector('#drop-type2');
const kCheck = document.querySelector('#k-check');
const doubleCheck = document.querySelector('#double-check');
const flyoutCheck = document.querySelector('#flyout-check');
const lineoutCheck = document.querySelector('#lineout-check');
const fouloutCheck = document.querySelector('#foulout-check');

//misc
const rbiUpdater = document.getElementById('rbi-updater');
const rbiGroup = document.querySelector('.rbi-group');
let rbiWrapper = document.querySelector('.rbi-wrap');
const hit = document.querySelector('#hit');
const alert = document.querySelector('.alert');
const atleast = document.querySelectorAll('.at-least');
const tick0 = document.querySelector('#tick0');
const tick1 = document.querySelector('#tick1');
const tick2 = document.querySelector('#tick2');
const tick3 = document.querySelector('#tick3');
const tick4 = document.querySelector('#tick4');
const positionsList = document.getElementById('positions-list');
const said = document.querySelector('#said');
const sayIt =
			[' single', ' double', ' ground rule double', ' triple', ' home run',
			 ' grand slam', 'struck out swinging', 'struck out looking', 'dropped 3rd strike, reached first on wild pitch',
			 'dropped 3rd strike, reached first on passed ball', ' fly out to ', ' line out to ', ' foul out to ',
			 ' ground out: ', ' double play: ', ' triple play: ', ' fielder\'s choice: ', ' sac fly to ',
			 ' sacrifice bunt: ', 'n infield fly',' walk', 'n intentional walk', ' hit by pitch',
			 'reached on error by '];
const sayRBI = ['', 'n RBI ', ' 2-run ', ' bases clearing ', ' bases loaded ', ' solo ', ' grand slam', ' 3-run '];
const sayFielders = ['', ' the pitcher', ' the catcher', ' the first baseman', ' the second baseman', ' the third baseman', ' the shortstop', ' the left fielder', ' the center fielder', ' the right fielder'];

//changing variables
let positionCount = 0;
let howToSay = [];
let restOfPositions = [];


//resets scorecard and shows the scoring result of the new play on the scorecard diamond
const showResult = function() {
		togglePositions(true);
		alert.classList.add('invisible');
	  positionsList.classList.add('hidden');
		positionCount = 0;
		said.innerHTML = '';
		howToSay = [];
		restOfPositions = [];

		if (this != kCheck && this != dropCheck1 && this != dropCheck2) {
			klookingCheck.checked = false;
		}

		if (this != doubleCheck) {
			grdoubleCheck.checked = false;
		}

		if (this != dropCheck1 && this != dropCheck2) {
			dropCheck1.checked = false;
			dropCheck2.checked = false;
		}

		if (this != dropCheck1 && this != dropCheck2 && this != klookingCheck && this != grdoubleCheck) {
			for (const element of subcategories) {
				element.classList.remove('open');
			}
		}

		for (const element of atleast) {
			element.classList.add('hidden');
		}

		for (const element of buttons) {
			element.classList.remove('k-active');
		}

		for (const element of results) {
			element.classList.remove('shown');
		}

		for (const element of outResults) {
			element.innerHTML = stripPositions(element.innerHTML);
			resizeText();
		}

		for (const element of positions) {
			element.classList.remove('k-active');
		}

		for (const element of baselines) {
			element.style.display = 'none';
		}

		if (this.classList.contains('positions-on')) {
			togglePositions(false);
			positionsList.classList.remove('hidden');
		}

		resetRBI();

		rbiGroup.classList.remove('hidden');
		this.classList.add('k-active');

		updateSaid();

		const getBaselines = this.getAttribute('data-baselines');

		switch (getBaselines) {
				case "1":
						baseline1.style.display = 'block';
						break;
				case "2":
						baseline1.style.display = 'block';
						baseline2.style.display = 'block';
						break;
				case "3":
						baseline1.style.display = 'block';
						baseline2.style.display = 'block';
						baseline3.style.display = 'block';
						break;
				case "4":
						filled.style.display = 'block';
						break;
		}

    const statCall = this.getAttribute('data-stat');
		const stat = document.getElementById(statCall);
		stat.classList.toggle('shown');

		resizeText();

		const shownResult = document.querySelector('.shown');
		let isFlyoutorError =
			(shownResult.innerHTML.slice(0,1) == 'F' &&
			 shownResult.innerHTML.slice(0,2) != 'FC') ||
			(shownResult.innerHTML.slice(0,2) == 'SF') ||
			(shownResult.innerHTML.slice(0,1) == 'L') ||
			(shownResult.innerHTML.slice(0,1) == 'E');

		if (isFlyoutorError == false) {
			for (const element of atleast) {
				element.classList.remove('hidden');
			}
		}

};

//make the position buttons available
const togglePositions = (toggled) => {
	for (const element of positions) {
		element.disabled = toggled;
	}
	alert.classList.remove('invisible');
}

//adds a position to the play
const addPositions = function() {
	positionCount++;
	const shownResult = document.querySelector('.shown');
	let resultText = shownResult.innerHTML;
	const positionNo = this.getAttribute('data-position');
	let newResultText = '';
	let isFlyoutorError =
			(shownResult.innerHTML.slice(0,1) == 'F' &&
			 shownResult.innerHTML.slice(0,2) != 'FC') ||
			(shownResult.innerHTML.slice(0,2) == 'SF') ||
			(shownResult.innerHTML.slice(0,1) == 'L') ||
			(shownResult.innerHTML.slice(0,1) == 'E');
	this.classList.add('k-active');

	resizeText();

	let positionSay = this.getAttribute('data-said');
	let positionString = sayFielders[positionSay];
	restOfPositions.push(positionString);

	updateSaid();

	if (positionCount == 1) {
		if (resultText.length > 0) { //if not a groundout
			let newResultText = resultText + positionNo;
			shownResult.innerHTML = newResultText;

			if (isFlyoutorError == true) {
				togglePositions(true);
			}

			alert.classList.add('invisible');

		} else { //unassisted groundout - fixes copy and adjusts scoring
			let newResultText = 'U' + positionNo;
			shownResult.innerHTML = newResultText;
			let currentSentence = document.querySelector('#said').innerHTML;
			let updatedSentence = '"an unassisted' + currentSentence.substring(2, currentSentence.length);
			let sentenceFixed = updatedSentence.replace(': ', ' to ');
			document.querySelector('#said').innerHTML = sentenceFixed;
		}
	} else {
		if (isFlyoutorError == false) {
			let newResultText = resultText + '-' + positionNo;
			if (newResultText.slice(0,1) == 'U') {
				newResultText = newResultText.slice(1, newResultText.length)
			}
			shownResult.innerHTML = newResultText;
		}
	}

	if (positionCount > 7) {
			let currentSentence = document.querySelector('#said').innerHTML;
			let updatedSentence = currentSentence + ' (PICKLE!)';
			document.querySelector('#said').innerHTML = updatedSentence;
	}


}

//removes positions that were added to the scorecard
const stripPositions = (str) => {
		var regex = new RegExp('([0-9])|-', 'g');
		return str.replace(regex, '');
}

//alter results based on play chosen
const updateResult = function() {
	if (this == grdoubleCheck) {
		if (grdoubleCheck.checked == true) {
			double.innerHTML = 'GRD';
			resizeText();
			let currentSentence = document.querySelector('#said').innerHTML;
			let updatedSentence = currentSentence.replace('double', 'ground rule double');
			document.querySelector('#said').innerHTML = updatedSentence;
		} else {
			double.innerHTML = '2B';
			resizeText();
			let currentSentence = document.querySelector('#said').innerHTML;
			let updatedSentence = currentSentence.replace('ground rule', '');
			document.querySelector('#said').innerHTML = updatedSentence;
		}
	}

	if (this == klookingCheck) {
		if (klookingCheck.checked == true) {
			strikeout.classList.add('strikeout-looking');
			let currentSentence = document.querySelector('#said').innerHTML;
			let updatedSentence = '"struck out looking"';
			document.querySelector('#said').innerHTML = updatedSentence;
		} else {
			strikeout.classList.remove('strikeout-looking');
			let currentSentence = document.querySelector('#said').innerHTML;
			let updatedSentence = '"struck out swinging"';
			document.querySelector('#said').innerHTML = updatedSentence;
		}
	}

	if (this == homerunCheck) {
		rbiUpdater.setAttribute('min', '1');
		rbiUpdater.setAttribute('max', '4');
		tick0.classList.add('hidden');
		tick4.classList.remove('hidden');
		var event = new Event('change');
		rbiUpdater.dispatchEvent(event);
	} else if (this == sacflyCheck) {
		rbiUpdater.setAttribute('min', '1');
		rbiUpdater.setAttribute('max', '3');
		tick0.classList.add('hidden');
		tick4.classList.add('hidden');
		var event = new Event('change');
		rbiUpdater.dispatchEvent(event);
 	} else if (this == dpCheck || this == tpCheck || this == kCheck || this == flyoutCheck || this == lineoutCheck || this == fouloutCheck) {
		rbiUpdater.setAttribute('min', '0');
		rbiUpdater.setAttribute('max', '0');
		tick1.classList.add('hidden');
		tick2.classList.add('hidden');
		tick3.classList.add('hidden');
		tick4.classList.add('hidden');
		rbiUpdater.setAttribute('value','0');
		var event = new Event('change');
		rbiUpdater.dispatchEvent(event);
	} else if (this == walkCheck || this == iwalkCheck || this == hbpCheck || this == errorCheck || this == dropCheck1 || this == dropCheck2) {
		rbiUpdater.setAttribute('min', '0');
		rbiUpdater.setAttribute('max', '1');
		tick2.classList.add('hidden');
		tick3.classList.add('hidden');
		tick4.classList.add('hidden');
		rbiUpdater.setAttribute('value','0');
		var event = new Event('change');
		rbiUpdater.dispatchEvent(event);
	}
}

//updates the sentence below the header that explains what the play is
const updateSaid = function() {
	howToSay = [];

	//get play
	let active = document.querySelectorAll('.subplay.k-active');
	for (const element of active) {
		let saidString = element.getAttribute('data-said');
		howToSay.push(sayIt[saidString]);
	}

	//get positions
	let activePositions = document.querySelectorAll('.position.k-active');
	for (const element of activePositions) {
		let saidString = element.getAttribute('data-said');
		howToSay.push(sayFielders[saidString]);
	}
	if (howToSay[1] == undefined) {
		howToSay[1] = '';
	}

	//get rbi
	let currentRBI = Number(rbiUpdater.value);
	let saidRBI = '';

	//fix certain plays to have better verbiage
	if (currentRBI == 1 && howToSay[0] == ' home run') {
		saidRBI = sayRBI[5];
	} else if (currentRBI == 3 && howToSay[0] == ' home run') {
		saidRBI = sayRBI[7];
	} else if (currentRBI == 4 && howToSay[0] == ' home run') {
		saidRBI = sayRBI[6];
		howToSay[0] = '';
	} else if (currentRBI == 1 && howToSay[0] == ' walk' ||
						 currentRBI == 1 && howToSay[0] == ' hit by pitch') {
		saidRBI = sayRBI[4];
	} else if (currentRBI == 1 && howToSay[0] == 'n intentional walk') {
		saidRBI = sayRBI[4];
		howToSay[0] = ' intentional walk';
	} else if (currentRBI == 1 && howToSay[0] == ' sac fly to ') {
		saidRBI = sayRBI[0];
	} else if (grdoubleCheck.checked == true) {
		saidRBI = sayRBI[currentRBI];
	 	howToSay[0] = sayIt[2];
	} else if (dropCheck1.checked == true) {
		saidRBI = sayRBI[currentRBI];
	 	howToSay[0] = sayIt[8];
	} else if (dropCheck2.checked == true) {
		saidRBI = sayRBI[currentRBI];
	 	howToSay[0] = sayIt[9];
	}
	else {
		saidRBI = sayRBI[currentRBI];
	}

	//fix sentences with multiple positions
	let positionsUpdate = restOfPositions.toString().replace(/,/g,' to ');
	if (positionsUpdate == undefined) {
		positionsUpdate = '';
	}

	//build sentence
	let finalString = '"a' + saidRBI + howToSay[0] + positionsUpdate + '"';

	//one last fix for a few plays
	if (finalString.includes('astruck') || finalString.includes('areached') || finalString.includes('adropped')) {
		said.innerHTML = '"' + finalString.substring(2, finalString.length);
	} else {
		said.innerHTML = finalString;
	}
}

//resets RBI counter to its initial state
const resetRBI = () => {
		rbiUpdater.setAttribute('min', '0');
		rbiUpdater.setAttribute('max', '0');
		rbiWrapper.innerHTML = '';
		rbiUpdater.setAttribute('max', '3');
		tick0.classList.remove('hidden');
		tick1.classList.remove('hidden');
		tick2.classList.remove('hidden');
		tick3.classList.remove('hidden');
		tick4.classList.add('hidden');
}

//resizes scorecard text based on number of characters
const resizeText = () => {
	for (const element of results) {
		var charCount = element.textContent.length;

		element.classList.remove('xlarge','large','medium','small');

		if (charCount > 2 && charCount <= 4) {
			element.classList.add('xlarge');
		}

		if (charCount > 4 && charCount <= 6) {
			element.classList.add('large');
		}

		if (charCount > 6 && charCount <= 15) {
			element.classList.add('medium');
		}

		if (charCount > 15) {
			element.classList.add('small');
		}
	}
}

//shows the buttons within Hit, Out, Other
const showSubgroup = function() {
	for (const element of subGroups) {
		element.classList.remove('open');
	}
	this.nextElementSibling.classList.toggle('open');
}

//shows the categories for Double, Strikeout
const showSubcategory = function() {
	this.nextElementSibling.classList.toggle('open');
}

//resets entire scorecard to its initial state
const hardReset = function() {
	togglePositions(true);
	alert.classList.add('invisible');
	positionsList.classList.add('hidden');
	positionCount = 0;
	said.innerHTML = '';
	klookingCheck.checked = false;
	grdoubleCheck.checked = false;
	dropCheck1.checked = false;
	dropCheck2.checked = false;
	for (const element of subcategories) {
		element.classList.remove('open');
	}
	for (const element of atleast) {
		element.classList.add('hidden');
	}
	for (const element of buttons) {
		element.classList.remove('k-active');
	}
	for (const element of results) {
		element.classList.remove('shown');
	}
	for (const element of outResults) {
		element.innerHTML = stripPositions(element.innerHTML);
		resizeText();
	}
	for (const element of positions) {
		element.classList.remove('k-active');
	}
	for (const element of baselines) {
		element.style.display = 'none';
	}
	resetRBI();
	rbiGroup.classList.add('hidden');
	resizeText();
	for (const element of subGroups) {
		element.classList.remove('open');
	}
}

//listeners
const updateRBI = rbiUpdater.addEventListener('change', function() {
	let rbiWrapper = document.querySelector('.rbi-wrap');
	rbiWrapper.innerHTML = '';
	let currentRBI = Number(rbiUpdater.value);
	for (let i = 0; i < currentRBI; i++) {
		rbiWrapper.innerHTML += '<div class="rbi-dot"></div>';
	}

	updateSaid();
});

document.querySelector('#reset').addEventListener('click', hardReset);

//attach all click listeners
for (const element of buttons) {
	element.addEventListener('click', showResult);
}

for (const element of toggles) {
	element.addEventListener('click', updateResult);
}

for (const element of playTypes) {
	element.addEventListener('click', showSubgroup);
}

for (const element of subplayTypes) {
	element.addEventListener('click', showSubcategory);
}

for (const element of positions) {
	element.addEventListener('click', addPositions);
}

document.addEventListener("DOMContentLoaded", function() {
    //load example - 2-run double
		let event = new Event('click');
		hit.dispatchEvent(event);
		let event2 = new Event('click');
		doubleCheck.dispatchEvent(event2);
		rbiUpdater.setAttribute('value','2');
		let event3 = new Event('change');
		rbiUpdater.dispatchEvent(event3);
		updateSaid();
});
