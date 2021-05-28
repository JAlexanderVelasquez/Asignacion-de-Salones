import firebase from 'firebase/app'//En caso de presentar fallos auth eliminar /app
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  const auth = fire.auth();
  const firedb = fire.firestore()

  export { auth, firedb }