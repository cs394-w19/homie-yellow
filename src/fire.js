import firebase from 'firebase/app';

var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyDaraY-KaS5A3KTO3Kkj8tLqiTonnRVy20",
  authDomain: "homiez.firebaseapp.com",
  databaseURL: "https://homiez.firebaseio.com",
  messagingSenderId: "823560185731"
};

var fire = firebase.initializeApp(config);
export default fire;
