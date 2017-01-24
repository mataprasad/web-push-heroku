// Initialize Firebase
var config = {
    apiKey: "AIzaSyAXp3f9Jeu3KQMFZMmFKxwkayNyr_fXPjU",
    authDomain: "http://localhost:53505",
    messagingSenderId: "81998201872"
};
firebase.initializeApp(__GLOBAL_FCM_CONFIG);
const messaging = firebase.messaging();
messaging.requestPermission()
.then(function () {
    return messaging.getToken();
})
.then(function (token) {
    setTokenSentToServer(token);
    //console.log(token);
})
.catch(function (err) {
    console.log(err);
});
messaging.onMessage(function (payload) {
    console.log("onMessage", payload);
});
messaging.onTokenRefresh(function () {
    messaging.getToken()
    .then(function (refreshedToken) {
        setTokenSentToServer(refreshedToken);
    })
    .catch(function (err) {
        //console.log('Unable to retrieve refreshed token ', err);
    });
});


/*------------private methods-------------*/

function setTokenSentToServer(token) {
    $.ajax({
        url: __GLOBAL_AJAX_BASE_URL + "/settoken",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ 'token': token }),
        success: function (resp) { },
        error: function (err) { console.log("setTokenSentToServer:", err); }
    });
}