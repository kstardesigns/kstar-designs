new Vue({
	el: '#app',
	data: {
		query: '',
		showTypeEffectivenessLink: false,
		linkPreference: 'bulbapedia',
		pokemonTypes: ['controlled-scene', 'experiential', 'game-shows', 'interviews', 'literary', 'long-form', 'misc', 'montage', 'music', 'naive', 'one-liners', 'restriction', 'scene-replay', 'styled-scenes', 'venting', 'warm-ups', 'word-at-a-time', 'workshop'],
		pokemon: [
			{ number: '1', name: 'Avante-Garde Musical', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '2', name: 'Changing Emotions', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '3', name: 'Changing Genres', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '4', name: 'Changing Mall', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '5', name: 'Comic Panel', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '6', name: 'Dimestore Novel', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '7', name: 'Film Noir', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '8', name: 'Film Strip', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '9', name: 'Foreign Movie', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '10', name: 'Foreign Opera', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '11', name: 'Good Things/Bad Things', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '12', name: 'Hesitation', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '13', name: 'Hesitation Debate', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '14', name: 'Hesitation Speech', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '15', name: 'Movie Guys', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '16', name: 'Moving Bodies', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '17', name: 'Play', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '18', name: 'Playwright', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '19', name: 'Silence & Sound', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '20', name: 'Slice of Life', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '21', name: 'Slide Show', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '22', name: 'Slow Motion', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '23', name: 'Soundscape', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '24', name: 'Time Machine', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '25', name: 'Trigger Word', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '26', name: 'What are you Thinking?', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '27', name: 'VCR', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '28',  name: 'Video Review', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '29',  name: 'Scenes from a Hats', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },
			{ number: '30',  name: 'What could possibly go wrong now?', stringname: '432', type1: 'controlled-scene', link: 'http://fuzzyco.com/super/improv/games.html#control' },


			{ number: '31', name: 'Audience Dialogue', stringname: '164', type1: 'misc', link: 'http://fuzzyco.com/super/improv/games.html#misc' },


			{ number: '32', name: 'The Opening', stringname: '224', type1: 'experiential', link: 'http://fuzzyco.com/super/improv/games.html#experiential' },


			{ number: '33', name: 'Dating game', stringname: '061', type1: 'game-shows', link: 'http://fuzzyco.com/super/improv/games.html#gameshows' },
			{ number: '34', name: '$5 Rhombus', stringname: '061', type1: 'game-shows', link: 'http://fuzzyco.com/super/improv/games.html#gameshows' },
			{ number: '35', name: 'Jeopardy', stringname: '061', type1: 'game-shows', link: 'http://fuzzyco.com/super/improv/games.html#gameshows' },


			{ number: '36', name: 'Arms', stringname: '027', type1: 'interviews', link: 'http://fuzzyco.com/super/improv/games.html#interviews' },
			{ number: '37', name: 'Good Advice, Bad Advice, Worst Advice', stringname: '027', type1: 'interviews', link: 'http://fuzzyco.com/super/improv/games.html#interviews' },
			{ number: '37',  name: 'Interpreter', stringname: '027', type1: 'interviews', link: 'http://fuzzyco.com/super/improv/games.html#interviews' },
			{ number: '38', name: 'Man on the Street', stringname: '027', type1: 'interviews', link: 'http://fuzzyco.com/super/improv/games.html#interviews' },
			{ number: '38',  name: 'Press Conference', stringname: '027', type1: 'interviews', link: 'http://fuzzyco.com/super/improv/games.html#interviews' },
			{ number: '39', name: 'What will they think of next?', stringname: '027', type1: 'interviews', link: 'http://fuzzyco.com/super/improv/games.html#interviews' },
			{ number: '40', name: 'Voices in my head', stringname: '027', type1: 'interviews', link: 'http://fuzzyco.com/super/improv/games.html#interviews' },


			{ number: '41', name: 'Actors Nightmare', stringname: '186', type1: 'literary', link: 'http://fuzzyco.com/super/improv/games.html#literary' },
			{ number: '42', name: 'Madrigal', stringname: '186', type1: 'literary', link: 'https://fuzzyco.com/super/improv/games.html#literary' },
			{ number: '43', name: 'Poets', stringname: '186', type1: 'literary', link: 'http://fuzzyco.com/super/improv/games.html#literary' },
			{ number: '44', name: 'Sonnett', stringname: '186', type1: 'literary', link: 'http://fuzzyco.com/super/improv/games.html#literary' },
			{ number: '45', name: 'Sounds Effects Story', stringname: '186', type1: 'literary', link: 'http://fuzzyco.com/super/improv/games.html#literary' },
			{ number: '46', name: 'Story', stringname: '186', type1: 'literary', link: 'http://fuzzyco.com/super/improv/games.html#literary' },



			{ number: '47', name: 'Harold', stringname: '458', type1: 'long-form', link: 'http://fuzzyco.com/super/improv/longform.html#HAROLD' },
			{ number: '48', name: 'Deconstruction', stringname: '458', type1: 'long-form', link: 'http://fuzzyco.com/super/improv/longform.html#DECONSTRUCTION' },
			{ number: '49', name: 'Drake', stringname: '458', type1: 'long-form', link: 'http://fuzzyco.com/super/improv/longform.html#DRAKE' },
			{ number: '50', name: 'Dream', stringname: '458', type1: 'long-form', link: 'http://fuzzyco.com/super/improv/longform.html#DREAM' },
			{ number: '51', name: 'Horror (impressionistic)', stringname: '458', type1: 'long-form', link: 'http://fuzzyco.com/super/improv/longform.html#HORROR%20(IMPRESSIONISTIC)' },
			{ number: '52', name: 'Check-in', stringname: '458', type1: 'long-form', link: 'http://fuzzyco.com/super/improv/longform.html#CHECK-IN' },
			{ number: '53', name: 'Time Dash', stringname: '458', type1: 'long-form', link: 'http://fuzzyco.com/super/improv/longform.html#TIME%20DASH' },
			{ number: '54',  name: 'Playback Theater', stringname: '458', type1: 'long-form', link: 'http://fuzzyco.com/super/improv/longform.html#PLAYBACK%20THEATER' },
			{ number: '55',  name: 'Four Seasons Forum', stringname: '458', type1: 'long-form', link: 'http://fuzzyco.com/super/improv/longform.html#FOUR%20SEASONS%20FORUMs' },
			{ number: '56',  name: 'Slacks and Bouncing Ball', stringname: '458', type1: 'long-form', link: 'http://fuzzyco.com/super/improv/longform.html#SLACKERS%20and%20BOUNCING%20BALL' },
			{ number: '57', name: 'You Are Here or Location', stringname: '458', type1: 'long-form', link: 'http://fuzzyco.com/super/improv/longform.html#YOU%20ARE%20HERE%20or%20LOCATION' },
			{ number: '58',  name: 'Feature Film', stringname: '458', type1: 'long-form', link: 'http://fuzzyco.com/super/improv/longform.html#FEATURE%20FILM' },



			
			{ number: '59', name: 'Emotional Symphony', stringname: '164', type1: 'misc', link: 'http://fuzzyco.com/super/improv/games.html#misc' },
			{ number: '60', name: 'Five Things', stringname: '164', type1: 'misc', link: 'http://fuzzyco.com/super/improv/games.html#misc' },
			{ number: '61', name: 'Flash Back', stringname: '164', type1: 'misc', link: 'http://fuzzyco.com/super/improv/games.html#misc' },
			{ number: '62', name: 'Foreign Folk Song', stringname: '164', type1: 'misc', link: 'http://fuzzyco.com/super/improv/games.html#misc' },
			{ number: '63', name: 'Happy Ads', stringname: '164', type1: 'misc', link: 'http://fuzzyco.com/super/improv/games.html#misc' },
			{ number: '64', name: 'History', stringname: '164', type1: 'misc', link: 'http://fuzzyco.com/super/improv/games.html#misc' },
			{ number: '65', name: 'Linking', stringname: '164', type1: 'misc', link: 'http://fuzzyco.com/super/improv/games.html#misc' },
			{ number: '66', name: 'Montage', stringname: '164', type1: 'misc', link: 'http://fuzzyco.com/super/improv/games.html#misc' },
			{ number: '67', name: 'Newscaster', stringname: '164', type1: 'misc', link: 'http://fuzzyco.com/super/improv/games.html#misc' },
			{ number: '68', name: 'Paired Sound Effects', stringname: '164', type1: 'misc', link: 'http://fuzzyco.com/super/improv/games.html#misc' },
			{ number: '69', name: 'Wild Sex on Stage', stringname: '164', type1: 'misc', link: 'http://fuzzyco.com/super/improv/games.html#misc' },
			{ number: '70', name: 'Yellow Pages', stringname: '164', type1: 'misc', link: 'http://fuzzyco.com/super/improv/games.html#misc' },



			{ number: '71', name: 'Channel Surfing', stringname: '100', type1: 'montage', link: 'http://fuzzyco.com/super/improv/games.html#montage' },
			{ number: '72', name: 'Cocktail Party', stringname: '100', type1: 'montage', link: 'http://fuzzyco.com/super/improv/games.html#montage' },
			{ number: '73', name: 'Spoon River Anthology', stringname: '100', type1: 'montage', link: 'http://fuzzyco.com/super/improv/games.html#montage' },
			{ number: '74', name: 'Radio', stringname: '100', type1: 'montage', link: 'http://fuzzyco.com/super/improv/games.html#montage' },
			{ number: '75', name: 'TV Show', stringname: '100', type1: 'montage', link: 'http://fuzzyco.com/super/improv/games.html#montage' },




			{ number: '76', name: 'Blues, the', stringname: '200', type1: 'music', link: 'http://fuzzyco.com/super/improv/games.html#music' },
			{ number: '77', name: 'Doo Wop', stringname: '200', type1: 'music', link: 'http://fuzzyco.com/super/improv/games.html#music' },
			{ number: '78', name: 'Irish Drinking Song', stringname: '200', type1: 'music', link: 'http://fuzzyco.com/super/improv/games.html#music' },
			{ number: '79', name: 'Musical Chairs', stringname: '200', type1: 'music', link: 'http://fuzzyco.com/super/improv/games.html#music' },
			{ number: '80',  name: 'Musical Torture', stringname: '200', type1: 'music', link: 'http://fuzzyco.com/super/improv/games.html#music' },
			{ number: '81', name: 'Record Promo', stringname: '200', type1: 'music', link: 'http://fuzzyco.com/super/improv/games.html#music' },





			{ number: '82', name: 'Chain Murder', stringname: '300', type1: 'naive', link: 'http://fuzzyco.com/super/improv/games.html#naive' },
			{ number: '83', name: 'Complaint Department', stringname: '300', type1: 'naive', alt: 'farfetchd', link: 'http://fuzzyco.com/super/improv/games.html#naive' },
			{ number: '84', name: 'Debate', stringname: '300', type1: 'naive', link: 'http://fuzzyco.com/super/improv/games.html#naive' },
			{ number: '85', name: 'Mystery Date', stringname: '300', type1: 'naive', link: 'http://fuzzyco.com/super/improv/games.html#naive' },
			{ number: '86', name: 'Naive Expert', stringname: '300', type1: 'naive', link: 'http://fuzzyco.com/super/improv/games.html#naive' },
			{ number: '87', name: 'Naive Party Host', stringname: '300', type1: 'naive', type2: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#naive' },
			{ number: '88', name: 'Naive Bartender', stringname: '300', type1: 'naive', link: 'http://fuzzyco.com/super/improv/games.html#naive' },
			{ number: '89', name: 'Naive Bus Driver', stringname: '300', type1: 'naive', link: 'http://fuzzyco.com/super/improv/games.html#naive' },
			{ number: '90', name: 'Naive Hitchhiker', stringname: '300', type1: 'naive', link: 'http://fuzzyco.com/super/improv/games.html#naive' },
			{ number: '91', name: 'Naive Skydiving Instructor', stringname: '300', type1: 'naive', type2: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#naive' },
			{ number: '92', name: 'Naive Therapist', stringname: '300', type1: 'naive', link: 'http://fuzzyco.com/super/improv/games.html#naive' },
			{ number: '93', name: 'Secrets', stringname: '300', type1: 'naive', link: 'http://fuzzyco.com/super/improv/games.html#naive' },
			{ number: '94', name: 'What are You Doing?', stringname: '300', type1: 'naive', link: 'http://fuzzyco.com/super/improv/games.html#naive' },
			{ number: '95', name: '185', stringname: '400', type1: 'one-liners', link: 'http://fuzzyco.com/super/improv/games.html#oneliners' },
			{ number: '96', name: 'Top Ten', stringname: '400', type1: 'one-liners', link: 'http://fuzzyco.com/super/improv/games.html#oneliners' },
			{ number: '97', name: 'Waiter', stringname: '400', type1: 'one-liners', link: 'http://fuzzyco.com/super/improv/games.html#oneliners' },
			{ number: '98', name: 'World\'s Worst', stringname: '400', type1: 'one-liners', link: 'http://fuzzyco.com/super/improv/games.html#oneliners' },



			{ number: '99', name: 'Actor\'s Nightmare', stringname: '500', type1: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#restriction' },
			{ number: '100', name: 'Alliteration', stringname: '500', type1: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#restriction' },
			{ number: '101', name: 'Alphabet', stringname: '500', type1: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#restriction' },
			{ number: '102', name: 'Backwards', stringname: '500', type1: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#restriction' },
			{ number: '103', name: 'Bucket Game', stringname: '500', type1: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#restriction' },
			{ number: '104', name: 'Consonants', stringname: '500', type1: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#restriction' },
			{ number: '105', name: 'Death in 30 seconds', stringname: '500', type1: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#restriction' },
			{ number: '106', name: 'Don\'t make me laugh', stringname: '500', type1: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#restriction' },
			{ number: '107', name: 'Empty Dialog', stringname: '500', type1: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#restriction' },
			{ number: '108', name: 'Fiendish Torture', stringname: '500', type1: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#restriction' },
			{ number: '109', name: 'Insults', stringname: '500', type1: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#restriction' },
			{ number: '110', name: 'Letter Replacemen', stringname: '500', type1: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#restriction' },
			{ number: '111', name: 'Mousetrap Game', stringname: '500', type1: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#restriction' },
			{ number: '112', name: 'N Words', stringname: '500', type1: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#restriction' },
			{ number: '113', name: 'One Word', stringname: '500', type1: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#restriction' },
			{ number: '114', name: 'Questions', stringname: '500', type1: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#restriction' },
			{ number: '115', name: 'You sick bastard', stringname: '500', type1: 'restriction', link: 'http://fuzzyco.com/super/improv/games.html#restriction' },
			{ number: '116', name: 'Countdown', stringname: '600', type1: 'scene-replay', link: 'http://fuzzyco.com/super/improv/games.html#replay' },
			{ number: '117', name: 'Emotions', stringname: '600', type1: 'scene-replay', link: 'http://fuzzyco.com/super/improv/games.html#replay' },
			{ number: '118', name: 'Genre', stringname: '600', type1: 'scene-replay', link: 'http://fuzzyco.com/super/improv/games.html#replay' },
			{ number: '119', name: 'Musical Styles', stringname: '600', type1: 'scene-replay', link: 'http://fuzzyco.com/super/improv/games.html#replay' },


			{ number: '120', name: 'Character Endowments', stringname: '700', type1: 'styled-scenes', link: 'http://fuzzyco.com/super/improv/games.html#styled' },
			{ number: '121', name: 'Dr. Suess', stringname: '700', type1: 'styled-scenes', link: 'http://fuzzyco.com/super/improv/games.html#styled' },
			{ number: '122', name: 'Musical', stringname: '700', type1: 'styled-scenes', link: 'http://fuzzyco.com/super/improv/games.html#styled' },
			{ number: '123', name: 'Old Job/New Job', stringname: '700', type1: 'styled-scenes', link: 'http://fuzzyco.com/super/improv/games.html#styled' },
			{ number: '124', name: 'Opera', stringname: '700', type1: 'styled-scenes', link: 'http://fuzzyco.com/super/improv/games.html#styled' },
			{ number: '125', name: 'Pregnant Pause', stringname: '700', type1: 'styled-scenes', link: 'http://fuzzyco.com/super/improv/games.html#styled' },
			{ number: '126', name: 'Shakespeare', stringname: '700', type1: 'styled-scenes', link: 'http://fuzzyco.com/super/improv/games.html#styled' },
			{ number: '127', name: 'Super Hero', stringname: '700', type1: 'styled-scenes', link: 'http://fuzzyco.com/super/improv/games.html#styled' },
			{ number: '128', name: 'Star Trek', stringname: '700', type1: 'styled-scenes', link: 'http://fuzzyco.com/super/improv/games.html#styled' },
			{ number: '129', name: 'Stunt Doubles', stringname: '700', type1: 'styled-scenes', link: 'http://fuzzyco.com/super/improv/games.html#styled' },
			{ number: '130', name: 'Tragedy Troupe', stringname: '700', type1: 'styled-scenes', link: 'http://fuzzyco.com/super/improv/games.html#styled' },
			{ number: '131', name: 'Wild Kingdom', stringname: '700', type1: 'styled-scenes', link: 'http://fuzzyco.com/super/improv/games.html#styled' },
			{ number: '132', name: 'Wonder Twins', stringname: '700', type1: 'styled-scenes', link: 'http://fuzzyco.com/super/improv/games.html#styled' },


			{ number: '133', name: 'Hyperbole', stringname: '800', type1: 'venting', link: 'http://fuzzyco.com/super/improv/games.html#venting' },
			{ number: '134', name: 'Mad as Hell', stringname: '800', type1: 'venting', link: 'http://fuzzyco.com/super/improv/games.html#venting' },
			{ number: '135', name: 'Pet Peeve Rant', stringname: '800', type1: 'venting', link: 'http://fuzzyco.com/super/improv/games.html#venting' },



			{ number: '136', name: 'Doors', stringname: '050', type1: 'warm-ups', link: 'http://fuzzyco.com/super/improv/games.html#warmups' },
			{ number: '137', name: 'Freeze Tag', stringname: '050', type1: 'warm-ups', link: 'http://fuzzyco.com/super/improv/games.html#warmups' },
			{ number: '138', name: 'Object Freeze', stringname: '050', type1: 'warm-ups', link: 'http://fuzzyco.com/super/improv/games.html#warmups' },
			{ number: '139', name: 'Space Jump', stringname: '050', type1: 'warm-ups', link: 'http://fuzzyco.com/super/improv/games.html#warmups' },
			{ number: '140', name: 'What Are You Doing?', stringname: '050', type1: 'warm-ups', link: 'http://fuzzyco.com/super/improv/games.html#warmups' },



			{ number: '141', name: 'Slow Genius', stringname: '150', type1: 'word-at-a-time', link: 'http://fuzzyco.com/super/improv/games.html#word' },
			{ number: '142', name: 'Professor Know-it-all', stringname: '150', type1: 'word-at-a-time', link: 'http://fuzzyco.com/super/improv/games.html#word' },
			{ number: '143', name: 'Siamese Twins', stringname: '150', type1: 'word-at-a-time', link: 'http://fuzzyco.com/super/improv/games.html#word' },
			{ number: '144', name: 'Spelling Bee', stringname: '150', type1: 'word-at-a-time', link: 'http://fuzzyco.com/super/improv/games.html#word' },
			{ number: '145', name: 'Sphinx', stringname: '150', type1: 'word-at-a-time', link: 'http://fuzzyco.com/super/improv/games.html#word' },
			{ number: '146', name: 'Story', stringname: '150', type1: 'word-at-a-time', link: 'http://fuzzyco.com/super/improv/games.html#word' },
			{ number: '147', name: 'Two person, active story', stringname: '150', type1: 'word-at-a-time', link: 'http://fuzzyco.com/super/improv/games.html#word' },


			{ number: '148', name: 'Faceless Acting', stringname: '250', type1: 'workshop', link: 'http://fuzzyco.com/super/improv/games.html#workshop' },
			{ number: '149', name: 'Gibberish', stringname: '250', type1: 'workshop', link: 'http://fuzzyco.com/super/improv/games.html#workshop' },
			{ number: '150', name: 'Give and Take', stringname: '250', type1: 'workshop', link: 'http://fuzzyco.com/super/improv/games.html#workshop' },
			{ number: '151', name: 'Group Activity', stringname: '250', type1: 'workshop', link: 'http://fuzzyco.com/super/improv/games.html#workshop' },
			{ number: '152', name: 'Mirror, Mirror', stringname: '250', type1: 'workshop', link: 'http://fuzzyco.com/super/improv/games.html#workshop' },
			{ number: '153', name: 'Outta That Chair', stringname: '250', type1: 'workshop', link: 'http://fuzzyco.com/super/improv/games.html#workshop' },
			{ number: '154', name: 'Passing Imaginary Object', stringname: '250', type1: 'workshop', link: 'http://fuzzyco.com/super/improv/games.html#workshop' },
			{ number: '155', name: 'Talk Show', stringname: '250', type1: 'workshop', link: 'http://fuzzyco.com/super/improv/games.html#workshop' },
			{ number: '156', name: 'Truth or Lie', stringname: '250', type1: 'workshop', link: 'http://fuzzyco.com/super/improv/games.html#workshop' },
			{ number: '157', name: 'Unwritten Scene', stringname: '250', type1: 'workshop', link: 'http://fuzzyco.com/super/improv/games.html#workshop' },
			{ number: '158', name: 'Yes and...', stringname: '250', type1: 'workshop', link: 'http://fuzzyco.com/super/improv/games.html#workshop' },
		]
	},
	computed: {
		//filter list based on query entered
		filteredList () {
			if (this.query == 'all') { //shows all pokemon
				this.showTypeEffectivenessLink = false;

				return this.pokemon.filter(pokemon => {
					return pokemon.number > 0
				})
			} else if (this.query.includes('only')) { //shows only pokemon where type 1 equals '(type) only'
				return this.pokemon.filter(pokemon => {
					return pokemon.type1.indexOf(this.query.toLowerCase().substring(0, this.query.indexOf(' '))) > -1
						&& pokemon.type2 == ''
				})
			} else if (this.query !== '') { //if there is query, see if it matches one of the many cases below

				if (this.query.includes('+') || this.pokemonTypes.includes(this.query)) {
					this.showTypeEffectivenessLink = true;
				} else {
					this.showTypeEffectivenessLink = false;
				}

				return this.pokemon.filter(pokemon => {
						//matches the format 'prefix name suffix'
					return ((pokemon.prefix ? pokemon.prefix.toLowerCase() + ' ' : '') + pokemon.name.toLowerCase() + (pokemon.suffix ? ' ' + pokemon.suffix.toLowerCase() : '')).indexOf(this.query.toLowerCase()) > -1 
						//matches term found in 'altname'
						|| (pokemon.alt ? pokemon.alt.toLowerCase().indexOf(this.query.toLowerCase()) > -1 : '') 
						//matches type searched in type1
						|| pokemon.type1.indexOf(this.query.toLowerCase()) > -1
				})
			} else {
				//if there's no query, only show first generation so page doesn't take too long to load all pokemon
				this.showTypeEffectivenessLink = false;
				return this.pokemon.filter(pokemon => {
					return pokemon.number <= 100
				})
			}
		}
	},
	methods: {
		cancelSearch() {
			this.query = '';
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
			document.cookie = cookieName + '+' + (value || '')  + expires + '; path=/';
		},
		getCookie(cookieName) {
			var nameEQ = cookieName + '+';
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
		createPkmnLink(number, name, stringname) {
			var href = '';

			if (this.linkPreference == 'serebii') {
			// using this for gen 1-7 since they all aren't in gen 8 dex - use just the first 3 digits of stringname so it works for megaevos, regionals, etc.
				if (parseInt(number) < 809) {
					href = `https://www.serebii.net/pokedex-sm/${stringname.substring(0,3)}.shtml`;
				} else { //gen 8 - use the name of the pokemon, remove the spaces, cut out the extra stuff in parentheses, make it lowercase
					href = `https://www.serebii.net/pokedex-swsh/${name.replace(' ', '').toLowerCase()}`;

					if (href.indexOf('(') > -1) {
						href = href.substring(0, href.indexOf('(')); //trim the url here
					}
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
		}
	},
	beforeMount() {
		//if there's a query string in the url, filter with that query
		let url = window.location.href;
		if (url.indexOf('?q=') > -1) {
			this.query = url.substr((url.indexOf('?q='))+3, url.length);
		}
		//check if link preference cookie exists, if not, set it
		//this.getCookie('linkPreference') !== '' ? this.linkPreference = this.getCookie('linkPreference') : this.setCookie('linkPreference', this.linkPreference, 1095);
	},
	mounted() {
		//document.getElementById(this.linkPreference).checked = true;
	}
})
