/*  --          Table of Contents          --  */

/*

I. Filter buttons
II. Fact lists
	a. Filtered fact lists and functions
		i. functions
		ii. Time-based fact list
		iii. Food list
		iv. History list
		v. Music list
		vi. Pop Culture list
		vii. Sports list
		viii. Technology list
		ix. TV/Film list
	b. User-submitted facts list
	c. Most used Wiki page list
	d. Pictures facts list
	e. Retired facts list
	f. Featured facts list
III. Functions
	a. giveafact - randomFact, randomFeaturedFact on page load
	b. giveafactbutton - randomFact on button click
	c. updateShareLinks - update Twitter link w/fact
	d. Generate unfiltered facts
		i. giveafoodfact, etc.
IV. On load: Stats section / set cookie
	a. Input sentence stats
	b. Build the chart
	c. Calculate weekly stat count
V. Recently added facts section

*/


/*  --          Filter buttons          --  */

function changeToFood() {
	$('#button').attr('onClick','giveafoodfact()');
	$('#listfood a').addClass('activefilter');
	$('.filterbuttons a').not('#listfood a').removeClass('activefilter');
	$('#resetbutton').css('display','inline-block');
	updateShareLinks();
	giveafoodfact();
}

function changeToHistory() {
	$('#button').attr('onClick','giveahistoryfact()');
	$('#listhistory a').addClass('activefilter');
	$('.filterbuttons a').not('#listhistory a').removeClass('activefilter');
	$('#resetbutton').css('display','inline-block');
	updateShareLinks();
	giveahistoryfact();
}

function changeToMusic() {
	$('#button').attr('onClick','giveamusicfact()');
	$('#listmusic a').addClass('activefilter');
	$('.filterbuttons a').not('#listmusic a').removeClass('activefilter');
	$('#resetbutton').css('display','inline-block');
	updateShareLinks();
	giveamusicfact();
}

function changeToPop() {
	$('#button').attr('onClick','giveapopculturefact()');
	$('#listpopculture a').addClass('activefilter');
	$('.filterbuttons a').not('#listpopculture a').removeClass('activefilter');
	$('#resetbutton').css('display','inline-block');
	updateShareLinks();
	giveapopculturefact();
}

function changeToSports() {
	$('#button').attr('onClick','giveasportsfact()');
	$('#listsports a').addClass('activefilter');
	$('.filterbuttons a').not('#listsports a').removeClass('activefilter');
	$('#resetbutton').css('display','inline-block');
	updateShareLinks();
	giveasportsfact();
}

function changeToTechnology() {
	$('#button').attr('onClick','giveatechnologyfact()');
	$('#listtechnology a').addClass('activefilter');
	$('.filterbuttons a').not('#listtechnology a').removeClass('activefilter');
	$('#resetbutton').css('display','inline-block');
	updateShareLinks();
	giveatechnologyfact();
}

function changeToTelevision() {
	$('#button').attr('onClick','giveatelevisionfact()');
	$('#listtelevision a').addClass('activefilter');
	$('.filterbuttons a').not('#listtelevision a').removeClass('activefilter');
	$('#resetbutton').css('display','inline-block');
	updateShareLinks();
	giveatelevisionfact();
}


function changeToUnfiltered() {
	$('#button').attr('onClick','giveafactbutton()');
	$('.filterbuttons a').not('#resetbutton a').removeClass('activefilter');
	$('#resetbutton').css('display','none');
	updateShareLinks();
	giveafactbutton();
}


/*  --          Filtered fact lists and functions         --  */

// Functions

// function to include an image in a fact
	// example: (includeImage('Arch Deluxe burger', 'archdeluxe.jpg'))
var imageOpen = "<a class='popimg' href='#'>";
var imageMid = "<span><i></i><img src='assets/facts/";
var imageClose = "'/></span></a>";

function includeImage(imageName, imageURL) {
	var incImage = imageOpen + imageName + imageMid + imageURL + imageClose;
	return(incImage);
}

// function to add source to a fact
	// example: (source('1', 'General_Mills'))

var sourceOpen = "<sup><a href='http://en.wikipedia.org/wiki/";
var sourceMid = "' target='_blank'>[";
var sourceClose = "]</a></sup>";

function source(sourceNo, sourceURL) {
	var incSource = sourceOpen + sourceURL + sourceMid + sourceNo + sourceClose;
	return(incSource);
}



	/*  --          Time-based fact list           --    */
	// last updated: 1/1/18
var timedFactsList = new Array;
timedFactsList[0]="As of the end of 2017 season the Seattle Mariners have had a losing record in 28 of the 41 seasons they have been a team. The team did not have a winning season for its first 14 seasons, and has also never been to the World Series." + (source('1', 'List_of_Seattle_Mariners_seasons'));
timedFactsList[1]="As of the end of the 2017 season, only 5 MLB players have hit 60 or more home runs in a season: Babe Ruth (60), Roger Maris (61), Sammy Sosa (66, 63, 64), Mark McGwire (70, 65), and Barry Bonds (73)." + (source('1', '50_home_run_club'));
timedFactsList[2]="As of the end of the 2016-2017 NBA season, only 3 players have ever won NBA MVP, All-Star game MVP, and Finals MVP awards in the same year: Willis Reed (1970), Michael Jordan (1996, 1998), and Shaquille O'Neal (2000)." + (source('1', 'Shaquille_O%27Neal'));
//timedFactsList[3]=(moved to non-timed list)
timedFactsList[4]="As of the end of 2017, the NFL has never had a team win the Super Bowl 3 times in a row. The NBA (5 times), NHL (5 times), and MLB (4 times), have all had teams win the championship at least 3 times in a row." + (source('1', 'List_of_Super_Bowl_champions')) + (source('2', 'List_of_NBA_champions')) + (source('3', 'List_of_Stanley_Cup_champions')) + (source('4', 'List_of_World_Series_champions'));
timedFactsList[5]="As of the end of the 2017 season, Barry Bonds holds the record for most intentional walks in a 9-inning game (4), season (120), and career (668)." + (source('1', 'Intentional_base_on_balls'));
// retired timedFactsList[6]= "";
timedFactsList[7]="As of the end of 2017, the longest running scripted television series are <i>The Simpsons</i> (currently in its 29th season), <i>Gunsmoke</i> (lasted 20 seasons), <i>Law &amp; Order</i> (lasted 20 seasons), and <i>Law &amp; Order: Special Victims Unit</i> (currently in its 19th season)." + (source('1', 'List_of_longest-running_scripted_U.S._primetime_television_series'));
timedFactsList[8]="As of the end of 2017, <i>Spongebob Squarepants</i> is the only remaining Nickelodeon show that debuted before the year 2000." + (source('1', 'List_of_longest-running_United_States_television_series'));

//olympic facts sports45 and 46

	/*  --          Food list          --  */
var foodFactsList = new Array;
foodFactsList[0]="The first McDonald's Drive-Thru was created in 1975, in Sierra Vista, Arizona, to serve military members who weren't permitted to get out of their cars while wearing fatigues." + (source('1', 'Drive-through'));
foodFactsList[1]="In Spain and Russia, McDonald's drive-thru services are called <i>McAuto</i>." + (source('1', 'Drive-through'));
foodFactsList[2]="The name Orange Julius came from its customers waiting in line, who would shout, \"Give me an Orange, Julius!\" Its founder was Julius Freed." + (source('1', 'Orange_Julius'));
foodFactsList[3]="Orange and Lemon-Lime were the only 2 Gatorade flavors available for their first 20 years, until Fruit Punch was introduced." + (source('1', 'Gatorade'));
foodFactsList[4]="When they were created in 1941, Cheerios were originally called Cheerioats." + (source('1', 'General_Mills'));
foodFactsList[5]="In 2008, Doritos beamed a 30-second advertisement into a planetary system 42 light years away, in collaboration with EISCAT Space Center in Norway." + (source('1', 'Doritos'));
foodFactsList[6]="In 1916, the US Government unsuccessfully tried to get Coca-Cola to remove caffeine from its product in United States v. Forty Barrels and Twenty Kegs of Coca-Cola." + (source('1', 'United_States_v._Forty_Barrels_and_Twenty_Kegs_of_Coca-Cola'));
foodFactsList[7]="As of June 2012 when it began distribution in Burma, Coca-Cola is officially available in every country in the world besides Cuba and North Korea." + (source('1', 'Coca-Cola'));
foodFactsList[8]="The drive-in restaurant Sonic was originally named Top Hat." + (source('1', 'Sonic_Drive-In'));
foodFactsList[9]="A&amp;W's company name was taken from the last name initials of business partners Roy Allen and Frank Wright." + (source('1', 'A%26W_Restaurants'));
foodFactsList[10]="Dr Pepper was originally known as \"Waco\" because it was first sold in Morrison's Old Corner Drug Store in Waco, Texas in 1885." + (source('1', 'Dr_Pepper'));
foodFactsList[11]="Kool-Aid is the official soft drink of Nebraska, which has a yearly festival celebrating it in August." + (source('1', 'Kool-Aid'));
foodFactsList[12]="In 1932, a man named Charles Elmer Doolin purchased a corn chip recipe, a handheld potato ricer, and 19 retail accounts from a corn chip manufacturer for $100, which he borrowed from his mother. Doolin established a new corn chip business making \"Fritos\" in his mother's kitchen. He soon started The Frito Company." + (source('1', 'Frito-Lay'));
foodFactsList[13]="Varieties of Pringles in Asia have included soft-shelled crab, grilled shrimp, seaweed, \"blueberry and hazelnut\", and \"lemon and sesame\"." + (source('1', 'Pringles'));
foodFactsList[14]="Fredric Baur, the inventor of the tubular paperboard can that holds Pringles, had his death request honored by his children: to bury him in one of the cans by placing part of his cremated remains in a Pringles container in his grave." + (source('1', 'Pringles'));
foodFactsList[15]="The snack chip Funyuns are very popular in mass media. Those that have referenced the snack include: the movie <i>Half Baked</i>; musicians Insane Clown Posse and  Eminem; the television shows <i>NCIS</i>, <i>Breaking Bad</i>, <i>Dawson's Creek</i>, <i>How I Met Your Mother</i>, <i>Six Feet Under</i>, <i>Everybody Loves Raymond</i>, <i>American Dad</i>, and <i>The Big Bang Theory</i>, among others." + (source('1', 'Funyuns'));
foodFactsList[16]="The name of the Kellogg's rooster is Cornelius." + (source('1', 'Kellogg%27s'));
foodFactsList[17]="From 1950-1954, M&amp;M candies first had a black 'm' on them, instead of white." + (source('1', 'M%26M%27s'));
foodFactsList[18]="The famous frozen yogurt place's name TCBY stands for two different things: \"The Country's Best Yogurt\" and \"This Can't Be Yogurt.\"" + (source('1', 'TCBY'));
foodFactsList[19]="The Little Caesars pizza chain once filled an order for 13,386 pizzas for the VF Corporation in Greensboro, North Carolina." + (source('1', 'Little_Caesars'));
foodFactsList[20]="The \"31 flavors\" slogan that Baskin-Robbins is known for was created with the idea in mind that customers could have a different ice cream flavor every day of the month." + (source('1', 'Baskin-Robbins'));
foodFactsList[21]="Baskin-Robbins has introduced over 1,000 ice cream flavors since 1945." + (source('1', 'Baskin-Robbins'));
foodFactsList[22]="One of the original owners of Domino's Pizza did not have enough time to devote to the business, as he was a full-time mailman, so he sold his 50% to his brother for the Volkswagen Beetle the company used for deliveries." + (source('1', 'Domino%27s_Pizza'));
foodFactsList[23]="Although 7 Up's slogan was once \"Never Had It, Never Will\" (referring to caffeine), they did release a soft drink in 1988 called 7 Up Gold, which had caffeine as a listed ingredient." + (source('1', '7_Up'));
foodFactsList[24]="Sales for Dietetic Dr Pepper were slow when it was introduced in 1962, due to the public misconception that it was a drink for diabetics. It was then renamed to Sugar Free Dr Pepper in 1966, and eventually Diet Dr Pepper in 1987." + (source('1', 'Dr_Pepper'));
foodFactsList[25]="It took Morgan Spurlock 14 months to lose the weight he gained after eating only McDonald's for a month for his 2004 documentary film <i>Super Size Me</i>." + (source('1', 'Super_Size_Me'));
foodFactsList[26]="When Frito Lay introduced compostable Sun Chips bags in 2008, they received numerous complaints about their excessive noise, causing Frito Lay to remake the bags quieter." + (source('1', 'Sun_Chips'));
foodFactsList[27]="The idea for the candy Ring Pops came from a Topps product engineer, Frank Richards. He created Ring Pops as a way to thwart the bad habit of thumb sucking, which his daughter was prone to doing." + (source('1', 'Ring_Pop'));
foodFactsList[28]="The original working names for Cocoa Pebbles and Fruity Pebbles were Flint Chips and Rubble Stones, before the creative head suggested the names the cereals have today." + (source('1', 'Pebbles_cereal'));
foodFactsList[29]="From 1999 to 2000, General Mills released a version of Cheerios called Millenios, which had \"2\"-shaped pieces, to go along with its O's to celebrate the year 2000." + (source('1', 'Cheerios'));
foodFactsList[30]="In 2001, Taco Bell held a promotion coinciding with the re-entry of the Mir Space Station. A large target was brought out into the Pacific Ocean and they announced that if the target was hit with a falling piece of Mir, every person in the United States would win a free Taco Bell taco. However no piece of station struck the target." + (source('1', 'Taco_Bell'));
foodFactsList[31]="In an effort to promote its $2 meal deals, Taco Bell started a Facebook group in 2010 to collect signatures for a petition to the Federal Reserve to produce more $2 bills." + (source('1', 'Taco_Bell'));
foodFactsList[32]="The popular McDonald's jingle \"I'm lovin' it\" was written and performed by Justin Timberlake and Pusha T, and produced by The Neptunes." + (source('1', 'I%27m_Lovin%27_It_(song)'));
foodFactsList[33]="In the early 1980s, the Chuck E. Cheese opened in Australia under the name \"Charlie Cheese's Pizza Playhouse\" due to the word \"chuck\" meaning to throw up in Australia." + (source('1', 'Chuck_E._Cheese%27s'));
foodFactsList[34]="In an effort to target a more adult audience, McDonald's developed a massive marketing campaign in 1996 for the " + (includeImage('Arch Deluxe burger', 'archdeluxe.jpg')) + ". It is considered to be one of McDonald's most expensive flops of all time, having spent over $300 million on research, production, and marketing." + (source('1', 'Arch_Deluxe'));
foodFactsList[35]="Due to health concerns over the dye amaranth (also known as Red #2), red M&amp;M's were removed in 1976 and replaced with orange M&amp;M's, despite the fact that red M&amp;M's did not contain Red #2. This was purely to satisfy worried consumers. Red M&amp;M's were reintroduced 10 years later." + (source('1','M%26M%27s'));


	/*  --          History list          --  */
