import firebase from "firebase";

const firebaseConfig = {
  apiKey: "dummy",
  authDomain: "dummy",
  databaseURL: "dummy",
  projectId: "ideate-app-react",
  storageBucket: "ideate-app-react.appspot.com",
  messagingSenderId: "dummy",
  appId: "dummy",
  measurementId: "dummy"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
