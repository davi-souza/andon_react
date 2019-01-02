importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js')

var config = {
  messagingSenderId: "172699281364",
};

if(!firebase.apps[0]) {
  firebase.initializeApp(config);
} 

// firebase.initializeApp(config);

const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler(payload => {
//   console.log('[Firebase] Received background message ', payload);
//   const title = payload.notification.title;
//   const options = {
//      body: payload.notification.body,
//      icon: payload.notification.icon
//   }
//   return self.registration.showNotification(title, options);
// });
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  var notificationTitle = payload.notification.title;
  var notificationOptions = {
    body: payload.notification.body,
  };
  return self.registration.showNotification(notificationTitle,  notificationOptions);
});