$(document).ready(function(){



});

$('li.nested').click(function(){
	$(this).children('ul').slideToggle();
	$(this).children('strong').toggle();
});