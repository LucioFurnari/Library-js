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

function Book(title,author,pages,read,genre){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.genre = genre;
};

Book.prototype.changeRead = function() {
    this.read = !this.read
}

/*------------------------------ Functions ------------------------------*/

function addBookToLibrary() {
    const newBook = new Book(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        readInput.checked,
        genreInput.value
        )
    myLibrary.push(newBook);
}
function createLibrary() {
    while(gridContainer.firstChild){
        gridContainer.removeChild(gridContainer.firstChild)
    }
    myLibrary.map((item,i) => {
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
function createCards(book,i) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("number",i)
    bookCard.innerHTML = `
    <h3>${book.title}</h3>
    <p>${book.author}</p>
        <div>
            <p>Pages: ${book.pages}</p>
            <p>${book.genre}</p>
        </div>
        <div>
            <button id=${i} onclick=changeReadBook(event) class=${book.read ? "read" : "not-read"}>
                ${book.read ? "Read" : "Not Read"}
            </button>
            <button onclick=removeBook(event)>Remove</button>
        </div>
    `
    gridContainer.appendChild(bookCard);
};

/*------------------------------ Events ------------------------------*/

bookForm.addEventListener("submit",(e) => {
    e.preventDefault()
    addBookToLibrary()
    createLibrary()
    console.log(gridContainer.children);
})

addButton.addEventListener("click",() => {
    overlay.classList.add("active");
    form.classList.add("show");
})

overlay.addEventListener("click",() => {
    overlay.classList.remove("active");
    form.classList.remove("show")
})