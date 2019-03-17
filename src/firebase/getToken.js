import firebase from "firebase";
import config from "./config";
import requestPermission from "./requestPermission";

export default async () => {
  let initializedNow = false;

  if (!firebase.apps[0]) {
    firebase.initializeApp(config);
    initializedNow = true;
  }

  const messaging = firebase.messaging();

  if (initializedNow) {
    messaging.usePublicVapidKey("BOVKFI-Ff1MGnZG2zahfTA4ZiC_ezv0UpLCuS-NKNbFPrZaRxMKGaqFRVpxmPeWzpuEOI4Xc5vNGxRNuELP63Eg");
  }

  requestPermission(messaging);
  return await messaging.getToken();
}
