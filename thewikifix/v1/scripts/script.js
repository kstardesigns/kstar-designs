// JavaScript Document

/*  --          Filter buttons          --  */

function changeToFood() {
	document.getElementById("thebutton").setAttribute("onClick","giveafoodfact()");
	document.getElementById("filter").innerHTML = "Filtered by: Food &amp; Drink"; 
	document.getElementById("submitfilter").innerHTML = "Food &amp; Drink";
	document.getElementById("reset").innerHTML = "<a href='#'>Reset</a>";
	var foodtab = document.getElementById("listfood");
	foodtab.setAttribute("style","background: #ffffff; border-bottom: 1px solid #ffffff;");
	$("#listfood a").attr("style","color: black; text-decoration: none;");
	
	if ($(".logo").css("float") == "left" ){
	$("ul li").not( document.getElementById("listfood")).attr("style","border-bottom: 1px solid #a7d7f9;" );
	$("li:not(#listfood) a").attr("style","color: #0645ad;" );
	} else {
	$("ul li").not( document.getElementById("listfood")).attr("style","border-bottom: 1px solid #ffffff;");	
	$("li:not(#listfood) a").attr("style","color: #0645ad;");
	}
	updateShareLinks();
	giveafoodfact();
	
	
}

function changeToHistory() {
	document.getElementById("thebutton").setAttribute("onClick","giveahistoryfact()");
	document.getElementById("filter").innerHTML = "Filtered by: History";
	document.getElementById("submitfilter").innerHTML = "History";
	document.getElementById("reset").innerHTML = "<a href='#'>Reset</a>";
	var histtab = document.getElementById("listhistory");
	histtab.setAttribute("style","background: #ffffff; border-bottom: 1px solid #ffffff;");
	$("#listhistory a").attr("style","color: black; text-decoration: none;");
	
	if ($(".logo").css("float") == "left" ){
	$("ul li").not( document.getElementById("listhistory")).attr("style","border-bottom: 1px solid #a7d7f9;" );
	$("li:not(#listhistory) a").attr("style","color: #0645ad;" );
	} else {
	$("ul li").not( document.getElementById("listhistory")).attr("style","border-bottom: 1px solid #ffffff;");
	$("li:not(#listhistory) a").attr("style","color: #0645ad;");	
	}
	updateShareLinks();
	giveahistoryfact();
}

function changeToMusic() {
	document.getElementById("thebutton").setAttribute("onClick","giveamusicfact()");
	document.getElementById("filter").innerHTML = "Filtered by: Music";
	document.getElementById("submitfilter").innerHTML = "Music";
	document.getElementById("reset").innerHTML = "<a href='#'>Reset</a>";
	var geotab = document.getElementById("listmusic");
	geotab.setAttribute("style","background: #ffffff; border-bottom: 1px solid #ffffff;");
	$("#listmusic a").attr("style","color: black; text-decoration: none;");
	
	if ($(".logo").css("float") == "left" ){
	$("ul li").not( document.getElementById("listmusic")).attr("style","border-bottom: 1px solid #a7d7f9;" );
	$("li:not(#listmusic) a").attr("style","color: #0645ad;" );
	} else {
	$("ul li").not( document.getElementById("listmusic")).attr("style","border-bottom: 1px solid #ffffff;");
	$("li:not(#listmusic) a").attr("style","color: #0645ad;");	
	}
	updateShareLinks();
	giveamusicfact();
}

function changeToPop() {
	document.getElementById("thebutton").setAttribute("onClick","giveapopculturefact()");
	document.getElementById("filter").innerHTML = "Filtered by: Pop Culture";
	document.getElementById("submitfilter").innerHTML = "Pop Culture";
	document.getElementById("reset").innerHTML = "<a href='#'>Reset</a>"; 
	var poptab = document.getElementById("listpopculture");
	poptab.setAttribute("style","background: #ffffff; border-bottom: 1px solid #ffffff;");
	$("#listpopculture a").attr("style","color: black; text-decoration: none;");
	
	if ($(".logo").css("float") == "left" ){
	$("ul li").not( document.getElementById("listpopculture")).attr("style","border-bottom: 1px solid #a7d7f9;" );
	$("li:not(#listpopculture) a").attr("style","color: #0645ad;" );
	} else {
	$("ul li").not( document.getElementById("listpopculture")).attr("style","border-bottom: 1px solid #ffffff;");	
	$("li:not(#listpopculture) a").attr("style","color: #0645ad;");
	}
	updateShareLinks();
	giveapopculturefact();
}

function changeToSports() {
	document.getElementById("thebutton").setAttribute("onClick","giveasportsfact()");
	document.getElementById("filter").innerHTML = "Filtered by: Sports"; 
	document.getElementById("submitfilter").innerHTML = "Sports";
	document.getElementById("reset").innerHTML = "<a href='#'>Reset</a>";
	var sportstab = document.getElementById("listsports");
	sportstab.setAttribute("style","background: #ffffff; border-bottom: 1px solid #ffffff;");
	$("#listsports a").attr("style","color: black; text-decoration: none;");
	
	if ($(".logo").css("float") == "left" ){
	$("ul li").not( document.getElementById("listsports")).attr("style","border-bottom: 1px solid #a7d7f9;" );
	$("li:not(#listsports) a").attr("style","color: #0645ad;" );
	} else {
	$("ul li").not( document.getElementById("listsports")).attr("style","border-bottom: 1px solid #ffffff;");	
	$("li:not(#listsports) a").attr("style","color: #0645ad;");
	}
	updateShareLinks();
	giveasportsfact();
}

function changeToTechnology() {
	document.getElementById("thebutton").setAttribute("onClick","giveatechnologyfact()");
	document.getElementById("filter").innerHTML = "Filtered by: Technology";
	document.getElementById("submitfilter").innerHTML = "Technology";
	document.getElementById("reset").innerHTML = "<a href='#'>Reset</a>";
	var techtab = document.getElementById("listtechnology");
	techtab.setAttribute("style","background: #ffffff; border-bottom: 1px solid #ffffff;");
	$("#listtechnology a").attr("style","color: black; text-decoration: none;");
	
	if ($(".logo").css("float") == "left" ){
	$("ul li").not( document.getElementById("listtechnology")).attr("style","border-bottom: 1px solid #a7d7f9;" );
	$("li:not(#listtechnology) a").attr("style","color: #0645ad;" );
	} else {
	$("ul li").not( document.getElementById("listtechnology")).attr("style","border-bottom: 1px solid #ffffff;");
	$("li:not(#listtechnology) a").attr("style","color: #0645ad;");	
	}
	updateShareLinks();
	giveatechnologyfact();
}

function changeToTelevision() {
	document.getElementById("thebutton").setAttribute("onClick","giveatelevisionfact()");
	document.getElementById("filter").innerHTML = "Filtered by: TV/Film";
	document.getElementById("submitfilter").innerHTML = "TV/Film"; 
	document.getElementById("reset").innerHTML = "<a href='#'>Reset</a>";
	var tvtab = document.getElementById("listtelevision");
	tvtab.setAttribute("style","background: #ffffff; border-bottom: 1px solid #ffffff;");
	$("#listtelevision a").attr("style","color: black; text-decoration: none;");
	
	if ($(".logo").css("float") == "left" ){
	$("ul li").not( document.getElementById("listtelevision")).attr("style","border-bottom: 1px solid #a7d7f9;" );
	$("li:not(#listtelevision) a").attr("style","color: #0645ad;" );
	} else {
	$("ul li").not( document.getElementById("listtelevision")).attr("style","border-bottom: 1px solid #ffffff;");	
	$("li:not(#listtelevision) a").attr("style","color: #0645ad;");
	}
	updateShareLinks();
	giveatelevisionfact();
}

function changeToMisc() {
	document.getElementById("thebutton").setAttribute("onClick","giveamiscfact()");
	document.getElementById("filter").innerHTML = "Filtered by: Misc.";
	document.getElementById("submitfilter").innerHTML = ""; 
	document.getElementById("reset").innerHTML = "<a href='#'>Reset</a>";
	var misctab = document.getElementById("listmisc");
	misctab.setAttribute("style","background: #ffffff; border-bottom: 1px solid #ffffff;");
	$("#listmisc a").attr("style","color: black; text-decoration: none;");
	
	if ($(".logo").css("float") == "left" ){
	$("ul li").not( document.getElementById("listmisc")).attr("style","border-bottom: 1px solid #a7d7f9;" );
	$("li:not(#listmisc) a").attr("style","color: #0645ad;" );
	} else {
	$("ul li").not( document.getElementById("listmisc")).attr("style","border-bottom: 1px solid #ffffff;");
	$("li:not(#listmisc) a").attr("style","color: #0645ad;");	
	}
	updateShareLinks();
	giveamiscfact();
}

function changeToUnfiltered() {
	document.getElementById("thebutton").setAttribute("onClick","giveafact()");
	document.getElementById("filter").innerHTML = "";
	document.getElementById("submitfilter").innerHTML = ""; 
	document.getElementById("reset").innerHTML = "";
	
	if ($(".logo").css("float") == "left" ){
	$("ul li").attr("style","border-bottom: 1px solid #a7d7f9;" );
	$("li a").attr("style","color: #0645ad;");
	} else {
	$("ul li").attr("style","border-bottom: 1px solid #ffffff;" );	
	$("li a").attr("style","color: #0645ad;");
	}
	updateShareLinks();
	giveafact();
}

/*  --          Filtered fact lists          --  */

	/*  --          Food list          --  */
