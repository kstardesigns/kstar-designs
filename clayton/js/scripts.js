// JavaScript Document

/* smooth scrolling when link is clicked */
$(document).ready(function() {
   $('a[href*=#]').bind('click', function(e) {
	e.preventDefault(); //prevent the "normal" behaviour which would be a "hard" jump
       
	var target = $(this).attr("href"); //Get the target
			
	// perform animated scrolling by getting top-position of target-element and set it as scroll target
	$('html, body').stop().animate({ scrollTop: $(target).offset().top }, 1500, function() { 
	     location.hash = target;  //attach the hash (#jumptarget) to the pageurl
	});
			
	return false;
   });
});

$(document).ready(function() {  
    var pull        = $('#pull'); 
        menu        = $('.menu');  
        menuHeight  = menu.height();  
  
    $(pull).on('click', function(e) {
        e.preventDefault();  
        menu.slideToggle();  
    });
      
}); 

$(document).ready(function() {  
    var pull        = $('#pullmobile'); 
        menu        = $('.menu');  
        menuHeight  = menu.height();  
  
    $(pull).on('click', function(e) {
        e.preventDefault();  
        menu.slideToggle();  
    });
      
}); 