import Firebase from 'firebase';
//import {db} from './Firebase';
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  
  // var firebaseApp = Firebase.initializeApp({
    var firebaseApp = Firebase.initializeApp({

    apiKey: "AIzaSyBPiPs8XR_wRb7V8oEhJMBqLP9Iw8Qw62I",
    authDomain: "react-web-bee62.firebaseapp.com",
    databaseURL: "https://react-web-bee62.firebaseio.com",
    projectId: "react-web-bee62",
    storageBucket: "react-web-bee62.appspot.com",
    messagingSenderId: "884344775907",
    appId: "1:884344775907:web:f12c6c4f26bf41d98c11d6",
    measurementId: "G-G3L5PS7QG3"
  
  // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

});
// var firebaseConfig = {
  
//   apiKey: "AIzaSyBVA5axqtSg8Ii3tHIvCg_HpHPdgsdD-qA",
//   authDomain: "requested-schools.firebaseapp.com",
//   databaseURL: "https://requested-schools.firebaseio.com",
//   projectId: "requested-schools",
//   storageBucket: "requested-schools.appspot.com",
//   messagingSenderId: "527251640505",
//   appId: "1:527251640505:web:818b691ddb30f6857e4b68"

// // Initialize Firebase
// //   firebase.initializeApp(firebaseConfig);
// //   firebase.analytics();

// };


var db = firebaseApp.firestore();

export {db};