var foodFactsList = new Array;
foodFactsList[0]="The first McDonald's Drive-Thru was created in 1975, in Sierra Vista, Arizona, to serve military members who weren't permitted to get out of their cars while wearing fatigues.<sup><a href='http://en.wikipedia.org/wiki/Drive-through' target='_blank'>[1]</a></sup>";
foodFactsList[1]="In Spain and Russia, McDonald's drive-thru services are called <i>McAuto</i>.<sup><a href='http://en.wikipedia.org/wiki/Drive-through' target='_blank'>[1]</a></sup>";
foodFactsList[2]="The name Orange Julius came from its customers waiting in line, who would shout, \"Give me an Orange, Julius!\" Its founder was Julius Freed.<sup><a href='http://en.wikipedia.org/wiki/Orange_Julius' target='_blank'>[1]</a></sup>";
foodFactsList[3]="Orange and Lemon-Lime were the only 2 Gatorade flavors available for their first 20 years, until Fruit Punch was introduced.<sup><a href='http://en.wikipedia.org/wiki/Gatorade' target='_blank'>[1]</a></sup>";
foodFactsList[4]="When they were created in 1941, Cheerios were originally called Cheerioats.<sup><a href='http://en.wikipedia.org/wiki/General_Mills' target='_blank'>[1]</a></sup>";
foodFactsList[5]="In 2008, Doritos beamed a 30-second advertisement into a planetary system 42 light years away, in collaboration with EISCAT Space Center in Norway.<sup><a href='http://en.wikipedia.org/wiki/Doritos' target='_blank'>[1]</a></sup>";
foodFactsList[6]="In 1916, the US Government unsuccessfully tried to get Coca-Cola to remove caffeine from its product in United States v. Forty Barrels and Twenty Kegs of Coca-Cola.<sup><a href='http://en.wikipedia.org/wiki/United_States_v._Forty_Barrels_and_Twenty_Kegs_of_Coca-Cola' target='_blank'>[1]</a></sup>";
foodFactsList[7]="As of June 2012 when it began distribution in Burma, Coca-Cola is officially available in every country in the world besides Cuba and North Korea.<sup><a href='http://en.wikipedia.org/wiki/Coca-Cola' target='_blank'>[1]</a></sup>";
foodFactsList[8]="The drive-in restaurant Sonic was originally named Top Hat.<sup><a href='http://en.wikipedia.org/wiki/Sonic_Drive-In' target='_blank'>[1]</a></sup>";
foodFactsList[9]="A&amp;W's company name was taken from the last name initials of business partners Roy Allen and Frank Wright.<sup><a href='http://en.wikipedia.org/wiki/A%26W_Restaurants' target='_blank'>[1]</a></sup>";
foodFactsList[10]="Dr Pepper was originally known as \"Waco\" because it was first sold in Morrison's Old Corner Drug Store in Waco, Texas in 1885.<sup><a href='http://en.wikipedia.org/wiki/Dr_Pepper' target='_blank'>[1]</a></sup>";
foodFactsList[11]="Kool-Aid is the official soft drink of Nebraska, which has a yearly festival celebrating it in August.<sup><a href='http://en.wikipedia.org/wiki/Kool-Aid' target='_blank'>[1]</a></sup>";
foodFactsList[12]="In 1932, a man named Charles Elmer Doolin purchased a corn chip recipe, a handheld potato ricer, and 19 retail accounts from a corn chip manufacturer for $100, which he borrowed from his mother. Doolin established a new corn chip business making \"Fritos\" in his mother's kitchen. He soon started The Frito Company.<sup><a href='http://en.wikipedia.org/wiki/Frito-Lay' target='_blank'>[1]</a></sup>";
foodFactsList[13]="Varieties of Pringles in Asia have included: soft-shelled crab, grilled shrimp, seaweed, \"blueberry and hazelnut\", and \"lemon and sesame\".<sup><a href='http://en.wikipedia.org/wiki/Pringles' target='_blank'>[1]</a></sup>";
foodFactsList[14]="Fredric Baur, the inventor of the tubular paperboard can that holds Pringles, had his death request honored by his children: to bury him in one of the cans by placing part of his cremated remains in a Pringles container in his grave.<sup><a href='http://en.wikipedia.org/wiki/Pringles' target='_blank'>[1]</a></sup>";
foodFactsList[15]="The snack chip Funyuns are very popular in mass media. Those that have referenced the snack include: the movie <i>Half Baked</i>; musicians Insane Clown Posse and  Eminem; the television shows <i>NCIS</i>, <i>Breaking Bad</i>, <i>Dawson's Creek</i>, <i>How I Met Your Mother</i>, <i>Six Feet Under</i>, <i>Everybody Loves Raymond</i>, <i>American Dad</i>, and <i>The Big Bang Theory</i>, among others.<sup><a href='http://en.wikipedia.org/wiki/Funyuns' target='_blank'>[1]</a></sup>";
foodFactsList[16]="The name of the Kellogg's rooster is Cornelius.<sup><a href='http://en.wikipedia.org/wiki/Kellogg%27s' target='_blank'>[1]</a></sup>";
foodFactsList[17]="From 1950-1954, M&amp;M candies first had a black 'm' on them, instead of white.<sup><a href='http://en.wikipedia.org/wiki/M%26M%27s' target='_blank'>[1]</a></sup>";
foodFactsList[18]="The famous frozen yogurt place's name TCBY stands for two different things: \"The Country's Best Yogurt\" and \"This Can't Be Yogurt.\"<sup><a href='http://en.wikipedia.org/wiki/TCBY' target='_blank'>[1]</a></sup>";
foodFactsList[19]="The Little Caesars pizza chain once filled an order for 13,386 pizzas for the VF Corporation in Greensboro, North Carolina.<sup><a href='http://en.wikipedia.org/wiki/Little_Caesars' target='_blank'>[1]</a></sup>";
foodFactsList[20]="The \"31 flavors\" slogan that Baskin-Robbins is known for was created with the idea in mind that customers could have a different ice cream flavor every day of the month.<sup><a href='http://en.wikipedia.org/wiki/Baskin-Robbins' target='_blank'>[1]</a></sup>";
foodFactsList[21]="Baskin-Robbins has introduced over 1,000 ice cream flavors since 1945.<sup><a href='http://en.wikipedia.org/wiki/Baskin-Robbins' target='_blank'>[1]</a></sup>";




	/*  --          History list          --  */
var historyFactsList = new Array;
historyFactsList[0]="In World War II, the British Secret Service distributed special edition Monopoly games to prisoners of war held by the Nazis. In the games were maps, compasses, real money, and other useful tools for escaping.<sup><a href='http://en.wikipedia.org/wiki/Monopoly_(game)' target='_blank'>[1]</a></sup>";
historyFactsList[1]="The unit for one-thousandth of a dollar, or a tenth of a cent (mostly used in accounting and on gas station price signs), is called a <a class='popimg' href='#'>mill<span><i></i><img src='docs/assets/img/mill.jpg'/></span></a>.<sup><a href='http://en.wikipedia.org/wiki/United_States_dollar' target='_blank'>[1]</a></sup>";
historyFactsList[2]="Canada has a policy of adopting non-overlapping province abbreviations to adjacent countries, unlike Mexico which shares state abbreviations with the United States and Canada: CO, MI, MO, NL, and BC.<sup><a href='http://en.wikipedia.org/wiki/Canadian_postal_abbreviations_for_provinces_and_territories' target='_blank'>[1]</a></sup>";
historyFactsList[3]="Colorado, Wyoming, and Utah are the only states which have boundaries defined solely by lines of latitude and longtitude.<sup><a href='http://en.wikipedia.org/wiki/Colorado' target='_blank'>[1]</a></sup>";
historyFactsList[4]="Man has not been to the moon since Gene Cernan stepped off the lunar surface in 1972.<sup><a href='http://en.wikipedia.org/wiki/Moon_landing' target='_blank'>[1]</a></sup>";
historyFactsList[5]="The first vending machine was developed in the first century; it accepted a coin in exchange for a fixed amount of holy water.<sup><a href='http://en.wikipedia.org/wiki/Vending_machine' target='_blank'>[1]</a></sup>";
historyFactsList[6]="The largest U.S. currency is the $100 bill. The $500, $1,000, $5,000, $10,000 and $100,000 bills are no longer in circulation.<sup><a href='http://en.wikipedia.org/wiki/Large_denominations_of_United_States_currency' target='_blank'>[1]</a></sup>";
historyFactsList[7]="Ronald Reagan was the only president to postpone his State of the Union Address, due to the Space Shuttle Challenger disaster.<sup><a href='http://en.wikipedia.org/wiki/Space_Shuttle_Challenger_disaster' target='_blank'>[1]</a></sup>";
historyFactsList[8]="Mars has the largest dust storms in the Solar System, as they can sometimes get large enough to cover the entire planet.<sup><a href='http://en.wikipedia.org/wiki/Mars' target='_blank'>[1]</a></sup>";
historyFactsList[9]="The official investigation of the Oklahoma City bombing in 1995 consisted of the FBI conducting over 28,000 interviews and collecting nearly 1 billion pieces of information.<sup><a href='http://en.wikipedia.org/wiki/Oklahoma_City_bombing' target='_blank'>[1]</a></sup>";
historyFactsList[10]="The dwarf planet Pluto was discovered in 1930, and was considered the 9th planet in the Solar System until its demotion to dwarf planet in 2006.<sup><a href='http://en.wikipedia.org/wiki/Pluto' target='_blank'>[1]</a></sup>";
historyFactsList[11]="The new One World Trade Center, which opened for business on November 3, 2014, is 1,776 feet tall. Its skyscraper's spire reaches that height in reference to the year of the United States Declaration of Independence.<sup><a href='http://en.wikipedia.org/wiki/One_World_Trade_Center' target='_blank'>[1]</a></sup>";
historyFactsList[12]="Ronald Reagan won the 1984 presidential election with an electoral vote count of 525-13, winning 49 states to Walter Mondale's 1 state + DC. <sup><a href='http://en.wikipedia.org/wiki/United_States_presidential_election,_1984' target='_blank'>[1]</a></sup>";
historyFactsList[13]="The original 13 Colonies actually consisted of parts of what would become 20 different states: New Hampshire, Massachusetts, Maine, Rhode Island, Connecticut, New York, Vermont, New Jersey, Pennsylvania, Delaware, Maryland, Virginia, Kentucky, West Virginia, North Carolina, Tennessee, South Carolina, Georgia, Alabama, and Mississippi.<sup><a href='http://en.wikipedia.org/wiki/Thirteen_Colonies' target='_blank'>[1]</a></sup>";
historyFactsList[14]="It is believed that although John Hancock signed the Declaration of Independence on July 4, 1776, a majority of signers did not sign it until August 2, 1776, and one signer, Matthew Thornton, signed it as late as November 4, 1776.<sup><a href='http://en.wikipedia.org/wiki/United_States_Declaration_of_Independence' target='_blank'>[1]</a></sup>";
historyFactsList[15]="William Whipple, a signatory of the Declaration of Independence, freed his slave Prince Whipple in 1781, believing he could not fight for liberty and own a slave.<sup><a href='http://en.wikipedia.org/wiki/William_Whipple' target='_blank'>[1]</a></sup>";
historyFactsList[16]="In medieval manuscripts, <a class='popimg' href='#'>\"strikethrough\" of text with red ink<span><i></i><img src='docs/assets/img/strikethrough.jpg'/></span></a> often functioned as highlighting, similar to the modern day underline.<sup><a href='http://en.wikipedia.org/wiki/Strikethrough' target='_blank'>[1]</a></sup>";
historyFactsList[17]="When Neil Armstrong first walked on the moon, he carried with him a piece of wood from the Wright brothers' airplane's left propeller.<sup><a href='http://en.wikipedia.org/wiki/Apollo_11' target='_blank'>[1]</a></sup>";
historyFactsList[18]="The book <i>Moby Dick</i> was originally a commercial failure and out of print at the time of Herman Melville's death in 1891.<sup><a href='http://en.wikipedia.org/wiki/Moby-Dick' target='_blank'>[1]</a></sup>";
historyFactsList[19]="The Ethiopian leap year happens every four years without exception, while Gregorian leap years are every four years, except years divisible by 100, unless they are also divisible by 400.<sup><a href='http://en.wikipedia.org/wiki/Ethiopian_Calendar' target='_blank'>[1]</a></sup>";
historyFactsList[20]="ATM PINs were originally intended to have six digits, but usually have four because the ATM inventor's wife said she could only remember four digits.<sup><a href='https://en.wikipedia.org/wiki/Personal_identification_number' target='_blank'>[1]</a></sup>";
historyFactsList[21]="Canada has an estimated 3,000,000 lakes, which comprises 60% of the world's lakes.<sup><a href='http://en.wikipedia.org/wiki/List_of_lakes_of_Canada' target='_blank'>[1]</a></sup>";
historyFactsList[22]="At the 1936 Summer Olympics, the Liechenstein team discovered for the first time that the country had an <a class='popimg' href='#'>identical flag<span><i></i><img src='docs/assets/img/liechtensteinflag.png'/></span></a> as the flag of Haiti. They changed it the next year by adding a crown to it.<sup><a href='http://en.wikipedia.org/wiki/Liechtenstein_at_the_1936_Summer_Olympics' target='_blank'>[1]</a><a href='http://en.wikipedia.org/wiki/Flag_of_Liechtenstein' target='_blank'>[2]</a></sup>";
historyFactsList[23]="The infinity symbol (&infin;) is thought to have come from the variant form of the Roman Numeral for 1,000 (CI&#8579;) or the last letter of the Greek alphabet, omega (&omega;). Its creator, John Wallis, did not explain his choice of the symbol.<sup><a href='http://en.wikipedia.org/wiki/Infinity_symbol' target='_blank'>[1]</a></sup>";
historyFactsList[24]="Over 150 bodies lay frozen on the slopes of Mount Everest from failed attempts at reaching the top.<sup><a href='http://en.wikipedia.org/wiki/Mount_Everest' target='_blank'>[1]</a></sup>";


	/*  --          Music list          --  */
