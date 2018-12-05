import firebase from "firebase";
import config from "./config";
import requestPermission from "./requestPermission";

export default async () => {
  firebase.initializeApp(config);
  const messaging = firebase.messaging();
  messaging.usePublicVapidKey("BOVKFI-Ff1MGnZG2zahfTA4ZiC_ezv0UpLCuS-NKNbFPrZaRxMKGaqFRVpxmPeWzpuEOI4Xc5vNGxRNuELP63Eg");
  requestPermission(messaging);
  return await messaging.getToken();
}