var historyFactsList = new Array;
historyFactsList[0]="In World War II, the British Secret Service distributed special edition Monopoly games to prisoners of war held by the Nazis. In the games were maps, compasses, real money, and other useful tools for escaping." + (source('1', 'Monopoly_(game)'));
historyFactsList[1]="The unit for one-thousandth of a dollar, or a tenth of a cent (mostly used in accounting and on gas station price signs), is called a " + (includeImage('mill', 'mill.jpg')) + "." + (source('1', 'United_States_dollar'));
historyFactsList[2]="Canada has a policy of adopting non-overlapping province abbreviations to adjacent countries, unlike Mexico which shares state abbreviations with the United States and Canada: CO, MI, MO, NL, and BC." + (source('1', 'Canadian_postal_abbreviations_for_provinces_and_territories'));
historyFactsList[3]="Colorado, Wyoming, and Utah are the only states which have boundaries defined solely by lines of latitude and longtitude." + (source('1', 'Colorado'));
historyFactsList[4]="Man has not been to the moon since Gene Cernan stepped off the lunar surface in 1972." + (source('1', 'Moon_landing'));
historyFactsList[5]="The first vending machine was developed in the first century; it accepted a coin in exchange for a fixed amount of holy water." + (source('1', 'Vending_machine'));
historyFactsList[6]="The largest U.S. currency is the $100 bill. The $500, $1,000, $5,000, $10,000 and $100,000 bills are no longer in circulation." + (source('1', 'Large_denominations_of_United_States_currency'));
historyFactsList[7]="Ronald Reagan was the only president to postpone his State of the Union Address, due to the Space Shuttle Challenger disaster." + (source('1', 'Space_Shuttle_Challenger_disaster'));
historyFactsList[8]="Mars has the largest dust storms in the Solar System, as they can sometimes get large enough to cover the entire planet." + (source('1', 'Mars'));
historyFactsList[9]="The official investigation of the Oklahoma City bombing in 1995 consisted of the FBI conducting over 28,000 interviews and collecting nearly 1 billion pieces of information." + (source('1', 'Oklahoma_City_bombing'));
historyFactsList[10]="The dwarf planet Pluto was discovered in 1930, and was considered the 9th planet in the Solar System until its demotion to dwarf planet in 2006." + (source('1', 'Pluto'));
historyFactsList[11]="The new One World Trade Center, which opened for business on November 3, 2014, is 1,776 feet tall. Its skyscraper's spire reaches that height in reference to the year of the United States Declaration of Independence." + (source('1', 'One_World_Trade_Center'));
historyFactsList[12]="Ronald Reagan won the 1984 presidential election with an electoral vote count of 525-13, winning 49 states to Walter Mondale's 1 state + DC. " + (source('1', 'United_States_presidential_election,_1984'));
historyFactsList[13]="The original 13 Colonies actually consisted of parts of what would become 20 different states: New Hampshire, Massachusetts, Maine, Rhode Island, Connecticut, New York, Vermont, New Jersey, Pennsylvania, Delaware, Maryland, Virginia, Kentucky, West Virginia, North Carolina, Tennessee, South Carolina, Georgia, Alabama, and Mississippi." + (source('1', 'Thirteen_Colonies'));
historyFactsList[14]="It is believed that although John Hancock signed the Declaration of Independence on July 4, 1776, a majority of signers did not sign it until August 2, 1776, and one signer, Matthew Thornton, signed it as late as November 4, 1776." + (source('1', 'United_States_Declaration_of_Independence'));
historyFactsList[15]="William Whipple, a signatory of the Declaration of Independence, freed his slave Prince Whipple in 1781, believing he could not fight for liberty and own a slave." + (source('1', 'William_Whipple'));
historyFactsList[16]="In medieval manuscripts, " + (includeImage('\"strikethrough\" of text with red ink', 'strikethrough.jpg')) + " often functioned as highlighting, similar to the modern day underline." + (source('1', 'Strikethrough'));
historyFactsList[17]="When Neil Armstrong first walked on the moon, he carried with him a piece of wood from the Wright brothers' airplane's left propeller." + (source('1', 'Apollo_11'));
historyFactsList[18]="The book <i>Moby Dick</i> was originally a commercial failure and out of print at the time of Herman Melville's death in 1891." + (source('1', 'Moby-Dick'));
historyFactsList[19]="The Ethiopian leap year happens every four years without exception, while Gregorian leap years are every four years, except years divisible by 100, unless they are also divisible by 400." + (source('1', 'Ethiopian_Calendar'));
historyFactsList[20]="ATM PINs were originally intended to have six digits, but usually have four because the ATM inventor's wife said she could only remember four digits." + (source('1', 'Personal_identification_number'));
historyFactsList[21]="Canada has an estimated 3,000,000 lakes, which comprises 60% of the world's lakes." + (source('1', 'List_of_lakes_of_Canada'));
historyFactsList[22]="At the 1936 Summer Olympics, the Liechenstein team discovered for the first time that the country had an " + (includeImage('identical flag', 'liechtensteinflag.png')) + " as the flag of Haiti. They changed it the next year by adding a crown to it." + (source('1', 'Liechtenstein_at_the_1936_Summer_Olympics')) + (source('2', 'Flag_of_Liechtenstein'));
historyFactsList[23]="The infinity symbol (&infin;) is thought to have come from the variant form of the Roman Numeral for 1,000 (CI&#8579;) or the last letter of the Greek alphabet, omega (&omega;). Its creator, John Wallis, did not explain his choice of the symbol." + (source('1', 'Infinity_symbol'));
historyFactsList[24]="Over 150 bodies lay frozen on the slopes of Mount Everest from failed attempts at reaching the top." + (source('1', 'Mount_Everest'));
historyFactsList[25]="<i>Encyclopædia Britannica</i> was published starting in 1768, and released 15 editions (as well as dozens of supplements and revisions), until it was announced in 2012 that the 2010 edition would be the last printed edition." + (source('1', 'Encyclop%C3%A6dia_Britannica'));
historyFactsList[26]="The abbreviation LAX for Los Angeles International Airport was originally just \"LA\", when airports only had 2-letter designations. The rapid growth in the aviation industry changed this to 3-letter designations, so the \"X\" was added on to make LAX. The X has no specific meaning." + (source('1', 'Los_Angeles_International_Airport'));
historyFactsList[27]="The 2 golf balls that Alan Shepard hit on the moon in 1971 are still there today." + (source('1', 'Apollo_14')) + (source('2', 'List_of_artificial_objects_on_the_Moon'));
historyFactsList[28]="The word \"fortnight\" comes from the Old English word <i>feowertyne niht</i>, meaning \"fourteen nights\". It is used commonly outside of the U.S. as a unit of time equal to 2 weeks." + (source('1', 'Fortnight'));
historyFactsList[29]="Since 1972, a \"" + (includeImage('leap second', 'leapsecond.png')) + "\" has been added 26 times onto the Coordinated Universal Time in order to keep its time of day close to the mean solar time. The most recent one being June 30, 2015, at 23:59:60 UTC." + (source('1', 'Leap_second'));
historyFactsList[30]="The Secret Service codenames for recent Presidents of the United States include Renegade (Barack Obama), Tumbler and Trailblazer (George W. Bush), Eagle (Bill Clinton), Timberwolf (George H.W. Bush), and Rawhide (Ronald Reagan)." + (source('1', 'Secret_Service_codename'));
historyFactsList[31]="Ticket prices for the Titanic's promenade deck suites cost $4,350 (equivalent to $106,660 in 2015) for a one-way passage." + (source('1', 'Sinking_of_the_RMS_Titanic'));
historyFactsList[32]="The distance between the United States and Russia is less than 2.4 miles, between Diomede, Alaska, on Little Diomede Island, and Big Diomede, Russia." + (source('1','Diomede,_Alaska'));
historyFactsList[33]="The city of Topeka, Kansas was temporarily renamed \"Google\" in March 2010, in an effort to attract Google to select the city for installation of Google Fiber. Google then jokingly announced its own name change to \"Topeka\", on April Fool's Day." + (source('1','Google_Fiber')) + (source('2','Topeka,_Kansas'));
historyFactsList[34]="The highly disputed and controversial 1876 presidential election in the United States ended with an electoral vote of 185-184, with Rutherford B. Hayes winning the presidency. The informal and unwritten Compromise of 1877 helped decide the election, given the terms that Hayes removed all U.S. military forces from the former Confederate states." + (source('1','United_States_presidential_election,_1876')) + (source('2','Compromise_of_1877'));
historyFactsList[35]="Although one of the smallest primates, a tarsier's eyeballs are approximately 16 mm in diameter and are as large as its brain." + (source('1','Tarsier'));
historyFactsList[36]="There have been 4 U.S. Presidents who have received a Nobel Peace Prize: Theodore Roosevelt, Woodrow Wilson, Jimmy Carter, and Barack Obama." + (source('1','2009_Nobel_Peace_Prize'));
historyFactsList[37]="Vigo County, Indiana has voted for the winning candidate in every U.S. Presidential election since 1956, and in all but two elections since 1888." + (source('1', 'Vigo_County,_Indiana'));
historyFactsList[38]="Four is the only cardinal numeral in the English language that has the same number of letters as its number value." + (source('1','4'));
historyFactsList[39]="The state of Franklin was an unrecognized and autonomous territory (located in current-day eastern Tennessee) that was founded in 1784, with the intent of becoming the 14th state of the new United States. It was never admitted to the union and was back under control of North Carolina by 1789." + (source('1','State_of_Franklin'));
historyFactsList[40]="The abbreviation for \"number\", often seen as \"&numero;\", derives from the Latin numero, which is the ablative form of numerus (number)." + (source('1','Numero_sign'));

	/*  --          Music list          --  */
var musicFactsList = new Array;
musicFactsList[0]="The song \"Gold Digger\" by Kanye West, was originally recorded in Ludacris' house, and written from a female perspective for rapper Shawnna to use on her album. She declined and it was later rewritten and used by Kanye himself." + (source('1', 'Late_Registration'));
musicFactsList[1]="Ray Charles' younger brother drowned when Ray was 5, he was fully blind by the age of 7, his father died when he was 10, and his mother died when he was 15. Ray Charles died just 4 months before the release of the biopic film, <i>Ray</i>." + (source('1', 'Ray_(film)')) + (source('2', 'Ray_Charles'));
musicFactsList[2]="Rapper Rick Ross' real name is William Leonard Roberts II." + (source('1', 'Rick_Ross'));
musicFactsList[3]="Elton John's birth name was Reginald Kenneth Dwight. His official name now is Sir Elton Hercules John CBE, which is Commander of the Most Excellent Order of the British Empire." + (source('1', 'Elton_John')) + (source('2', 'Order_of_the_British_Empire'));
musicFactsList[4]="Eminem wrote a letter to 2Pac's mom, Afeni Shakur, in order to get approval to produce the posthumous 2Pac album <i>Loyal to the Game</i>." + (source('1', 'Loyal_to_the_Game'));
musicFactsList[5]="Katy Perry used Wikipedia to research which rapper to collaborate with for her song \"California Girls\",  browsing other West Coast artists before selecting Snoop Dogg." + (source('1', 'California_Gurls'));
musicFactsList[6]="In 2014, Eminem's song \"Rap God\" was entered into the Guinness World Records as the hit single that has the most words with 1,560. At one point in the song he raps 97 words in 15 seconds, at a rate of 6.5 words per second." + (source('1', 'Rap_God'));
musicFactsList[7]="In 2013, Metallica became the first band to tour to all 7 continents: The band played a ten-song show at the Carlini Station heliport in Antarctica." + (source('1', 'Metallica')) + (source('2', 'King_George_Island_(South_Shetland_Islands)'));
musicFactsList[8]="Although Rihanna is the only credited featured artist on Kanye West's song \"All of the Lights,\" the song also featured 13 other popular artists doing background vocals: Kid Cudi, Tony Williams, The-Dream, Charlie Wilson, John Legend, Elly Jackson, Alicia Keys, Elton John, Fergie, Ryan Leslie, Drake, Alvin Fields, and Ken Lewis." + (source('1', 'All_of_the_Lights'));
musicFactsList[9]="Taylor Swift wrote the song \"Out of the Woods\" in just 30 minutes, using the instrumental track given to her by Jack Antonoff, the lead guitarist of the band fun." + (source('1', 'Out_of_the_Woods_(song)'));
musicFactsList[10]="Shaquille O'Neal had a moderately successful rap career, releasing 4 albums in the 1990s. He collaborated on songs with rappers Method Man, Redman, RZA, Jay-Z, The Notorious B.I.G., and Mobb Deep." + (source('1', 'Shaquille_O%27Neal')) + (source('2', 'Shaq_Diesel'));
musicFactsList[11]="In 2007, Kanye West, Lupe Fiasco, and Pharrell Williams formed a hip-hop supergroup called Child Rebel Soldier. However they only only released 3 songs between 2007-2013 before it was announced the group had been canceled. " + (source('1', 'Child_Rebel_Soldier'));
musicFactsList[12]="Kanye West and Eminem won the Grammy Award for Best Rap Album 10 times total in the 16 year span from 2000-2015." + (source('1', 'Grammy_Award_for_Best_Rap_Album'));
musicFactsList[13]="Paul McCartney has reached number 1 on the UK charts as a solo artist, as part of a duo (with Wonder), as part of a trio (with Wings), as part of a quartet (with The Beatles), and as part of a quintet (with The Beatles and Billy Preston)." + (source('1', 'Paul_McCartney'));
musicFactsList[14]="Upon the release of her album <i>1989</i> in 2014, Taylor Swift became the first artist ever to sell 1,000,000 albums in 1 week, 3 separate times." + (source('1', 'Taylor_Swift'));
musicFactsList[15]="Jay-Z released a solo rap album every year during the first 8 years of his career (1996-2003)." + (source('1', 'Jay_Z_discography'));
musicFactsList[16]="Michael Jackson's album <i>Thriller</i> had 7 singles reach the <i>Billboard</i> Hot 100 (out of 9 total songs. It also sold as many as 65 million copies, including going 29x Platinum in the United States alone." + (source('1', 'Thriller_(Michael_Jackson_album)'));
musicFactsList[17]="Rap superstars 50 Cent and Kanye West went head-to-head in a " + (includeImage('sales battle', 'kanye50.jpg')) + " in 2007, both releasing an album on the same day. Kanye West's <i>Graduation</i> had the better first week sales with 957,000, compared to 50 Cent's <i>Curtis</i> sales of 691,000." + (source('1', '2007_in_hip_hop_music'));
musicFactsList[18]="Chamillionaire's Grammy Award-winning song \"Ridin'\" actually had far less YouTube music video views than Weird Al Yankovic's parody song \"White &amp; Nerdy\"." + (source('1', 'Ridin%27'));
musicFactsList[19]="In a 2009 interview with Ellen DeGeneres, singer/rapper Akon revealed that his complete name was Aliaune Damala Bouga Time Bongo Puru Nacka Lu Lu Lu Badara Akon Thiam." + (source('1', 'Akon'));
musicFactsList[20]="Rapper Freddie Gibbs came up with the idea for the name of his album <i>Pi&ntilde;ata</i> (originally called <i>Cocaine Pi&ntilde;ata</i>) after having a dream that he had a 4 year old kid whose birthday party had kids hitting a pi&ntilde;ata filled with cocaine." + (source('1', 'Pi%C3%B1ata_(Freddie_Gibbs_and_Madlib_album)'));
musicFactsList[21]="Upon singer Michael Jackson's death in 2009 his fans mistakenly left flowers on a different Michael Jackson's (radio personality) star on the Hollywood Walk of Fame." + (source('1', 'Hollywood_Walk_of_Fame'));
musicFactsList[22]="The 2001 album <i>Devil's Night</i> by D12 contains at least 6 censored lyrics, even in the explicit version of the album." + (source('1', 'Devil%27s_Night_(album)'));
musicFactsList[23]="The cover of Childish Gambino's 2013 album <i>Because the Internet</i> is an " + (includeImage('animated .GIF', 'gambino.gif')) + ", as a reference to the Internet, which made the .GIF popular. The physical version of the album features lenticular printing to mimic the animation affect of the digital cover." + (source('1', 'Because_the_Internet'));
musicFactsList[24]="Rapper Danny Brown named his second studio album <i>XXX</i> for his \"gutter-filthy mouth\" and for his 30th birthday." + (source('1', 'XXX_(Danny_Brown_album)'));
musicFactsList[25]="Michael Jackson (in 1984) and Santana (in 2000) each won 8 Grammy awards in a single Grammy Award ceremony." + (source('1', 'Grammy_Award_records'));
musicFactsList[26]="4 of the 20 tracks were renamed on the clean version of Eminem's 1999 album <i>The Slim Shady LP</i>, due to their inappropriate titles for an album without the Parental Advisory label." + (source('1', 'Parental_Advisory'));
musicFactsList[27]="The 1999 Incubus album <i>Make Yourself</i> does not contain a Parental Advisory label on it, even though it contains the word \"fuck\" 9 times." + (source('1', 'Parental_Advisory'));
musicFactsList[28]="Rapper/actor Donald Glover got his rapper stage name Childish Gambino from a Wu-Tang Clan name generator." + (source('1', 'Donald_Glover'));
musicFactsList[29]="The band Matchbox Twenty's band name was originally styled as \"Matchbox 20\" on their first album, <i>Yourself or Someone Like You</i>, before changing it to \"Matchbox Twenty\" on every other album." + (source('1', 'Matchbox_Twenty'));
musicFactsList[30]="Taylor Swift was on tour at some point in every year from 2009-2015, for the Fearless Tour, the Speak Now World Tour, The Red Tour, and The 1989 World Tour." + (source('1', 'Fearless_Tour')) + (source('2', 'Speak_Now_World_Tour')) + (source('3', 'The_Red_Tour')) + (source('4', 'The_1989_World_Tour'));
musicFactsList[31]="Katy Perry's album <i>Teenage Dream</i> became the first by a female artist to produce 5 number one <i>Billboard</i> Hot 100 songs (\"California Gurls\", \"Teenage Dream\", \"Firework\", \"E.T.\", and \"Last Friday Night (T.G.I.F.)\")." + (source('1', 'Katy_Perry'));
musicFactsList[32]="Elton John's 1974 song \"Candle in the Wind\" was written in honor of Marilyn Monroe, who died 11 years earlier. In 1997, he rewrote and rerecorded the song as \"Candle in the Wind 1997\", in honor of Princess Diana, who died that year." + (source('1', 'Candle_in_the_Wind')) + (source('2', 'Candle_in_the_Wind_1997'));
musicFactsList[33]="Taylor Swift's album <i>1989</i> was the top-selling album of 2014 although it was only available for 2 months and 4 days of the year." + (source('1', '1989_(Taylor_Swift_album)'));
musicFactsList[34]="In their 50+ years as a band, The Rolling Stones have released 24 studio albums in the US (22 in the UK), and have had 27 band members." + (source('1', 'The_Rolling_Stones'));
musicFactsList[35]="Kobe Bryant was scheduled to release his debut rap album, <i>Visions</i>, in the spring of 2000. The first single, \"K.O.B.E.\", debuted in January 2000, and was performed at NBA All-Star Weekend that month. The song was not well received. Sony abandoned plans for the album, and dropped Bryant later that year." + (source('1', 'Kobe_Bryant'));


	/*  --          Pop Culture list          --  */