var musicFactsList = new Array;
musicFactsList[0]="The song \"Gold Digger\" by Kanye West, was originally recorded in Ludacris' house, and written from a female perspective for rapper Shawnna to use on her album. She declined and it was later rewritten and used by Kanye himself.<sup><a href='http://en.wikipedia.org/wiki/Late_Registration' target='_blank'>[1]</a></sup>";
musicFactsList[1]="Ray Charles' younger brother drowned when Ray was 5, he was fully blind by the age of 7, his father died when he was 10, and his mother died when he was 15. Ray Charles died just 4 months before the release of the biopic film, <i>Ray</i>.<sup><a href='http://en.wikipedia.org/wiki/Ray_(film)' target='_blank'>[1]</a><a href='http://en.wikipedia.org/wiki/Ray_Charles' target='_blank'>[2]</a></sup>";
musicFactsList[2]="Rapper Rick Ross' real name is William Leonard Roberts II.<sup><a href='http://en.wikipedia.org/wiki/Rick_Ross' target='_blank'>[1]</a></sup>";
musicFactsList[3]="Elton John's birth name was Reginald Kenneth Dwight. His official name now is Sir Elton Hercules John CBE, which is Commander of the Most Excellent Order of the British Empire.<sup><a href='http://en.wikipedia.org/wiki/Elton_John' target='_blank'>[1]</a><a href='http://en.wikipedia.org/wiki/Order_of_the_British_Empire' target='_blank'>[2]</a></sup>";
musicFactsList[4]="Eminem wrote a letter to 2Pac's mom, Afeni Shakur, in order to get approval to produce the posthumous 2Pac album <i>Loyal to the Game</i>.<sup><a href='http://en.wikipedia.org/wiki/Loyal_to_the_Game' target='_blank'>[1]</a></sup>";
musicFactsList[5]="Katy Perry used Wikipedia to research which rapper to collaborate with for her song \"California Girls\",  browsing other West Coast artists before selecting Snoop Dogg.<sup><a href='http://en.wikipedia.org/wiki/California_Gurls' target='_blank'>[1]</a></sup>";
musicFactsList[6]="In 2014, Eminem's song \"Rap God\" was entered into the Guinness World Records as the hit single that has the most words with 1,560. At one point in the song he raps 97 words in 15 seconds, at a rate of 6.5 words per second.<sup><a href='http://en.wikipedia.org/wiki/Rap_God' target='_blank'>[1]</a></sup>";
musicFactsList[7]="In 2013, Metallica became the first band to tour to all 7 continents: The band played a ten-song show at the Carlini Station heliport in Antarctica.<sup><a href='http://en.wikipedia.org/wiki/Metallica' target='_blank'>[1]</a><a href='http://en.wikipedia.org/wiki/King_George_Island_(South_Shetland_Islands)' target='_blank'>[2]</a></sup>";
musicFactsList[8]="Although Rihanna is the only credited featured artist on Kanye West's song \"All of the Lights,\" the song also featured 13 other popular artists doing background vocals: Kid Cudi, Tony Williams, The-Dream, Charlie Wilson, John Legend, Elly Jackson, Alicia Keys, Elton John, Fergie, Ryan Leslie, Drake, Alvin Fields, and Ken Lewis.<sup><a href='http://en.wikipedia.org/wiki/All_of_the_Lights' target='_blank'>[1]</a></sup>";
musicFactsList[9]="Taylor Swift wrote the song \"Out of the Woods\" in just 30 minutes, using the instrumental track given to her by Jack Antonoff, the lead guitarist of the band fun.<sup><a href='http://en.wikipedia.org/wiki/Out_of_the_Woods_(song)' target='_blank'>[1]</a></sup>";
musicFactsList[10]="Shaquille O'Neal had a moderately successful rap career, releasing 4 albums in the 1990s. He collaborated on songs with rappers Method Man, Redman, RZA, Jay-Z, The Notorious B.I.G., and Mobb Deep.<sup><a href='http://en.wikipedia.org/wiki/Shaquille_O%27Neal' target='_blank'>[1]</a><a href='http://en.wikipedia.org/wiki/Shaq_Diesel' target='_blank'>[2]</a></sup>";
musicFactsList[11]="In 2007, Kanye West, Lupe Fiasco, and Pharrell Williams formed a hip-hop supergroup called Child Rebel Soldier. However they only only released 3 songs between 2007-2013 before it was announced the group had been canceled. <sup><a href='http://en.wikipedia.org/wiki/Child_Rebel_Soldier' target='_blank'>[1]</a></sup>";
musicFactsList[12]="Kanye West and Eminem won the Grammy Award for Best Rap Album 10 times total in the 16 year span from 2000-2015.<sup><a href='http://en.wikipedia.org/wiki/Grammy_Award_for_Best_Rap_Album' target='_blank'>[1]</a></sup>";
musicFactsList[13]="Paul McCartney has reached number 1 on the UK charts as a solo artist, as part of a duo (with Wonder), as part of a trio (with Wings), as part of a quartet (with The Beatles), and as part of a quintet (with The Beatles and Billy Preston).<sup><a href='http://en.wikipedia.org/wiki/Paul_McCartney' target='_blank'>[1]</a></sup>";
musicFactsList[14]="Upon the release of her album <i>1989</i> in 2014, Taylor Swift became the first artist ever to sell 1,000,000 albums in 1 week, 3 separate times.<sup><a href='http://en.wikipedia.org/wiki/Taylor_Swift' target='_blank'>[1]</a></sup>";
musicFactsList[15]="Jay-Z released a solo rap album every year during the first 8 years of his career (1996-2003).<sup><a href='http://en.wikipedia.org/wiki/Jay_Z_discography' target='_blank'>[1]</a></sup>";
musicFactsList[16]="Michael Jackson's album <i>Thriller</i> had 7 singles reach the <i>Billboard</i> Hot 100 (out of 9 total songs. It also sold as many as 65 million copies, including going 29x Platinum in the United States alone.<sup><a href='http://en.wikipedia.org/wiki/Thriller_(Michael_Jackson_album)' target='_blank'>[1]</a></sup>";
musicFactsList[17]="Rap superstars 50 Cent and Kanye West went head-to-head in a <a class='popimg' href='#'>sales battle<span><i></i><img src='docs/assets/img/kanye50.jpg'/></span></a> in 2007, both releasing an album on the same day. Kanye West's <i>Graduation</i> had the better first week sales with 957,000, compared to 50 Cent's <i>Curtis</i> sales of 691,000.<sup><a href='http://en.wikipedia.org/wiki/2007_in_hip_hop_music' target='_blank'>[1]</a></sup>";
musicFactsList[18]="Chamillionaire's Grammy Award-winning song \"Ridin'\" actually had far less YouTube music video views than Weird Al Yankovic's parody song \"White &amp; Nerdy\".<sup><a href='http://en.wikipedia.org/wiki/Ridin%27' target='_blank'>[1]</a></sup>";
musicFactsList[19]="In a 2009 interview with Ellen DeGeneres, singer/rapper Akon revealed that his complete name was Aliaune Damala Bouga Time Bongo Puru Nacka Lu Lu Lu Badara Akon Thiam.<sup><a href='http://en.wikipedia.org/wiki/Akon' target='_blank'>[1]</a></sup>";
musicFactsList[20]="Rapper Freddie Gibbs came up with the idea for the name of his album <i>Pi&ntilde;ata</i> (originally called <i>Cocaine Pi&ntilde;ata</i>) after having a dream that he had a 4 year old kid whose birthday party had kids hitting a pi&ntilde;ata filled with cocaine.<sup><a href='http://en.wikipedia.org/wiki/Pi%C3%B1ata_(Freddie_Gibbs_and_Madlib_album)' target='_blank'>[1]</a></sup>";
musicFactsList[21]="Upon singer Michael Jackson's death in 2009 his fans mistakenly left flowers on a different Michael Jackson's (radio personality) star on the Hollywood Walk of Fame.<sup><a href='http://en.wikipedia.org/wiki/Hollywood_Walk_of_Fame' target='_blank'>[1]</a></sup>";



	/*  --          Pop Culture list          --  */
