import firebase from 'firebase'
import 'firebase/auth'

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  const auth = fire.auth();

  export { auth }