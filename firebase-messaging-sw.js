importScripts("https://www.gstatic.com/firebasejs/3.6.6/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.6.6/firebase-messaging.js");

// Initialize Firebase
var config = {
             apiKey: "AIzaSyAXp3f9Jeu3KQMFZMmFKxwkayNyr_fXPjU",
             authDomain: "https://web1045.herokuapp.com",
             messagingSenderId: "81998201872"
         };
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log("setBackgroundMessageHandler",payload);
	const notificationTitle =  payload.data.title;
	const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});