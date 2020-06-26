// JavaScript Document
// copyright kstar designs

//window.onload = changeCircle();

  





var myImage = document.getElementById("sspic");

var imageArray = ["assets/ss1.jpg","assets/ss2.jpg","assets/ss3.jpg","assets/ss4.jpg","assets/ss5.jpg"];

var imageIndex = 0;

function changeImage() {
	myImage.setAttribute("src",imageArray[imageIndex]);
	imageIndex++;
	//changeCircle();
	
	if (imageIndex >= imageArray.length) {
		imageIndex = 0;
		
	}
}

setInterval(changeImage,3000);

var myQuote = document.getElementById("testimony");

var quoteArray = ['"We worked with CBC to build our custom home. It was a great experience. From the initial phone call to our home being move-in ready, all went smoothly and to plan. CBC is the epitome of top quality, integrity and excellent customer service." <br>- Angela D.', '<br/>"Building my house with CBC and Vince Stark was a pleasure. He was honest and timely with the work on the home and took the worry out of home building. Thanks CBC!" <br>- Doug A.', '"Vince ensured our build schedule was met and kept us updated on each stage of the build. Vince was open to our upgrade requests and they were included when possible. Vince is a very courteous and easy contractor to work with. We are very satisfied with the results and would recommend CBC as a contractor." - David W.', '"CBC won our restoration and remodeling job after a thorough evaluation of our roofing, stucco staircase, fence grates and pool house needs. Vince was responsive and managed his team very closely to meet our goals on time and budget. We\'re very satisfied and will certainly include CBC in RFPs for future work." - Ed B.']

var quoteIndex = 1;

function changeQuote() {
	myQuote.innerHTML = quoteArray[quoteIndex];
	quoteIndex++;
	if (quoteIndex >= quoteArray.length) {
		quoteIndex = 0;
	}
}

setInterval(changeQuote,15000);

function changetToPic1() {
	myImage.setAttribute("src",imageArray[0]);
	circle1.setAttribute("src",circleArray[1]);
	
	circle2.setAttribute("src",circleArray[0]);
	circle3.setAttribute("src",circleArray[0]);
	circle4.setAttribute("src",circleArray[0]);
}

function changetToPic2() {
	myImage.setAttribute("src",imageArray[1]);
	circle2.setAttribute("src",circleArray[1]);
	
	circle1.setAttribute("src",circleArray[0]);
	circle3.setAttribute("src",circleArray[0]);
	circle4.setAttribute("src",circleArray[0]);
}

function changetToPic3() {
	myImage.setAttribute("src",imageArray[2]);
	circle3.setAttribute("src",circleArray[1]);
	
	circle1.setAttribute("src",circleArray[0]);
	circle2.setAttribute("src",circleArray[0]);
	circle4.setAttribute("src",circleArray[0]);
}

function changetToPic4() {
	myImage.setAttribute("src",imageArray[3]);
	circle4.setAttribute("src",circleArray[1]);
	
	circle1.setAttribute("src",circleArray[0]);
	circle2.setAttribute("src",circleArray[0]);
	circle3.setAttribute("src",circleArray[0]);
}

function backQuote() {
	myQuote.innerHTML = quoteArray[quoteIndex];
	quoteIndex--;
	if (quoteIndex <= 0) {
		quoteIndex = 3;
	}
	
}

function forwardQuote() {
	myQuote.innerHTML = quoteArray[quoteIndex];
	quoteIndex++;
	if (quoteIndex >= quoteArray.length) {
		quoteIndex = 0;
	}
	
}

jQuery(document).ready(function ($) {

  //auto-play function
  setInterval(function () {
    moveRight();
  }, 10000);
  //end auto-play function
  
	var slideCount = $('#slider ul li').length;
	var slideWidth = $('#slider ul li').width();
	var slideHeight = $('#slider ul li').height();
	var sliderUlWidth = slideCount * slideWidth;
	
	$('#slider').css({ width: slideWidth, height: slideHeight });
	
	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
	
    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('a.control_prev').click(function () {
        moveLeft();
        return false;
    });

    $('a.control_next').click(function () {
        moveRight();
        return false;
    });

});  
