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
                    zoom: 9,

                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(33.495413, -112.115573), // Make this same as main location so it shows on mobile

                    // This is where you would paste any style found on Snazzy Maps.
                    styles: [{"featureType":"water","stylers":[{"hue":"#ffe500"},{"saturation":-20},{"lightness":20}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ffe500"},{"lightness":-15},{"saturation":50}]},{"featureType":"landscape","stylers":[{"weight":0.1},{"hue":"#ffe500"},{"saturation":50},{"lightness":10},{"visibility":"on"}]},{"elementType":"labels","stylers":[{"hue":"#ffe500"},{"saturation":50},{"lightness":-10},{"weight":2}]},{"featureType":"poi","stylers":[{"hue":"#ffe500"},{"saturation":75},{"lightness":-10}]},{"featureType":"transit.station.airport","stylers":[{"hue":"#ffe500"},{"saturation":50},{"lightness":-10}]},{}]
                };

                // Get the HTML DOM element that will contain your map
                var mapElement = document.getElementById('map');

                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);

                // Marker icon
                var image = 'assets/mapicon.png';

                    // Location list
                    var markers = [
                    {
                        'locationNo': '1',
                        'infoName': 'The Green House Dispensary',
                        'address1': '8160 W Union Hills Dr.',
                        'address2': 'Glendale, AZ 85308',
                        'directionsLink': 'https://www.google.com/maps/dir/Current+Location/8160+W+Union+Hills+Dr,+Glendale,+AZ+85308',
                        'latitude': '33.653635',
                        'longitude': '-112.234997'
                    },
                    {
                        'locationNo': '2',
                        'infoName': 'Harvest of Tempe',
                        'address1': '710 W Elliot Road #102',
                        'address2': 'Tempe, AZ 85284',
                        'directionsLink': 'https://www.google.com/maps/dir/Current+Location/710+W+Elliot+Rd+%23102,+Tempe,+AZ+85284',
                        'latitude': '33.349665',
                        'longitude': '-111.947519'
                    },
                    {
                        'locationNo': '3',
                        'infoName': 'Phoenix Relief Center',
                        'address1': '6330 S 35th Avenue #104',
                        'address2': 'Phoenix, AZ 85041',
                        'directionsLink': 'https://www.google.com/maps/dir/Current+Location/6330+S+35th+Ave+%23104,+Phoenix,+AZ+85041',
                        'latitude': '33.388368',
                        'longitude': '-112.133639'
                    },
                    {
                        'locationNo': '4',
                        'infoName': 'Health for Life, Inc. - East Mesa',
                        'address1': '7343 S 89th Place',
                        'address2': 'Mesa, AZ 85212',
                        'directionsLink': 'https://www.google.com/maps/dir/Current+Location/7343+S+89th+Pl,+Mesa,+AZ+85212',
                        'latitude': '33.281430',
                        'longitude': '-111.639535'
                       
                    },
                    {
                        'locationNo': '5',
                        'infoName': 'The Holistic Center',
                        'address1': '21035 N Cave Creek Rd',
                        'address2': 'Phoenix, AZ 85024',
                        'directionsLink': 'https://www.google.com/maps/dir/Current+Location/21035+N+Cave+Creek+Rd,+Phoenix,+AZ+85024',
                        'latitude': '33.677664',
                        'longitude': '-112.029195'
                       
                    },
                    {
                        'locationNo': '6',
                        'infoName': 'Urban Greenhouse',
                        'address1': '2630 W Indian School Rd',
                        'address2': 'Phoenix, AZ 85017',
                        'directionsLink': 'https://www.google.com/maps/dir/Current+Location/2630+W+Indian+School+Rd,+Phoenix,+AZ+85017',
                        'latitude': '33.495413',
                        'longitude': '-112.115573'
                       
                    }
                    ];

                    //Create and open InfoWindow.
                    var infoWindow = new google.maps.InfoWindow();
             
                    for (var i = 0; i < markers.length; i++) {
                        var data = markers[i];
                        var myLatlng = new google.maps.LatLng(data.latitude, data.longitude);
                        var marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map,
                            icon: image,
                            title: data.infoName
                        });

                        var info = '<div class="location"><strong><span class="markernum">' + data.locationNo + '</span> ' + data.infoName + '</strong><p>' + data.address1 + '<br/>' + data.address2 + '</p><a href="' + data.directionsLink + '" target="_blank">Get directions</a></div>';
                        $('.flexlocations').append(info);

                        //Attach click event to the marker.
                        (function (marker, data) {
                            google.maps.event.addListener(marker, "click", function (e) {
                                //Populate InfoWindow
                                infoWindow.setContent('<strong><span class="markernum">' + data.locationNo + '</span> ' + data.infoName + '</strong><p>' + data.address1 + '<br/>' + data.address2 + '</p><a href="' + data.directionsLink + '" target="_blank">Get directions</a>');
                                infoWindow.open(map, marker);
                            });
                        })(marker, data);
                    }
                    


                























            }


