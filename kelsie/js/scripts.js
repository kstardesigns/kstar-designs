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

$('.inside nav:not(ul)').click(function(){
    $('.inside nav ul').toggle();
    $('.inside .navmenu').toggleClass('open');
});


//$(document).ready(function() {
   

//});


