import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCLq9B_7oN5FVxbaUDbCUJO4d43m_SSWd0",
    authDomain: "crwn-db-27fbc.firebaseapp.com",
    projectId: "crwn-db-27fbc",
    storageBucket: "crwn-db-27fbc.appspot.com",
    messagingSenderId: "493411623933",
    appId: "1:493411623933:web:7091d24dc1b7a6b4a66f94",
    measurementId: "G-R4VSQ7HXHY"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
        await userRef.set({
            displayName,
            email, 
            createdAt,
            ...additionalData
        })
    } catch (error) {
        console.log('error creating user', error.message);
    }
  }

  return userRef;
  
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;