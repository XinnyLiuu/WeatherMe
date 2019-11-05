/**
 * Prepares and loads google maps using cordova-plugin-geolocation
 * 
 * https://www.npmjs.com/package/cordova-plugin-geolocation
 */
class GoogleMap {
    constructor() {
        // Use geolocation plugin for Cordova to access the device's geolocation
        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError, { enableHighAccuracy: true });
    }

    // Success callback after position has been found
    onSuccess(position) {
        // Check if position.coords exists
        if (position.coords) {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;

            /**
             * Google map config
             * 
             * https://developers.google.com/maps/documentation/javascript/basics
             */

            // Get lat long from google maps
            const latLng = new google.maps.LatLng(lat, long);

            // Map options
            const mapOptions = {
                zoom: 13,
                center: latLng
            };

            // Create the map
            const map = new google.maps.Map(document.getElementById('map'), mapOptions);

            // Create the marker
            const marker = new google.maps.Marker({
                position: latLng,
                map: map
            });

            // Show the marker on the map
            marker.setMap(map);

            /**
             * Google Geocoding APi
             * 
             * https://developers.google.com/maps/documentation/geocoding/start
             */
            const API_KEY = "AIzaSyDr92cSqmmHncSueLdBAMVecPFuhdDUaAQ";
            const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`;

            // Make GET request to url 
            fetch(URL).then(resp => {
                if (resp.status === 200) {
                    resp.json().then(json => {

                        // Get the address
                        let address = json.results[0].formatted_address;

                        // Append to DOM
                        document.querySelector('#address').innerHTML = address;

                        // Append lat & long to DOM
                        document.querySelector('#lat').innerHTML = lat;
                        document.querySelector('#long').innerHTML = long;

                    }).catch(err => {
                        new Alert(err);
                        console.log(err);
                    })
                }
            }).catch(err => {
                new Alert(err);
                console.log(err);
            })
        }
    }

    // Error callback 
    onError(error) {
        new Alert(`${error.message}`);
    }
}
