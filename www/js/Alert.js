/**
 * Renders an alert using cordova-plugin-dialogs
 *
 * https://www.npmjs.com/package/fitatu-cordova-plugin-dialogs
 */
class Alert {
    constructor(message) {
        navigator.notification.alert(
            message,
            null,
            "Alert",
            'Ok'
        )
    }
}