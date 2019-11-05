/**
 * With a zipcode - update map and dashboard
 */
class WeatherMapSearch {
    constructor(zip) {
        let lat;
        let long;

        const GOOGLE_API_KEY = "AIzaSyDr92cSqmmHncSueLdBAMVecPFuhdDUaAQ";
        const WEATHER_API_KEY = "aa0b8d96974a32cedebb9f010e38f747";
        const GOOGLE_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${GOOGLE_API_KEY}`;

        // Get address information
        fetch(GOOGLE_URL).then(resp => {
            if (resp.status === 200) {
                resp.json().then(json => {

                    // Get the address
                    let address = json.results[0].formatted_address;

                    // Get lat and long
                    lat = json.results[0].geometry.location.lat;
                    long = json.results[0].geometry.location.lng;

                    // Append to DOM
                    document.querySelector('#address').innerHTML = address;

                    // Append lat & long to DOM
                    document.querySelector('#lat').innerHTML = lat;
                    document.querySelector('#long').innerHTML = long;

                    // Get weather information
                    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${long}&APPID=${WEATHER_API_KEY}`;

                    // Make GET request to url
                    fetch(WEATHER_URL).then(resp => {
                        if (resp.status === 200) {
                            resp.json().then(json => {

                                // Get the current weather
                                const temp = json.main.temp;

                                // Append to DOM
                                document.querySelector("#weather").innerHTML = temp;

                                // Update google maps
                                const latLng = new google.maps.LatLng(lat, long);
                                const mapOptions = {
                                    zoom: 13,
                                    center: latLng
                                };
                                const map = new google.maps.Map(document.getElementById('map'), mapOptions);
                                const marker = new google.maps.Marker({
                                    position: latLng,
                                    map: map
                                });
                                marker.setMap(map);

                            }).catch(err => {
                                new Alert(err);
                                console.log(err);
                            })
                        }
                    }).catch(err => {
                        new Alert(err);
                        console.log(err);
                    })

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