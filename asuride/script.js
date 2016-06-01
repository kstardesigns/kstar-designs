// JavaScript Document

$(document).ready(function(){
	
	$("#login").click(function(){
        $("#loginForm").css("display", "block");
		 $("#buttons").css("display", "none");
	});
	
	$("#contactbutton").click(function(){
        $("#contactsection").css("display", "block");
		 $("#arrow1").css("display", "block");
		 $("#reviewssection").css("display", "none");
		 $("#arrow2").css("display", "none");
	});
	
	$("#reviewsbutton").click(function(){
        $("#reviewssection").css("display", "block");
		 $("#arrow2").css("display", "block");
		 $("#contactsection").css("display", "none");
		 $("#arrow1").css("display", "none");
	});
	
});

