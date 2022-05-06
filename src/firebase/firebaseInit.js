import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
// import firebase from "firebase/app";
// import "firebase/";

var firebaseConfig = {
  apiKey: 'AIzaSyDOtW9ERc7f431K_vQ4wRGo_2CgeFTC7Bo',
  authDomain: 'invoice-app-3eeea.firebaseapp.com',
  projectId: 'invoice-app-3eeea',
  storageBucket: 'invoice-app-3eeea.appspot.com',
  messagingSenderId: '439105354019',
  appId: '1:439105354019:web:604116e826436811a47496'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()
