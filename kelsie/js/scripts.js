// JavaScript Document

$('.tab1').click(function(){
    $('.tab1').addClass('activetab');
    $('.portraits-pics').addClass('active');
    $('.main > div:not(".portraits-pics")').removeClass('active');
    $('.portrait-toggle span:not(.tab1)').removeClass('activetab');
});

$('.tab2').click(function(){
    $('.tab2').addClass('activetab');
    $('.portraits2-pics').addClass('active');
    $('.main > div:not(".portraits2-pics")').removeClass('active');
    $('.portrait-toggle span:not(.tab2)').removeClass('activetab');
});

$('.tab3').click(function(){
    $('.tab3').addClass('activetab');
    $('.portraits3-pricing').addClass('active');
    $('.main > div:not(".portraits3-pricing")').removeClass('active');
    $('.portrait-toggle span:not(.tab3)').removeClass('activetab');
});

$('.tab4').click(function(){
    $('.tab4').addClass('activetab');
    $('.portraits4-psalms').addClass('active');
    $('.main > div:not(".portraits4-psalms")').removeClass('active');
    $('.portrait-toggle span:not(.tab4)').removeClass('activetab');
});

$('.tab5').click(function(){
    $('.tab5').addClass('activetab');
    $('.portraits5-pics').addClass('active');
    $('.main > div:not(".portraits5-pics")').removeClass('active');
    $('.portrait-toggle span:not(.tab5)').removeClass('activetab');
});

$('.inside nav:not(ul)').click(function(){
    $('.inside nav ul').toggle();
    $('.inside .navmenu').toggleClass('open');
});


//$(document).ready(function() {


//});
