export default (messaging) => {
  messaging.requestPermission()
  .then(() => {
    console.log("[FCM] Notification permission granted.");
  })
  .catch(err => {
    console.log("[FCM] Unable to get permission to notify.", err);
  });
}