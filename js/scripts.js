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
      'proj': 'sprint',
      'itemname': 'Sprint Back to School Sweepstakes',
      'itemdescription': 'A sweepstakes site including instant win games and a yearbook photo upload contest.* <a href="https://schoolspirit.sprint.com/" target="_blank" title="">View site <span>&rarr;</span></a>',
      'projlink': 'https://schoolspirit.sprint.com/'
    },
    {
      'proj': 'millerlite',
      'itemname': 'Miller Lite Ugly Sweater Game',
      'itemdescription': 'An ugly sweater instant win promotion.* <a href="https://www.millerlite.com/" target="_blank" title="">View site <span>&rarr;</span></a>',
      'projlink': 'https://www.millerlite.com/'
    },
    {
      'proj': 'cheetos',
      'itemname': 'Cheetos Everybunny Wins Game',
      'itemdescription': 'A wheel spinning game with Cheetos prizes.* <a href="https://www.dgrewards.com/pepsico/" target="_blank" title="">View site <span>&rarr;</span></a>',
      'projlink': 'https://www.dgrewards.com/pepsico/'
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

var featuredItems = [
    {
      'proj': 'digitalmonopoly',
      'itemname': 'Digital Monopoly Properties',
      'itemdescription': 'As part of the <a href="https://codepen.io/challenges/2018/may#cpc-details" target="_blank">Weekly CodePen Challenge</a>, my goal was to use the relatively new <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> tags in a creative way. Featured in CodePen\'s weekly roundup. From the article:<br/><em>Kyle\'s "Digital Monopoly properties" draws inspiration from the Monopoly game\'s property cards.</em>',
      'projlink': 'https://codepen.io/kaisle/full/vjapBE/',
      'articlelink': 'https://blog.codepen.io/2018/05/20/codepenchallenge-details-and-summary-roundup/',
      'articlelinktitle': 'CodePenChallenge: Details and Summary Roundup',
      'secondarylink':'https://codepen.io/kaisle/pen/vjapBE',
      'secondarylinktitle':'View this project on CodePen'
    },
    {
      'proj': 'grimmauldplace',
      'itemname': '12 Grimmauld Place',
      'itemdescription': 'A mini Harry Potter quiz, featuring CSS art and animations. Featured in CodePen\'s weekly <a href="https://codepen.io/spark/" target="_blank" title="">Spark</a> email. From the email:<br/><em>Answer some Harry Potter trivia and reveal Sirius Black\s secret home in Kyle Stark\'s magical Pen. And don\'t worry, there\'s a handy answer key for Muggles!</em>',
      'projlink': 'https://codepen.io/kaisle/full/dJWMEK/',
      'articlelink': 'https://codepen.io/spark/58',
      'articlelinktitle': 'JANUARY 8TH: The Practical, The Magical, and the Most Hearted',
      'secondarylink':'https://codepen.io/kaisle/pen/dJWMEK',
      'secondarylinktitle':'View this project on CodePen'
    }
	];


var featuredNumber = 0;

$('.featured-right').click(function(){
	if (featuredNumber >= (featuredItems.length-1)) {
		featuredNumber = 0;
	} else {
		featuredNumber++;
	}
	showFeatured();
});

$('.featured-left').click(function(){
	if (featuredNumber == 0) {
		featuredNumber = (featuredItems.length);
	}

	featuredNumber--;
	showFeatured();
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

   showPortfolio();
   showFeatured();

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

function showFeatured(){
	$('#featured-project').removeClass().addClass(featuredItems[featuredNumber].proj);
	$('.featured-item-name').html(featuredItems[featuredNumber].itemname);
	$('.featured-item-description').html(featuredItems[featuredNumber].itemdescription);
  $('#featured-project a.imglink, #featured-project a.projlink2').attr('href', featuredItems[featuredNumber].projlink);
  $('#featured-project .featured-image').attr({ 'src': 'assets/featured/' + featuredItems[featuredNumber].proj + '.jpg', 'alt': featuredItems[featuredNumber].itemname});
  $('#featured-project .article-link').attr({ 'href': featuredItems[featuredNumber].articlelink, 'title': featuredItems[featuredNumber].articlelinktitle});
  $('#featured-project .secondary-link').attr({ 'href': featuredItems[featuredNumber].secondarylink, 'title': featuredItems[featuredNumber].secondarylinktitle});
}
