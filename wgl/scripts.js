$('.info').click(function(e){
    $('#info').slideToggle();
    $('html, body').animate({ scrollTop: 0 }, 500);
});

$('.results').click(function(e){
    $('#results').slideToggle();
    $('html, body').animate({ scrollTop: 0 }, 500);
});

$('.showresults').click(function(e){
    $('#results').slideToggle();
    $('html, body').animate({ scrollTop: 0 }, 500);
});

$('.showthedead').click(function(e){
    $('.characters li#glenn .bg').toggleClass('dead');
    $('.characters li#abraham .bg').toggleClass('dead');
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

$(function(){
  $('#voteform').submit(function(){
    $("input[type='submit']", this)
      .val("Please wait...")
      .attr('disabled', 'disabled');
    $("input[type='button']", this)
      .hide();
    return true;
  });
});

$(document).ready(function(){
    $.getJSON('data.json', function(data){
        /* --    Build the chart    -- */
        var abraham  = data.abraham;
        var maggie   = data.maggie;
        var sasha    = data.sasha;
        var daryl    = data.daryl;
        var aaron    = data.aaron;
        var glenn    = data.glenn;
        var eugene   = data.eugene;
        var carl     = data.carl;
        var michonne = data.michonne;
        var rosita   = data.rosita;
        var rick     = data.rick;

        var lastupdate = data.lastupdate;

        var totalvotes = abraham + maggie + sasha + daryl + aaron + glenn + eugene + carl + michonne + rosita + rick;

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        var totalvotesc = numberWithCommas(totalvotes);


        var multiplier = .35;
        // var bigmultiplier = 1.5;
        // max-width should be 180px

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

        var abrahamperc = ((abraham / totalvotes) * 100).toFixed(1) + "%";
        var maggieperc = ((maggie / totalvotes) * 100).toFixed(1) + "%";
        var sashaperc = ((sasha / totalvotes) * 100).toFixed(1) + "%";
        var darylperc = ((daryl / totalvotes) * 100).toFixed(1) + "%";
        var aaronperc = ((aaron / totalvotes) * 100).toFixed(1) + "%";
        var glennperc = ((glenn / totalvotes) * 100).toFixed(1) + "%";
        var eugeneperc = ((eugene / totalvotes) * 100).toFixed(1) + "%";
        var carlperc = ((carl / totalvotes) * 100).toFixed(1) + "%";
        var michonneperc = ((michonne / totalvotes) * 100).toFixed(1) + "%";
        var rositaperc = ((rosita / totalvotes) * 100).toFixed(1) + "%";
        var rickperc = ((rick / totalvotes) * 100).toFixed(1) + "%";


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
        $("#maggietotal").html(maggie + ' votes');
        $("#sashatotal").html(sasha + ' votes');
        $("#daryltotal").html(daryl + ' votes');
        $("#aarontotal").html(aaron + ' votes');
        $("#glenntotal").html(glenn);
        $("#eugenetotal").html(eugene + ' votes');
        $("#carltotal").html(carl + ' votes');
        $("#michonnetotal").html(michonne + ' votes');
        $("#rositatotal").html(rosita + ' votes');
        $("#ricktotal").html(rick + ' votes');

        $("#abrahamperc").html(abrahamperc);
        $("#maggieperc").html(maggieperc);
        $("#sashaperc").html(sashaperc);
        $("#darylperc").html(darylperc);
        $("#aaronperc").html(aaronperc);
        $("#glennperc").html(glennperc);
        $("#eugeneperc").html(eugeneperc);
        $("#carlperc").html(carlperc);
        $("#michonneperc").html(michonneperc);
        $("#rositaperc").html(rositaperc);
        $("#rickperc").html(rickperc);


        $(".lastupdate").html(lastupdate);

        $(".totalvotes").html(totalvotesc);
    });
});