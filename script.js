let myLibrary = [];
const bookForm = document.querySelector(".book-form");
const gridContainer = document.querySelector(".grid-container");

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
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
    <h3>Title</h3>
        <p>Author</p>
        <div>
            <p>Pages</p>
            <p>Genre</p>
        </div>
        <div>
            <input type=checkbox>
            <button>Remove</button>
        </div>
    `
    gridContainer.appendChild(bookCard);
}
bookForm.addEventListener("submit",(e) => {
    e.preventDefault()
    addBookToLibrary()
    createLibrary()
    console.log(myLibrary);
})