var popFactsList = new Array;
popFactsList[0]="A man was imprisoned, fined, and put on probation for smuggling counterfeit Beanie Babies in 1999.<sup><a href='http://en.wikipedia.org/wiki/Beanie_Babies' target='_blank'>[1]</a></sup>";
popFactsList[1]="Seth Rogen and Evan Goldberg wrote the first drafts of <i>Superbad</i> at the age of 13 and perfected it throughout high school.<sup><a href='http://en.wikipedia.org/wiki/Seth_Rogen' target='_blank'>[1]</a></sup>";
popFactsList[2]="Hasbro released a hypodermic needle-shaped water gun toy called Hypo-Squirt in the 1970s, but it was recalled because the press called it a \"junior junkie\" kit.<sup><a href='http://en.wikipedia.org/wiki/Hasbro' target='_blank'>[1]</a></sup>";
popFactsList[3]="Stephen Colbert has a species of spider named after him - <i>Aptostichus stephencolberti</i>.<sup><a href='http://en.wikipedia.org/wiki/The_Colbert_Report' target='_blank'>[1]</a></sup>";
popFactsList[4]="The mysterious Pok&eacute;mon Mew can learn any move (TM's and HM's) that is able to be taught.<sup><a href='http://en.wikipedia.org/wiki/Mew_(Pokémon)' target='_blank'>[1]</a></sup>";
popFactsList[5]="The estimated U.S. cocaine market exceeded $70 billion in street value for the year 2005, exceeding the revenues of Starbucks.<sup><a href='http://en.wikipedia.org/wiki/Cocaine' target='_blank'>[1]</a></sup>";
popFactsList[6]="Billy Mays signed a deal in June 2009 to shoot infomercial-style commercials for Taco Bell. His death canceled those plans.<sup><a href='http://en.wikipedia.org/wiki/Billy_Mays' target='_blank'>[1]</a></sup>";
popFactsList[7]="In a week in 1994, Tim Allen simultaneously had the #1 show (<i>Home Improvement</i>), #1 movie (<i>The Santa Clause</i>) and #1 book (<i>Don't Stand Too Close to a Naked Man</i>).<sup><a href='http://en.wikipedia.org/wiki/Tim_Allen' target='_blank'>[1]</a></sup>";
popFactsList[8]="The <a class='popimg' href='#'>first Lego minifigures<span><i></i><img src='docs/assets/img/lego.jpg'/></span></a> in 1975 had no arms, solid unmovable legs, and faceless heads.<sup><a href='http://en.wikipedia.org/wiki/Lego_minifigure' target='_blank'>[1]</a></sup>";
popFactsList[9]="In 2013, the Honey Nut Cheerios mascot Buzz the bee was given a \"swag makeover\" by Nelly the rapper, in a commercial.<sup><a href='http://en.wikipedia.org/wiki/Honey_Nut_Cheerios' target='_blank'>[1]</a></sup>";
popFactsList[10]="The popular children's game \"Duck, Duck, Goose\" is known as \"Duck, Duck, Gray Duck\" in Minnesota. Children instead say variations of colored ducks (\"Blue duck, red duck, gray duck!\").<sup><a href='http://en.wikipedia.org/wiki/Duck,_duck,_goose' target='_blank'>[1]</a></sup>";
popFactsList[11]="The probability of rolling a Yahtzee on the first roll of a turn is 1 in 1,296.<sup><a href='http://en.wikipedia.org/wiki/Yahtzee' target='_blank'>[1]</a></sup>";
popFactsList[12]="The odds of rolling a Yahtzee on all 13 turns of a single game of Yahtzee, is about 1 in 283,000,000,000,000,000 (or 283 quadrillion). This would result in the max score of 1,575 points.<sup><a href='http://en.wikipedia.org/wiki/Yahtzee' target='_blank'>[1]</a></sup>";
popFactsList[13]="The popular newspaper comic <i>Baby Blues</i>, like most comic and cartoon characters, have characters that age on a timeline much slower than real-time. Its original titular baby Zoe was born in the very strip in 1990, and after 25 years she is 9 years old.<sup><a href='http://en.wikipedia.org/wiki/Baby_Blues' target='_blank'>[1]</a></sup>";
popFactsList[14]="Author Stephen King used the pen name Richard Bachman starting in 1977, and after releasing 5 novels under this name it was finally discovered in 1984 that it was indeed Stephen King.<sup><a href='http://en.wikipedia.org/wiki/Richard_Bachman' target='_blank'>[1]</a></sup>";
popFactsList[15]="Russia switched permanently to daylight savings time from 2011-2014, but reverted back to standard time after this was proven unpopular due to the late sunrises in winter.<sup><a href='http://en.wikipedia.org/wiki/Daylight_saving_time' target='_blank'>[1]</a></sup>";
popFactsList[16]="Negan, a notorious fictional character from <i>The Walking Dead</i> graphic novels, was conceptualized by Robert Kirkman after scrapping the idea of Rick Grimes being forced to kill fellow survivor, Glenn, in order to to protect his son Carl.<sup><a href='http://en.wikipedia.org/wiki/Negan' target='_blank'>[1]</a></sup>";
popFactsList[17]="Stephen King's novel <i>Rage</i> (written under the pen name Richard Bachman) was taken out of print after it partially inspired several different school shootings.<sup><a href='http://en.wikipedia.org/wiki/Rage_(King_novel)' target='_blank'>[1]</a></sup>";
popFactsList[18]="Gene Autry has a star in all 5 categories in the Hollywood Walk of Fame, while Bob Hope, Mickey Rooney, Roy Rogers, and Tony Martin each have a star in 4 different categories.<sup><a href='http://en.wikipedia.org/wiki/Hollywood_Walk_of_Fame' target='_blank'>[1]</a></sup>";
popFactsList[19]="Boxer Muhammed Ali was granted a star on the Hollywood Walk of Fame, as the committee justified it as boxing being a form of \"live performance\", one of the five categories.<sup><a href='http://en.wikipedia.org/wiki/Hollywood_Walk_of_Fame' target='_blank'>[1]</a></sup>";
popFactsList[20]="Encountering a MissingNo. Pok&eacute;mon in <i>Pok&eacute;mon Red</i> and <i>Blue</i> is the result of three computing events, including the game's random battle encounter system, the temporary storage of the player's name in the data buffer, and the game's error handling system. One of the effects of encountering a MissingNo. is the duplication of the 6th item in the player's item menu.<sup><a href='http://en.wikipedia.org/wiki/MissingNo.' target='_blank'>[1]</a></sup>";





	/*  --          Sports list          --  */
var sportsFactsList = new Array;
sportsFactsList[0]="The New York Yankees were originally founded in 1901 as the Baltimore Orioles. When they moved to New York, they became the New York Highlanders, and then the Yankees.<sup><a href='http://en.wikipedia.org/wiki/New_York_Yankees' target='_blank'>[1]</a></sup>";
sportsFactsList[1]="In 1912, Detroit Tigers pitcher Allan Travers pitched a complete game, giving up 26 hits, 24 runs (14 earned), 7 walks, and 1 strikeout. The Tigers lost 24-2. That was his only appearance in MLB.<sup><a href='http://en.wikipedia.org/wiki/Allan_Travers' target='_blank'>[1]</a></sup>";
sportsFactsList[2]="Fictional characters who have bowled a perfect 300 game: Peg Bundy (<i>Married With Children</i>), Fred Flintstone (<i>The Flintstones</i>), Homer Simpson and Maggie Simpson (<i>The Simpsons</i>), Howard Sprague (<i>The Andy Griffith Show</i>), Jim (<i>According to Jim</i>), Ron Swanson (<i>Parks and Recreation</i>), and Mort Goldman (<i>Family Guy</i>).<sup><a href='http://en.m.wikipedia.org/wiki/Perfect_game_(bowling)' target='_blank'>[1]</a></sup>";
sportsFactsList[3]="Prior to renaming the Tampa Bay Devil Rays to the Tampa Bay Rays in 2008, several other names were considered: Aces, Bandits, Cannons, Dukes, Stripes, and Stuart Sternberg's personal favorite, the \"Nine\".<sup><a href='http://en.wikipedia.org/wiki/2008_Tampa_Bay_Devil_Rays_season' target='_blank'>[1]</a></sup>";
sportsFactsList[4]="As of the end of 2014 - The Seattle Mariners, owned by Nintendo of America, have had a losing record in 26 of the 38 seasons they have been a team, and have also never been to the World Series.<sup><a href='http://en.wikipedia.org/wiki/Seattle_Mariners' target='_blank'>[1]</a></sup>";
sportsFactsList[5]="The cost of a 30-second commercial in Super Bowl I in 1967 was just $42,000 compared to Super Bowl XLVIII's cost of $4,000,000.<sup><a href='http://en.wikipedia.org/wiki/Super_Bowl_I' target='_blank'>[1]</a><a href='http://en.wikipedia.org/wiki/Super_Bowl_XLVIII' target='_blank'>[2]</a></sup>";
sportsFactsList[6]="The Milwaukee Brewers' blue and gold colors come from their original colors as the 1969 Seattle Pilots. Owner Bud Selig wanted to change the colors to navy and red when they moved to Milwaukee in 1970, but there wasn't enough time before Opening Day.<sup><a href='http://en.wikipedia.org/wiki/Super_Bowl_I' target='_blank'>[1]</a><a href='http://en.wikipedia.org/wiki/Seattle_Pilots' target='_blank'>[2]</a></sup>";
sportsFactsList[7]="Babe Ruth once pitched a 4-pitch walk to start a game, got angry at the umpire's calls, and punched him, getting ejected. Reliever Ernie Shore came in and retired every batter for a combined no-hitter.<sup><a href='http://en.wikipedia.org/wiki/Babe_Ruth' target='_blank'>[1]</a></sup>";
sportsFactsList[8]="The two creators of the famous song, \"Take Me Out to the Ball Game\", Jack Norworth and Albert Von Tilzer, had never been to a baseball game when they made the song. The two did eventually go to a baseball game, 20 and 32 years later, respectively.<sup><a href='http://en.wikipedia.org/wiki/Take_Me_Out_to_the_Ball_Game' target='_blank'>[1]</a></sup>";
sportsFactsList[9]="In Nolan Ryan's 27-year pitching career, he struck out 7 pairs of fathers and sons.<sup><a href='http://en.wikipedia.org/wiki/Nolan_Ryan' target='_blank'>[1]</a></sup>";
sportsFactsList[10]="Jackie Mitchell, one of the first female players in professional baseball, struck out both Babe Ruth and Lou Gehrig in an exhibition game in 1931.<sup><a href='http://en.wikipedia.org/wiki/Jackie_Mitchell' target='_blank'>[1]</a></sup>";
sportsFactsList[11]="During the famous 1998 MLB home run record race, when Mark McGwire broke Roger Maris' home run record, his rival and competition Sammy Sosa ran in from right field and engaged McGwire in a celebratory embrace.<sup><a href='http://en.wikipedia.org/wiki/1998_home_run_chase' target='_blank'>[1]</a></sup>";
sportsFactsList[12]="In an effort to break the \"Curse of the Billy Goat,\" which has supposedly kept the Chicago Cubs from reaching the World Series in 1945, several times Cubs fans have hung butchered goat body parts from the Harry Caray statue.<sup><a href='http://en.wikipedia.org/wiki/Curse_of_the_Billy_Goat' target='_blank'>[1]</a></sup>";
sportsFactsList[13]="As of the end of the 2014 season, only 5 MLB players have hit 60 or more home runs in a season: Babe Ruth (60), Roger Maris (61), Sammy Sosa (66, 63, 64), Mark McGwire (70, 65), and Barry Bonds (73).<sup><a href='http://en.wikipedia.org/wiki/50_home_run_club' target='_blank'>[1]</a></sup>";
sportsFactsList[14]="The 2008 Detroit Lions finished the season with an 0-16 record, becoming the first team to lose every game since the NFL schedule was increased to 16 games in 1978.<sup><a href='http://en.wikipedia.org/wiki/2008_Detroit_Lions_season' target='_blank'>[1]</a></sup>";
sportsFactsList[15]="MLB player Ryan Howard has appeared as himself in the television shows <i>Entourage</i>, <i>It's Always Sunny in Philadelphia</i>, and <i>The Office</i>.<sup><a href='http://en.wikipedia.org/wiki/Ryan_Howard' target='_blank'>[1]</a></sup>";
sportsFactsList[16]="As of the end of the 2013-2014 NBA season, only 3 players have ever won NBA MVP, All-Star game MVP, and Finals MVP awards in the same year: Willis Reed (1970), Michael Jordan (1996, 1998), and Shaquille O'Neal (2000).<sup><a href='http://en.wikipedia.org/wiki/Shaquille_O%27Neal' target='_blank'>[1]</a></sup>";
sportsFactsList[17]="The 3-point field goal was not introduced into the NBA until the 1979-80 season. <sup><a href='http://en.wikipedia.org/wiki/1979–80_NBA_season' target='_blank'>[1]</a></sup>";
sportsFactsList[18]="During the 8-year stretch from 1996-2003, the New York Yankees went to the World Series 6 times, and won the Series 4 of those times. <sup><a href='http://en.wikipedia.org/wiki/List_of_World_Series_champions' target='_blank'>[1]</a></sup>";
sportsFactsList[19]="The 1988 Baltimore Orioles lost each of their first 21 games to start the season, until finally winning on April 29th to improve to 1-21.<sup><a href='http://en.wikipedia.org/wiki/1988_in_baseball' target='_blank'>[1]</a></sup>";
sportsFactsList[20]="During Wilt Chamberlain's famous 100-point basketball game in 1962, he missed 2 shots in a row while at 98 points. With 46 seconds remaining in the game, he made his next shot, ending at 100.<sup><a href='http://en.wikipedia.org/wiki/Wilt_Chamberlain%27s_100-point_game' target='_blank'>[1]</a></sup>";
sportsFactsList[21]="The first person to run a sub-4-minute mile was Roger Bannister, who ran a mile in 3:59.4 in 1954. There is a plaque at Oxford University's Iffley Road Track commemorating the achievement.<sup><a href='http://en.wikipedia.org/wiki/Four-minute_mile' target='_blank'>[1]</a></sup>";
sportsFactsList[22]="The 2016 Super Bowl will not use Roman Numerals to number it, like usual. Instead of Super Bowl L, it will be known as <a class='popimg' href='#'>Super Bowl 50<span><i></i><img src='docs/assets/img/sb50.png'/></span></a>.<sup><a href='http://en.wikipedia.org/wiki/Super_Bowl_50' target='_blank'>[1]</a></sup>";


	/*  --          Technology list          --  */
