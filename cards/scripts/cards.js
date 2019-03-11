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
				cardStyle: 'topps2001',
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
				logo: 'phillies.png',
				position: 'DH',
				recordsType: 'batting',
				cardStyle: 'topps2001',
				cardNo: 793,
				sources: 'It\'s Always Sunny in Philadelphia, episode 10x1 "The Gang Beats Boggs"',
				// isHorizontal: true,
				statsYear1: {
						year: 2015, g: 1, ab: 1, '2b': 1, avg: '1.000', beers: 71
				},
				totals: {
						year: 'totals', g: 1, ab: 1, '2b': 1, avg: '1.000', beers: 71
				}
			},
			{
				name: 'Calvin',
			  string: 'calvin',
				media: 'Calvin and Hobbes',
			 	story: 'Over his playing career, Calvin frequently was traded between Team Calvin and Team Hobbes, sometimes even in the middle of a play. Notably in his rookie year, he grounded into a 1-4-3 double play, where he was the second baseman on the play. He also had a brief stint on Team 5, where he caught a flyball for the wrong team.',
				team: 'Hobbes',
				logo: 'hobbes.png',
				position: 'LF',
				recordsType: 'batting',
				cardStyle: 'topps2001',
				cardNo: 794,
				sources: 'The Complete Calvin and Hobbes, comics dated 6/22/86, 8/1/86, 2/10/87, 6/10/87, 8/9/87, 5/22/88, 6/9/88, 6/19/88, 7/17/88, 8/6/89, 8/24/89, 5/1/90, 6/24/90, 7/22/90, 8/8/90, 5/23/93, 12/12/93, 3/15/95',
				// isHorizontal: true,
				statsYear1: {
						year: 1986, g: 2, ab: 1, h: 0, '2b': 0, '3b': 0, hr: 0, rbi: 0, sb: 0, so: 0, avg: '.000'
				},
				statsYear2: {
						year: 1987, g: 3, ab: 0, h: 0, '2b': 0, '3b': 0, hr: 0, rbi: 0, sb: 0, so: 0, avg: '-'
				},
				statsYear3: {
						year: 1988, g: 3, ab: 2, h: 2, '2b': 0, '3b': 0, hr: 1, rbi: 1, sb: 3, so: 0, avg: '1.000'
				},
				statsYear4: {
						year: 1989, g: 2, ab: 3, h: 2, '2b': 0, '3b': 0, hr: 2, rbi: 2, sb: 0, so: 1, avg: '.667'
				},
				statsYear5: {
						year: 1990, g: 2, ab: 2, h: 2, '2b': 0, '3b': 1, hr: 0, rbi: 0, sb: 0, so: 0, avg: '1.000'
				},
				statsYear6: {
						year: 1993, g: 1, ab: 2, h: 2, '2b': 1, '3b': 0, hr: 0, rbi: 0, sb: 0, so: 0, avg: '1.000'
				},
				statsYear7: {
						year: 1995, g: 1, ab: 1, h: 0, '2b': 0, '3b': 0, hr: 0, rbi: 0, sb: 0, so: 1, avg: '.000'
				},
				totals: {
						year: 'totals', g: 14, ab: 11, h: 8, '2b': 1, '3b': 1, hr: 3, rbi: 3, sb: 3, so: 2, avg: '.727'
				}
			},
			{
				name: 'Kyle Stark',
			  string: 'kylestark',
				media: 'MLB The Show 18',
			 	story: 'After finishing 2nd in Rookie of the Year voting with the Marlins, Stark was traded to the Mariners before his sophomore season. Known for his speed, in 2020 he broke the single season record for stolen bases with 164, finishing the year with a .965 stolen base percentage. In 2022, Stark made his 4th straight All Star appearance as the starting 3rd Baseman.',
				team: 'Seattle Mariners&trade;',
				logo: 'mariners.png',
				position: '3B',
				recordsType: 'batting',
				cardStyle: 'topps2019',
				cardNo: 795,
				info1: 'Ht: 5\'8\" Wt: 160 Bats: Right Throws: Right',
				info2: 'Drafted: Marlins #26-2018. Acq. Trade w/ Marlins, 2019.',
				sources: 'MLB The Show 18 statistics page',
				// isHorizontal: true,
				statsYear1: {
						year: 2019, tm: 'mia', g: 100, ab: 318, r: 73, h: 132, '2b': 23, '3b': 8, hr: 25, rbi: 68, avg: '.415', obp: '.412', slg: '.777', war: '9.0', sb: '<i><b>125</b></i>', cs: 8, bb: '0', so: '6'
				},
				statsYear2: {
						year: 2020, tm: 'sea', g: 155, ab: 618, r: 104, h: 191, '2b': 28, '3b': 9, hr: 27, rbi: 80, avg: '.309', obp: '.314', slg: '.519',  war: '7.7', sb: '<i><b>164</b></i>', cs: 6, bb: '3', so: '70'
				},
				statsYear3: {
						year: 2021, tm: 'sea', g: 160, ab: '<i><b>682</b></i>', r: 93, h: 186, '2b': 24, '3b': 14, hr: 33, rbi: 84, avg: '.273', obp: '.287', slg: '.494', war: '6.0', sb: '<i><b>139</b></i>', cs: 7, bb: '14', so: '77'
				},
				statsYear4: {
						year: 2022, tm: 'sea', g: 148, ab: 624, r: 94, h: 188, '2b': 30, '3b': '<i><b>14</b></i>', hr: 26, rbi: 103, avg: '.301', obp: '.310', slg: '.519', war: '5.1', sb: '<i><b>142</b></i>', cs: 6, bb: '7', so: '54'
				},
				totals: {
						year: 'totals', tm: '', g: 563, ab: 2242, r: 364, h: 697, '2b': 105, '3b': 45, hr: 111, rbi: 335, avg: '.311', obp: '.318', slg: '.546', war: '27.8', sb: 570, cs: 27, bb: 24, so: 207
				}
			}
		]
	},
	computed: {
		filteredList () {
			return this.players.filter(player => {
				return player.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1
					|| player.media.toLowerCase().indexOf(this.query.toLowerCase()) > -1
					|| player.string.toLowerCase().indexOf(this.query.toLowerCase()) > -1
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
		flipCard(player, event) {
			let playerName = player.name;
			if (event.target.tagName.toLowerCase() != 'a') {
				document.querySelector(`[data-player="${playerName}"]`).classList.toggle('back-shown');
			}
		},
		cancelSearch() {
			this.query = '';
		},
		goToSource(cardNo) {
			const sources = document.querySelectorAll('.source');
			if (document.querySelector('details').open == false) {
				document.querySelector('summary').click();
			}

			sources.forEach(function(source) {
				source.style.backgroundColor = 'transparent';
			});

			document.querySelector('#source' + cardNo).style.backgroundColor = '#ccff15';
		}
	},
	beforeMount() {
		let url = window.location.href;
		if (url.indexOf('?q=') > -1) {
			this.query = url.substr((url.indexOf('?q='))+3, url.length);
		}
	}
})
