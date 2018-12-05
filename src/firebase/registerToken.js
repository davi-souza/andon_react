import firebase from "firebase";
import config from "./config";
import requestPermission from "./requestPermission";
import put from "../fetch/put";

export default (userId) => {
  firebase.initializeApp(config);
  const messaging = firebase.messaging();
  messaging.usePublicVapidKey("BOVKFI-Ff1MGnZG2zahfTA4ZiC_ezv0UpLCuS-NKNbFPrZaRxMKGaqFRVpxmPeWzpuEOI4Xc5vNGxRNuELP63Eg");
  requestPermission(messaging);

  messaging.getToken().then(currentToken => {
    if (currentToken) {
      put(`user/token/register`,{
        id: userId,
        token: currentToken,
      })
      .then(response => response.json())
      .then(response => {console.log("[FCM]",response);})
      .catch(err => {
        console.log("[FCM] Error registering token to user.");
      });
    } else {
      // Show permission request.
      console.log('No Instance ID token available. Request permission to generate one.');
      // Show permission UI.
    }
  }).catch(err => {
    console.log('An error occurred while retrieving token. ', err);
  });
}