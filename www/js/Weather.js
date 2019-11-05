/**
 * Prepares and gets the weather based on the device's geolocation using cordova-plugin-geolocation
 * 
 * https://www.npmjs.com/package/cordova-plugin-geolocation
 */
class Weather {
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
             * Open Weather API 
             *
             * https://openweathermap.org/appid
             */
            // Prepare config
            const API_KEY = "aa0b8d96974a32cedebb9f010e38f747";
            const URL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${long}&APPID=${API_KEY}`;

            // Make GET request to url
            fetch(URL).then(resp => {
                if (resp.status === 200) {
                    resp.json().then(json => {

                        // Get the current weather
                        const temp = json.main.temp;

                        // Append to DOM
                        document.querySelector("#weather").innerHTML = temp;

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
        console.log(err);
    }
}