var technologyFactsList = new Array;
technologyFactsList[0]="Thomas Edison's last breath is reportedly contained in a test tube at the Henry Ford Museum.<sup><a href='http://en.wikipedia.org/wiki/Thomas_Edison' target='_blank'>[1]</a></sup>";
technologyFactsList[1]="On January 1st, 2000, the U.S. Naval Observatory master clock, which keeps the country's official time, gave the date on its website as January 1st, 19100.<sup><a href='http://en.wikipedia.org/wiki/Year_2000_problem' target='_blank'>[1]</a></sup>";
technologyFactsList[2]="On January 1st, 2013, Mark Zuckerberg lowered his annual salary from $500,000 to $1.00.<sup><a href='http://en.wikipedia.org/wiki/Mark_Zuckerberg' target='_blank'>[1]</a></sup>";
technologyFactsList[3]="The name Wikipedia was created by co-founder Larry Sanger; it is a portmanteau of <i>wiki</i> (the name of a type of collaborative website, from the Hawaiian word for \"quick\"), and <i>pedia</i> from encyclopedia.<sup><a href='http://en.wikipedia.org/wiki/Wikipedia' target='_blank'>[1]</a></sup>";
technologyFactsList[4]="The first blueprints of Twitter by its creator @jack show it as originally being named \"my.stat.us\".<sup><a href='http://en.wikipedia.org/wiki/Twitter' target='_blank'>[1]</a></sup>";
technologyFactsList[5]="In 2000, the \"Pikachu virus\" was distributed to internet users via email, considered to be the first computer virus aimed at children. The email message said \"Pikachu is your friend\" and had an attached program that would delete a computer's files when restarted.<sup><a href='http://en.wikipedia.org/wiki/Pikachu_virus' target='_blank'>[1]</a></sup>";
technologyFactsList[6]="Throughout its lifespan, \"SmarterChild\" had 30 million instant messenger friends on AOL Instant Messenger and MSN Messenger. It was retired in November 2008.<sup><a href='http://en.wikipedia.org/wiki/SmarterChild' target='_blank'>[1]</a><a href='http://en.wikipedia.org/wiki/AOL_Instant_Messenger' target='_blank'>[2]</a></sup>";
technologyFactsList[7]="The maximum amount of tape a standard VHS cassette could hold is 1,410 feet, which is about 4-5 hours of video.<sup><a href='http://en.wikipedia.org/wiki/VHS' target='_blank'>[1]</a></sup>";
technologyFactsList[8]="The island country of Niue became the first \"Wi-Fi nation\" in 2003, offering free wireless internet access to the entire country.<sup><a href='http://en.wikipedia.org/wiki/Niue' target='_blank'>[1]</a></sup>";
technologyFactsList[9]="The development project \"Super Mario 128\" was originally meant to be a direct sequel to <i>Super Mario 64</i>. It was eventually abandoned and elements from it were later used in <i>Pikmin</i> and <i>Super Mario Galaxy</i>.<sup><a href='http://en.wikipedia.org/wiki/Super_Mario_128' target='_blank'>[1]</a></sup>";
technologyFactsList[10]="Home video game consoles were banned in mainland China in the year 2000, until the year 2013, when the ban was lifted.<sup><a href='http://en.wikipedia.org/wiki/List_of_banned_video_games' target='_blank'>[1]</a></sup>";
technologyFactsList[11]="In <i>The Sims 2</i>, an average Sim baby becomes a toddler on day 3, a child on day 7, a teen on day 15, an adult on day 30, an elder on day 59, and will die naturally on day 68-90.<sup><a href='http://en.wikipedia.org/wiki/The_Sims_2' target='_blank'>[1]</a></sup>";
technologyFactsList[12]="Matthew Perry, Steven Spielberg, and some players of the Chicago Bulls were all reported to have called Nintendo in 1996 to get a then hard to get Nintendo 64.<sup><a href='http://en.wikipedia.org/wiki/Nintendo_64' target='_blank'>[1]</a></sup>";
technologyFactsList[13]="Among the ways to die in <i>The Oregon Trail</i> video game are measles, snakebite, dysentry, typhoid, cholera, exhaustion, drowning, and a broken leg.<sup><a href='http://en.wikipedia.org/wiki/The_Oregon_Trail_(video_game)' target='_blank'>[1]</a></sup>";
technologyFactsList[14]="Former President Lyndon B. Johnson owned an amphicar - a hybrid car and boat. He would scare visitors by driving it into the lake, claiming malfunctioning brakes.<sup><a href='http://en.wikipedia.org/wiki/Amphicar' target='_blank'>[1]</a></sup>";
technologyFactsList[15]="Nintendo was sued and found guilty when <i>Mario Party</i> players got blisters on their palms while playing the mini games that required them to rapidly spin the analog stick. They also gave the players free gaming gloves to safely play the game.<sup><a href='http://en.wikipedia.org/wiki/Mario_Party' target='_blank'>[1]</a></sup>";
technologyFactsList[16]="The original Japanese version of the arcade game Pac-Man was called Puck Man, referencing the character's shape being like a hockey puck.<sup><a href='http://en.wikipedia.org/wiki/Pac-Man' target='_blank'>[1]</a></sup>";
technologyFactsList[17]="Due to Circuit City's bankruptcy in 2008, several brand new stores were closed after just a few weeks of being open. Some stores were also built and never even opened.<sup><a href='http://en.wikipedia.org/wiki/Circuit_City' target='_blank'>[1]</a></sup>";
technologyFactsList[18]="Best Buy was originally a chain of stores called Sound of Music. After its most profitable store was hit by a tornado, its owner held a sale selling its damaged stock, promising \"best buys\".<sup><a href='http://en.wikipedia.org/wiki/Best_Buy' target='_blank'>[1]</a></sup>";
technologyFactsList[19]="In 1991, a 1 GB hard drive could be purchased for about $2,700. As of 2014, a 4 TB (4,000 GB) hard drive can be purchased for about $150.<sup><a href='http://en.wikipedia.org/wiki/Terabyte' target='_blank'>[1]</a></sup>";
technologyFactsList[20]="Sonic the Hedgehog's sidekick, Miles \"Tails\" Prower, gets his name from a pun on \"miles per hour\", referencing the famed speed of Sonic the Hedgehog.<sup><a href='http://en.wikipedia.org/wiki/Tails_(character)' target='_blank'>[1]</a></sup>";
technologyFactsList[21]="The early Nintendo game <i>Baseball</i>, released in 1983, only allowed the player to choose 6 of the 26 MLB teams to play as.<sup><a href='http://en.wikipedia.org/wiki/Baseball_(1983_video_game)' target='_blank'>[1]</a></sup>";
technologyFactsList[22]="In 2010 and 2012, Sega released a follow-up sequel to the original Sonic series from 1991 to 1994. It is called <i>Sonic the Hedgehog 4 Episode I</i> and <i>Episode II</i>, and picks up where <i>Sonic and Knuckles</i> left off.<sup><a href='http://en.wikipedia.org/wiki/Sonic_the_Hedgehog_4:_Episode_I' target='_blank'>[1]</a><a href='http://en.wikipedia.org/wiki/Sonic_the_Hedgehog_4:_Episode_II' target='_blank'>[2]</a></sup>";
technologyFactsList[23]="The creator of Atari video game system also created Chuck E. Cheese, which could function as a way to distribute Atari games and get kids to play Atari video games.<sup><a href='http://en.wikipedia.org/wiki/Nolan_Bushnell' target='_blank'>[1]</a></sup>";
technologyFactsList[24]="Some alternate endings considered for the video game <i>Portal 2</i> included the player-character shooting a Portal onto the moon's surface, and having the player die of asphyxiation over a closing song; another featured Chell finally saying a single word.<sup><a href='http://en.wikipedia.org/wiki/Portal_2' target='_blank'>[1]</a></sup>"; 
technologyFactsList[25]="The oldest still-existing .com domain is www.symbolics.com, which was registered on March 15, 1985.<sup><a href='http://en.wikipedia.org/wiki/.com' target='_blank'>[1]</a></sup>";
technologyFactsList[26]="The first iPhone (released in 2007) did not have video recording, GPS, a front-facing camera, or a digital compass.<sup><a href='http://en.wikipedia.org/wiki/List_of_iOS_devices' target='_blank'>[1]</a></sup>";



	/*  --          Television/Film list          --  */
