$(document).ready(function(){

    /* smooth scrolling when link is clicked */
    $(document).ready(function() {
       $('a[href*=#]').bind('click', function(e) {
        e.preventDefault(); //prevent the "normal" behaviour which would be a "hard" jump
           
        var target = $(this).attr("href"); //Get the target
                
        // perform animated scrolling by getting top-position of target-element and set it as scroll target
        $('html, body').stop().animate({ scrollTop: $(target).offset().top }, 1500, function() { //adjust - 48 if the header height changes
             location.hash = target;  //attach the hash (#jumptarget) to the pageurl
        });
                
        return false;
       });
    });

});


 // When the window has finished loading create our google map below
            google.maps.event.addDomListener(window, 'load', init);
        
            function init() {
                // Basic options for a simple Google Map
                // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                // For more options see: https://developers.google.com/maps/documentation/javascript/markers
                var mapOptions = {
                    // Zoom level: the higher the #, the more zoomed in
                    zoom: 11,

                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(33.413926, -111.926698), // Make this same as main location so it shows on mobile

                    // This is where you would paste any style found on Snazzy Maps.
                    styles: [{"featureType":"water","stylers":[{"hue":"#ffe500"},{"saturation":-20},{"lightness":20}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ffe500"},{"lightness":-15},{"saturation":50}]},{"featureType":"landscape","stylers":[{"weight":0.1},{"hue":"#ffe500"},{"saturation":50},{"lightness":10},{"visibility":"on"}]},{"elementType":"labels","stylers":[{"hue":"#ffe500"},{"saturation":50},{"lightness":-10},{"weight":2}]},{"featureType":"poi","stylers":[{"hue":"#ffe500"},{"saturation":75},{"lightness":-10}]},{"featureType":"transit.station.airport","stylers":[{"hue":"#ffe500"},{"saturation":50},{"lightness":-10}]},{}]
                };

                // Get the HTML DOM element that will contain your map
                var mapElement = document.getElementById('map');

                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);

                // Markers
                var image = 'assets/mapicon.png';
                var marker1 = new google.maps.Marker({ position: new google.maps.LatLng(33.349562, -111.967259), map: map, title: 'Shop #1', icon: image });
                var marker2 = new google.maps.Marker({ position: new google.maps.LatLng(33.377816, -111.636653), map: map, title: 'Shop #2', icon: image});
                var marker3 = new google.maps.Marker({ position: new google.maps.LatLng(33.413926, -111.926698), map: map, title: 'Shop #3', icon: image});


                // Info windows
                /* -----  #1 ------- */
                var info1 = '<strong><span class="markernum">1</span> Shop #1</strong><p>1810 W Elliot Rd,<br/>Tempe, AZ 85284<br/>Hours: 8:00am-5:00pm</p><a href="https://www.google.com/maps/dir/Current+Location/1810+W+Elliot+Rd+Tempe+AZ+85284" target="_blank">Get directions</a>';

                var infowindow1 = new google.maps.InfoWindow({ content: info1 });
    
                marker1.addListener('click', function() {
                    infowindow1.open(map, marker1);
                    infowindow2.close();
                    infowindow3.close();
                }); 

                /* -----  #2 ------- */
                var info2 = '<strong><span class="markernum">2</span> Shop #2</strong><p>2056 S Ellsworth Rd,<br/>Mesa, AZ 85209<br/>Hours: 8:00am-5:00pm</p><a href="https://www.google.com/maps/dir/Current+Location/2056+S+Ellsworth+Rd+Mesa+AZ+85209" target="_blank">Get directions</a>';

                var infowindow2 = new google.maps.InfoWindow({ content: info2 });
                
                marker2.addListener('click', function() {
                    infowindow2.open(map, marker2);
                    infowindow1.close();
                    infowindow3.close();
                  });

                /* -----  #3 ------- */
                var info3 = '<strong><span class="markernum">3</span> Shop #3</strong><p>1314 S Rural Rd,<br/>Tempe AZ 85281<br/>Hours: 8:00am-5:00pm</p><a href="https://www.google.com/maps/dir/Current+Location/1314+S+Rural+Rd+Tempe+AZ+85281" target="_blank">Get directions</a>';

                var infowindow3 = new google.maps.InfoWindow({ content: info3 });
                
                marker3.addListener('click', function() {
                    infowindow3.open(map, marker3);
                    infowindow1.close();
                    infowindow2.close();
                  });
            }