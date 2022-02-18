import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
    apiKey: "AIzaSyDKvu7m7vVtT6vIfIcrdaHNoWt6mf5-pzU",
    authDomain: "crwn-db-49bc3.firebaseapp.com",
    projectId: "crwn-db-49bc3",
    storageBucket: "crwn-db-49bc3.appspot.com",
    messagingSenderId: "691926517890",
    appId: "1:691926517890:web:6db7f9bc75f899e8154c9b"
  };

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase