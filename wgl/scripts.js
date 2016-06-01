$('.info').click(function(e){
    $('#info').slideToggle();
    $('html, body').animate({ scrollTop: 0 }, 500);
});

$('.results').click(function(e){
    $('#results').slideToggle();
    $('html, body').animate({ scrollTop: 0 }, 500);
});

$('.characters li label').click(function(e){
	var thisvote = $(this).attr('for');

    $('.submitbox').show();
    $('.votename').html(thisvote);
    $('html, body').animate({ scrollTop: 0 }, 500);
});

$('.characters li#negan').click(function(e){
	$('.neganbox').show();
    $('html, body').animate({ scrollTop: 0 }, 500);
});

$('.close').click(function(e){
    $(this).parent().toggle();
});

$('.closesb').click(function(e){
	$(this).parents('.submitbox').toggle();
});

$('.closenb').click(function(e){
    $(this).parents('.neganbox').toggle();
    $('.submitbox').hide();
});

$(document).ready(function(){

/* --    Build the chart    -- */ 
    var abraham = 0;
    var maggie = 0;
    var sasha = 0;
    var daryl = 0;
    var aaron = 0;
    var glenn = 1;
    var eugene = 1;
    var carl = 0;
    var michonne = 0;
    var rosita = 0;
    var rick = 0;

    var multiplier = 12;
    var abrahambar = abraham * multiplier + "px";
    var maggiebar = maggie * multiplier + "px";
    var sashabar = sasha * multiplier + "px";
    var darylbar = daryl * multiplier + "px";
    var aaronbar = aaron * multiplier + "px";
    var glennbar = glenn * multiplier + "px";
    var eugenebar = eugene * multiplier + "px";
    var carlbar = carl * multiplier + "px";
    var michonnebar = michonne * multiplier + "px";
    var rositabar = rosita * multiplier + "px";
    var rickbar = rick * multiplier + "px";


    $("#abrahambar").css("width", abrahambar);
    $("#maggiebar").css("width", maggiebar);
    $("#sashabar").css("width", sashabar);
    $("#darylbar").css("width", darylbar);
    $("#aaronbar").css("width", aaronbar);
    $("#glennbar").css("width", glennbar);
    $("#eugenebar").css("width", eugenebar);
    $("#carlbar").css("width", carlbar);
    $("#michonnebar").css("width", michonnebar);
    $("#rositabar").css("width", rositabar);
    $("#rickbar").css("width", rickbar);
    

    $("#abrahamtotal").html(abraham);
    $("#maggietotal").html(maggie);
    $("#sashatotal").html(sasha);
    $("#daryltotal").html(daryl);
    $("#aarontotal").html(aaron);
    $("#glenntotal").html(glenn);
    $("#eugenetotal").html(eugene);
    $("#carltotal").html(carl);
    $("#michonnetotal").html(michonne);
    $("#rositatotal").html(rosita);
    $("#ricktotal").html(rick);





    /* get a total variable to add up total votes */
    /* get percentage variables for % of each of total */
});