var popFactsList = new Array;
popFactsList[0]="A man was imprisoned, fined, and put on probation for smuggling counterfeit Beanie Babies in 1999." + (source('1', 'Beanie_Babies'));
popFactsList[1]="Seth Rogen and Evan Goldberg wrote the first drafts of <i>Superbad</i> at the age of 13 and perfected it throughout high school." + (source('1', 'Seth_Rogen'));
popFactsList[2]="Hasbro released a hypodermic needle-shaped water gun toy called Hypo-Squirt in the 1970s, but it was recalled because the press called it a \"junior junkie\" kit." + (source('1', 'Hasbro'));
popFactsList[3]="Stephen Colbert has a species of spider named after him - <i>Aptostichus stephencolberti</i>." + (source('1', 'The_Colbert_Report'));
popFactsList[4]="The mysterious Pok&eacute;mon Mew can learn any move (TM's and HM's) that is able to be taught." + (source('1', 'Mew_(PokÃ©mon)'));
popFactsList[5]="The estimated U.S. cocaine market exceeded $70 billion in street value for the year 2005, exceeding the revenues of Starbucks." + (source('1', 'Cocaine'));
popFactsList[6]="Billy Mays signed a deal in June 2009 to shoot infomercial-style commercials for Taco Bell. His death canceled those plans." + (source('1', 'Billy_Mays'));
popFactsList[7]="In a week in 1994, Tim Allen simultaneously had the #1 show (<i>Home Improvement</i>), #1 movie (<i>The Santa Clause</i>) and #1 book (<i>Don't Stand Too Close to a Naked Man</i>)." + (source('1', 'Tim_Allen'));
popFactsList[8]="The " + (includeImage('first Lego minifigures', 'lego.jpg')) + " in 1975 had no arms, solid unmovable legs, and faceless heads." + (source('1', 'Lego_minifigure'));
popFactsList[9]="In 2013, the Honey Nut Cheerios mascot Buzz the bee was given a \"swag makeover\" by Nelly the rapper, in a commercial." + (source('1', 'Honey_Nut_Cheerios'));
popFactsList[10]="The popular children's game \"Duck, Duck, Goose\" is known as \"Duck, Duck, Gray Duck\" in Minnesota. Children instead say variations of colored ducks (\"Blue duck, red duck, gray duck!\")." + (source('1', 'Duck,_duck,_goose'));
popFactsList[11]="The probability of rolling a Yahtzee on the first roll of a turn is 1 in 1,296." + (source('1', 'Yahtzee'));
popFactsList[12]="The odds of rolling a Yahtzee on all 13 turns of a single game of Yahtzee, is about 1 in 283,000,000,000,000,000 (or 283 quadrillion). This would result in the max score of 1,575 points." + (source('1', 'Yahtzee'));
popFactsList[13]="The popular newspaper comic <i>Baby Blues</i>, like most comic and cartoon characters, has characters that age on a timeline much slower than real-time. Its original titular baby Zoe was born in the very first strip in 1990, and after 25 years she is 9 years old." + (source('1', 'Baby_Blues'));
popFactsList[14]="Author Stephen King used the pen name Richard Bachman starting in 1977, and after releasing 5 novels under this name it was finally discovered in 1984 that it was indeed Stephen King." + (source('1', 'Richard_Bachman'));
popFactsList[15]="Russia switched permanently to daylight savings time from 2011-2014, but reverted back to standard time after this was proven unpopular due to the late sunrises in winter." + (source('1', 'Daylight_saving_time'));
popFactsList[16]="Negan, a notorious fictional character from <i>The Walking Dead</i> graphic novels, was conceptualized by Robert Kirkman after scrapping the idea of Rick Grimes being forced to kill fellow survivor, Glenn, in order to to protect his son Carl." + (source('1', 'Negan'));
popFactsList[17]="Stephen King's novel <i>Rage</i> (written under the pen name Richard Bachman) was taken out of print after it partially inspired several different school shootings." + (source('1', 'Rage_(King_novel)'));
popFactsList[18]="Gene Autry has a star in all 5 categories in the Hollywood Walk of Fame, while Bob Hope, Mickey Rooney, Roy Rogers, and Tony Martin each have a star in 4 different categories." + (source('1', 'Hollywood_Walk_of_Fame'));
popFactsList[19]="Boxer Muhammed Ali was granted a star on the Hollywood Walk of Fame, as the committee justified it as boxing being a form of \"live performance\", one of the five categories." + (source('1', 'Hollywood_Walk_of_Fame'));
popFactsList[20]="Encountering a MissingNo. Pok&eacute;mon in <i>Pok&eacute;mon Red</i> and <i>Blue</i> is the result of three computing events, including the game's random battle encounter system, the temporary storage of the player's name in the data buffer, and the game's error handling system. One of the effects of encountering a MissingNo. is the duplication of the 6th item in the player's item menu." + (source('1', 'MissingNo.'));
popFactsList[21]="In March 2013, Mats Valk of the Netherlands solved a Rubik's Cube in 5.55 seconds at the Zonhoven Open in Belgium." + (source('1', 'Rubik%27s_Cube'));
popFactsList[22]="A robot built from Lego Mindstormers and a Samsung Galaxy S4 phone was developed to solve a Rubik's Cube 3.25 seconds." + (source('1', 'Rubik%27s_Cube'));
popFactsList[23]="In January 2014 a cryptocurrency named Coinye West (named after rapper Kanye West) was introduced and circulated briefly before West's lawyers filed a lawsuit, pushing the creators to abandon the project." + (source('1', 'Coinye_West'));
popFactsList[24]="The \"S.O.S\" in S.O.S brand Soap Pads stands for \"Save Our Saucepans\"." + (source('1', 'S.O.S_Soap_Pad'));
popFactsList[25]="The first non-human animal to ask an existential question was a parrot named Alex, who asked what color he was. He learned \"grey\" after being told the answer 6 times." + (source('1', 'Alex_(parrot)'));
popFactsList[26]="In 1992, over 28,000 Friendly Floaties plastic ducks and other animals were lost in the Pacific Ocean near Hong Kong. They eventually washed to shore in Alaska, Washington, Hawaii, the United Kingdom, and several other places over the next 15 years." + (source('1', 'Friendly_Floatee'));
popFactsList[27]="Michael Jordan has appeared on the front of a Wheaties cereal box 18 different times, the most of any athlete." + (source('1', 'List_of_athletes_on_Wheaties_boxes'));
popFactsList[28]="In the Mall of America, there is a red chair from former Met Stadium attached to the wall, exactly where it sat inside Met Stadium (which once existed where Mall of America is now). It is to commemorate the 520-foot homerun that hall-of-famer Harmon Killebrew hit in 1967." + (source('1', 'Mall_of_America'));
popFactsList[29]="In 2008, astronauts took a Buzz Lightyear action figure into space on the Discovery Space Shuttle, as part of an educational experience for students." + (source('1', 'Toy_Story'));
popFactsList[30]="Book publisher Bloomsbury invested &pound;10 million in an attempt to keep <i>Harry Potter and the Deathly Hallows</i>' contents secure until its release date of July 21, 2007. Despite this, two U.S. papers published early reviews of the book." + (source('1', 'Harry_Potter_and_the_Deathly_Hallows'));
popFactsList[31]="Prescription medicine bottles are usually orange or light brown because of their ability to prevent ultraviolet light from degrading the potentially photosensitive contents, while still allowing enough light through to see the contents." + (source('1', 'Prescription_bottle'));
popFactsList[32]="A number with 3 digits or more is divisible by 8 if its last 3 digits are also divisible by 8." + (source('1', '8_(number)'));
popFactsList[33]="A Swedish family named their child Brfxxccxxmnpcccclllmmnprxvclmnckssqlbb11116 (pronounced <i>Albin</i>) as a protest against the naming laws in Sweden. The family was charged 5,000 kronor and the name was rejected." + (source('1', 'Naming_law_in_Sweden'));
popFactsList[34]="Koko the gorilla, who resides in the San Francisco zoo, reportedly knows over 1,000 words of Gorilla Sign Language (based on American Sign Language) and also understands over 2,000 words of English." + (source('1', 'Koko_(gorilla)'));
popFactsList[35]="In 2009, Google rented goats to eat their overgrown lawns in Mountain View, California." + (source('1', 'Rent_A_Goat'));
popFactsList[36]="The inventor of the shopping cart had to hire male and female models to push around shopping carts in order to make people comfortable using them. Men originally found them effeminate; women found them suggestive of a baby carriage." + (source('1', 'Shopping_cart'));
popFactsList[37]="In 2002, Kmart rebranded its iconic red logo in five prototype stores (4 in Illinois, and 1 in White Lake, Michigan) using a lime green and gray color scheme. " + (includeImage('These logos', 'kmart.jpg')) + " did not roll out to Kmart's other stores." + (source('1', 'Kmart'));
popFactsList[38]="UPS developed software in 2004 that would route UPS trucks to their destinations while minimizing left turns, in order to save a considerable amount of fuel." + (source('1', 'United_Parcel_Service'));
popFactsList[39]="Some species of bamboo can grow up to 35 inches in a 24-hour period." + (source('1', 'Bamboo'));
popFactsList[40]="A study in 2000 showed that Oxford Street in London had 250,000 blobs of chewing gum stuck to its pavement." + (source('1', 'Chewing_gum'));
popFactsList[41]="The original Skee-ball games in 1914 had a 36-foot lane, much longer than the 10-13 foot lanes today." + (source('1', 'Skee_ball'));
popFactsList[42]="Among Neil Patrick Harris' numerous television, movie, and Broadway credits, he is also the voice of the safety spiels and launch countdown of Disney's California Adventure's \"California Screamin'\" rollercoaster." + (source('1', "California_Screamin'"));
popFactsList[43]="Blood donor James Harrison had blood that contained a rare antigen which cured Rhesus disease. He has donated blood a record 1,000 times and saved 2,000,000 lives." + (source('1', 'James_Harrison_(blood_donor)'));
popFactsList[44]="Cases of chickenpox have been observed in chimpanzees and gorillas." + (source('1', 'Chickenpox'));
popFactsList[45]="In 2008, a teenager was decapitated by Batman: The Ride's roller coaster train at Six Flags Over Georgia, while allegedly trying to find his hat in a restricted area." + (source('1', 'Incidents_at_Six_Flags_parks'));
popFactsList[46]="\"Pok&eacute;mon\" is identical in both the singular and plural forms of the word, as is each Pok&eacute;mon species name. It is grammatically correct to say \"one Pok&eacute;mon\" and \"many Pok&eacute;mon\", as well as \"one Pikachu\" and \"many Pikachu\"." + (source('1', 'Pok%C3%A9mon'));
popFactsList[47]="For Black Friday 2013, the price of the popular party game <i>Cards Against Humanity</i> actually rose $5 - an \"anti-sale\". For Black Friday 2014, the company removed the card game from their website store and sold \"Bullshit\", a box containing actual sterilized bull feces, instead." + (source('1', 'Cards_Against_Humanity'));
popFactsList[48]="As of 2011, George R.R. Martin still writes his <i>A Song of Ice and Fire</i> novels and other fiction using Wordstar 4.0, a word processor version that was released in 1987." + (source('1', 'A_Song_of_Ice_and_Fire')) + (source('2', 'WordStar'));
popFactsList[49]="Epcot's famous ride and structure Spaceship Earth is made up of " + (includeImage('11,324 tiles', 'tiles.png')) + " and took 26 months to build." + (source('1', 'Spaceship_Earth_(Epcot)'));
popFactsList[50]="2 people have been killed due to gun violence at Universal Studios Hollywood, California. One man committed suicide by shooting himself near Despicable Me: Minion Mayhem; another incident involved a police officer shooting and killing a man carrying a gun. " + (source('1', 'Incidents_at_Universal_parks'));
popFactsList[51]="Among Grumpy Cat's numerous public appearances, she has appeared on a Honey Nut Cheerios commercial, and episode of <i>The Bachelorette</i>, and WWE <i>Monday Night Raw</i>." + (source('1', 'Grumpy_Cat'));
popFactsList[52]="Pigs were chosen as the enemies in the game <i>Angry Birds</i> because the swine-flu epidemic was popular in the news, during the game's development in 2009." + (source('1', 'Angry_Birds_(video_game)'));
popFactsList[53]="The Upright Citizens Brigade Theatre produced a play called <i>Seinfeld: The Purge</i>, which parodied both <i>Seinfeld</i> and <i>The Purge</i>. The play focused on what each Seinfeld character would do during a purge." + (source('1', 'The_Purge'));
popFactsList[54]="Playing cards first entered Southern Europe in the 14th century, using the Mamluk suits of cups, coins, swords, and polo-sticks, which are still used in traditional Latin decks today." + (source('1', 'Playing_card'));
popFactsList[55]="The joker was added to playing card decks around 1860, as a third trump for the game of Euchre, which ranked higher than the two bowers (the two highest ranking cards, the Jack of the trump suit and the Jack of the same color as the trump suit)." + (source('1', 'Playing_card'));
popFactsList[56]="The FCC fined CBS a record $550,000 over Janet Jackson's \"wardrobe malfunction\" at the Super Bowl XXXVIII halftime show in 2003. It was fought in the Supreme Court, and the fine was appealed and ultimately voided by the Third Circuit Court of Appeals in a 2011 ruling. A case to reinstate the fine was refused in 2012." + (source('1', 'Super_Bowl_XXXVIII_halftime-show_controversy'));
popFactsList[57]="YouTube co-founder Jawed Karim claims that Janet Jackson's \"wardrobe malfunction\" at the Super Bowl XXXVIII halftime show was what led to the creation of the video sharing website. This was due to his frustration at not being able to easily find a video clip of the incident." + (source('1', 'Super_Bowl_XXXVIII_halftime-show_controversy'));
popFactsList[58]="On July 12, 2016, <i>Pok&eacute;mon Go</i> became the most active mobile game in the United States ever with 21 million active users, eclipsing <i>Candy Crush Saga</i>'s peak of 20 million." + (source('1','Pokémon_Go'));
popFactsList[59]="Disney planned to open a theme park in 1998 called " + (includeImage('Disney\'s America', 'disneysamerica.jpg')) + ", dedicated to the history of the United States. It was planned first for Haymarket, VA, and Buena Park, CA, but the plans fell through both times. Several of the proposed elements of the park were included in California Adventure in 2001." + (source('1','Disney%27s_America'));
popFactsList[60]="The title of the popular comic strip \"Get Fuzzy\" comes from a concert poster that creator Darby Conley once made for his brother's band, the Fuzzy Sprouts. The poster read, \"Life's too short to be cool. Get Fuzzy.\"" + (source('1','Get_Fuzzy'));
popFactsList[61]="In February 2005, MySpace founder Chris DeWolfe held talks with Facebook founder Mark Zuckerberg about acquiring Facebook for $75 million, but DeWolfe rejected the asking price." + (source('1','Myspace'));
popFactsList[62]="Over 6,000 people applied to compete in the first season of <i>Survivor</i>; 800 were then interviewed in 16 cities. 48 people were then chosen, and after background checks and psychological evaluations done by the producers, the final 16 contestants and 2 alternates were picked." + (source('1','Survivor:_Borneo'));
popFactsList[63]="Nearly all of <i>The New York Times</i> crossword puzzles have rotational symmetry: they can be rotated 180 degrees and remain identical. When asked why, the first <i>Times</i> editor Margaret Farrar is said to have responded, \"Because it is prettier.\"" + (source('1','The_New_York_Times_crossword_puzzle'));
popFactsList[64]="American Airlines frequent flyer Steve Rothstein upgraded to a lifetime AAirpass in 1987, for $233,509.93, enabling him unlimited travel. During the more than 10 years he owned the pass, he traveled more than 10 million miles, and cost the airline $21 million, according to American Airlines. The airline terminated the lifetime pass in 2008." + (source('1','AAirpass'));
popFactsList[65]="In 2011, a newly discovered species of mushroom was named <i>Spongiforma squarepantsii</i>, after the character SpongeBob SquarePants." + (source('1','SpongeBob_SquarePants)')) + (source('2','Spongiforma_squarepantsii)'));

	/*  --          Sports list          --  */
