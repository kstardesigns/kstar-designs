
jQuery(document).ready(function($){  

ddsmoothmenu.init({
mainmenuid: "mainMenu", 
orientation: 'h',
classname: 'ddsmoothmenu', 
contentsource: "markup"
});

$("<select />").appendTo("#mainMenu");

$("<option />", {
   "selected": "selected",
   "value"   : "",
   "text"    : "Go to..."
}).appendTo("#mainMenu select");

$("#mainMenu a").each(function() {
 var el = $(this);
 $("<option />", {
     "value"   : el.attr("href"),
     "text"    : el.text()
 }).appendTo("#mainMenu select");
});

$("#mainMenu select").change(function() {
  window.location = $(this).find("option:selected").val();
});

$(".gallery-icon a").attr("rel", "prettyPhoto[gallery]");
$("a[rel^='prettyPhoto']").prettyPhoto({
	overlay_gallery: false, social_tools: '', 'theme': 'light_square' 
});
 
$("a[rel^='prettyPhoto']").prettyPhoto();

$(".image_lightbox img, .flickr_wrap img, .candy-clearfix a").addClass("tip");			

$('.wide').columnize({width:400});

$("#contact input[type='submit'], #content .pagination a, #submit, .comment-reply-link, #submittedContact").hover(function() {
   $(this).animate({ backgroundColor: "#444" }, 200);
},function() {
   $(this).animate({ backgroundColor: "#f14d4d" }, 200);
});


$("#title_box a img, #title_box_full a img, .wide a img, .masonry_post a img, .column_post a img, .blog_post a img, .images_post a img, .alignleft img, .mediaholder img, .alignright img, .home_filter_posts img, #vertical-ticker a img, .single_thumbnail a img, .post img, .car_image a img, .home_posts_container a img, .jcarousel_container a img, #feat_area_flex #carousel .slides img, .widget_recent_posts_two img, .banners img, #banner-header img, #banner_header_728 img, .image_lightbox img, .widget_thumbnail img, .flickr_wrap img, .similar_posts img").hover(function() {
	$(this).stop().animate({
		opacity: 0.8
	}, 200);
},function() {
	$(this).stop().animate({
		opacity: 1
	}, 200);
});		

$(" .right-heading h3, .widget-title, #similar-post h3, .comment-header h3, .navigation a ").html(function(i, text){
  return text.replace(/\w+\s/, function(match){
    return '<span class="first_word">' + match + '</span>';
}); });

$(".tip").tipTip({
	maxWidth: "auto", 
	edgeOffset: 10,
	defaultPosition: "top"
});	

var sourceSwap = function () {
    var $this = $(this);
    var newSource = $this.data('alt-src');
    $this.data('alt-src', $this.attr('src'));
    $this.attr('src', newSource);
}

$('img.xyz').hover(sourceSwap, sourceSwap);

});	



(function($){ 
$(window).load(function(){ 
   
$(".image_carousel").css({ visibility: "visible" });
$("#main_content").css({ visibility: "visible" });
$("#footer_box").css({ visibility: "visible" });
$(".showbiz-container").css({ visibility: "visible" });

})
})(jQuery);