var televisionFactsList = new Array;
televisionFactsList[0]="The TV show <i>Seinfeld</i> was originally titled <i>Stand Up</i>, then re-titled <i>The Seinfeld Chronicles</i>, before settling on just <i>Seinfeld</i>.<sup><a href='http://en.wikipedia.org/wiki/The_Seinfeld_Chronicles' target='_blank'>[1]</a></sup>";
televisionFactsList[1]="Kramer, Jerry's friend and neighbor on <i>Seinfeld</i>, was originally named Kessler in the show's pilot.<sup><a href='http://en.wikipedia.org/wiki/The_Seinfeld_Chronicles' target='_blank'>[1]</a></sup>";
televisionFactsList[2]="Bill Murray's part in <i>Zombieland</i> was originally also considered for Sylvester Stallone, Joe Pesci, Mark Hamill, Dwayne Johnson, Kevin Bacon, Jean-Claude Van Damme or Matthew McConaughey.<sup><a href='http://en.wikipedia.org/wiki/Zombieland' target='_blank'>[1]</a></sup>";
televisionFactsList[3]="The very last rental at Blockbuster was <i>This Is The End</i>, on November 9, 2013, in a store in Hawaii.<sup><a href='http://en.wikipedia.org/wiki/Blockbuster_LLC' target='_blank'>[1]</a></sup>";
televisionFactsList[4]="Jackie, Hyde, Donna, Fez, Red, and Kitty appeared in all 200 episodes of <i>That '70s Show</i>.<sup><a href='http://goo.gl/ctHoYO' target='_blank'>[1]</a></sup>";
televisionFactsList[5]="Matt Groening named the Simpsons family characters after his own family members, substituting \"Bart\" for his own name.<sup><a href='http://en.wikipedia.org/wiki/Simpson_family' target='_blank'>[1]</a></sup>";
televisionFactsList[6]="The working title of the TV show <i>The New Girl</i> was <i>Chicks & Dicks</i>.<sup><a href='http://en.wikipedia.org/wiki/New_Girl' target='_blank'>[1]</a></sup>";
televisionFactsList[7]="There is only 1 episode of 550+ episodes of <i>The Simpsons</i> to not feature (or even mention) Bart Simpson: season 20's \"Four Great Women and a Manicure\".<sup><a href='http://en.wikipedia.org/wiki/Four_Great_Women_and_a_Manicure' target='_blank'>[1]</a></sup>";
televisionFactsList[8]="Voice actor Billy West has played Bugs Bunny, Elmer Fudd, Fry and Dr. Zoidberg (<i>Futurama</i>), Doug Funnie (<i>Doug</i>), the red M&M, Popeye, Shaggy (<i>Scooby-Doo</i>), Tom (<i>Tom & Jerry</i>), Woody Woodpecker, and Ren and Stimpy.<sup><a href='http://en.wikipedia.org/wiki/Billy_West' target='_blank'>[1]</a></sup>";
televisionFactsList[9]="The 2008 film <i>Forgetting Sarah Marshall</i> was only \"60 or 70% scripted\", with the rest of the film being improv.<sup><a href='http://en.wikipedia.org/wiki/Forgetting_Sarah_Marshall' target='_blank'>[1]</a></sup>";
televisionFactsList[10]="The most-watched TV series finale, <i>M*A*S*H</i>, had 105.9 million viewers. Followed by <i>Cheers</i>, <i>Seinfeld</i>, <i>Friends</i>, and <i>Magnum, P.I.</i><sup><a href='http://en.wikipedia.org/wiki/List_of_most_watched_television_broadcasts' target='_blank'>[1]</a></sup>";
televisionFactsList[11]="Despite popular perceptions, the cartoon yellow canary, Tweety, is actually male.<sup><a href='http://en.wikipedia.org/wiki/Tweety' target='_blank'>[1]</a></sup>";
televisionFactsList[12]="The movie <i>Honey, I Blew Up the Kid</i> was not originally a sequel to <i>Honey, I Shrunk the Kids</i>. It was a separate movie called <i>Big Baby</i>.<sup><a href='http://en.wikipedia.org/wiki/Honey,_I_Blew_Up_the_Kid' target='_blank'>[1]</a></sup>";
televisionFactsList[13]="Development of <i>Inception</i> began roughly 10 years before the film's release when Christopher Nolan wrote a treatment about dream-stealers.<sup><a href='http://en.wikipedia.org/wiki/Inception' target='_blank'>[1]</a></sup>";
televisionFactsList[14]="The first ever contestant to win the $1,000,000 prize on <i>Who Wants to be a Millionaire?</i> used his lifeline to call his dad to tell him he was going to win, instead of asking for help.<sup><a href='http://en.wikipedia.org/wiki/John_Carpenter_(game_show_contestant)' target='_blank'>[1]</a></sup>";
televisionFactsList[15]="<i>Survivor</i>'s first season winner Richard Hatch later appeared on the Australian version of <i>Who Wants to be a Millionaire?</i>, and won $0, answering his fourth question wrong.<sup><a href='http://en.wikipedia.org/wiki/Who_Wants_to_Be_a_Millionaire%3F_(Australian_game_show)' target='_blank'>[1]</a></sup>";
televisionFactsList[16]="In the pilot episode of the US version of <i>The Office</i>, 3 unnamed women and 1 unnamed man appear in the episode and are not seen in any other episode.<sup><a href='http://en.wikipedia.org/wiki/Pilot_(The_Office)' target='_blank'>[1]</a></sup>";
televisionFactsList[17]="The initial proposed name for the TV show <i>Law & Order: SVU</i> was <i>Law and Order: Sex Crimes</i>.<sup><a href='http://en.wikipedia.org/wiki/Law_%26_Order:_Special_Victims_Unit' target='_blank'>[1]</a></sup>";
televisionFactsList[18]="The film <i>50/50</i> was originally titled <i>I'm With Cancer</i>, and then, <i>Live With It</i>, before settling on <i>50/50</i>.<sup><a href='http://en.wikipedia.org/wiki/50/50_(2011_film)' target='_blank'>[1]</a></sup>";
televisionFactsList[19]="Ben Wyatt's character and story on <i>Parks and Recreation</i> was an original idea for the pilot of the show, until Leslie Knope was created.<sup><a href='http://en.wikipedia.org/wiki/Ben_Wyatt_(Parks_and_Recreation)' target='_blank'>[1]</a></sup>";
televisionFactsList[20]="Lyndsey Fonseca and David Henrie, who play Ted's kids in 2030 on <i>How I Met Your Mother</i>, auditioned for Katniss and Peeta in <i>The Hunger Games</i>.<sup><a href='http://en.wikipedia.org/wiki/The_Hunger_Games_(film_series)' target='_blank'>[1]</a></sup>";
televisionFactsList[21]="In <i>The Simpsons</i> episode \"Homer at the Bat\", Jose Canseco (playing himself) was originally supposed to wake up in bed with Edna Krabappel and miss the game. However, Canseco's wife objected and the part was rewritten.<sup><a href='http://en.wikipedia.org/wiki/Homer_at_the_Bat' target='_blank'>[1]</a></sup>";
televisionFactsList[22]="In the season 8 finale of <i>Scrubs</i>, the Janitor's real name was finally revealed: Glenn Matthews. This was later confirmed by show creator Bill Lawrence.<sup><a href='http://en.wikipedia.org/wiki/Janitor_(Scrubs)' target='_blank'>[1]</a></sup>";
televisionFactsList[23]="The character Tuco (played by Raymond Cruz) on <i>Breaking Bad</i> was killed off because the actor found the part too difficult to play.<sup><a href='http://en.wikipedia.org/wiki/Kill_off' target='_blank'>[1]</a></sup>";
televisionFactsList[24]="After 25 seasons of Bart Simpson being in 4th grade, season 26 of The Simpsons finally has him in his first day of 5th grade.<sup><a href='http://en.wikipedia.org/wiki/The_Simpsons_(season_26)' target='_blank'>[1]</a></sup>";
televisionFactsList[25]="Brad Pitt voluntarily visited a dentist to have pieces of his front teeth chipped off for his role in <i>Fight Club</i>.<sup><a href='http://en.wikipedia.org/wiki/Fight_Club' target='_blank'>[1]</a></sup>";
televisionFactsList[26]="Among the numerous spinoffs of <i>The Brady Bunch</i>, an hour-long drama spinoff called <i>The Bradys</i> was aired in 1990, lasting only 6 episodes. All of the main cast returned for the show except for Maureen McCormick (the original Marcia).<sup><a href='http://en.wikipedia.org/wiki/The_Bradys' target='_blank'>[1]</a></sup>";
televisionFactsList[27]="One of the original pairs of ruby slippers that Dorothy wore in <i>The Wizard of Oz</i> sold at an auction in 2000 for $666,000.<sup><a href='http://en.wikipedia.org/wiki/The_Wizard_of_Oz_(1939_film)' target='_blank'>[1]</a></sup>";
televisionFactsList[28]="Anne Dudek played Precious on <i>Friends</i> and Natalie on <i>How I Met Your Mother</i>; both shows feature her character getting dumped by a main character on her birthday.<sup><a href='http://en.wikipedia.org/wiki/Return_of_the_Shirt' target='_blank'>[1]</a><a href='http://en.wikipedia.org/wiki/Anne_Dudek' target='_blank'>[2]</a></sup>";
televisionFactsList[29]="Mike \"Boogie\" Malin, winner of <i>Big Brother 7</i>, was a stand-in for Matthew Perry on <i>Friends</i>.<sup><a href='http://en.wikipedia.org/wiki/Mike_Malin_(Big_Brother)' target='_blank'>[1]</a></sup>";
televisionFactsList[30]="In 2008, a large fire broke out in Universal Studios' backlots, destroying over 40,000 archived digital film copies, including <i>Knocked Up</i>, <i>Law & Order</i>, <i>The Office</i>, <i>Miami Vice</i>, & <i>I Love Lucy</i>.<sup><a href='http://en.wikipedia.org/wiki/Universal_Studios_Hollywood' target='_blank'>[1]</a></sup>";
televisionFactsList[31]="After a near-fatal car accident, Mel Blanc returned to his voice role of Barney Rubble sooner than expected when the entire cast of <i>The Flintstones</i> had a temporary recording studio set up at his bedside.<sup><a href='http://en.wikipedia.org/wiki/The_Flintstones' target='_blank'>[1]</a></sup>";
televisionFactsList[32]="In 1962, <i>The Jetsons</i> cartoon series featured several inventions that didn't exist, but are in common use today: flat screen 3D TV's, newspaper on a tablet, a computer virus, video chat, a tanning bed, and a treadmill.<sup><a href='http://en.wikipedia.org/wiki/The_Jetsons' target='_blank'>[1]</a></sup>";
televisionFactsList[33]="In the original plan for the <i>Lost</i> pilot, Jack was supposed to die instead of the airplane pilot and Kate was to emerge as the leader of the group.<sup><a href='http://en.wikipedia.org/wiki/Pilot_(Lost)' target='_blank'>[1]</a></sup>";
televisionFactsList[34]="The show <i>Futurama</i> was named after a pavilion in the 1939 World's Fair, which depicted what the world would be like in 1959. Other considered titles were <i>Aloha, Mars!</i> and <i>Doomsville</i>.<sup><a href='http://en.wikipedia.org/wiki/Futurama' target='_blank'>[1]</a></sup>";
televisionFactsList[35]="Ross Geller's nicknames on <i>Friends</i> include: Ross-A-Tron, Tyrannosaurus Ross, Rossie, Ross - The Divorce Force, Ross - The Divorcer, Red Ross, Dr. Geller, Wet Pants Geller, Two Divorces, Mental Geller, Bea, Dinosaur Guy, Dr. Monkey, Bridesboy, Cookie-Dude, Clifford Alvarez, Ron, Prof. Geller, Ginger, Magellan, Wet-Head, Mr. Big Shot, Pampers, Bobo the sperm guy, and Mr. Right Place At The Right Time.<sup><a href='http://en.wikipedia.org/wiki/Ross_Geller' target='_blank'>[1]</a></sup>";
televisionFactsList[36]="Considered to be one of the worst sitcoms of all time, Lucille Ball's last sitcom <i>Life with Lucy</i> aired when she was 75 years old.<sup><a href='http://en.wikipedia.org/wiki/List_of_sitcoms_notable_for_negative_reception' target='_blank'>[1]</a></sup>";
televisionFactsList[37]="<i>Futurama</i> character Zoidberg was named after an Apple II game David X. Cohen (the show's co-developer) created in high school.<sup><a href='http://en.wikipedia.org/wiki/Zoidberg' target='_blank'>[1]</a></sup>";
televisionFactsList[38]="The show <i>It's Always Sunny in Philadelphia</i> started out as a short film idea about a man telling his friend he might have cancer, while the friend is only intent on borrowing a cup of sugar for the \"shitload of coffee\" he has made.<sup><a href='http://en.wikipedia.org/wiki/It%27s_Always_Sunny_in_Philadelphia' target='_blank'>[1]</a></sup>";
televisionFactsList[39]="When Fonzie jumped the shark (also creating the popular term, jumping the shark) in the season 5 premiere of <i>Happy Days</i>, the stunt was a way to showcase Henry Winkler's real life waterskiing skills.<sup><a href='http://en.wikipedia.org/wiki/Jumping_the_shark' target='_blank'>[1]</a></sup>";
televisionFactsList[40]="Due to Philip Seymour Hoffman's death in February 2014, his character in <i>Mockingjay Part 2</i>, Plutarch Heavensbee, was digitally recreated for a major scene, and some of his lines were rewritten and given to other characters.<sup><a href='http://en.wikipedia.org/wiki/The_Hunger_Games:_Mockingjay_-_Part_2' target='_blank'>[1]</a></sup>";
televisionFactsList[41]="<i>Rocko's Modern Life</i> creator Joe Murray thought of the idea for the show after visiting a zoo and observing a wallaby that seemed oblivious to the chaos around him.<sup><a href='http://goo.gl/Zs2T5O' target='_blank'>[1]</a></sup>";
televisionFactsList[42]="The ampersand (&amp;) and the word \"and\" mean two different things in film credits: The ampersand indicates two writers collaborating on a script, while \"and\" indicates that one person wrote the script/screenplay, and one rewrote it or worked on it at a different time.<sup><a href='http://en.wikipedia.org/wiki/Ampersand' target='_blank'>[1]</a></sup>";
televisionFactsList[43]="In 26 seasons of <i>The Simpsons</i>, the show has only had 13 Christmas-themed episodes (plus 1 <i>Tracy Ullman</i> short).<sup><a href='http://en.wikipedia.org/wiki/List_of_United_States_Christmas_television_episodes' target='_blank'>[1]</a></sup>";
televisionFactsList[44]="The 1995 film <i>Bushwacked</i> was originally intended to be a spinoff of <i>Home Alone</i>, with Daniel Stern reprising his role as Marv, giving up his life of crime only to be framed at his new job.<sup><a href='http://en.wikipedia.org/wiki/Home_Alone' target='_blank'>[1]</a></sup>";
televisionFactsList[45]="There are several instances where the word \"fuck\" is used in a PG-rated film: including <i>All the President's Men</i>, <i>The Front</i>, <i>Tootsie</i>, <i>Terms of Endearment</i>, <i>Sixteen Candles</i>, <i>Spaceballs</i>, <i>Big</i>, <i>Caddyshack 2</i>, and <i>Beetlejuice</i>.<sup><a href='http://en.wikipedia.org/wiki/Motion_Picture_Association_of_America_film_rating_system' target='_blank'>[1]</a></sup>";
televisionFactsList[46]="The season 1 Pok&eacute;mon episode \"Tentacool and Tentacruel\" was removed from rotation temporarily in 2001, due to the similarity of the Tentacruel destroying buildings and the September 11th attacks. <sup><a href='http://en.wikipedia.org/wiki/Pokémon_episodes_removed_from_rotation' target='_blank'>[1]</a></sup>";
televisionFactsList[47]="Ed O'Neill, known for his roles as Al Bundy on <i>Married... With Children</i> and Jay Pritchett on <i>Modern Family</i>, was a high school social studies teacher before becoming an actor.<sup><a href='http://en.wikipedia.org/wiki/Ed_O%27Neill' target='_blank'>[1]</a></sup>";
televisionFactsList[48]="During the ten season run of the TV show <i>Friends</i>, five of the six main characters are shown drunk in at least one episode. The exception is Joey, who is never shown drunk.<sup><a href='http://en.wikipedia.org/wiki/Friends_(season_1)' target='_blank'>[1]</a><a href='http://en.wikipedia.org/wiki/Friends_(season_2)' target='_blank'>[2]</a><a href='http://en.wikipedia.org/wiki/Friends_(season_3)' target='_blank'>[3]</a><a href='http://en.wikipedia.org/wiki/Friends_(season_5)' target='_blank'>[4]</a><a href='http://en.wikipedia.org/wiki/The_One_with_the_Proposal' target='_blank'>[5]</a></sup>";
televisionFactsList[49]="The National Lampoon's <i>Vacation</i> film series features 5 different actors playing the role of Rusty and 5 different actresses playing Audrey, in the 5 theatre-released films.<sup><a href='http://en.wikipedia.org/wiki/National_Lampoon%27s_Vacation_(film_series)' target='_blank'>[1]</a></sup>";
televisionFactsList[50]="The term \"soap opera\" comes from the soap and detergent commercials that were originally broadcast during the first soap operas, aimed at the women who were cleaning their houses while watching them.<sup><a href='http://en.wikipedia.org/wiki/Soap_opera' target='_blank'>[1]</a></sup>";
televisionFactsList[51]="Over the course of 26 seasons of their show, the Simpsons family have owned the following pets: two dogs (Santa's Little Helper and Laddie), five cats (Snowball I, Snowball II, Snowball III, Coltrane, Snowball V), an elephant (Stampy), a snake (Strangles), a guinea pig (Pokey), a horse (Princess), and a lobster (Pinchy).<sup><a href='http://en.wikipedia.org/wiki/Simpson_family' target='_blank'>[1]</a></sup>";
televisionFactsList[52]="For the role of <i>Friends</i> character Gunther, James Michael Tyler was cast because he was the only extra who could competently work the coffee machine on the set. He ended up appearing in the most episodes (148 out of 236) besides the main cast.<sup><a href='http://en.wikipedia.org/wiki/List_of_Friends_characters' target='_blank'>[1]</a><a href='http://en.wikipedia.org/wiki/James_Michael_Tyler' target='_blank'>[2]</a></sup>";
televisionFactsList[53]="Ruth Cohen, who plays the cashier at Monk's Cafe on <i>Seinfeld</i>, appears in the most episodes (101 out of 180) besides the main cast.<sup><a href='http://en.wikipedia.org/wiki/Ruth_Cohen' target='_blank'>[1]</a></sup>";
televisionFactsList[54]="As of 2015, the longest running scripted television series are <i>The Simpsons</i> (currently in its 26th season), <i>Gunsmoke</i> (lasted 20 seasons), <i>Law &amp; Order</i> (lasted 20 seasons), <i>Lassie</i> (lasted 19 seasons), and <i>South Park</i> (currently in its 18th season).<sup><a href='http://en.wikipedia.org/wiki/List_of_longest-running_U.S._primetime_television_series' target='_blank'>[1]</a></sup>";
televisionFactsList[55]="The original plan for season 6 of <i>The Brady Bunch</i> was to use Carol's previous husband as a mechanism to replace Robert Reed (who was constantly unhappy with the show's scripts) in season 6. However the show was canceled after its fifth season.<sup><a href='http://en.wikipedia.org/wiki/Characters_of_The_Brady_Bunch' target='_blank'>[1]</a><a href='http://en.wikipedia.org/wiki/Robert_Reed' target='_blank'>[2]</a></sup>";
televisionFactsList[56]="Scenes for an episode of <i>Entourage</i> were shot on location at a 2005 U2 concert. Similarly, scenes for the <i>Entourage</i> film were shot on location at the 72nd Golden Globe Awards.<sup><a href='http://en.wikipedia.org/wiki/City_of_Blinding_Lights' target='_blank'>[1]</a><a href='http://en.wikipedia.org/wiki/Entourage_(film)' target='_blank'>[2]</a></sup>";
televisionFactsList[57]="<i>Taken</i> actor Liam Neeson turned down the role of James Bond in 1995's <i>Goldeneye</i> because he wasn't interested in starring in action movies.<sup><a href='http://en.wikipedia.org/wiki/List_of_actors_considered_for_the_James_Bond_character' target='_blank'>[1]</a></sup>";
televisionFactsList[58]="<i>American Sniper</i> producer and star Bradley Cooper had originally thought of actor Chris Pratt to play the lead role of Chris Kyle, but WB agreed to buy the film only if Bradley Cooper would star.<sup><a href='http://en.wikipedia.org/wiki/American_Sniper_(film)' target='_blank'>[1]</a></sup>";
televisionFactsList[59]="Having trouble selling <i>The Terminator</i> to production companies, the then inexperienced James Cameron eventually sold the screenplay for one dollar, on the condition that Cameron direct the film.<sup><a href='http://en.wikipedia.org/wiki/James_Cameron' target='_blank'>[1]</a></sup>";
televisionFactsList[60]="Steve Carell and all other cast members of <i>The Office</i> \"flat-out lied\" for months about Carell not returning to the finale episode of the show in any capacity. His lines were even left out of the initial table read for the episode.<sup><a href='http://en.wikipedia.org/wiki/Finale_(The_Office)' target='_blank'>[1]</a></sup>";
televisionFactsList[61]="<i>Community</i> creator Dan Harmon created the TV series basing it off his own life. He enrolled in a community college to save his relationship with his girlfriend, and ended up bonding with a study group he had little in common with.<sup><a href='http://en.wikipedia.org/wiki/Community_(TV_series)' target='_blank'>[1]</a></sup>";
televisionFactsList[62]="Starting in 2014, boxer Mike Tyson starred in an animated TV series which featured himself and his friends solving mysteries (similar to <i>Scooby-Doo</i>, among other silly things such as taking an oatmeal bath with cooked oatmeal, owning a pet grizzly bear, and using mosquitoes to help him sleep.<sup><a href='http://en.wikipedia.org/wiki/Mike_Tyson_Mysteries' target='_blank'>[1]</a></sup>";
televisionFactsList[63]="The first animated character to receive a star on the Hollywood Walk of Fame was Mickey Mouse in 1978. Since then, others including Bugs Bunny, The Simpsons, and Snow White have also received a star.<sup><a href='http://en.wikipedia.org/wiki/Hollywood_Walk_of_Fame'target='_blank'>[1]</a></sup>";
televisionFactsList[64]="Actor Ed O'Neill's star on the Hollywood Walk of Fame lies in front of a shoe store, a deliberate reference to his character's profession on <i>Married... With Children</i>.<sup><a href='http://en.wikipedia.org/wiki/Hollywood_Walk_of_Fame' target='_blank'>[1]</a></sup>";





	/*  --          Misc list          --  */