var sportsFactsList = new Array;
sportsFactsList[0]="The New York Yankees were originally founded in 1901 as the Baltimore Orioles. When they moved to New York, they became the New York Highlanders, and then the Yankees." + (source('1', 'New_York_Yankees'));
sportsFactsList[1]="In 1912, Detroit Tigers pitcher Allan Travers pitched a complete game, giving up 26 hits, 24 runs (14 earned), 7 walks, and 1 strikeout. The Tigers lost 24-2. That was his only appearance in MLB." + (source('1', 'Allan_Travers'));
sportsFactsList[2]="Fictional characters who have bowled a perfect 300 game: Peg Bundy (<i>Married With Children</i>), Fred Flintstone (<i>The Flintstones</i>), Homer Simpson and Maggie Simpson (<i>The Simpsons</i>), Howard Sprague (<i>The Andy Griffith Show</i>), Jim (<i>According to Jim</i>), Ron Swanson (<i>Parks and Recreation</i>), and Mort Goldman (<i>Family Guy</i>)." + (source('1', '1989_(Perfect_game_(bowling)'));
sportsFactsList[3]="Prior to renaming the Tampa Bay Devil Rays to the Tampa Bay Rays in 2008, several other names were considered: Aces, Bandits, Cannons, Dukes, Stripes, and Stuart Sternberg's personal favorite, the \"Nine\"." + (source('1', '2008_Tampa_Bay_Devil_Rays_season'));
sportsFactsList[4]=timedFactsList[0];
sportsFactsList[5]="The cost of a 30-second commercial in Super Bowl I in 1967 was just $42,000 compared to Super Bowl XLVIII's cost of $4,000,000." + (source('1', 'Super_Bowl_I')) + (source('2', 'Super_Bowl_XLVIII'));
sportsFactsList[6]="The Milwaukee Brewers' blue and gold colors come from their original colors as the 1969 Seattle Pilots. Owner Bud Selig wanted to change the colors to navy and red when they moved to Milwaukee in 1970, but there wasn't enough time before Opening Day." + (source('1', 'Seattle_Pilots'));
sportsFactsList[7]="Babe Ruth once pitched a 4-pitch walk to start a game, got angry at the umpire's calls, and punched him, getting ejected. Reliever Ernie Shore came in and retired every batter for a combined no-hitter." + (source('1', 'Babe_Ruth'));
sportsFactsList[8]="The two creators of the famous song, \"Take Me Out to the Ball Game\", Jack Norworth and Albert Von Tilzer, had never been to a baseball game when they made the song. The two did eventually go to a baseball game, 20 and 32 years later, respectively." + (source('1', 'Take_Me_Out_to_the_Ball_Game'));
sportsFactsList[9]="In Nolan Ryan's 27-year pitching career, he struck out 7 pairs of fathers and sons." + (source('1', 'Nolan_Ryan'));
sportsFactsList[10]="Jackie Mitchell, one of the first female players in professional baseball, struck out both Babe Ruth and Lou Gehrig in an exhibition game in 1931." + (source('1', 'Jackie_Mitchell'));
sportsFactsList[11]="During the famous 1998 MLB home run record race, when Mark McGwire broke Roger Maris' home run record, his rival and competition Sammy Sosa ran in from right field and engaged McGwire in a celebratory embrace." + (source('1', '1998_home_run_chase'));
sportsFactsList[12]="In an effort to break the \"Curse of the Billy Goat,\" which has supposedly kept the Chicago Cubs from reaching the World Series in 1945, several times Cubs fans have hung butchered goat body parts from the Harry Caray statue." + (source('1', 'Curse_of_the_Billy_Goat'));
sportsFactsList[13]=timedFactsList[1];
sportsFactsList[14]="The 2008 Detroit Lions finished the season with an 0-16 record, becoming the first team to lose every game since the NFL schedule was increased to 16 games in 1978." + (source('1', '2008_Detroit_Lions_season'));
sportsFactsList[15]="MLB player Ryan Howard has appeared as himself in the television shows <i>Entourage</i>, <i>It's Always Sunny in Philadelphia</i>, and <i>The Office</i>." + (source('1', 'Ryan_Howard'));
sportsFactsList[16]=timedFactsList[2];
sportsFactsList[17]="The 3-point field goal was not introduced into the NBA until the 1979-80 season. " + (source('1', '1979–80_NBA_season'));
sportsFactsList[18]="During the 8-year stretch from 1996-2003, the New York Yankees went to the World Series 6 times, and won the Series 4 of those times. " + (source('1', 'List_of_World_Series_champions'));
sportsFactsList[19]="The 1988 Baltimore Orioles lost each of their first 21 games to start the season, until finally winning on April 29th to improve to 1-21." + (source('1', '1988_in_baseball'));
sportsFactsList[20]="During Wilt Chamberlain's famous 100-point basketball game in 1962, he missed 2 shots in a row while at 98 points. With 46 seconds remaining in the game, he made his next shot, ending at 100." + (source('1', 'Wilt_Chamberlain%27s_100-point_game'));
sportsFactsList[21]="The first person to run a sub-4-minute mile was Roger Bannister, who ran a mile in 3:59.4 in 1954. There is a plaque at Oxford University's Iffley Road Track commemorating the achievement." + (source('1', 'Four-minute_mile'));
sportsFactsList[22]="The 2016 Super Bowl did not use Roman Numerals to number it, like usual. Instead of Super Bowl L, it was known as <br/>" + (includeImage('Super Bowl 50', 'sb50.png')) + "." + (source('1', 'Super_Bowl_50'));
sportsFactsList[23]="The Montreal Canadiens appeared in the Stanley Cup Finals all 10 years from the 1950-51 season to the 1959-60 season, winning the Stanley Cup 6 times." + (source('1', 'List_of_NHL_franchise_post-season_appearance_streaks'));
sportsFactsList[24]="As of the end of the NHL's 2015-16 regular season, the Detroit Red Wings had appeared in the playoffs 25 seasons in a row, dating back to the 1990-91 season. The steak finally ended when the Red Wings missed the playoffs in 2016-17." + (source('1', 'List_of_NHL_franchise_post-season_appearance_streaks'));
sportsFactsList[25]="NHL player Wayne Gretzky scored 70+ goals in a season 4 different times: 92 goals in the 1981-82 season, 71 goals in '82-'83, 87 goals in '83-84, and 73 goals in '84-'85." + (source('1', 'List_of_NHL_players_with_50-goal_seasons'));
sportsFactsList[26]="On May 8, 2012, Texas Ranger player Josh Hamilton went 5-5 with 4 homeruns. All 4 homeruns were 2-run homeruns, and the runner on base all 4 times was Elvis Andrus." + (source('1', 'Josh_Hamilton'));
sportsFactsList[27]="Michael Jordan continued to receive his multi-million dollar NBA salary during his first retirement, when he left the NBA to play minor league baseball. He played for a Chicago White Sox minor league affiliate, which was owned by Chicago Bulls owner Jerry Reinsdorf." + (source('1', 'Michael_Jordan'));
sportsFactsList[28]=timedFactsList[4];
sportsFactsList[29]="During Yogi Berra's 18 years playing with the New York Yankees, the team appeared in the World Series 14 times, and won 10 of those series." + (source('1', 'Yogi_Berra')) + (source('1', 'List_of_World_Series_champions'));
sportsFactsList[30]="Tiger Woods made 142 straight cuts, making the cut for every tournament starting in 1998 until May 13, 2005." + (source('1', 'List_of_career_achievements_by_Tiger_Woods'));
sportsFactsList[31]=timedFactsList[5];
sportsFactsList[32]="New Jersey Devils goaltender Martin Brodeur scored 3 goals in his career as a goaltender in the NHL." + (source('1', 'List_of_goaltenders_who_have_scored_a_goal_in_an_NHL_game'));
sportsFactsList[33]="Shaquille O'Neal once missed all 11 free throw attempts in a single game in 2000." + (source("1", "List_of_career_achievements_by_Shaquille_O'Neal"));
sportsFactsList[34]="The 1995-96 Chicago Bulls finished the season with a 72-10 record (or a winning percentage of .878)." + (source('1', 'NBA_regular_season_records'));
sportsFactsList[35]="The 2001 Seattle Mariners had a 116-46 record (or a winning percentage of .716), however they lost in the American League Championship series against the Yankees, losing the series 4-1. " + (source('1', '2001_Seattle_Mariners_season'));
sportsFactsList[36]="Only 17 of the 50 states currently have an MLB franchise, in addition to the 1 team in Canada and 1 team in Washington, D.C." + (source('1', 'Current_Major_League_Baseball_franchises'));
sportsFactsList[37]="In 2011, the U.S. House of Representatives passed a bill ordering the United States Mint to produce commemorative coins with baseballs and gloves on them, including 50,000 gold coins, 400,000 silver coins, and 750,000 clad (Nickel-Copper) coins.  The money from surcharges of these non-circulating coins goes to the Baseball Hall of Fame." + (source('1', 'National_Baseball_Hall_of_Fame_and_Museum'));
sportsFactsList[38]="In 1994, Buffalo Sabres' goaltender Dominik Hašek made 70 saves in a single game, not allowing one goal. The game lasted until the 4th overtime when the Sabres finally won, 1-0." + (source('1', 'Dominik_Hašek'));
sportsFactsList[39]="After clinching the NL West in 2013, the Dodgers were asked by the Diamondbacks to not celebrate on the field (the Diamondbacks' Chase Field), so several Dodgers players climbed over the outfield wall and jumped into the pool." + (source('1', 'Chase_Field'));
sportsFactsList[40]="To help funding for building Chase Field, the Diamondbacks' home stadium, a quarter-cent increase in county sales tax was approved. The issue was so controversial that a homeless man shot and injured County Supervisor Mary Rose Wilcox, claiming her support for the tax justified his attack." + (source('1', 'Chase_Field'));
sportsFactsList[41]="Kobe Bryant's parents named him after the famous beef of Kobe, Japan, which they saw on a restaurant menu." + (source('1', 'Kobe_Bryant'));
sportsFactsList[42]="From 2000-2010, the Los Angeles Lakers appeared in the NBA Finals 7 times, winning the championship 5 times." + (source('1', 'List_of_NBA_champions'));
sportsFactsList[43]="The New Orleans Hornets (now Pelicans) relocated to Oklahoma City due to the damage caused by Hurricane Katrina in 2005, and were officially known as the New Orleans/Oklahoma City Hornets for two seasons." + (source('1', 'New_Orleans_Pelicans'));
sportsFactsList[44]="When Shaquille O'Neill and Kobe Bryant were no longer teammates, Shaq's team went 7-4 against Kobe's in the 11 times they played each other. However, Kobe outscored Shaq all 11 times, by a total of 385-184." + (source('1', 'Shaq%E2%80%93Kobe_feud'));
sportsFactsList[45]="Since Russia was banned from the 2016 Summer Olympics due to the doping scandal, no Russian athlete was allowed to participate internationally. The International Olympic Committee allowed 2 athletes to compete as \"neutral\" athletes, under the " + (includeImage('Olympic flag', 'olympicflag.jpg')) + ", who did not represent any nation." + (source('1', 'Independent_Olympic_Athletes_at_the_2016_Summer_Olympics'));
sportsFactsList[46]="10 athletes participated in the 2016 Summer Olympics officially as the Team of Refugee Olympic Athletes, in the context of the \"worldwide refugee crisis\", of which the European migrant crisis and the Syrian Civil War are a prominent part. The athletes competed under the " + (includeImage('Olympic flag', 'olympicflag.jpg')) + " with the IOC country code ROA." + (source('1', 'Refugee_Olympic_Athletes_at_the_2016_Summer_Olympics'));
sportsFactsList[47]="MLB Hall of Famer Rickey Henderson retired with 1,406 career stolen bases, which is 50% higher than the previous record of 938 held by Lou Brock." + (source('1','Rickey_Henderson'));
sportsFactsList[48]="In his first 5 years of Major League Baseball, Mike Trout has won 2 American League MVP awards and placed second in MVP voting 3 times. He has also appeared in all 5 All-Star games, and won the All-Star MVP award 2 times." + (source('1','Mike_Trout'));

	/*  --          Technology list          --  */
