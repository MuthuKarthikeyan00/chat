import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAJMoCVu_SszK2R3cGrSL1rT_mHSB0Z4qU",
    authDomain: "whats-app-b42e3.firebaseapp.com",
    projectId: "whats-app-b42e3",
    storageBucket: "whats-app-b42e3.appspot.com",
    messagingSenderId: "26389812619",
    appId: "1:26389812619:web:b0949ecfa19355b970cb8e",
    measurementId: "G-51VB7YJB6E"
  };

 const firebaseApp = firebase.initializeApp(firebaseConfig) ;

 const db =firebaseApp.firestore();
 const auth= firebase.auth();
 const provider = new  firebase.auth.GoogleAuthProvider();
 
 export {auth,provider};
 export default db;
