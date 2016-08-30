// JavaScript Document

/* smooth scrolling when link is clicked */
$(document).ready(function() {
   $('a[href*=#]').bind('click', function(e) {
	e.preventDefault(); //prevent the "normal" behaviour which would be a "hard" jump
       
	var target = $(this).attr("href"); //Get the target
			
	// perform animated scrolling by getting top-position of target-element and set it as scroll target
	$('html, body').stop().animate({ scrollTop: $(target).offset().top - 50 }, 1500, function() { //adjust - 48 if the header height changes
	     location.hash = target;  //attach the hash (#jumptarget) to the pageurl
	});
			
	return false;
   });


   var livesites = new Array;
   livesites[0] = 'vista-del-corazon.com';
/* livesites[1] = 'zaharaoffices.com'; */
   livesites[1] = 'cbcarizona.com';
   livesites[2] = 'kstardesigns.com';
   livesites[3] = 'thewikifix.com';
   livesites[4] = 'namesfromahatimprov.com';
   livesites[5] = 'sandmancharityevents.com';
   livesites[6] = 'claytonasullivan.com';
   livesites[7] = 'azida.com';
   livesites[8] = 'cleardiamondwater.com';
   livesites[9] = 'lesliestarkaz.com';
   livesites[10] = 'whogotlucilled.com';
/* livesites[11] = 'darwinsnatural.com'; */
/* livesites[12] = 'tonyalatham.com'; */

   $('.livesites').html(livesites.length);

   var stateslived = new Array;
   stateslived[0] = 'Michigan';
   stateslived[1] = 'Arizona';
   stateslived[2] = 'Florida';

   $('.stateslived').html(stateslived.length);

   var countriesvisited = new Array;
   countriesvisited[0] = 'USA';
   countriesvisited[1] = 'Mexico';
   countriesvisited[2] = 'Ireland';
   countriesvisited[3] = 'The Bahamas';
   countriesvisited[4] = 'Canada';
   countriesvisited[5] = 'Haiti';
   countriesvisited[6] = 'Jamaica';
   countriesvisited[7] = 'Belgium';
   countriesvisited[8] = 'France';
   countriesvisited[9] = 'Spain';
   countriesvisited[10] = 'Italy';

   $('.countriesvisited').html(countriesvisited.length);

});


/* checks for window width to fix navigation and logo  */
$(window).resize(function(){ 
	var nav = $( "nav ul" ); 
    var w = $(window).width();  
    if(w > 700 && nav.is(':hidden')) {  
        nav.show(); 
    }  else if (w < 700) {
    	$(".logo img").css("visibility", "hidden");
    	$('nav').css("position", "fixed");
    	$("#totop").css("display", "none");
    }
}); 


/* when mobile menu is clicked, rotates it, opens/closes menu */
$( "#mobilemenu" ).click(function() {
	$( "#mobilemenu" ).toggleClass( "rotatedmenu" )
  $( "nav ul" ).slideToggle( function() {
    // Animation complete.
  });

});


/* when mobile nav links are clicked, rotates menu icon, closes menu */
$( "nav ul li a" ).click(function() {
	$( "#mobilemenu" ).toggleClass( "rotatedmenu" )
	var w = $(window).width();
    if(w < 700) {
	  $( "nav ul" ).slideToggle( "slow", function() {
	    // Animation complete.
	  });
    } else {
        return false;
    }
});


/* when mobile logo is clicked, rotates menu icon, closes menu */
$( ".mobilelogo" ).click(function() {
	$( "#mobilemenu" ).toggleClass( "rotatedmenu" )
	var w = $(window).width();
    if(w < 700) {
	  $( "nav ul" ).slideToggle( "slow", function() {
	    // Animation complete.
	  });
    } else {
        return false;
    }
});


/* when mid-sized logo is clicked, rotates menu icon, closes menu */
$( ".middlelogo" ).click(function() {
	$( "#mobilemenu" ).toggleClass( "rotatedmenu" )
	var w = $(window).width();
    if(w < 700) {
	  $( "nav ul" ).slideToggle( "slow", function() {
	    // Animation complete.
	  });
    } else {
        return false;
    }
});


/* changes menu when scrolling past 100px, as long as window is at least 700px wide  */
$(window).scroll(function() {
	var w = $(window).width();
    if(w > 700) {
		  if ($(this).scrollTop() > 100) {
		    $('nav').css("position", "fixed");
            $('nav ul li').addClass("scrolled");
            $('#intro').css("height", "605px");
            $('#totop').css("display", "block");
		  }
		  else {
		    $('nav').css("position", "relative");
       	    $('nav ul li').removeClass("scrolled");
       	    $('#intro').css("height", "655px");
       	    $('#totop').css("display", "none");
		  }
	} else {
        return false;
    }
}); 

/* changes menu when scrolling past 100px */

var sOffset = $("#social").offset().top;

$(window).scroll(function() {
	var w = $(window).width();
    if(w > 700) {
		  if ($(this).scrollTop() > sOffset) {
		     
		  }
		  else {
		    
		  }
	} else {
        return false;
    }
});


/* typed function. Courtesy of Matt Boldt at http://www.mattboldt.com/demos/typed-js/ */
$(function(){
        $("#typed").typed({
            strings: ["Welcome to kstar designs,<br>specializing in responsive web design."],
            typeSpeed: 40,
            backDelay: 500,
            loop: false,
            contentType: 'html', // or text
            // defaults to false for infinite loop
            loopCount: false,
            callback: function(){ foo(); },
            resetCallback: function() { newTyped(); }
        });
        $(".reset").click(function(){
            $("#typed").typed('reset');
        });
    });