var technologyFactsList = new Array;
technologyFactsList[0]="Thomas Edison's last breath is reportedly contained in a test tube at the Henry Ford Museum." + (source('1', 'Thomas_Edison'));
technologyFactsList[1]="On January 1st, 2000, the U.S. Naval Observatory master clock, which keeps the country's official time, gave the date on its website as January 1st, 19100." + (source('1', 'Year_2000_problem'));
technologyFactsList[2]="On January 1st, 2013, Mark Zuckerberg lowered his annual salary from $500,000 to $1.00." + (source('1', 'Mark_Zuckerberg'));
technologyFactsList[3]="The name Wikipedia was created by co-founder Larry Sanger; it is a portmanteau of <i>wiki</i> (the name of a type of collaborative website, from the Hawaiian word for \"quick\"), and <i>pedia</i> from encyclopedia." + (source('1', 'Wikipedia'));
technologyFactsList[4]="The first blueprints of Twitter by its creator @jack show it as originally being named \"my.stat.us\"." + (source('1', 'Twitter'));
technologyFactsList[5]="In 2000, the \"Pikachu virus\" was distributed to internet users via email, considered to be the first computer virus aimed at children. The email message said \"Pikachu is your friend\" and had an attached program that would delete a computer's files when restarted." + (source('1', 'Pikachu_virus'));
technologyFactsList[6]="Throughout its lifespan, \"SmarterChild\" had 30 million instant messenger friends on AOL Instant Messenger and MSN Messenger. It was retired in November 2008." + (source('1', 'SmarterChild')) + (source('2', 'AOL_Instant_Messenger'));
technologyFactsList[7]="The maximum amount of tape a standard VHS cassette could hold is 1,410 feet, which is about 4-5 hours of video." + (source('1', 'VHS'));
technologyFactsList[8]="The island country of Niue became the first \"Wi-Fi nation\" in 2003, offering free wireless internet access to the entire country." + (source('1', 'Niue'));
technologyFactsList[9]="The development project \"Super Mario 128\" was originally meant to be a direct sequel to <i>Super Mario 64</i>. It was eventually abandoned and elements from it were later used in <i>Pikmin</i> and <i>Super Mario Galaxy</i>." + (source('1', 'Super_Mario_128'));
technologyFactsList[10]="Home video game consoles were banned in mainland China in the year 2000, until the year 2013, when the ban was lifted." + (source('1', 'List_of_banned_video_games'));
technologyFactsList[11]="In <i>The Sims 2</i>, an average Sim baby becomes a toddler on day 3, a child on day 7, a teen on day 15, an adult on day 30, an elder on day 59, and will die naturally on day 68-90." + (source('1', 'The_Sims_2'));
technologyFactsList[12]="Matthew Perry, Steven Spielberg, and some players of the Chicago Bulls were all reported to have called Nintendo in 1996 to get a then hard to get Nintendo 64." + (source('1', 'Nintendo_64'));
technologyFactsList[13]="Among the ways to die in <i>The Oregon Trail</i> video game are measles, snakebite, dysentry, typhoid, cholera, exhaustion, drowning, and a broken leg." + (source('1', 'The_Oregon_Trail_(video_game)'));
technologyFactsList[14]="Former President Lyndon B. Johnson owned an amphicar - a hybrid car and boat. He would scare visitors by driving it into the lake, claiming malfunctioning brakes." + (source('1', 'Amphicar'));
technologyFactsList[15]="Nintendo was sued and found guilty when <i>Mario Party</i> players got blisters on their palms while playing the mini games that required them to rapidly spin the analog stick. They also gave the players free gaming gloves to safely play the game." + (source('1', 'Mario_Party'));
technologyFactsList[16]="The original Japanese version of the arcade game Pac-Man was called Puck Man, referencing the character's shape being like a hockey puck." + (source('1', 'Pac-Man'));
technologyFactsList[17]="Due to Circuit City's bankruptcy in 2008, several brand new stores were closed after just a few weeks of being open. Some stores were also built and never even opened." + (source('1', 'Circuit_City'));
technologyFactsList[18]="Best Buy was originally a chain of stores called Sound of Music. After its most profitable store was hit by a tornado, its owner held a sale selling its damaged stock, promising \"best buys\"." + (source('1', 'Best_Buy'));
technologyFactsList[19]="Amazon released the " + (includeImage('first Kindle', 'kindle.jpg')) + " in November 2007, for $399. It sold out in five and a half hours and remained out of stock for five months until late April 2008." + (source('1', 'Amazon_Kindle'));
technologyFactsList[20]="Sonic the Hedgehog's sidekick, Miles \"Tails\" Prower, gets his name from a pun on \"miles per hour\", referencing the famed speed of Sonic the Hedgehog." + (source('1', 'Tails_(character)'));
technologyFactsList[21]="The early Nintendo game <i>Baseball</i>, released in 1983, only allowed the player to choose 6 of the 26 MLB teams to play as." + (source('1', 'Baseball_(1983_video_game)'));
technologyFactsList[22]="In 2010 and 2012, Sega released a follow-up sequel to the original Sonic series from 1991 to 1994. It is called <i>Sonic the Hedgehog 4 Episode I</i> and <i>Episode II</i>, and picks up where <i>Sonic and Knuckles</i> left off." + (source('1', 'Sonic_the_Hedgehog_4:_Episode_I')) + (source('2', 'Sonic_the_Hedgehog_4:_Episode_II'));
technologyFactsList[23]="The creator of Atari video game system also created Chuck E. Cheese, which could function as a way to distribute Atari games and get kids to play Atari video games." + (source('1', 'Nolan_Bushnell'));
technologyFactsList[24]="Some alternate endings considered for the video game <i>Portal 2</i> included the player-character shooting a Portal onto the moon's surface, and having the player die of asphyxiation over a closing song; another featured Chell finally saying a single word." + (source('1', 'Portal_2'));
technologyFactsList[25]="The oldest still-existing .com domain is www.symbolics.com, which was registered on March 15, 1985." + (source('1', '.com'));
technologyFactsList[26]="The first iPhone (released in 2007) did not have video recording, GPS, a front-facing camera, or a digital compass." + (source('1', 'List_of_iOS_devices'));
technologyFactsList[27]="Upon the launch of Gmail and its 1-GB inboxes on April 1, 2004, many people dismissed it as a joke since Google is known for their elaborate April Fools' Day jokes." + (source('1', "April_Fools'_Day"));
technologyFactsList[28]="Before the emergence of the World Wide Web, the CD-Rom version of Encarta Encyclopedia included its own search software and hyperlinking (to other articles), developed by a team of CD-Rom Division developers." + (source('1', 'Encarta'));
technologyFactsList[29]="<i>WALL-E</i> director Andrew Stanton wanted EVE to be at the higher end of technology, so he consulted with iPod designer Jonathan Ive, who inspected her design." + (source('1', 'WALL-E'));
technologyFactsList[30]="Woody was the most complex character to animate in the original <i>Toy Story</i> film, requiring 723 motion controls, including 212 for his face and 58 for his mouth." + (source('1', 'Toy_Story'));
technologyFactsList[31]="The deprecated HTML &lt;blink&gt; tag was a joke suggestion by Lou Montulli, but an engineer liked the idea so much that he went to the office after leaving the bar at midnight, and implemented it overnight." + (source('1', 'Blink_element'));
technologyFactsList[32]="In the original Japanese version of Pac-Man (known as Puck-Man), the names of the four ghost enemies, when translated, are Chaser, Ambusher, Fickle, and Stupid." + (source('1', 'Pac-Man'));
technologyFactsList[33]="Interactive urinals have been developed in several countries, allowing users to play video games while they urinate." + (source('1', 'Interactive_urinal'));
technologyFactsList[34]="Sonic the Hedgehog's blue pigmentation comes from Sega's cobalt blue logo, his shoes were inspired by Michael Jackson's boots, and his personality was based on Bill Clinton's \"can-do\" attitude." + (source('1', 'Sega_Genesis'));
technologyFactsList[35]="The Atari 2600 game <i>E.T. the Extra-Terrestrial</i>, considered one of the worst video games of all time, was among the ten to twenty semi-trailer truckloads of games buried by Atari in the \"" + (includeImage('Atari video game burial', 'et.jpg')) + "\" in Alamogordo, New Mexico, in 1983." + (source('1', 'E.T._the_Extra-Terrestrial_(video_game)'));
technologyFactsList[36]="The first Nintendo game to feature Luigi as the lone main character was <i>Mario is Missing!</i>, released in 1992. This did not happen again until <i>Luigi's Mansion</i> in 2001." + (source('1', 'Mario_Is_Missing'));
technologyFactsList[37]="The Sony PlayStation was originally an add-on peripheral for the Super Nintendo, called Play Station, which allowed the SNES to play a CD format called " + (includeImage('SNES-CD', 'snes-cd.jpg')) + ".  After Nintendo broke their contract with Sony in favor of their rival Philips, Sony eventually created their own video game system." + (source('1', 'SNES-CD'));
technologyFactsList[38]="Nintendo's first attempt at a 3D gaming system was the " + (includeImage('Virtual Boy', 'virtualboy.jpg')) + " in 1995, which was considered a commercial failure as it sold less than 800,000 units, lacked portability, had poor wireframe monochromatic graphics, was overpriced, and sometimes caused painful physiological symptoms. It was discontinued after just 7 months." + (source('1', 'Virtual_Boy'));
technologyFactsList[39]="Newspapers first started printing color comic strips in the 1890's, when the CMYK printing press was invented. It utilized the primary pigment colors cyan, magenta, yellow, and black." + (source('1','Shades_of_cyan'));
technologyFactsList[40]="The 1981 Nintendo arcade game <i>Donkey Kong</i> was originally going to be a game based off of the <i>Popeye</i> comic strip. However, unable to get licensing, game director Shigeru Miyamoto eventually settled on new characters: a love triangle between a gorilla, carpenter, and girlfriend that mirrors the rivalry between Bluto and Popeye for Olive Oyl." + (source('1','Popeye_(video_game)')) + (source('2','Donkey_Kong_(video_game)'));
technologyFactsList[41]="According to a study in 2007 by Tom Chavez of \"Rapt\", the \"I'm Feeling Lucky\" feature cost Google about $110 million a year, as 1% of all searches used this feature and bypassed all advertising." + (source('1','Google_Search'));
technologyFactsList[42]="Early screenshots of <i>Conker's Bad Fur Day</i> for Nintendo 64 were criticized for its cuteness and similarity to Rare's past games. In response to this, Rare overhauled the game for mature audiences, featuring graphic violence, alcohol and tobacco use, profanity, vulgar humor, and pop culture references." + (source('1','Conker%27s_Bad_Fur_Day'));

	/*  --          Television/Film list          --  */
