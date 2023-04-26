import { collection, addDoc, getDocs } from "firebase/firestore";
export async function createCollection() {
  try {
    const docRef = await addDoc(collection(db, "books"), {
        title: titleInput.value,
        author: authorInput.value,
        pages: pagesInput.value,
        read: readInput.checked,
        genre: genreInput.value    
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

