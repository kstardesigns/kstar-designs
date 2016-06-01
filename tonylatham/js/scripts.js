/* -- Open/close mobile menu -- */
$(document).ready(function() {  
    var pull        = $('#pull'); 
        menu        = $('.mobile');  
        menuHeight  = menu.height();  
  
    $(pull).on('click', function(e) {
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

/* -- Photo gallery -- */
$('a img').click(function () { // image on click, make it bigger
    var w = $(window).width();
    if(w > 830) {
        var $buttons = $('.buttons');
      	var $currentimage = $(this);
        var $allimages = $currentimage.closest('ul');
      	$currentimage.addClass('activeimg');
        $('#viewImage').html($buttons.clone().height(24).width(24)).add($('#faded')).fadeIn();
    	  $('#viewImage').html($allimages.clone().height(410).width(410)).add($('#faded')).fadeIn();
        $('#viewImage img:not(.buttons)').height(400).width(400);
        $('#viewImage ul').css('overflow-y', 'hidden');
        $('#viewImage a.close').css('display', 'block');
        $('#closegallery').css('display','block');
        $('#viewImage .buttons').css('display', 'block');
        $('#viewImage .activeimg').closest('li').insertBefore($('#viewImage li:first'));
      } else {
        return false;
      }
});

$('#viewImage').click(function () { //go to next image on click
  $('#viewImage li:first').insertAfter($('#viewImage li:last'));
  return false;
});

$('#forward').click(function () { //go to next image when clicking forward button
  $('#viewImage li:first').insertAfter($('#viewImage li:last'));
  return false;
});

$('#back').click(function () { //go back to last image when clicking back button
  $('#viewImage li:last').insertBefore($('#viewImage li:first'));
  return false;
});

$('#faded').click(function () { //close photo gallery when clicking faded area
    $('#viewImage').add($('#faded')).fadeOut(function () {
       $('#closegallery').css('display','none');
       $('#viewImage img').removeClass('activeimg');
       $('.gallery img').removeClass('activeimg');
       $('#viewImage').empty();
    });
});

$('#close').click(function () { //close photo gallery when clicking close button
    $('#viewImage').add($('#faded')).fadeOut(function () {
        $('#closegallery').css('display','none');
        $('#viewImage img').removeClass('activeimg');
        $('.gallery img').removeClass('activeimg');
        $('#viewImage').empty();   
    });
});

$(document).keydown(function(e) { //set up left and right keys to go through photo gallery
    switch(e.which) {
        case 37: // left
        $('#viewImage li:last').insertBefore($('#viewImage li:first'));
        break;

        case 38: // up
        break;

        case 39: // right
        $('#viewImage li:first').insertAfter($('#viewImage li:last'));
        break;

        case 40: // down
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