var miscFactsList = new Array;
miscFactsList[0]="In 2008, a teenager was decapitated by Batman: The Ride's roller coaster train at Six Flags Over Georgia, while allegedly trying to find his hat in a restricted area.<sup><a href='http://en.wikipedia.org/wiki/Incidents_at_Six_Flags_parks' target='_blank'>[1]</a></sup>";
miscFactsList[1]="The idea for the candy Ring Pops came from a Topps product engineer, Frank Richards. He created Ring Pops as a way to thwart the bad habit of thumb sucking, which his daughter was prone to doing.<sup><a href='http://en.wikipedia.org/wiki/Ring_Pop' target='_blank'>[1]</a></sup>";
miscFactsList[2]="Cases of chickenpox have been observed in chimpanzees and gorillas.<sup><a href='http://en.wikipedia.org/wiki/Chickenpox' target='_blank'>[1]</a></sup>";
miscFactsList[3]="Interactive urinals have been developed in several countries, allowing users to play video games while they urinate.<sup><a href='http://en.wikipedia.org/wiki/Interactive_urinal' target='_blank'>[1]</a></sup>";
miscFactsList[4]="Blood donor James Harrison had blood that contained a rare antigen which cured Rhesus disease. He has donated blood a record 1,000 times and saved 2,000,000 lives.<sup><a href='http://en.wikipedia.org/wiki/James_Harrison_(blood_donor)' target='_blank'>[1]</a></sup>";
miscFactsList[5]="Among Neil Patrick Harris' numerous television, movie, and Broadway credits, he is also the voice of the safety spiels and launch countdown of Disney's California Adventure's \"California Screamin'\" rollercoaster.<sup><a href='http://goo.gl/xYmSbw' target='_blank'>[1]</a></sup>";
miscFactsList[6]="The original Skee-ball games in 1914 had a 36-foot lane, much longer than the 10-13 foot lanes today.<sup><a href='http://en.wikipedia.org/wiki/Skee_ball' target='_blank'>[1]</a></sup>";
miscFactsList[7]="A study in 2000 showed that Oxford Street in London had 250,000 blobs of chewing gum stuck to its pavement.<sup><a href='http://en.wikipedia.org/wiki/Chewing_gum' target='_blank'>[1]</a></sup>";
miscFactsList[8]="When Frito Lay introduced compostable Sun Chips bags in 2008, they received numerous complaints about their excessive noise, causing Frito Lay to remake the bags quieter.<sup><a href='http://en.wikipedia.org/wiki/Sun_Chips' target='_blank'>[1]</a></sup>";
miscFactsList[9]="Some species of bamboo can grow up to 35 inches in a 24-hour period.<sup><a href='http://en.wikipedia.org/wiki/Bamboo' target='_blank'>[1]</a></sup>";
miscFactsList[10]="UPS developed software in 2004 that would route UPS trucks to their destinations while minimizing left turns, in order to save a considerable amount of fuel.<sup><a href='http://en.wikipedia.org/wiki/United_Parcel_Service' target='_blank'>[1]</a></sup>";
miscFactsList[11]="In 2002, Kmart rebranded its iconic red logo in five prototype stores (4 in Illinois, and 1 in White Lake, Michigan) using a lime green and gray color scheme. <a class='popimg' href='#'>These logos<span><i></i><img src='docs/assets/img/kmart.jpg'/></span></a> did not roll out to Kmart's other stores.<sup><a href='http://en.wikipedia.org/wiki/Kmart' target='_blank'>[1]</a></sup>";
miscFactsList[12]="The inventor of the shopping cart had to hire male and female models to push around shopping carts in order to make people comfortable using them. Men originally found them effeminate; women found them suggestive of a baby carriage.<sup><a href='http://en.wikipedia.org/wiki/Shopping_cart' target='_blank'>[1]</a></sup>";
miscFactsList[13]="In 2009, Google rented goats to eat their overgrown lawns in Mountain View, California.<sup><a href='http://en.wikipedia.org/wiki/Rent_A_Goat' target='_blank'>[1]</a></sup>";
miscFactsList[14]="Since 1972, a \"<a class='popimg' href='#'>leap second<span><i></i><img src='docs/assets/img/leapsecond.png'/></span></a>\" has been added 25 times onto the Coordinated Universal Time in order to keep its time of day close to the mean solar time. The next time this will occur is June 30, 2015.<sup><a href='http://en.wikipedia.org/wiki/Leap_second' target='_blank'>[1]</a></sup>";
miscFactsList[15]="Koko the gorilla who resides in the San Francisco zoo, reportedly knows over 1,000 words of Gorilla Sign Language (based on American Sign Language) and also understands over 2,000 words of English.<sup><a href='http://en.wikipedia.org/wiki/Koko_(gorilla)' target='_blank'>[1]</a></sup>";
miscFactsList[16]="A Swedish family named their child Brfxxccxxmnpcccclllmmnprxvclmnckssqlbb11116 (pronounced <i>Albin</i>) as a protest against the naming laws in Sweden. The family was charged 5,000 kronor and the name was rejected.<sup><a href='http://en.wikipedia.org/wiki/Naming_law_in_Sweden' target='_blank'>[1]</a></sup>";
miscFactsList[17]="A number with 3 digits or more is divisible by 8 if its last 3 digits are also divisible by 8.<sup><a href='http://en.wikipedia.org/wiki/8_(number)' target='_blank'>[1]</a></sup>";
miscFactsList[18]="Prescription medicine bottles are usually orange or light brown because of their ability to prevent ultraviolet light from degrading the potentially photosensitive contents, while still allowing enough light through to see the contents.<sup><a href='http://en.wikipedia.org/wiki/Prescription_bottle' target='_blank'>[1]</a></sup>";

	/*  --          User-submitted list          --  */
