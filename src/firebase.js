import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init
const firebaseConfig = {
  apiKey: "AIzaSyAzKwxsGXcfgPExNEOAUWWRhIWcCOOh7rk",
  authDomain: "innkeep-13353.firebaseapp.com",
  databaseURL: "https://innkeep-13353-default-rtdb.firebaseio.com",
  projectId: "innkeep-13353",
  storageBucket: "innkeep-13353.appspot.com",
  messagingSenderId: "797260103533",
  appId: "1:797260103533:web:6873599abe9c98d3a0a464",
  measurementId: "G-QQLVYTKCED"
};

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const roomsCollection = db.collection("rooms");
const usersCollection = db.collection("users");
const institutionTypesCollection = db.collection("institution_types");
const institutionsCollection = db.collection("institutions");
const requestsCollection = db.collection("requests");
const resourcesCollection = db.collection("resources");
const servicesCollection = db.collection("services");

// export utils/refs
export {
  db,
  auth,
  roomsCollection,
  usersCollection,
  institutionsCollection,
  institutionTypesCollection,
  requestsCollection,
  resourcesCollection,
  servicesCollection
};
