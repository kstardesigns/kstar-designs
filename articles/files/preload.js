/*
 * jQuery preloadImages plugin
 * Version 0.1.1  (20/12/2007)
 * @requires jQuery v1.2.1+
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @name preloadImages
 * @type jQuery
 * @cat Plugins/Browser Tweaks
 * @author Blair McBride <blair@theunfocused.net>
*/

(function($) {
$.preloadImages = function(arr) {
	$.preloadImages.add(arr);

	queuedStop = false;
	startPreloading();
};

$.preloadImages.add = function(arr) {
	if(typeof(arr) == 'string') {
		$.preloadImages.imageQueue.push(arr);
		return;
	}

	if(arr.length < 1) return;

	for(var i = 0, numimgs = arr.length; i < numimgs; i++) {
		if(typeof(arr[i]) == 'string')
			$.preloadImages.imageQueue.push(arr[i]);
		else if(typeof(arr[i]) == 'object' && arr[i].length > 0)
			$.preloadImages.add(arr[i]);
	}
}

$.preloadImages.prepend = function() {
	if(typeof(arr) == 'string') {
		$.preloadImages.imageQueue.unshift(arr);
		return;
	}

	if(arr.length < 1) return;

	for(var i = numargs - 1; i >= 0; i--) {
		if(typeof(arr[i]) == 'string')
			$.preloadImages.imageQueue.unshift(arr[i]);
		else if(typeof(arr[i]) == 'object' && arr[i].length > 0)
			$.preloadImages.prepend(arr[i]);
	}
}

$.preloadImages.clear = function() {
	$.preloadImages.imageQueue = [];	
}

$.preloadImages.stop = function() {
	queuedStop = true;
}

$.preloadImages.start = function() {
	queuedStop = false;
	startPreloading();
}

$.preloadImages.imageQueue = [];



/* PRIVATE */
var isPreloading = false;
var queuedStop = false;

function startPreloading() {
	if(isPreloading)
		return;

	$(document.createElement('img')).bind('load', function() {
		if(queuedStop) {
			queuedStop = isPreloading = false;
			return;
		}
		isPreloading = true;
		if($.preloadImages.imageQueue.length > 0) {
			this.src = $.preloadImages.imageQueue.shift();
		} else
			isPreloading = false;
	}).trigger('load');
}


})(jQuery);