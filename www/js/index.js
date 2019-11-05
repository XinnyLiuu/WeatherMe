/**
 * Cordova App
 */
class App {
    constructor() {
        // Add event listener for `deviceready`
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        // Refresh the app on button click
        const refresh = document.querySelector("#refreshBtn");
        refresh.addEventListener('click', () => {
            this.onDeviceReady();

            // Clear searchZip input
            document.querySelector("#searchZip").value = "";
        })

        // Search for zip weather 
        const search = document.querySelector("#searchZipBtn");
        search.addEventListener('click', () => {
            const zip = document.querySelector("#searchZip").value;
            new WeatherMapSearch(zip);
        })
    }

    onDeviceReady() {
        new GoogleMap(); // Renders google maps
        new Weather(); // Pulls weather information
    }
}

// Start the app
new App();