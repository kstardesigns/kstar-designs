// JavaScript Document

$('.menu-button').click(function(){
    $('nav').toggleClass('open');
    $('nav ul').toggle();
    $('.menu').toggleClass('close-icon');
});

$('nav ul a').click(function(){
	$('nav').removeClass('open');
	$('nav ul').toggle();
	$('.menu').toggleClass('close-icon');
});

var portfolioItems = [
		{
			'proj': 'leslie',
			'itemname': 'Leslie Stark, Realtor',
			'itemdescription': 'A single-page realtor website developed with a tabbed design. <a href="http://lesliestarkaz.com" target="_blank" title="">View site <span>&rarr;</span></a>'
		},
		{
			'proj': 'whogotlucilled',
			'itemname': 'Who Got Lucille\'d?',
			'itemdescription': 'A fansite for <i>The Walking Dead</i> allowing fans to vote regarding the 6th season finale. <a href="http://whogotlucilled.com" target="_blank" title="">View site <span>&rarr;</span></a>'
		},
		{
			'proj': 'cbc',
			'itemname': 'CBC, Inc.',
			'itemdescription': 'A custom website developed for a luxury home builder in Mesa, AZ. <a href="http://cbcarizona.com" target="_blank" title="">View site <span>&rarr;</span></a>'
		},
		{
			'proj': 'thewikifix',
			'itemname': 'The WikiFix',
			'itemdescription': 'A random fact-generating website consisting of information taken from Wikipedia. <a href="http://thewikifix.com" target="_blank" title="">View site <span>&rarr;</span></a>'
		},
		{
			'proj': 'clayton',
			'itemname': 'Clayton Sullivan Portfolio',
			'itemdescription': 'A portfolio website displaying the work of a stuntman/actor. <a href="http://claytonasullivan.com" target="_blank" title="">View site <span>&rarr;</span></a>'
		},
		{
			'proj': 'sandman',
			'itemname': 'Charity Golf Scramble',
			'itemdescription': 'A single-page website giving information for a charity golf event. <a href="http://kstardesigns.com/sandman" target="_blank" title="">View site <span>&rarr;</span></a>'
		}
	];


var portfolioNumber = 0;

$('.right').click(function(){ 
	if (portfolioNumber > (portfolioItems.length - 2)) {
		portfolioNumber = 0;
	} else {
		portfolioNumber++;
	}
	showPortfolio();
});

$('.left').click(function(){
	if (portfolioNumber == 0) {
		portfolioNumber = (portfolioItems.length);
	} 
	
	portfolioNumber--;

	showPortfolio();
});



$(document).ready(function() {

   $('#project').addClass(portfolioItems[portfolioNumber].proj);
   $('.item-name').html(portfolioItems[portfolioNumber].itemname);
   $('.item-description').html(portfolioItems[portfolioNumber].itemdescription);

});

function showPortfolio(){
	$('#project').removeClass().addClass(portfolioItems[portfolioNumber].proj);
	$('.item-name').html(portfolioItems[portfolioNumber].itemname);
	$('.item-description').html(portfolioItems[portfolioNumber].itemdescription);
}

