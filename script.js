let myLibrary = [];
const bookForm = document.querySelector(".book-form");
const gridContainer = document.querySelector(".grid-container");
const addButton = document.querySelector(".add-btn");
const formContainer = document.querySelector(".hide");
const formQuitButton = document.querySelector(".form-btn")

const titleInput = document.querySelector("input[name=title]");
const authorInput = document.querySelector("input[name=author");
const pagesInput = document.querySelector("input[name=pages]");
const readInput = document.querySelector("input[name=read]");
const genreInput = document.querySelector("input[name=genre]");

function Book(title,author,pages,read,genre){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.genre = genre;
};

Book.prototype.changeRead = function() {
    this.read = !this.read
    console.log(this.read);
}

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
function changeReadLibrary(event) {
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
            <p>${book.pages}</p>
            <p>${book.genre}</p>
        </div>
        <div>
            <label for=${i}>Read</label>
            <input id=${i} onclick=changeReadLibrary(event) type=checkbox ${book.read ? "checked" : ""}>
            <button onclick=removeBook(event)>Remove</button>
        </div>
    `
    gridContainer.appendChild(bookCard);
};
bookForm.addEventListener("submit",(e) => {
    e.preventDefault()
    addBookToLibrary()
    createLibrary()
    console.log(gridContainer.children);
})

addButton.addEventListener("click",() => {
    formContainer.classList.remove("hide")
    formContainer.classList.add("form-container")
})

formQuitButton.addEventListener("click",() => {
    formContainer.classList.add("hide");
    formContainer.classList.remove("form-container")
})