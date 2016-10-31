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
			'proj': 'cbc',
			'itemname': 'CBC, Inc.',
			'itemdescription': 'A custom website developed for a luxury home builder in Mesa, AZ. <a href="http://cbcarizona.com" target="_blank" title="">View site <span>&rarr;</span></a>',
			'projlink': 'http://cbcarizona.com'
		},
		{
			'proj': 'darwins',
			'itemname': 'Darwin\'s Natural',
			'itemdescription': 'A custom website built for a medicinal marijuana wholesale company. <a href="http://darwinsnatural.com" target="_blank" title="">View site <span>&rarr;</span></a>',
			'projlink': 'http://darwinsnatural.com'
		},
		{
			'proj': 'titledrops',
			'itemname': 'Title Drops',
			'itemdescription': 'A project that tells when a TV show or movie mentions its own title in its script. <a href="http://titledrops.xyz" target="_blank" title="">View site <span>&rarr;</span></a>',
			'projlink': 'http://titledrops.xyz'
		},
		{
			'proj': 'leslie',
			'itemname': 'Leslie Stark, Realtor',
			'itemdescription': 'A single-page realtor website developed with a tabbed design. <a href="http://lesliestarkaz.com" target="_blank" title="">View site <span>&rarr;</span></a>',
			'projlink': 'http://lesliestarkaz.com'
		},
		{
			'proj': 'thewikifix',
			'itemname': 'The WikiFix',
			'itemdescription': 'A random fact-generating website consisting of information taken from Wikipedia. <a href="http://thewikifix.com" target="_blank" title="">View site <span>&rarr;</span></a>',
			'projlink': 'http://thewikifix.com'
		},
		{
			'proj': 'whogotlucilled',
			'itemname': 'Who Got Lucille\'d?',
			'itemdescription': 'A fansite for <i>The Walking Dead</i> where fans can vote about the cliffhanger from the 6th season finale. <a href="http://whogotlucilled.com" target="_blank" title="">View site <span>&rarr;</span></a>',
			'projlink': 'http://whogotlucilled.com'
		},
		{
			'proj': 'clayton',
			'itemname': 'Clayton Sullivan Portfolio',
			'itemdescription': 'A portfolio website displaying the work of a stuntman/actor. <a href="http://claytonasullivan.com" target="_blank" title="">View site <span>&rarr;</span></a>',
			'projlink': 'http://claytonasullivan.com'
		},
		{
			'proj': 'sandman',
			'itemname': 'Charity Golf Scramble',
			'itemdescription': 'A single-page website giving information for a charity golf event. <a href="http://kstardesigns.com/sandman" target="_blank" title="">View site <span>&rarr;</span></a>',
			'projlink': 'http://kstardesigns.com/sandman'
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

/* Scroll transition to anchor */

$('.godown').click(function() {

$('*').animate({
  scrollTop: $("#skills").offset().top },
  '1500' 
);
// Prevent default behavior of link
return false;
});
    

$(document).ready(function() {

   $('#project').addClass(portfolioItems[portfolioNumber].proj);
   $('.item-name').html(portfolioItems[portfolioNumber].itemname);
   $('.item-description').html(portfolioItems[portfolioNumber].itemdescription);
   $('.screen a.projlink').attr('href', portfolioItems[portfolioNumber].projlink);

});

function showPortfolio(){
	$('#project').removeClass().addClass(portfolioItems[portfolioNumber].proj);
	$('.item-name').html(portfolioItems[portfolioNumber].itemname);
	$('.item-description').html(portfolioItems[portfolioNumber].itemdescription);
    $('.screen a.projlink').attr('href', portfolioItems[portfolioNumber].projlink);
}

