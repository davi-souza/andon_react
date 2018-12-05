importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js')

var config = {
  messagingSenderId: "172699281364",
}
firebase.initializeApp(config)

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(payload => {
  console.log('[Firebase] Received background message ', payload);
  const title = payload.notification.title;
  const options = {
     body: payload.notification.body,
     icon: payload.notification.icon
  }
  return self.registration.showNotification(title, options);
});