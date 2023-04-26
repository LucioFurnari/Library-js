// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP6DbaNrrPBSr4MXY-kPHpQCZ9MEZ6Lzc",
  authDomain: "library-d80b6.firebaseapp.com",
  projectId: "library-d80b6",
  storageBucket: "library-d80b6.appspot.com",
  messagingSenderId: "196655807141",
  appId: "1:196655807141:web:b501c44eb74aafa2a0eb4c"
};


const provider = new GoogleAuthProvider();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const loginButton = document.querySelector('.login-btn');
loginButton.addEventListener('click',() => signInWithPopup(auth, provider)
.then((result) => {
  // This gives you a Google Access Token. You can use it to access the Google API.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  // The signed-in user info.
  const user = result.user;
  const userName = document.querySelector('.user-name')
  userName.textContent = user.displayName
  console.log(user)
  // IdP data available using getAdditionalUserInfo(result)
  // ...
}).catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  const email = error.customData.email;
  // The AuthCredential type that was used.
  const credential = GoogleAuthProvider.credentialFromError(error);
  // ...
})
)

const signOutButton = document.querySelector('.signout-btn');
signOutButton.addEventListener('click',() => signOut(auth).then(() => {
  const userName = document.querySelector('.user-name')
  userName.textContent = ''
}).catch((error) => {
  // An error happened.
})
)

onAuthStateChanged(auth, (user) =>{
  if(user) {
    const userName = document.querySelector('.user-name')
    userName.textContent = user.displayName
  }
})