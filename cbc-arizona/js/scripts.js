$(document).ready(function() {
    var menu        = $('nav img.menu');
        dropdown    = $('nav .main-nav');

    menu.on('click', function(e) {
        e.preventDefault();
        dropdown.slideToggle();
    });

});



/* checks for window width to fix navigation */
$(window).resize(function(){
	var nav = $("nav .main-nav");
	var navimg = $("nav img.menu");
    var w = $(window).width();
    if(/*(w + 17)*/ w > 800) {
         nav.addClass('flex');
    } else {
    	nav.removeClass('flex');
    }
});


/* changes banner every 5 seconds */

var banner = document.getElementById("banner");
var bannerArray = ["assets/banner-image.jpg","assets/banner-image8.jpg","assets/banner-image9.jpg","assets/banner-image10.jpg","assets/banner-image4.jpg","assets/banner-image5.jpg","assets/banner-image6.jpg","assets/banner-image7.jpg"];
var bannerIndex = 0;

function changeBanner() {
    banner.setAttribute("src",bannerArray[bannerIndex]);
    bannerIndex++;

    if (bannerIndex >= bannerArray.length) {
        bannerIndex = 0;
    }
}

setInterval(changeBanner,5000);


/* changes testimonial every 15 seconds */

var testimonials = document.getElementById("testimonials");

var testimonialsArray = ['"We worked with CBC to build our custom home. It was a great experience. From the initial phone call to our home being move-in ready, all went smoothly and to plan. CBC is the epitome of top quality, integrity and excellent customer service." <cite>- Angela D.</cite>',
'"Building my house with CBC and Vince Stark was a pleasure. He was honest and timely with the work on the home and took the worry out of home building. Thanks CBC!" <cite>- Doug A.</cite>',
'"Vince ensured our build schedule was met and kept us updated on each stage of the build. Vince was open to our upgrade requests and they were included when possible. Vince is a very courteous and easy contractor to work with. We are very satisfied with the results and would recommend CBC as a contractor." <cite>- David W.</cite>',
'"CBC won our restoration and remodeling job after a thorough evaluation of our roofing, stucco staircase, fence grates and pool house needs. Vince was responsive and managed his team very closely to meet our goals on time and budget. We\'re very satisfied and will certainly include CBC in RFPs for future work." <cite>- Ed B.</cite>']

var testimonialsIndex = 1;



if (testimonials) {
    function changeTestimonials() {
        testimonials.innerHTML = testimonialsArray[testimonialsIndex];
        testimonialsIndex++;
        if (testimonialsIndex >= testimonialsArray.length) {
            testimonialsIndex = 0;
        }
    }

    setInterval(changeTestimonials,15000);
}



$( "#nextTestimonial" ).click(function() {
  changeTestimonials();
});
