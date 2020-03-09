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
				team: 'Padres',
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
				team: 'Phillies',
				logo: 'phillies.png',
				position: 'DH',
				recordsType: 'batting',
				cardStyle: 'topps2001',
				cardNo: 793,
				sources: 'It\'s Always Sunny in Philadelphia, episode 10x1 "The Gang Beats Boggs"',
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
			},
			{
				name: 'Gene Belcher',
			  string: 'genebelcher',
				media: 'Bob\'s Burgers',
			 	story: 'Donning his baseball capris and top, Gene rode the bench for most of his rookie season with the Devils. Striking out in every at bat and committing countless errors in the field would cause his team to lose. One fly ball to left field even caused him to pull his cup out of his jockstrap to shield his head from the ball. Despite his failures, Gene remains positive in his outlook on the sport: "I love baseball! The pizza parties, the spiky shoes, the parade at the end of the season where we ride on a float."',
				team: 'Recreation League Devils&trade;',
				logo: 'devils.png',
				position: 'LF',
				recordsType: 'batting',
				cardStyle: 'topps2019',
				cardNo: 796,
				info1: 'Ht: 4\'10\" Wt: 105 Bats: Right Throws: Right',
				info2: 'Drafted: 2013. Attended The Deuce of Diamonds\' Diamonds in the Rough in the Diamond Baseball Camp',
				sources: 'Bob\'s Burgers, episode 3x23 "The Unnatural"',
				// isHorizontal: true,
				statsYear1: {
						year: 2013, tm: 'devils', g: 2, ab: 3, r: 0, h: 0, so: 2, avg: '.000'
				},
				totals: {
						year: 'totals', tm: '', g: 2, ab: 3, r: 0, h: 0, so: 2, avg: '.000'
				}
			},
			{ 
				name: 'Henry Rowengartner',
			  	string: 'henryrowengartner',
				media: 'Rookie of the Year',
			 	story: 'Known around the Cubs clubhouse as Rulingfurter, Rosinbagger, and even Gardenhoser, Henry was signed right out of junior high after a freak accident caused him to be able to throw at incredible speeds. After several successful outings with the Cubs, his agent/mom\'s boyfriend tried to get him to sign a contract to join the New York Yankees, much to his mother\'s disapproval. Rowengartner retired after striking out Mets\' feared slugger Heddo, helping the Cubs win the pennant, and eventually, the World Series.',
				team: 'Chicago Cubs<sup>&reg;</sup>',		
				logo: 'cubs.svg',
				position: 'P',
				recordsType: 'pitching',
				cardStyle: 'topps2019',
				cardNo: 797,	
				orderNo: 7,
				info1: 'Ht: 4\'11\" Wt: 88 Bats: Right Throws: Right',
				info2: 'Signed: 1993. Retired from MLB: 1993.',
				sources: 'Rookie of the Year film',
				// isHorizontal: true,
				statsYear1: {
						year: 1993, tm: 'CHC', w: 0, l: 0, era: 1.59, ip: 5.2, sv: 3, so: 12, bb: 2, hbp: 2, hr: 1
				},
				totals: {
						year: 'totals', tm: '', w: 0, l: 0, era: 1.59, ip: 5.2, sv: 3, so: 12, bb: 2, hbp: 2, hr: 1
				}
			},
			{ 
				name: 'Kenny Powers',
			  string: 'kennypowers',
				media: 'Eastbound & Down',
				story: 'While playing for Seattle (his fifth ballclub in 5 seasons), Kenny gave up a grand slam to his nemesis Reg Mackworthy, which would ultimately end his MLB career. He became a free agent again in 2007 and has yet to sign with a new team.',
				team: 'Seattle Mariners&trade;',		
				logo: 'mariners2.png',
				position: 'Pitcher',
				recordsType: 'pitching',
				cardStyle: 'fleer2001',
				cardNo: 798,
				info1: 'Height: 5\'8\"&nbsp;&nbsp;&nbsp; Weight: 210&nbsp;&nbsp;&nbsp; Bats: Right&nbsp;&nbsp;&nbsp; Throws: Right',
				info2: 'Drafted: 1st Round, 1999.&nbsp;&nbsp;&nbsp; Acq. via Free Agency, 2006.',
				sources: 'Eastbound & Down, episodes 1, 3, 5 (add more from seasons 2-4); <a href="https://web.archive.org/web/20120615223015/http://www.kennypowers.com/cards.html" target="_blank">HBO Archive</a>; <a href="http://www.kennypowersfanclub.com/kennypowers/stats.php" target="_blank">Kenny Powers Fan Club</a>; <a href="https://www.cardboardconnection.com/kenny-powers-baseball-card-collection-from-hbos-eastbound-down" target="_blank">Cardboard Connection</a>',
				isHorizontal: true,
				statsYear1: {
						year: 2002, club: 'atl', g: 62, w: 7, l: 3, ip: 66.1, er: 21, era: 2.85, sv: 49, so: 106, bb: 30
				},
				statsYear2: {
						year: 2003, club: 'nyy', g: 64, w: 7, l: 3, ip: 62.2, er: 33, era: 4.74, sv: 39, so: 79, bb: 20
				},
				statsYear3: {
						year: 2004, club: 'sfg', g: 52, w: 3, l: 10, ip: 54.2, er: 40, era: 6.59, sv: 30, so: 44, bb: 27
				},
				statsYear4: {
						year: 2005, club: 'bos', g: 15, w: 0, l: 6, ip: 12.2, er: 12, era: 8.53, sv: 3, so: 6, bb: 9
				},
				statsYear5: {
						year: 2006, club: 'sea', g: 1, w: 0, l: 1, ip: 0, er: 1, era: 'inf', sv: 0, so: 0, bb: 0
				},
				totals: {
						year: 'mlb totals', club: '', g: 194, w: 17, l: 18, ip: 196.1, er: 107, era: 4.90, sv: 121, so: 235, bb: 86
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
					|| player.team.toLowerCase().indexOf(this.query.toLowerCase()) > -1
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
