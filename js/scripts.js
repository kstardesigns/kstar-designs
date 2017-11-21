// JavaScript Document

$('.menu-button').click(function(){
    $('nav').toggleClass('open');
    $('nav ul').toggle();
    $('nav .navBottom').toggle();
    $('.menu').toggleClass('close-icon');
});

$('nav ul a').click(function(){
	$('nav').removeClass('open');
	$('nav ul').toggle();
	$('nav .navBottom').toggle();
	$('.menu').toggleClass('close-icon');
});

var portfolioItems = [
    {
      'proj': 'millerlite',
      'itemname': 'Miller Lite Ugly Sweater Promotion',
      'itemdescription': 'An ugly sweater instant win promotion.* <a href="https://digitalbeerpromo.com/uglysweater17" target="_blank" title="">View site <span>&rarr;</span></a>',
      'projlink': 'https://digitalbeerpromo.com/uglysweater17'
    },
		{
			'proj': 'cbc',
			'itemname': 'CBC, Inc.',
			'itemdescription': 'A custom website developed for a luxury home builder in Mesa, AZ. <a href="http://cbcarizona.com" target="_blank" title="">View site <span>&rarr;</span></a>',
			'projlink': 'http://cbcarizona.com'
		},
		{
			'proj': 'darwins',
			'itemname': 'Darwin\'s Natural',
			'itemdescription': 'A custom website built for a medicinal marijuana wholesale company. <a href="darwins/index.html" target="_blank" title="">View site <span>&rarr;</span></a>',
			'projlink': 'darwins/index.html'
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
			'itemdescription': 'A site where <i>The Walking Dead</i> fans can vote about the cliffhanger from the 6th season finale. <a href="wgl/index.html" target="_blank" title="">View site <span>&rarr;</span></a>',
			'projlink': 'wgl/index.html'
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
			'itemdescription': 'A single-page website giving information for a charity golf event. <a href="sandman/index.html" target="_blank" title="">View site <span>&rarr;</span></a>',
			'projlink': 'sandman/index.html'
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

var key = '462c6f631e646e613d842ece6bf05a6a';
var colors = ['#e08a04','#e1d605','#ff8800','#f07000','#ff7f3f','#ff6e1a','#f03800','#ff1a1a'];
var random = Math.floor(Math.random()*colors.length);


$(document).ready(function() {

   $('#project').addClass(portfolioItems[portfolioNumber].proj);
   $('.item-name').html(portfolioItems[portfolioNumber].itemname);
   $('.item-description').html(portfolioItems[portfolioNumber].itemdescription);
   $('.screen a.projlink').attr('href', portfolioItems[portfolioNumber].projlink);

   var apiString = 'https://api.darksky.net/forecast/' + key + '/33.4455,-112.0668?exclude=hourly,daily,minutely,alerts&callback=?';

    $.getJSON(apiString, function(getTemp) {
      var currently = Math.round(getTemp.currently.temperature);
      $('.currTemp').html(currently + '&deg;');
      var shadow1 = '0 0 ' + currently*.5 + 'px #ffc109';
      $('.sun').css('box-shadow', shadow1)
    });

});

function showPortfolio(){
	$('#project').removeClass().addClass(portfolioItems[portfolioNumber].proj);
	$('.item-name').html(portfolioItems[portfolioNumber].itemname);
	$('.item-description').html(portfolioItems[portfolioNumber].itemdescription);
    $('.screen a.projlink').attr('href', portfolioItems[portfolioNumber].projlink);
}
