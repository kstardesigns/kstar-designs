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


$(document).ready(function(){
  $(".openclose").click(function(){
    $(".infoboxcontent").toggleClass("noinfo");
    $(".infobox").toggleClass("changewidth");
    $(".openclose").toggleClass("rotater");
  });
});

$(window).on("scroll touchmove", function () {
	$('#mainnav').toggleClass('mainnav-shrink', $(document).scrollTop() > 20);
	$('#socialsec').toggleClass('social-shrink', $(document).scrollTop() > 20);
	$('#logo').toggleClass('logo-shrink', $(document).scrollTop() > 20);
    $('#secn').toggleClass('navbar-shrink', $(document).scrollTop() > 20);
});

$(document).ready(function() {
	  
  $('input').each(function() {
    $(this).on('focus', function() {
      $(this).parent('.field').addClass('active');
    });
    $(this).on('blur', function() {
      if ($(this).val().length === 0) {
      $(this).parent('.field').removeClass('active');
      }
    });

    if ($(this).val() !== '') $(this).parent('.field').addClass('active');

  });
  
  
		  $(function() {
    $( "#datepicker" ).datepicker();
		  });
  
  function phonenumber(inputtxt){
     var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
     if(inputtxt.value.match(phoneno))
        {
      return true;
        }
      else
        {
        alert("Not a valid Phone Number");
        return false;
        }
	   }
   
   
  
});