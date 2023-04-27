// Import the functions you need from the SDKs you need
import { createCards } from "./script";
import { createLibrary } from "./script";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { createUserCollection } from "./firebase-functions";
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

const data = {
  books: [{
    title: 'Test Book',
    author: 'Me',
    pages: 150,
    read: false,
    genre: 'Testing'   
  }]
}
async function setLibrary(id) {
  await setDoc(doc(db, "library", id), data)
  .then(() => {
  console.log("Document has been added successfully");
  })
  .catch(error => {
  console.log(error);
  })
}
/*------------------------------ Get Data from firebase ------------------------------*/
async function getData(id) {
  const docRef = doc(db, 'library', id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    createLibrary(docSnap.data().books)
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
}
}
/*-----------------------------------------------------------------------*/

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
  setLibrary(user.uid)
  getData(user.uid)
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
/*------------------------------ Input Elements ------------------------------*/
const bookForm = document.querySelector(".book-form");

const titleInput = document.querySelector("input[name=title]");
const authorInput = document.querySelector("input[name=author");
const pagesInput = document.querySelector("input[name=pages]");
const readInput = document.querySelector("input[name=read]");
const genreInput = document.querySelector("input[name=genre]");

async function addBookToLibrary(id) {
  const book = {
      title: titleInput.value,
      author: authorInput.value,
      pages: pagesInput.value,
      read: readInput.checked,
      genre: genreInput.value
  }
  const getBook = doc(db, 'library', id)
  await updateDoc(getBook, {
      books: arrayUnion(book)
  })
  // const newBook = new Book(
  //     titleInput.value,
  //     authorInput.value,
  //     pagesInput.value,
  //     readInput.checked,
  //     genreInput.value
  //     )
  // myLibrary.push(newBook);
}

onAuthStateChanged(auth, (user) =>{
  if(user) {
    getData(user.uid)
    const userName = document.querySelector('.user-name')
    userName.textContent = user.displayName
    bookForm.addEventListener("submit",(e) => {
      e.preventDefault()
      addBookToLibrary(user.uid)
    })
    onSnapshot(doc(db, 'library', user.uid), (doc) => {
      createLibrary(doc.data().books)
      console.log("Current data: ", doc.data());
  });
  }
})