var televisionFactsList = new Array;
televisionFactsList[0]="The TV show <i>Seinfeld</i> was originally titled <i>Stand Up</i>, then re-titled <i>The Seinfeld Chronicles</i>, before settling on just <i>Seinfeld</i>." + (source('1', 'The_Seinfeld_Chronicles'));
televisionFactsList[1]="Kramer, Jerry's friend and neighbor on <i>Seinfeld</i>, was originally named Kessler in the show's pilot." + (source('1', 'The_Seinfeld_Chronicles'));
televisionFactsList[2]="Bill Murray's part in <i>Zombieland</i> was originally also considered for Sylvester Stallone, Joe Pesci, Mark Hamill, Dwayne Johnson, Kevin Bacon, Jean-Claude Van Damme or Matthew McConaughey." + (source('1', 'Zombieland'));
televisionFactsList[3]="The very last rental at Blockbuster was <i>This Is The End</i>, on November 9, 2013, in a store in Hawaii." + (source('1', 'Blockbuster_LLC'));
televisionFactsList[4]="Jackie, Hyde, Donna, Fez, Red, and Kitty appeared in all 200 episodes of <i>That '70s Show</i>." + (source('1', "List_of_That_'70s_Show_episodes"));
televisionFactsList[5]="Matt Groening named the Simpsons family characters after his own family members, substituting \"Bart\" for his own name." + (source('1', 'Simpson_family'));
televisionFactsList[6]="The working title of the TV show <i>New Girl</i> was <i>Chicks & Dicks</i>." + (source('1', 'New_Girl'));
televisionFactsList[7]="There is only 1 episode of 550+ episodes of <i>The Simpsons</i> to not feature (or even mention) Bart Simpson: season 20's \"Four Great Women and a Manicure\"." + (source('1', 'Four_Great_Women_and_a_Manicure'));
televisionFactsList[8]="Voice actor Billy West has played Bugs Bunny, Elmer Fudd, Fry and Dr. Zoidberg (<i>Futurama</i>), Doug Funnie (<i>Doug</i>), the red M&M, Popeye, Shaggy (<i>Scooby-Doo</i>), Tom (<i>Tom & Jerry</i>), Woody Woodpecker, and Ren and Stimpy." + (source('1', 'Billy_West'));
televisionFactsList[9]="The 2008 film <i>Forgetting Sarah Marshall</i> was only \"60 or 70% scripted\", with the rest of the film being improv." + (source('1', 'Forgetting_Sarah_Marshall'));
televisionFactsList[10]="The most-watched TV series finale, <i>M*A*S*H</i>, had 105.9 million viewers. Followed by <i>Cheers</i>, <i>Seinfeld</i>, <i>Friends</i>, and <i>Magnum, P.I.</i>" + (source('1', 'List_of_most_watched_television_broadcasts'));
televisionFactsList[11]="Despite popular perceptions, the cartoon yellow canary, Tweety, is actually male." + (source('1', 'Tweety'));
televisionFactsList[12]="The movie <i>Honey, I Blew Up the Kid</i> was not originally a sequel to <i>Honey, I Shrunk the Kids</i>. It was a separate movie called <i>Big Baby</i>." + (source('1', 'Honey,_I_Blew_Up_the_Kid'));
televisionFactsList[13]="Development of <i>Inception</i> began roughly 10 years before the film's release when Christopher Nolan wrote a treatment about dream-stealers." + (source('1', 'Inception'));
televisionFactsList[14]="The first ever contestant to win the $1,000,000 prize on <i>Who Wants to be a Millionaire?</i> used his lifeline to call his dad to tell him he was going to win, instead of asking for help." + (source('1', 'John_Carpenter_(game_show_contestant)'));
televisionFactsList[15]="<i>Survivor</i>'s first season winner Richard Hatch later appeared on the Australian version of <i>Who Wants to be a Millionaire?</i>, and won $0, answering his fourth question wrong." + (source('1', 'Who_Wants_to_Be_a_Millionaire%3F_(Australian_game_show)'));
televisionFactsList[16]="In the pilot episode of the US version of <i>The Office</i>, 3 unnamed women and 1 unnamed man appear in the episode and are not seen in any other episode." + (source('1', 'Pilot_(The_Office)'));
televisionFactsList[17]="The initial proposed name for the TV show <i>Law & Order: SVU</i> was <i>Law and Order: Sex Crimes</i>." + (source('1', 'Law_%26_Order:_Special_Victims_Unit'));
televisionFactsList[18]="The film <i>50/50</i> was originally titled <i>I'm With Cancer</i>, and then, <i>Live With It</i>, before settling on <i>50/50</i>." + (source('1', '50/50_(2011_film)'));
televisionFactsList[19]="Ben Wyatt's character and story on <i>Parks and Recreation</i> was an original idea for the pilot of the show, until Leslie Knope was created." + (source('1', 'Ben_Wyatt_(Parks_and_Recreation)'));
televisionFactsList[20]="Lyndsey Fonseca and David Henrie, who play Ted's kids in 2030 on <i>How I Met Your Mother</i>, auditioned for Katniss and Peeta in <i>The Hunger Games</i>." + (source('1', 'The_Hunger_Games_(film_series)'));
televisionFactsList[21]="In <i>The Simpsons</i> episode \"Homer at the Bat\", Jose Canseco (playing himself) was originally supposed to wake up in bed with Edna Krabappel and miss the game. However, Canseco's wife objected and the part was rewritten." + (source('1', 'Homer_at_the_Bat'));
televisionFactsList[22]="In the season 8 finale of <i>Scrubs</i>, the Janitor's real name was finally revealed: Glenn Matthews. This was later confirmed by show creator Bill Lawrence." + (source('1', 'Janitor_(Scrubs)'));
televisionFactsList[23]="The character Tuco (played by Raymond Cruz) on <i>Breaking Bad</i> was killed off because the actor found the part too difficult to play." + (source('1', 'Kill_off'));
televisionFactsList[24]="After 25 seasons of Bart Simpson being in 4th grade, season 26 of The Simpsons finally has him in his first day of 5th grade." + (source('1', 'The_Simpsons_(season_26)'));
televisionFactsList[25]="Brad Pitt voluntarily visited a dentist to have pieces of his front teeth chipped off for his role in <i>Fight Club</i>." + (source('1', 'Fight_Club'));
televisionFactsList[26]="Among the numerous spinoffs of <i>The Brady Bunch</i>, an hour-long drama spinoff called <i>The Bradys</i> was aired in 1990, lasting only 6 episodes. All of the main cast returned for the show except for Maureen McCormick (the original Marcia)." + (source('1', 'The_Bradys'));
televisionFactsList[27]="One of the original pairs of ruby slippers that Dorothy wore in <i>The Wizard of Oz</i> sold at an auction in 2000 for $666,000." + (source('1', 'The_Wizard_of_Oz_(1939_film)'));
televisionFactsList[28]="Anne Dudek played Precious on <i>Friends</i> and Natalie on <i>How I Met Your Mother</i>; both shows feature her character getting dumped by a main character on her birthday." + (source('1', 'Return_of_the_Shirt')) + (source('2', 'Anne_Dudek'));
televisionFactsList[29]="Mike \"Boogie\" Malin, winner of <i>Big Brother 7</i>, was a stand-in for Matthew Perry on <i>Friends</i>." + (source('1', 'Mike_Malin_(Big_Brother)'));
televisionFactsList[30]="In 2008, a large fire broke out in Universal Studios' backlots, destroying over 40,000 archived digital film copies, including <i>Knocked Up</i>, <i>Law & Order</i>, <i>The Office</i>, <i>Miami Vice</i>, & <i>I Love Lucy</i>." + (source('1', 'Universal_Studios_Hollywood'));
televisionFactsList[31]="After a near-fatal car accident, Mel Blanc returned to his voice role of Barney Rubble sooner than expected when the entire cast of <i>The Flintstones</i> had a temporary recording studio set up at his bedside." + (source('1', 'The_Flintstones'));
televisionFactsList[32]="In 1962, <i>The Jetsons</i> cartoon series featured several inventions that didn't exist, but are in common use today: flat screen 3D TV's, newspaper on a tablet, a computer virus, video chat, a tanning bed, and a treadmill." + (source('1', 'The_Jetsons'));
televisionFactsList[33]="In the original plan for the <i>Lost</i> pilot, Jack was supposed to die instead of the airplane pilot and Kate was to emerge as the leader of the group." + (source('1', 'Pilot_(Lost)'));
televisionFactsList[34]="The show <i>Futurama</i> was named after a pavilion in the 1939 World's Fair, which depicted what the world would be like in 1959. Other considered titles were <i>Aloha, Mars!</i> and <i>Doomsville</i>." + (source('1', 'Futurama'));
televisionFactsList[35]="Ross Geller's nicknames on <i>Friends</i> include: Ross-A-Tron, Tyrannosaurus Ross, Rossie, Ross - The Divorce Force, Ross - The Divorcer, Red Ross, Dr. Geller, Wet Pants Geller, Two Divorces, Mental Geller, Bea, Dinosaur Guy, Dr. Monkey, Bridesboy, Cookie-Dude, Clifford Alvarez, Ron, Prof. Geller, Ginger, Magellan, Wet-Head, Mr. Big Shot, Pampers, Bobo the sperm guy, and Mr. Right Place At The Right Time." + (source('1', 'Ross_Geller'));
televisionFactsList[36]="Considered to be one of the worst sitcoms of all time, Lucille Ball's last sitcom <i>Life with Lucy</i> aired when she was 75 years old." + (source('1', 'List_of_sitcoms_notable_for_negative_reception'));
televisionFactsList[37]="<i>Futurama</i> character Zoidberg was named after an Apple II game David X. Cohen (the show's co-developer) created in high school." + (source('1', 'Zoidberg'));
televisionFactsList[38]="The show <i>It's Always Sunny in Philadelphia</i> started out as a short film idea about a man telling his friend he might have cancer, while the friend is only intent on borrowing a cup of sugar for the \"shitload of coffee\" he has made." + (source('1', 'It%27s_Always_Sunny_in_Philadelphia'));
televisionFactsList[39]="When Fonzie jumped the shark (also creating the popular term, jumping the shark) in the season 5 premiere of <i>Happy Days</i>, the stunt was a way to showcase Henry Winkler's real life waterskiing skills." + (source('1', 'Jumping_the_shark'));
televisionFactsList[40]="Due to Philip Seymour Hoffman's death in February 2014, his character in <i>Mockingjay Part 2</i>, Plutarch Heavensbee, was digitally recreated for a major scene, and some of his lines were rewritten and given to other characters." + (source('1', 'The_Hunger_Games:_Mockingjay_-_Part_2'));
televisionFactsList[41]="<i>Rocko's Modern Life</i> creator Joe Murray thought of the idea for the show after visiting a zoo and observing a wallaby that seemed oblivious to the chaos around him." + (source('1', "Rocko's_Modern_Life"));
televisionFactsList[42]="The ampersand (&amp;) and the word \"and\" mean two different things in film credits: The ampersand indicates two writers collaborating on a script, while \"and\" indicates that one person wrote the script/screenplay, and one rewrote it or worked on it at a different time." + (source('1', 'Ampersand'));
televisionFactsList[43]="In 26 seasons of <i>The Simpsons</i>, the show has only had 13 Christmas-themed episodes (plus 1 <i>Tracy Ullman</i> short)." + (source('1', 'List_of_United_States_Christmas_television_episodes'));
televisionFactsList[44]="The 1995 film <i>Bushwacked</i> was originally intended to be a spinoff of <i>Home Alone</i>, with Daniel Stern reprising his role as Marv, giving up his life of crime only to be framed at his new job." + (source('1', 'Home_Alone'));
televisionFactsList[45]="There are several instances where the word \"fuck\" is used in a PG-rated film: including <i>All the President's Men</i>, <i>The Front</i>, <i>Tootsie</i>, <i>Terms of Endearment</i>, <i>Sixteen Candles</i>, <i>Spaceballs</i>, <i>Big</i>, <i>Caddyshack 2</i>, and <i>Beetlejuice</i>." + (source('1', 'Motion_Picture_Association_of_America_film_rating_system'));
televisionFactsList[46]="The season 1 Pok&eacute;mon episode \"Tentacool and Tentacruel\" was removed from rotation temporarily in 2001, due to the similarity of the Tentacruel destroying buildings and the September 11th attacks. " + (source('1', 'PokÃ©mon_episodes_removed_from_rotation'));
televisionFactsList[47]="Ed O'Neill, known for his roles as Al Bundy on <i>Married... With Children</i> and Jay Pritchett on <i>Modern Family</i>, was a high school social studies teacher before becoming an actor." + (source('1', 'Ed_O%27Neill'));
televisionFactsList[48]="During the ten season run of the TV show <i>Friends</i>, five of the six main characters are shown drunk in at least one episode. The exception is Joey, who is never shown drunk." + (source('1', 'Friends_(season_1)')) + (source('2', 'Friends_(season_2)')) + (source('3', 'Friends_(season_3)')) + (source('4', 'Friends_(season_5)')) + (source('5', 'The_One_with_the_Proposal'));
televisionFactsList[49]="The National Lampoon's <i>Vacation</i> film series features 5 different actors playing the role of Rusty and 5 different actresses playing Audrey, in the 5 theatre-released films." + (source('1', 'National_Lampoon%27s_Vacation_(film_series)'));
televisionFactsList[50]="The term \"soap opera\" comes from the soap and detergent commercials that were originally broadcast during the first soap operas, aimed at the women who were cleaning their houses while watching them." + (source('1', 'Soap_opera'));
televisionFactsList[51]="Over the course of 26 seasons of their show, the Simpsons family have owned the following pets: two dogs (Santa's Little Helper and Laddie), five cats (Snowball I, Snowball II, Snowball III, Coltrane, Snowball V), an elephant (Stampy), a snake (Strangles), a guinea pig (Pokey), a horse (Princess), and a lobster (Pinchy)." + (source('1', 'Simpson_family'));
televisionFactsList[52]="For the role of <i>Friends</i> character Gunther, James Michael Tyler was cast because he was the only extra who could competently work the coffee machine on the set. He ended up appearing in the most episodes (148 out of 236) besides the main cast." + (source('1', 'List_of_Friends_characters')) + (source('2', 'James_Michael_Tyler'));
televisionFactsList[53]="Ruth Cohen, who plays the cashier at Monk's Cafe on <i>Seinfeld</i>, appears in the most episodes (101 out of 180) besides the main cast." + (source('1', 'Ruth_Cohen'));
televisionFactsList[54]=timedFactsList[7];
televisionFactsList[55]="The original plan for season 6 of <i>The Brady Bunch</i> was to use Carol's previous husband as a mechanism to replace Robert Reed (who was constantly unhappy with the show's scripts) in season 6. However the show was canceled after its fifth season." + (source('1', 'Characters_of_The_Brady_Bunch')) + (source('2', 'Robert_Reed'));
televisionFactsList[56]="Scenes for an episode of <i>Entourage</i> were shot on location at a 2005 U2 concert. Similarly, scenes for the <i>Entourage</i> film were shot on location at the 72nd Golden Globe Awards." + (source('1', 'City_of_Blinding_Lights')) + (source('2', 'Entourage_(film)'));
televisionFactsList[57]="<i>Taken</i> actor Liam Neeson turned down the role of James Bond in 1995's <i>Goldeneye</i> because he wasn't interested in starring in action movies." + (source('1', 'List_of_actors_considered_for_the_James_Bond_character'));
televisionFactsList[58]="<i>American Sniper</i> producer and star Bradley Cooper had originally thought of actor Chris Pratt to play the lead role of Chris Kyle, but WB agreed to buy the film only if Bradley Cooper would star." + (source('1', 'American_Sniper_(film)'));
televisionFactsList[59]="Having trouble selling <i>The Terminator</i> to production companies, the then inexperienced James Cameron eventually sold the screenplay for one dollar, on the condition that Cameron direct the film." + (source('1', 'James_Cameron'));
televisionFactsList[60]="Steve Carell and all other cast members of <i>The Office</i> \"flat-out lied\" for months about Carell not returning to the finale episode of the show in any capacity. His lines were even left out of the initial table read for the episode." + (source('1', 'Finale_(The_Office)'));
televisionFactsList[61]="<i>Community</i> creator Dan Harmon created the TV series basing it off his own life. He enrolled in a community college to save his relationship with his girlfriend, and ended up bonding with a study group he had little in common with." + (source('1', 'Community_(TV_series)'));
televisionFactsList[62]="Starting in 2014, boxer Mike Tyson starred in an animated TV series which featured himself and his friends solving mysteries (similar to <i>Scooby-Doo</i>, among other silly things such as taking an oatmeal bath with cooked oatmeal, owning a pet grizzly bear, and using mosquitoes to help him sleep." + (source('1', 'Mike_Tyson_Mysteries'));
televisionFactsList[63]="The first animated character to receive a star on the Hollywood Walk of Fame was Mickey Mouse in 1978. Since then, others including Bugs Bunny, The Simpsons, and Snow White have also received a star." + (source('1', 'Hollywood_Walk_of_Fame'));
televisionFactsList[64]="Actor Ed O'Neill's star on the Hollywood Walk of Fame lies in front of a shoe store, a deliberate reference to his character's profession on <i>Married... With Children</i>." + (source('1', 'Hollywood_Walk_of_Fame'));
televisionFactsList[65]="<i>The Fast and the Furious</i> film series changes its naming system with each film released: <i>The Fast and the Furious</i>, <i>2 Fast 2 Furious</i>, <i>The Fast and the Furious: Tokyo Drift</i>, <i>Fast & Furious</i>, <i>Fast Five</i>, <i>Fast & Furious 6</i>, and <i>Furious 7</i>. " + (source('1', 'The_Fast_and_the_Furious'));
televisionFactsList[66]="<i>Lord of the Rings</i> actor Sean Bean's fear of flying in helicopters caused him difficulties when filming in New Zealand. In one instance, he took a ski lift into the mountains while wearing his full costume, and hiked the final few miles to the filming location." + (source('1', 'Sean_Bean'));
televisionFactsList[67]="The staff of Pixar came up with the original ideas for <i>WALL-E</i>, <i>A Bug's Life</i>, and <i>Monsters Inc.</i> all during one lunch in 1994." + (source('1', 'WALL-E'));
televisionFactsList[68]="Throughout Eileen Fulton's 50-year tenure on the soap opera <i>As the World Turns</i>, her character Lisa Grimaldi had 8 spouses." + (source('1', 'Lisa_Grimaldi'));
televisionFactsList[69]="<i>CBS Evening News</i> has aired over 16,400 episodes, dating back to May 3, 1948." + (source('1', 'List_of_longest-running_United_States_television_series'));
televisionFactsList[70]=timedFactsList[8];
televisionFactsList[71]="In <i>Grey's Anatomy</i>, only 4 of the main characters have appeared in all 13 seasons of the show: Meredith, Alex, Dr. Bailey, and Richard. Also appearing in all 12 seasons is the recurring character, Bokhee the scrub nurse." + (source('1', 'List_of_Grey%27s_Anatomy_cast_members'));
televisionFactsList[72]="None of the main cast of <i>ER</i> appeared in all of the show's 15 seasons. Laura Innes' character Kerry Weaver appeared in 13 seasons, the most of any main cast member." + (source('1', 'Cast_of_ER'));
televisionFactsList[73]="Starting with its 8th season, <i>Aqua Teen Hunger Force</i> changed its series title with each new season: <i>Aqua Unit Patrol Squad 1</i> was season 8's title, <i>Aqua Something You Know Whatever</i> for season 9, and <i>Aqua TV Show Show</i> for season 10." + (source('1', 'Aqua_Teen_Hunger_Force'));
televisionFactsList[74]="Kel Mitchell, of <i>All That</i> and <i>Kenan & Kel</i> fame, also auditioned for <i>SNL</i> but lost the part to Kenan Thompson." + (source('1', 'Kel_Mitchell'));
televisionFactsList[75]="The \"Censored Eleven\" is a group of <i>Looney Tunes</i> and <i>Merrie Melodies</i> cartoons that were withheld from syndication in 1968, due to heavy use of offensive racial stereotypes that were too prevalent to just be edited out." + (source('1', 'Censored_Eleven'));
televisionFactsList[76]="At least 350 lives have been saved by knowledge gained from viewers watching <i>Rescue 911</i>, a CBS television series which featured recordings and reenactments of situations involving 9-1-1 calls." + (source('1', 'Rescue_911'));
televisionFactsList[77]="\"The Finale\", <i>Seinfeld</i>'s last episode, commanded approximately $1 million for a 30-second commercial, marking the first time a regular primetime television series had that high of an advertising rate." + (source('1', 'The_Finale_(Seinfeld)'));
televisionFactsList[78]="When \"The Finale\", <i>Seinfeld</i>'s last episode originally aired, TV Land paid tribute by not airing any shows opposite it, instead showing a still shot of a closed office door with notes that read, \"We're TV Fans so... we're watching the last episode of Seinfeld. Will return at 10pm et, 7pm pt.\"." + (source('1', 'The_Finale_(Seinfeld)'));
televisionFactsList[79]="The first episode of season 7 of <i>Roseanne</i> only listed the first names of all cast and crew in the credits, in celebration of Roseanne's real life divorce with Tom Arnold and dropping his last name." + (source('1', 'The_Finale_(Seinfeld)'));
televisionFactsList[80]="When casting for the main lead in <i>The Wonder Years</i>, the show's creators interviewed 5 casting directors, all of whom recommended Fred Savage for the role." + (source('1', 'The_Wonder_Years'));
televisionFactsList[81]="James Cameron's <i>Titanic</i> was the highest-grossing film for 12 years before it was surpassed by James Cameron's <i>Avatar</i> in 2009." + (source('1', 'List_of_highest-grossing_films'));
televisionFactsList[82]="Actor John Ratzenberger appears in all of the first 15 Pixar films: Hamm the Piggy Bank in the <i>Toy Story</i> series, P.T. Flea in <i>A Bug's Life</i>, The Abominable Snowman in the <i>Monsters, Inc.</i> series, the school of moonfish in the <i>Finding Nemo</i> series, The Underminer in <i>The Incredibles</i>, Mack the Truck in the <i>Cars</i> series, Mustafa the waiter in <i>Ratatouille</i>, John in <i>WALL-E</i>, Tom the construction worker in <i>Up</i>, Gordon the guard in <i>Brave</i>, and Fritz in <i>Inside Out</i>." + (source('1', 'John_Ratzenberger'));
televisionFactsList[83]="To create raptor sounds in the film <i>Jurassic Park</i>, dolphin screams, walruses bellowing, geese hissing, an African crane's mating call, tortoises mating, and human rasps were mixed together." + (source('1', 'Jurassic_Park_(film)'));
televisionFactsList[84]="Cory Matthews and Shawn Hunter were the only characters who appeared in all 158 episodes of <i>Boy Meets World</i>." + (source('1', 'Boy_Meets_World'));
televisionFactsList[85]="Between seasons 18 and 19 of <i>The Simpsons</i>, the Simpsons' house is destroyed in a sinkhole in <i>The Simpsons Movie</i>. The house is seen under construction and being rebuilt in the opening sequence in the 19th season's first episode as a callback to the film." + (source('1', 'The_Simpsons_house')) + (source('2', 'He_Loves_to_Fly_and_He_D%27ohs'));
televisionFactsList[86]="3 different actors protrayed Charlie Harper in the show <i>Two and a Half Men</i>: Charlie Sheen (177 episodes), Kathy Bates (1 episode, as Charlie's ghost), and an uncredited actor (1 episode, the series finale – only shown from behind)." + (source('1', 'List_of_Two_and_a_Half_Men_characters'));
televisionFactsList[87]="Mary-Kate Olsen, Ashley Olsen, and John Stamos all appeared in an episode of <i>Hangin' with Mr. Cooper</i> as their <i>Full House</i> characters Michelle Tanner and Uncle Jesse." + (source('1', 'Hangin%27_with_Mr._Cooper'));
televisionFactsList[88]="Rather than taking their usual salary for the film <i>Twins</i>, Arnold Schwarzenegger and Danny DeVito agreed with the studio to take 20% of the film's box office, which resulted in them receiving the biggest paychecks of their movie careers." + (source('1', 'Twins_(1988_film)'));
televisionFactsList[89]="The dog Buddy, who played the <i>Full House</i> family dog Comet throughout the entire run of the show, also played the dog Buddy in the film <i>Air Bud</i>." + (source('1', 'Air_Buddy_(dog)'));
televisionFactsList[90]="Russi Taylor, the voice of Minnie Mouse, was married to Wayne Allwine, the voice of Mickey Mouse, from 1991 until Allwine's death in 2009." + (source('1', 'Minnie_Mouse'));
televisionFactsList[91]="A short lived children's television show called <i>Rubik, the Amazing Cube</i>, featured a magic Rubik's Cube named Rubik who could fly through the air. Rubik could only come to life when its colored sides matched up." + (source('1', 'Rubik,_the_Amazing_Cube'));
televisionFactsList[92]="An early idea for the show <i>Animaniacs</i> had the " + (includeImage('Warner siblings as duck characters', 'animaniacs.jpg')) + ", rather than the dog-like characters that Yakko, Wakko, and Dot came to be in the finished version of the show." + (source('1', 'Animaniacs'))
televisionFactsList[93]="The first season of <i>Animaniacs</i> was 65 episodes long, followed by season 2 which was only 4 episodes, and put together from unused scripts." + (source('1', 'Animaniacs'))
televisionFactsList[94]="Scott Weigner, the voice of Aladdin in the film <i>Aladdin</i>, sent in a homemade audition tape with his mother playing the genie, and after several callbacks, he secured the role." + (source('1', 'Aladdin_(1992_Disney_film)'))
televisionFactsList[95]="On April 21, 1990, an animated drug-abuse prevention television special aired on all four major networks (ABC, NBC, Fox, CBS) as well as many independent stations and cable networks. It included characters from 10 different franchises, such as Winnie the Pooh, Looney Tunes, The Smurfs, and Teenage Mutant Ninja Turtles." + (source('1', 'Cartoon_All-Stars_to_the_Rescue'));
televisionFactsList[96]="In the show <i>Taxi</i>, Danny DeVito's character Louie has a girlfriend who is played by his real life wife Rhea Perlman, and a mother who is played by his real life mother." + (source('1', 'Taxi_(TV_series)'));
televisionFactsList[97]="Rather than the usual repeated lines that Bart Simpson writes as punishment, the 25th season episode \"Four Regrettings and a Funeral\" opening had Bart write \"We'll really miss you Mrs. K\", just once. This is in reference to the voice of Edna Krabapple, Marcia Wallace's recent death." + (source('1', 'The_Simpsons_opening_sequence'));
televisionFactsList[98]="In response to <i>The Simpsons</i> episode \"Brother's Little Helper\", where Bart is diagnosed with ADHD, U.S. President Bill Clinton held the first ever White House conference on Mental Health." + (source('1', 'Brother%27s_Little_Helper'));
televisionFactsList[99]="The Comedy Central television series <i>Drunk History</i> was inspired by a 2007 conversation that creator Derek Waters had with <i>New Girl</i> actor Jake Johnson, who drunkenly tried to explain Otis Reddings' death to Waters. Johnson later appeared in multiple episodes of the show after it started in 2013." + (source('1', 'Jake_Johnson'));
televisionFactsList[100]="Jaleel White, who played Steve Urkel in <i>Family Matters</i>, also appeared as his character Steve Urkel in <i>Full House</i>, <i>Step by Step</i>, and <i>Meego</i>. In <i>Family Matters</i> he also sends a chain letter to his friend Cory Matthews, who lived in Philadelphia, referencing a crossover to the series <i>Boy Meets World</i>." + (source('1', 'Steve_Urkel'));
televisionFactsList[101]="The 2016 film <i>Sausage Party</i>, about an anthropomorphic sausage living in a supermarket with other groceries, was the first CGI-animated movie to receive an R-rating." + (source('1', 'Sausage_Party'));
televisionFactsList[102]="In an early script of <i>Back to the Future</i>, the time machine was designed as a refrigerator, rather than a car. One of the reasons this was changed is that production was concerned that kids would accidentally lock themselves in refrigerators." + (source('1','Back_to_the_Future'));
televisionFactsList[103]="In the original proof of concept of <i>Bob's Burgers</i>, the daughter Tina was instead a boy named Daniel." + (source('1','Bob%27s_Burgers'));
televisionFactsList[104]="<i>Saved by the Bell</i> is a reboot of the original Disney series, <i>Good Morning, Miss Bliss</i>, featuring most of the same cast. After Disney dropped the series, NBC picked it up and changed the title and direction of the show." + (source('1','Saved_by_the_Bell'));
televisionFactsList[105]="The TV series <i>Saved by the Bell</i> included 126 episodes, split between 3 different TV series and 2 films. This includes 13 episodes of <i>Good Morning, Miss Bliss</i>, 86 episodes of <i>Saved by the Bell</i>, 19 episodes of <i>Saved by the Bell: The College Years</i>,  and the films <i>Saved by the Bell: Hawaiian Style</i> and <i>Saved by the Bell: Wedding in Las Vegas</i>, which were aired as 4 episodes each." + (source('1','List_of_Saved_by_the_Bell_episodes'));
televisionFactsList[106]="The original 1971 <i>Willy Wonka &amp; the Chocolate Factory</i> disappointed Roald Dahl so much that he refused to have a film version produced of the second book in the series, <i>Charlie and the Great Glass Elevator</i>." + (source('1','Charlie_and_the_Great_Glass_Elevator'));
televisionFactsList[107]="The original handwritten manuscripts of <i>Charlie and the Chocolate Factory</i> included a child named Herpes, named after the sexually transmitted disease, among other politically incorrect things that didn't make it into the final published book." + (source('1','Charlie_and_the_Chocolate_Factory_(film)'));
televisionFactsList[108]="According to Mel Blanc, who voiced most of the male characters in <i>Looney Tunes</i>, Sylvester the Cat was the easiest character to voice because \"It's just my normal speaking voice with a spray at the end.\" Yosemite Sam was the hardest because of his loudness and raspiness." + (source('1','Mel_Blanc'));
televisionFactsList[109]="The characters of <i>Gilligan's Island</i> remained stranded when the show was unexpectedly cancelled in 1967. However they were finally rescued 15 years later in the made-for-TV film <i>Rescue from Gilligan's Island</i>. That film ends with them getting stranded once again on the same island." + (source('1','Gilligan%27s_Island')) + (source('2','Rescue_from_Gilligan%27s_Island'));
televisionFactsList[110]="After the first season of <i>Gilligan's Island</i>, star Bob Denver personally went to the studio executives and insisted that his co-stars Russell Johnson (the Professor) and Dawn Wells (Mary Ann) be added to the theme song's opening credits. After first refusing, the studio eventually added them into the credits starting in season 2." + (source('1','Gilligan%27s_Island'));
televisionFactsList[111]="The film <i>Bruce Almighty</i> was initially banned in Egypt due to pressure from Muslims who objected to the portrayal of God as a visually ordinary man." + (source('1','Bruce_Almighty'));
televisionFactsList[112]="<i>Doug</i> creator Jim Jinkins credits the characters' odd skin color choices to a \"margarita stupor\" with a friend in a Mexican restaurant, while discussing early character designs." + (source('1','Doug_(TV_series)'));
televisionFactsList[113]="The titular character of the show <i>SpongeBob SquarePants</i> was originally going to be named SpongeBoy, with the show being titled <i>SpongeBoy Ahoy!</i> It was changed after Nickelodeon's legal department found that the name \"SpongeBoy\" was already a trademarked name for a mop product."+ (source('1','SpongeBob_SquarePants)'));
televisionFactsList[114]="In <i>Survivor: China</i>, the show's 15th season, the usual slogan \"Outwit, Outplay, Outlast\" was replaced with Chinese characters in its logo: 比智慧 (\"compete in intelligence\"), 比技巧 (\"compete in skill\"), and 比耐力 (\"compete in endurance\")." + (source('1','Survivor:_China'));
televisionFactsList[115]="The season 7 premiere of <i>Game of Thrones</i> was pirated more than 90 million times in the first 3 days after its airing." + (source('1','Game_of_Thrones_(season_7)'));
televisionFactsList[116]="A 24-hour kitten photo shoot was held to photograph and film the kittens for use on the Frolicsome Felines plates in Professor Umbridge's office, in <i>Harry Potter and the Order of the Phoenix</i>." + (source('1','Harry_Potter_and_the_Order_of_the_Phoenix_(film)'));

	/*  --          User-submitted list          --  */
var userSubmittedFactsList = ["food18","history19","music9","television47","pop20", "pop24","history24","pop31","technology23","technology24","television59","food22","pop43","pop46", "television98","technology39"];

	/*  --          Pictures facts list          --  */
var picturesFactsList = ["history1","history16","pop8","pop37","history22","history29","sports22","music17","music23","pop49", "technology35","technology37","technology38", "television92", "food34", "technology39", "pop59", "sports45", "sports46"];

	/*  --          Most used Wiki page list          --  */
var mostFactsList = ["music21","pop18","pop19","television63","television64"];

	/*  --          Retired list           --    */
var retiredFactsList = new Array;
retiredFactsList[0]="The word for \"second-to-last\" is <i>penultimate</i>, from Latin <i>paene</i> (\"almost\") + <i>ultimus</i> (\"last\"). Similarly, third-to-last is <i>antepenultimate</i>, fourth-to-last is <i>preantepenultimate</i>, and fifth-to-last is <i>propreantepenultimate</i>.<sup><a href='http://en.wiktionary.org/wiki/penultimate' target='_blank'>[1]</a></sup>";
retiredFactsList[1]="In 1991, a 1 GB hard drive could be purchased for about $2,700. As of 2014, a 4 TB (4,000 GB) hard drive can be purchased for about $150." + (source('1', 'Terabyte'));


/*  --          Featured facts section          --  */

	var featuredFacts = [
		{
			'ffNumber': '1',
			'theFact': sportsFactsList[9],
			'filter': 'Sports',
			'bgImage': 'nolanryan.jpg',
			'altTag': 'Nolan Ryan pitching',
			'bgcolor': 'rgba(6, 75, 145, 1)',
			'textColor': '#fff'
		},
		{
			'ffNumber': '2',
			'theFact': popFactsList[27],
			'filter': 'Pop Culture',
			'bgImage': 'mj-wheaties.jpg',
			'altTag': 'Michael Jordan in front of giant Wheaties box',
			'bgcolor': 'rgba(255, 95, 54, 1)',
			'textColor': '#fff'
		},
		{
			'ffNumber': '3',
			'theFact': historyFactsList[4],
			'filter': 'History',
			'bgImage': 'moonlanding.jpg',
			'altTag': 'Gene Cernan on the moon',
			'bgcolor': 'rgba(68, 68, 68, 1)',
			'textColor': '#fff'
		},
		{
			'ffNumber': '4',
			'theFact': popFactsList[52],
			'filter': 'Pop Culture',
			'bgImage': 'angrybirds.jpg',
			'altTag': 'Screenshot of Angry Birds iOS',
			'bgcolor': 'rgba(73, 170, 51, 1)',
			'textColor': '#fff'
		},
		{
			'ffNumber': '5',
			'theFact': televisionFactsList[23],
			'filter': 'TV &amp; Film',
			'bgImage': 'tuco.jpg',
			'altTag': 'Raymond Cruz as Tuco, in Breaking Bad',
			'bgcolor': 'rgba(187, 199, 209, 1)',
			'textColor': '#fff'
		},
		{
			'ffNumber': '6',
			'theFact': foodFactsList[13],
			'filter': 'Food &amp; Drink',
			'bgImage': 'pringles.jpg',
			'altTag': 'Asian Pringles cans',
			'bgcolor': 'rgba(86, 168, 212, 1)',
			'textColor': '#fff'
		},
		{
			'ffNumber': '7',
			'theFact': televisionFactsList[103],
			'filter': 'TV &amp; Film',
			'bgImage': 'tinabelcher.jpg',
			'altTag': 'Tina Belcher as a boy',
			'bgcolor': 'rgba(86, 168, 212, 1)',
			'textColor': '#fff'
		},
		{
			'ffNumber': '8',
			'theFact': sportsFactsList[32],
			'filter': 'Sports',
			'bgImage': 'brodeur.jpg',
			'altTag': 'Martin Brodeur scoring his 3rd career goal',
			'bgcolor': 'rgba(225, 58, 62, 1)',
			'textColor': '#fff'
		},
		{
			'ffNumber': '9',
			'theFact': 'Ticket prices for the Titanic\'s promenade deck suites cost $4,350 (equivalent to $106,660 in 2015) for a 1-way passage.', //historyFactsList[31] - adjusted this fact to fit better in featurebox
			'filter': 'History',
			'bgImage': 'titanic.jpg',
			'altTag': 'Artistic rendition of the Titanic sinking',
			'bgcolor': 'rgba(157, 157, 157, 1)',
			'textColor': '#fff'
		},
		{
			'ffNumber': '10',
			'theFact': musicFactsList[7],
			'filter': 'Music',
			'bgImage': 'metallica.jpg',
			'altTag': 'Metallica playing music in Antarctica',
			'bgcolor': 'rgba(60, 60, 60, 1)',
			'textColor': '#fff'
		},
		{
			'ffNumber': '11',
			'theFact': historyFactsList[35],
			'filter': 'History',
			'bgImage': 'tarsier.jpg',
			'altTag': 'A Philippine tarsier climbing a tree',
			'bgcolor': 'rgba(134, 203, 14, 1)',
			'textColor': '#fff'
		}





	];

/*  --          Unfiltered combined fact list          --  */

function giveafact(){ //instead of relisting all array items here, add all the other arrays to this one
// give a fact in main box
var factsList = foodFactsList.concat(musicFactsList,historyFactsList,popFactsList,sportsFactsList,technologyFactsList,televisionFactsList);
randomFact = Math.floor(Math.random()*factsList.length);
$('#fact').html(factsList[randomFact]);
updateShareLinks();

//give a featured fact
var randomFeaturedFact = Math.floor(Math.random()*featuredFacts.length);
var randomff = featuredFacts[randomFeaturedFact];
var path = 'assets/featured/';
var ffImage = $('.ffimage').attr({'src': path + randomff.bgImage, 'alt': randomff.altTag});
$('.featfact').prepend(ffImage);
$('.ffcaption').html(randomff.theFact).css({'color': randomff.textColor, 'background': randomff.bgcolor});

return false;

}

window.onload=giveafact;

function giveafactbutton(){ //instead of relisting all array items here, add all the other arrays to this one
// give a fact in main box
var factsList = foodFactsList.concat(musicFactsList,historyFactsList,popFactsList,sportsFactsList,technologyFactsList,televisionFactsList);
randomFact = Math.floor(Math.random()*factsList.length);
$('#fact').html(factsList[randomFact]);
updateShareLinks();
}

	/*  --          Update the Twitter share link          --  */

function updateShareLinks() {
	var factText = $('#fact').text(); // Gets the fact text
	var factStr = factText.toString(); // Converts text to string
	var trimSpot = factStr.indexOf('['); // Finds the start of the fact sources
	var trimmedFact = factStr.slice(0, trimSpot); // Trims the source links

	// Update the Twitter link
	var linkRefTW = 'http://twitter.com/share?url=thewikifix.com&text=' + trimmedFact + '&hashtags=thewikifix';
	$('#shareLinkTwitter').attr('href', linkRefTW);

}

	/*  --          Generate unfiltered facts          --  */

function giveafoodfact() {
randomFoodFact = Math.floor(Math.random()*foodFactsList.length);
$('#fact').html(foodFactsList[randomFoodFact]);
updateShareLinks();
}

function giveahistoryfact() {
randomHistoryFact = Math.floor(Math.random()*historyFactsList.length);
$('#fact').html(historyFactsList[randomHistoryFact]);
updateShareLinks();
}

function giveamusicfact() {
randomMusicFact = Math.floor(Math.random()*musicFactsList.length);
$('#fact').html(musicFactsList[randomMusicFact]);
updateShareLinks();
}

function giveapopculturefact() {
randomPopCultureFact = Math.floor(Math.random()*popFactsList.length);
$('#fact').html(popFactsList[randomPopCultureFact]);
updateShareLinks();
}

function giveasportsfact() {
randomSportsFact = Math.floor(Math.random()*sportsFactsList.length);
$('#fact').html(sportsFactsList[randomSportsFact]);
updateShareLinks();
}

function giveatechnologyfact() {
randomTechnologyFact = Math.floor(Math.random()*technologyFactsList.length);
$('#fact').html(technologyFactsList[randomTechnologyFact]);
updateShareLinks();
}

function giveatelevisionfact() {
randomTelevisionFact = Math.floor(Math.random()*televisionFactsList.length);
$('#fact').html(televisionFactsList[randomTelevisionFact]);
updateShareLinks();
}

// Activate mobile menu
$('.mobilemenu').click(function(){
	$('.mobilenav').slideToggle();
	$(this).toggleClass('close');
	$('.overlay').toggle();
});

$('.mobilenav a').click(function(){
	$('.mobilenav').hide();
	$('.mobilemenu').removeClass('close');
	$('.overlay').hide();
});

// Auto scroll
$('.mobilenav a[href*=#]').bind('click', function(e) {
	e.preventDefault(); //prevent the "normal" behaviour which would be a "hard" jump

	var target = $(this).attr('href'); //Get the target

	// perform animated scrolling by getting top-position of target-element and set it as scroll target
	$('html, body').stop().animate({ scrollTop: $(target).offset().top}, 1000, function() { //adjust - 48 if the header height changes
	     location.hash = target;  //attach the hash (#jumptarget) to the pageurl
	});

	return false;
   });

// When the theme button is clicked
$('.themebutton').click(function () {
    // Check the current cookie value
    // If the cookie is empty or set to no, then add darktheme
    if ($.cookie('darktheme') == 'undefined' || $.cookie('darktheme') == 'no') {
        // Set cookie value to yes
        $.cookie('darktheme','yes', {expires: 365, path: ''});
        // Add the class to the body
        $('body').addClass('dark');
        $('.themebutton').addClass('off');
        $('.themebutton').removeClass('on');
    }
    // If the cookie was already set to yes then remove it
    else {
        $.cookie('darktheme','no',  {expires: 365, path: ''});
        $('body').removeClass('dark');
        $('.themebutton').addClass('on');
        $('.themebutton').removeClass('off');
    }
});

	/*  --          Stats section / Set cookie          --  */

$(document).ready(function() {

	/* -- Check/set cookie if user chooses the dark theme  -- */
        // Check (onLoad) if the cookie is there and set the class if it is
        if ($.cookie('darktheme') == "yes") {
            $('body').addClass('dark');
            $('.themebutton').addClass('off');
            $('.themebutton').removeClass('on');
        }

	/* --    Input sentence stats   -- */
	var factsList = foodFactsList.concat(musicFactsList,historyFactsList,popFactsList,sportsFactsList,technologyFactsList,televisionFactsList);
	$('#total').html(factsList.length);
	$('#usertotal').html(userSubmittedFactsList.length);
	$('#pictotal').html(picturesFactsList.length);
	$('#retiredtotal').html(retiredFactsList.length);
	$('#mosttotal').html(mostFactsList.length);

	/* --    Build the chart    -- */
	var multiplier = 2;
	var tvmultiplier = 1.6;
	var foodbar = foodFactsList.length * multiplier + 'px';
	var histbar = historyFactsList.length * multiplier + 'px';
	var musicbar = musicFactsList.length * multiplier + 'px';
	var popbar = popFactsList.length * multiplier + 'px';
	var sportsbar = sportsFactsList.length * multiplier + 'px';
	var techbar = technologyFactsList.length * multiplier + 'px';
	var tvbar = televisionFactsList.length * tvmultiplier + 'px';

	$('#fooddrinksbar').css('width', foodbar);
	$('#historybar').css('width', histbar);
	$('#musicbar').css('width', musicbar);
	$('#popbar').css('width', popbar);
	$('#sportsbar').css('width', sportsbar);
	$('#techbar').css('width', techbar);
	$('#tvfilmbar').css('width', tvbar);

	$('#foodtotal').html(foodFactsList.length);
	$('#historytotal').html(historyFactsList.length);
	$('#musictotal').html(musicFactsList.length);
	$('#poptotal').html(popFactsList.length);
	$('#sportstotal').html(sportsFactsList.length);
	$('#techtotal').html(technologyFactsList.length);
	$('#televisiontotal').html(televisionFactsList.length);

	/* -- Calculate weekly stat count  -- */
	var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

	var oneDay = 24*60*60*1000; //number of seconds in a day
	var todaysDate = new Date();
	var startDate = new Date(2014,05,21); //June 21, 2014
	var currentDate = todaysDate.getDate();
	var currentMonth = todaysDate.getMonth();
	var currentYear = todaysDate.getFullYear();

	var lastUpdated = new Date(document.lastModified);
	var getMonth = lastUpdated.getMonth();
	var getDate = lastUpdated.getDate();
	var getYear = lastUpdated.getFullYear();

	//$('#today').html(months[currentMonth] + ' ' + currentDate + ', ' + currentYear);

	var totalDays = Math.round((todaysDate.getTime() - startDate.getTime())/(oneDay));
	var factsList = foodFactsList.concat(musicFactsList,historyFactsList,popFactsList,sportsFactsList,technologyFactsList,televisionFactsList);
	var weeklyTotal = ((factsList.length/totalDays)*7).toFixed(2);
	$('#weeklytotal').html(weeklyTotal);

	var lastfact = $('#lastfact').html(months[getMonth] + " " + getDate + ", " + getYear);


/*  --          Recently added facts section          --  */

	//How many facts to show for each filter
	var factsShown = 3;

	//Get the most recent facts and show most recent first
	var lastFood = foodFactsList.slice(-factsShown).reverse();
	var lastHistory = historyFactsList.slice(-factsShown).reverse();
	var lastMusic = musicFactsList.slice(-factsShown).reverse();
	var lastPop = popFactsList.slice(-factsShown).reverse();
	var lastSports = sportsFactsList.slice(-factsShown).reverse();
	var lastTech = technologyFactsList.slice(-factsShown).reverse();
	var lastTelevision = televisionFactsList.slice(-factsShown).reverse();

	// Bold the current filter
	$('.ra.filterbuttons a').click(function(){
		$('.ra.filterbuttons a').removeClass('activefilter');
		$(this).addClass('activefilter');
	});

	// Change the filter
	$('#ra-listfood a').click(function(){
		$('.recentlists ul:not(.ra-food)').removeClass('recentShown').addClass('recentHidden');
		$('.ra-food').removeClass('recentHidden').addClass('recentShown');
	});

	$('#ra-listhistory a').click(function(){
		$('.recentlists ul:not(.ra-history)').removeClass('recentShown').addClass('recentHidden');
		$('.ra-history').removeClass('recentHidden').addClass('recentShown');
	});

	$('#ra-listmusic a').click(function(){
		$('.recentlists ul:not(.ra-music)').removeClass('recentShown').addClass('recentHidden');
		$('.ra-music').removeClass('recentHidden').addClass('recentShown');
	});

	$('#ra-listpopculture a').click(function(){
		$('.recentlists ul:not(.ra-pop)').removeClass('recentShown').addClass('recentHidden');
		$('.ra-pop').removeClass('recentHidden').addClass('recentShown');
	});

	$('#ra-listsports a').click(function(){
		$('.recentlists ul:not(.ra-sports)').removeClass('recentShown').addClass('recentHidden');
		$('.ra-sports').removeClass('recentHidden').addClass('recentShown');
	});

	$('#ra-listtechnology a').click(function(){
		$('.recentlists ul:not(.ra-tech)').removeClass('recentShown').addClass('recentHidden');
		$('.ra-tech').removeClass('recentHidden').addClass('recentShown');
	});

	$('#ra-listtelevision a').click(function(){
		$('.recentlists ul:not(.ra-television)').removeClass('recentShown').addClass('recentHidden');
		$('.ra-television').removeClass('recentHidden').addClass('recentShown');
	});

	//Append the facts for each filter

	for (var i = 0; i < lastFood.length; i++) {
		$('.ra-food').append('<li>' + lastFood[i] + '</li>');
	}

	for (var i = 0; i < lastHistory.length; i++) {
		$('.ra-history').append('<li>' + lastHistory[i] + '</li>');
	}

	for (var i = 0; i < lastMusic.length; i++) {
		$('.ra-music').append('<li>' + lastMusic[i] + '</li>');
	}

	for (var i = 0; i < lastPop.length; i++) {
		$('.ra-pop').append('<li>' + lastPop[i] + '</li>');
	}

	for (var i = 0; i < lastSports.length; i++) {
		$('.ra-sports').append('<li>' + lastSports[i] + '</li>');
	}

	for (var i = 0; i < lastTech.length; i++) {
		$('.ra-tech').append('<li>' + lastTech[i] + '</li>');
	}

	for (var i = 0; i < lastTelevision.length; i++) {
		$('.ra-television').append('<li>' + lastTelevision[i] + '</li>');
	}








});
