new Vue({
	el: '#app',
	data: {
		query: '',
		players: [
			{
				name: 'Ginny Baker',
			  string: 'ginnybaker',
				media: 'Pitch',
			 	story: 'Given jersey number 43 as a nod to Jackie Robinson\'s 42, Ginny Baker stunned the world when she became the first woman to play in the MLB. She also played in her first All-Star game during her rookie season, but surrendered a home run to the only batter she faced, the feared Salvador Pérez.',
				team: 'padres',
				logo: 'padres.svg',
				position: 'P',
				recordsType: 'pitching',
				rookie: true,
				cardStyle: 'style1',
				toppsPosition: 'top-left',
				cardNo: 792,
				sources: 'Pitch, episodes 1, 3-4, 6-8, 10',
			 	statsYear1: {
						year: '2016', w: 3, l: 1, era: 3.81, ip: 28.1, r: 12, er: 12, so: 13, bb: 4, sv: 1
				},
				totals: {
						year: 'totals', w: 3, l: 1, era: 3.81, ip: 28.1, r: 12, er: 12, so: 13, bb: 4, sv: 1
				}
			},
			{
				name: 'Charlie Kelly',
			  string: 'charliekelly',
				media: 'It\'s Always Sunny in Philadelphia',
			 	story: 'As the legend goes, Charlie Kelly beat Wade Boggs\' beer drinking record in 2015, having finished 71 beers on a cross country flight to Los Angeles. He then drunkenly hit a line drive off the wall on the first pitch he saw. When asked after the game how he felt about his performance, he stumbled a bit and said, "That\'s baseball, baby!"',
				team: 'Paddy\'s Pub',
				logo: 'paddys.png',
				position: 'DH',
				recordsType: 'batting',
				cardStyle: 'style2',
				toppsPosition: 'top-left',
				cardNo: 793,
				sources: 'It\'s Always Sunny in Philadelphia, episode 10x1 "The Gang Beats Boggs"',
				// isHorizontal: true,
				statsYear1: {
						year: 2015, g: 1, ab: 1, '2b': 1, avg: '1.000', beers: 71
				},
				totals: {
						year: 'totals', g: 1, ab: 1, '2b': 1, avg: '1.000', beers: 71
				}
			}
		]
	},
	computed: {
		filteredList () {
			return this.players.filter(player => {
				return player.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1
					|| player.media.toLowerCase().indexOf(this.query.toLowerCase()) > -1
			})
		}
	},
	filters: {
		trimFirst(value) {
			if (!value) return '';
			value = value.toString()
			return value.substr(value.indexOf(' ')+1, value.length);
		},
		trimLast(value) {
			if (!value) return '';
			value = value.toString()
			return value.substr(0, value.indexOf(' '));
		}
	},
	methods: {
		flipCard(player) {
			let playerName = player.name;
			document.querySelector(`[data-player="${playerName}"]`).classList.toggle('back-shown');
		},
		cancelSearch() {
			this.query = '';
		}
	}
})