var userSubmittedFactsList = ["food18","history19","music9","television47","misc4","history24","misc18","technology23","technology24","television59","pop20"];

	/*  --          Pictures list          --  */
var picturesFactsList = ["history1","history16","pop8","misc11","misc14","history22","sports22","music17"];

	/*  --          Most used Wiki page list          --  */
var mostFactsList = ["music21","pop18","pop19","television63","television64"];

	/*  --          Retired list           --    */
var retiredFactsList = new Array;
retiredFactsList[0]="The word for \"second-to-last\" is <i>penultimate</i>, from Latin <i>paene</i> (\"almost\") + <i>ultimus</i> (\"last\"). Similarly, third-to-last is <i>antepenultimate</i>, fourth-to-last is <i>preantepenultimate</i>, and fifth-to-last is <i>propreantepenultimate</i>.<sup><a href='http://en.wiktionary.org/wiki/penultimate' target='_blank'>[1]</a></sup>";

	


/*  --          Unfiltered combined fact list, show counts          --  */

function giveafact(){ //instead of relisting all array items here, add all the other arrays to this one
var factsList = foodFactsList.concat(musicFactsList,historyFactsList,popFactsList,sportsFactsList,technologyFactsList,televisionFactsList,miscFactsList);
randomFact = Math.floor(Math.random()*factsList.length);
document.getElementById("total").innerHTML=factsList.length;
document.getElementById("fact").innerHTML=factsList[randomFact];
updateShareLinks();
return false;
}

window.onload=giveafact;

	/*  --          Generate unfiltered the facts          --  */

function giveafoodfact() {
randomFoodFact = Math.floor(Math.random()*foodFactsList.length);
document.getElementById("fact").innerHTML=foodFactsList[randomFoodFact];
updateShareLinks();
}

function giveahistoryfact() {
randomHistoryFact = Math.floor(Math.random()*historyFactsList.length);
document.getElementById("fact").innerHTML=historyFactsList[randomHistoryFact];
updateShareLinks();
}

function giveamusicfact() {
randomMusicFact = Math.floor(Math.random()*musicFactsList.length);
document.getElementById("fact").innerHTML=musicFactsList[randomMusicFact];
updateShareLinks();
}

function giveapopculturefact() {
randomPopCultureFact = Math.floor(Math.random()*popFactsList.length);
document.getElementById("fact").innerHTML=popFactsList[randomPopCultureFact];
updateShareLinks();
}

function giveasportsfact() {
randomSportsFact = Math.floor(Math.random()*sportsFactsList.length);
document.getElementById("fact").innerHTML=sportsFactsList[randomSportsFact];
updateShareLinks();
}

function giveatechnologyfact() {
randomTechnologyFact = Math.floor(Math.random()*technologyFactsList.length);
document.getElementById("fact").innerHTML=technologyFactsList[randomTechnologyFact];
updateShareLinks();
}

function giveatelevisionfact() {
randomTelevisionFact = Math.floor(Math.random()*televisionFactsList.length);
document.getElementById("fact").innerHTML=televisionFactsList[randomTelevisionFact];
updateShareLinks();
}

function giveamiscfact() {
randomMiscFact = Math.floor(Math.random()*miscFactsList.length);
document.getElementById("fact").innerHTML=miscFactsList[randomMiscFact];
updateShareLinks();
}

// Using jQuery Event API v1.3
$('#thebutton').on('click', function() {  
	ga('send', 'event', 'bigredbutton', 'click', 'gettingfact');
});

	/*  --          Create the FB/Twitter share links          --  */

function updateShareLinks() {
	var factText = $('#fact').text(); // Gets the fact text
	var factStr = factText.toString(); // Converts text to string
	var trimSpot = factStr.indexOf("["); // Finds the start of the fact sources 
	var trimmedFact = factStr.slice(0, trimSpot); // Trims the source links
	
	// Update the Twitter link
	var linkRefTW = "http://twitter.com/share?url=thewikifix.com&text=" + trimmedFact + "&hashtags=thewikifix";
	$('#shareLinkTW').attr('href', linkRefTW);
	// Update the Facebook link
	/*var linkRefFB = "http://facebook.com/sharer.php?u=http://thewikifix.com";
	$('#shareLinkFB').attr('href', linkRefFB);*/
}

	/*  --          Stats page          --  */
var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

var oneDay = 24*60*60*1000; //number of seconds in a day
var todaysDate = new Date();
var startDate = new Date(2014,05,21); //June 21, 2014
var currentDate = todaysDate.getDate();
var currentMonth = todaysDate.getMonth();
var currentYear = todaysDate.getFullYear();
document.getElementById("today").innerHTML = months[currentMonth] + " " + currentDate + ", " + currentYear;

var totalDays = Math.round((todaysDate.getTime() - startDate.getTime())/(oneDay)); 
var factsList = foodFactsList.concat(musicFactsList,historyFactsList,popFactsList,sportsFactsList,technologyFactsList,televisionFactsList,miscFactsList);
var dailyTotal = (factsList.length/totalDays).toFixed(2); 
document.getElementById("dailytotal").innerHTML = dailyTotal;


$( document ).ready(function() {
	var factsList = foodFactsList.concat(musicFactsList,historyFactsList,popFactsList,sportsFactsList,technologyFactsList,televisionFactsList,miscFactsList);
	document.getElementById("total").innerHTML=factsList.length;
	
	document.getElementById("usertotal").innerHTML=userSubmittedFactsList.length;
	var userTotal = ((userSubmittedFactsList.length/factsList.length)*100).toFixed(1);
	document.getElementById("userperc").innerHTML=userTotal + "&#37;";
	
	document.getElementById("pictotal").innerHTML=picturesFactsList.length;
	var picTotal = ((picturesFactsList.length/factsList.length)*100).toFixed(1);
	document.getElementById("picperc").innerHTML=picTotal + "&#37;";
	
	document.getElementById("foodtotal").innerHTML=foodFactsList.length;
	var foodTotal = ((foodFactsList.length/factsList.length)*100).toFixed(1);
	document.getElementById("foodperc").innerHTML=foodTotal + "&#37;";
	
	document.getElementById("historytotal").innerHTML=historyFactsList.length;
	var historyTotal = ((historyFactsList.length/factsList.length)*100).toFixed(1);
	document.getElementById("historyperc").innerHTML=historyTotal + "&#37;";
	
	document.getElementById("musictotal").innerHTML=musicFactsList.length;
	var musicTotal = ((musicFactsList.length/factsList.length)*100).toFixed(1);
	document.getElementById("musicperc").innerHTML=musicTotal + "&#37;";
	
	document.getElementById("poptotal").innerHTML=popFactsList.length;
	var popTotal = ((popFactsList.length/factsList.length)*100).toFixed(1);
	document.getElementById("popperc").innerHTML=popTotal + "&#37;";
	
	document.getElementById("sportstotal").innerHTML=sportsFactsList.length;
	var sportsTotal = ((sportsFactsList.length/factsList.length)*100).toFixed(1);
	document.getElementById("sportsperc").innerHTML=sportsTotal + "&#37;";
	
	document.getElementById("techtotal").innerHTML=technologyFactsList.length;
	var techTotal = ((technologyFactsList.length/factsList.length)*100).toFixed(1);
	document.getElementById("techperc").innerHTML=techTotal + "&#37;";
	
	document.getElementById("televisiontotal").innerHTML=televisionFactsList.length;
	var televisionTotal = ((televisionFactsList.length/factsList.length)*100).toFixed(1);
	document.getElementById("televisionperc").innerHTML=televisionTotal + "&#37;";
	
	document.getElementById("misctotal").innerHTML=miscFactsList.length;
	var miscTotal = ((miscFactsList.length/factsList.length)*100).toFixed(1);
	document.getElementById("miscperc").innerHTML=miscTotal + "&#37;";
	
	document.getElementById("retiredtotal").innerHTML=retiredFactsList.length;
	
	document.getElementById("mosttotal").innerHTML=mostFactsList.length;

});

