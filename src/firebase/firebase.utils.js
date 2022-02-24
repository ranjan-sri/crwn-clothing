//import firebase from 'firebase/compat/app'
//import 'firebase/compat/firestore'
//import 'firebase/compat/auth'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDKvu7m7vVtT6vIfIcrdaHNoWt6mf5-pzU",
    authDomain: "crwn-db-49bc3.firebaseapp.com",
    projectId: "crwn-db-49bc3",
    storageBucket: "crwn-db-49bc3.appspot.com",
    messagingSenderId: "691926517890",
    appId: "1:691926517890:web:6db7f9bc75f899e8154c9b"
  };

  export const createUserProfileDocument = async(userAuth, additionalData ) =>{
    if( !userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    
    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
       const {displayName, email } = userAuth;
       const createdAt = new Date();
       
       try {
         await userRef.set({
           displayName,
           email,
           createdAt,
           ...additionalData
         })
       }catch (error) {
          console.log('error creating user', error.message);
       }
    }
    
    return userRef
  }
  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase