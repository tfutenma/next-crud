import "firebase/firestore";
import { initializeApp, getApps, getApp } from "firebase/app";
import { Firestore, DocumentReference } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

if(!getApps.length){
    var firebase = initializeApp(firebaseConfig);
} else {
    var firebase = getApp()
}

export default firebase;