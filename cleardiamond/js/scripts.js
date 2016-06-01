
$(document).ready(function(){

     /* smooth scrolling when link is clicked */
    $(document).ready(function() {
       $('a[href*=#]').bind('click', function(e) {
        e.preventDefault(); //prevent the "normal" behaviour which would be a "hard" jump
           
        var target = $(this).attr("href"); //Get the target
                
        // perform animated scrolling by getting top-position of target-element and set it as scroll target
        $('html, body').stop().animate({ scrollTop: $(target).offset().top }, 1500, function() { //adjust - 48 if the header height changes
             location.hash = target;  //attach the hash (#jumptarget) to the pageurl
        });
                
        return false;
       });
    });

    $(document).ready(function() {  
        var menu        = $('nav .menu'); 
            dropdown    = $('nav ul'); 
      
        menu.on('click', function(e) {
            e.preventDefault();  
            dropdown.slideToggle();
            menu.toggleClass('menuclose');  
        });
          
    }); 

        $(document).ready(function() {  
        var muter        = $('#mute'); 
      
        muter.on('click', function(e) {
            e.preventDefault();  
            muter.toggleClass('muted');  
        });
          
    });



     /* checks for window width to fix navigation */
    $(window).resize(function(){ 
    	var nav = $("nav ul"); 
    	var navimg = $("nav .menu");
        var w = $(window).width(); 
        if((w + 17) > 1000) {  
             nav.show(); 
             navimg.hide();
        } else {
        	 navimg.show();
        }   
    }); 

   $('.productbox video').click(function() {
        $(this).get(0).paused ? $(this).get(0).play() : $(this).get(0).pause();
    });

});   

//waterfall sound muter
var audio = document.getElementById('theSound');
document.getElementById('mute').addEventListener('click', function (e)
{
    e = e || window.event;
    audio.muted = !audio.muted;
    e.preventDefault();
}, false);

// Background video script

$( document ).ready(function() {

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}