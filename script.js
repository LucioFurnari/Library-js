import { db } from "./firebase";
import { collection, doc, getDoc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";

let myLibrary = [];
const bookForm = document.querySelector(".book-form");
const gridContainer = document.querySelector(".grid-container");

const addButton = document.querySelector(".add-btn");

const form = document.querySelector(".book-form");
const overlay = document.querySelector(".overlay");
// const formQuitButton = document.querySelector(".form-btn")

/*------------------------------ Input Elements ------------------------------*/

const titleInput = document.querySelector("input[name=title]");
const authorInput = document.querySelector("input[name=author");
const pagesInput = document.querySelector("input[name=pages]");
const readInput = document.querySelector("input[name=read]");
const genreInput = document.querySelector("input[name=genre]");

/*------------------------------ Book Objet ------------------------------*/

class Book{
    constructor(title,author,pages,read,genre){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.genre = genre;
    }
    changeRead(){
        this.read = !this.read
    }
};

/*------------------------------ Functions ------------------------------*/

export async function addBookToLibrary() {
    const book = {
        title: titleInput.value,
        author: authorInput.value,
        pages: pagesInput.value,
        read: readInput.checked,
        genre: genreInput.value
    }
    const getBook = doc(db, 'library', 'Es1zFeDCAMTQzr4RkCNo2M5CGEE2')
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
export function createLibrary(library) {
    while(gridContainer.firstChild){
        gridContainer.removeChild(gridContainer.firstChild)
    }
    library.map((item,i) => {
        createCards(item,i)
    })
}
function removeBook(event){
    myLibrary.map((elem,i)=> {
        if(event.target.closest(".book-card").getAttribute("number") == i){
            myLibrary.splice(i,1)
        }
    })
    createLibrary()
}
function changeReadBook(event) {
    myLibrary.map((elem,i)=> {
        if(event.target.closest(".book-card").getAttribute("number") == i){
            myLibrary[i].changeRead()
            console.log(myLibrary[i]);
        }
    })
    createLibrary()
}
export function createCards(book,i) {
    const {title, author, pages, genre} = book
    const bookCard = document.createElement("div");
    const bookTitle = document.createElement('h3')
    bookTitle.textContent = title;
    const bookAuthor = document.createElement('p1')
    bookAuthor.textContent = author;
    const pagesSection = document.createElement('div')
    const pagesP = document.createElement('p')
    pagesP.textContent = pages;
    const genreP = document.createElement('p')
    genreP.textContent = genre;
    pagesSection.append(pagesP, genreP)
    const buttonSection = document.createElement('div')
    const btnRead = document.createElement('button')
    const btnRemove = document.createElement('button')
    btnRemove.textContent = 'Remove';
    buttonSection.append(btnRead, btnRemove)

    btnRead.id = i;
    btnRead.classList.add(book.read ? 'read' : 'not-read')
    btnRead.textContent = book.read ? 'Read' : 'Not Read';
    bookCard.append(bookTitle, bookAuthor, pagesSection, buttonSection)
    bookCard.classList.add("book-card");
    bookCard.setAttribute("number",i)
    // bookCard.innerHTML = `
    // <h3>${book.title}</h3>
    // <p>${book.author}</p>
    //     <div>
    //         <p>Pages: ${book.pages}</p>
    //         <p>${book.genre}</p>
    //     </div>
    //     <div>
    //         <button id=${i} onclick = changeReadBook class=${book.read ? "read" : "not-read"}>
    //             ${book.read ? "Read" : "Not Read"}
    //         </button>
    //         <button onclick =removeBook>Remove</button>
    //     </div>
    // `
    gridContainer.appendChild(bookCard);
};

/*------------------------------ Events ------------------------------*/

// bookForm.addEventListener("submit",(e) => {
//     e.preventDefault()
//     addBookToLibrary()
//     console.log(gridContainer.children);
// })

addButton.addEventListener("click",() => {
    overlay.classList.add("active");
    form.classList.add("show");
})

overlay.addEventListener("click",() => {
    overlay.classList.remove("active");
    form.classList.remove("show")
})