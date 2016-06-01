$(document).ready(function(){
	//smooth scroll
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		if (target.length) {
			$('html,body').animate({
			scrollTop: target.offset().top
		}, 1000);
		return false;
		}
		}
	});
});

$(document).ready(function() {  
    var pull        = $('#pull'); 
    var pullLinks   = $('.pull');  
        menu        = $('.mobilenav');  
        menuHeight  = menu.height();  
  
    $(pull).on('click', function(e) {
        e.preventDefault();  
        menu.slideToggle();  
    });  
    $(pullLinks).on('click', function(e) {
        e.preventDefault();  
        menu.slideToggle();  
    }); 
 
}); 

$(window).resize(function(){  
    var w = $(window).width();  
    if(w > 850 && menu.is(':visible')) {  
        menu.removeAttr('style'); 
    }  

}); 

//width: 10px;
// height: 7px;

$(document).ready(function(){
  $(".openclose").click(function(){
    $(".infoboxcontent").toggleClass("noinfo");
    $(".infobox").toggleClass("changewidth");
    $(".openclose").toggleClass("rotater");
  });
});