new Vue({
	el: '#app',
	data: {
		query: '',
		nquery: '',
		numberError: '',
		showTypeEffectivenessLink: false,
		typeEffectivenessLink: 'https://kylephx.com/pkmnchart',
		linkPreference: 'bulbapedia',
		totalPkmn: 1010,
		pokemonTypes: ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water'],
		pokemon: [
			{ number: 1, cost: 1, upgradedCost: 1, name: 'Strike', stringname: 'i1', type1: 'ironclad', type2: 'attack', evos: '0001-line', rarity: 'common' },
			{ number: 2, cost: 1, upgradedCost: 1, name: 'Defend', stringname: 'i2', type1: 'ironclad', type2: 'skill', evos: '0001-line', rarity: 'common' },
			{ number: 3, cost: 2, upgradedCost: 2, name: 'Bash', stringname: 'i4', type1: 'ironclad', type2: 'attack', evos: '0001-line', rarity: 'common' },
			{ number: 4, cost: 0, upgradedCost: 0, name: 'Anger', stringname: 'i5', type1: 'ironclad', type2: 'attack', evos: '0001-line', rarity: 'common' },
			{ number: 5, cost: 1, upgradedCost: 0, name: 'Body Slam', stringname: 'i5', type1: 'ironclad', type2: 'attack', evos: '0001-line', rarity: 'common' },
			{ number: 6, cost: 0, upgradedCost: 0, name: 'Clash', stringname: 'i5', type1: 'ironclad', type2: 'attack', evos: '0001-line', rarity: 'common' },
			{ number: 7, cost: 1, upgradedCost: 1, name: 'Cleave', stringname: 'i5', type1: 'ironclad', type2: 'attack', evos: '0001-line', rarity: 'common' },
			{ number: 8, cost: 2, upgradedCost: 2, name: 'Clothesline', stringname: 'i5', type1: 'ironclad', type2: 'attack', evos: '0001-line', rarity: 'common' },
			{ number: 9, cost: 1, upgradedCost: 1, name: 'Headbutt', stringname: 'i5', type1: 'ironclad', type2: 'attack', evos: '0001-line', rarity: 'common' },

			{ number: 9, cost: 2, upgradedCost: 2, name: 'Heavy Blade', stringname: 'i5', type1: 'ironclad', type2: 'attack', evos: '0001-line', rarity: 'common' },
			{ number: 9, cost: 1, upgradedCost: 1, name: 'Iron Wave', stringname: 'i5', type1: 'ironclad', type2: 'attack', evos: '0001-line', rarity: 'common' },
			{ number: 9, cost: 2, upgradedCost: 2, name: 'Perfected Strike', stringname: 'i5', type1: 'ironclad', type2: 'attack', evos: '0001-line', rarity: 'common' },
			{ number: 9, cost: 1, upgradedCost: 1, name: 'Pommel Strike', stringname: 'i5', type1: 'ironclad', type2: 'attack', evos: '0001-line', rarity: 'common' },
			{ number: 9, cost: 1, upgradedCost: 1, name: 'Sword Boomerang', stringname: 'i5', type1: 'ironclad', type2: 'attack', evos: '0001-line', rarity: 'common' },
			{ number: 9, cost: 1, upgradedCost: 1, name: 'Thunderclap', stringname: 'i5', type1: 'ironclad', type2: 'attack', evos: '0001-line', rarity: 'common' },
			{ number: 9, cost: 1, upgradedCost: 1, name: 'Thunderclap', stringname: 'i5', type1: 'ironclad', type2: 'attack', evos: '0001-line', rarity: 'common' },
			{ number: 9, cost: 1, upgradedCost: 1, name: 'Twin Strike', stringname: 'i5', type1: 'ironclad', type2: 'attack', evos: '0001-line', rarity: 'common' },
			{ number: 9, cost: 1, upgradedCost: 1, name: 'Wild Strike', stringname: 'i5', type1: 'ironclad', type2: 'attack', evos: '0001-line', rarity: 'common' },
			{ number: 999, cost: 1, upgradedCost: 1, name: 'Evolve', stringname: 'i3', type1: 'ironclad', type2: 'power', evos: '0001-line' },
		]
	},
	computed: {
		//filter list based on query entered
		filteredList () {
			//filter to show all pokemon
			if (this.query == 'all') {
				this.showTypeEffectivenessLink = false;

				return this.pokemon.filter(pokemon => {
					return pokemon.number > 0
				})
			}

			//if there is query, see if it matches one of the many cases below
			else if (this.query !== '') { 

				//if the query has a pokemon type in it, show and create the type effectiveness link
				if (this.query.includes('+') || this.pokemonTypes.includes(this.query) || this.query.includes('only')) {
					this.showTypeEffectivenessLink = true;

					if (this.query.includes('+')) {
						this.typeEffectivenessLink = `https://kylephx.com/pkmnchart?t1=${this.query.substring(0, this.query.indexOf('+'))}&t2=${this.query.substring(this.query.indexOf('+')+1, this.query.length)}`;
					} else {
						this.typeEffectivenessLink = `https://kylephx.com/pkmnchart?t1=${this.query.indexOf(' ') > -1 ? this.query.substring(0, this.query.indexOf(' ')) : this.query}`;
					}
				} else {
					this.showTypeEffectivenessLink = false;
				}

				//shows only pokemon where type 1 equals '(type) only'
				if (this.query.includes('only')) {
					return this.pokemon.filter(pokemon => {
						return pokemon.type1.indexOf(this.query.toLowerCase().substring(0, this.query.indexOf(' '))) > -1
							&& pokemon.type2 == ''
					})
				}

				return this.pokemon.filter(pokemon => {
						//matches the format 'prefix name suffix'
					return ((pokemon.prefix ? pokemon.prefix.toLowerCase() + ' ' : '') + pokemon.name.toLowerCase() + (pokemon.suffix ? ' ' + pokemon.suffix.toLowerCase() : '')).indexOf(this.query.toLowerCase()) > -1 
						//matches the format 'name prefix' ex. 'raichu alolan'
						|| (pokemon.name.toLowerCase() + ' ' + (pokemon.prefix ? pokemon.prefix.toLowerCase() : '')).indexOf(this.query.toLowerCase()) > -1 
						//matches term found in 'alt'
						|| (pokemon.alt ? pokemon.alt.toLowerCase().indexOf(this.query.toLowerCase()) > -1 : '') 
						//matches type searched in type1
						|| pokemon.type1.indexOf(this.query.toLowerCase()) > -1 
						//matches type searched in type2
						|| pokemon.type2.indexOf(this.query.toLowerCase()) > -1 //old 
						//matches both types searched in order
						|| (pokemon.type1 + '+' + pokemon.type2).toString().indexOf(this.query.toLowerCase()) > -1
						//matches both types searched, swapped
						|| (pokemon.type2 + '+' + pokemon.type1).toString().indexOf(this.query.toLowerCase()) > -1
				})
				
			} else {
				//if there's no query, only show first generation so page doesn't take too long to load all pokemon
				this.showTypeEffectivenessLink = false;
				return this.pokemon.filter(pokemon => {
					return pokemon.number <= 151
				})
			}
		}
	},
	methods: {
		focusSearchBar() {
			var searchBar = document.querySelector('#query');
			searchBar.focus();
		},
		focusNumberInput() {
			setTimeout(function() {
				var numberSearchBar = document.querySelector('#number-jump');
				numberSearchBar.focus();
			}, 250)
		},
		cancelSearch() {
			this.query = '';
			this.focusSearchBar();
		},
		showAll() {
			this.query = 'all';
		},
		setCookie(cookieName, value, days) {
			var expires = '';
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days*24*60*60*1000));
				expires = '; expires=' + date.toUTCString();
			}
			document.cookie = cookieName + '=' + (value || '')  + expires + '; path=/';
		},
		getCookie(cookieName) {
			var nameEQ = cookieName + '=';
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		},
		eraseCookie(cookieName) {   
			document.cookie = cookieName +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		},
		changeLinkPreference() {
			var linkPrefValue = document.querySelector('[name="link-preference"]:checked').value.toLowerCase();
			this.linkPreference = linkPrefValue;
			this.setCookie('linkPreference', this.linkPreference, 1095);
		},
		jumpToNumber(nquery) { //show all Pokemon and go to hash of number query
			if (nquery !== '' && !isNaN(nquery) && nquery < 10000) {
				this.query = 'all';
				this.numberError = '';
				closeDialog('bh-dialog-number');

				//if there is a pokemon with that number, scroll to it. Otherwise, scroll to the last numbered pokemon
				if (nquery <= this.totalPkmn) {
					location.hash = "#";

					setTimeout(function() {
						location.hash = "#n" + nquery;
					}, 250);
				} else {
					location.hash = "#";

					const pkmnCount = this.totalPkmn;
					setTimeout(function() {
						location.hash = "#n" + pkmnCount;
					}, 250);
				}

				this.nquery = '';
			} else {
				this.numberError = 'Number should be between 1 and 9999';
			}

		},
		createPkmnLink(number, name, stringname) {
			var href = '';

			if (this.linkPreference == 'serebii') {
			// since all pokemon aren't in all games yet, Serebii href will be different for each depending on their latest game

				let num = parseInt(number);

				//fix names as needed
				switch(num) {
					case (29): //Nidoran♀
						name = name.replace('♀','f');
					case (32): //Nidoran♂
						name = name.replace('♂','m');
				}

			} else { //default is bulbapedia
				href = `https://bulbapedia.bulbagarden.net/wiki/${name}_(Pokémon)`;
			}
			return href;
		},
		//if a pokemon type is clicked, filter by that type. if there's already a type in the filter, add it to the query (to search for dual types)
		createTypeQuery(typeClicked) {
			if (this.pokemonTypes.includes(this.query) && this.query !== typeClicked) {
				this.query = this.query + '+' + typeClicked;
			} else if (this.query == typeClicked) {
				this.query = this.query + ' only';
			} else {
				this.query = typeClicked;
			}

			if (document.querySelectorAll('.bh-dialog.open').length) {
				closeDialog('bh-dialog');
			}

			document.querySelector('#page-header').scrollIntoView();
		}
	},
	beforeMount() {
		//if there's a query string in the url, filter with that query
		let url = window.location.href;
		if (url.indexOf('?q=') > -1) {
			this.query = url.substring((url.indexOf('?q='))+3, url.length);
		}
	},
	mounted() {
		console.log(`Link preference: ${this.linkPreference}`);
		let url = window.location.href;
		if (url.indexOf('?linkPref=') > -1) {
			var linkPref = url.substring((url.indexOf('?linkPref='))+10, url.length);
			this.linkPreference = linkPref;
			document.getElementById(this.linkPreference).checked = true;
			this.setCookie('linkPreference', this.linkPreference, 1095);
		}

		//choose radio buttons based on preference cookies
		document.getElementById(this.linkPreference).checked = true;
	}
})