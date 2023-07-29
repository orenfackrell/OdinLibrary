  let myLibrary = [];

  function book(title, author, pages, read) {
    pages = pages || undefined
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  };


  function addBookToLibrary() {

    let title = document.getElementById('book-title').value
    let author = document.getElementById('book-author').value
    let pages = document.getElementById('pages').value;
    let read;
    const readValidation = document.getElementById('read-validation')
    if (readValidation.checked == false){
        read = "you have not read this book";
    } else {
        read = "you have read this book";
    }

    const commitBook = new book(title, author, pages, read);
    myLibrary.push(commitBook);
    console.log(myLibrary);
  };

// Below is code to calculate how many spines can fit onto each shelf and handles the logic for selecting shelves that have space to accept more spines
 
const spineWidth = 55 + 3.2;  // this is the border-box size + the 'gap' value on the shelf

function getMaxSpinesForShelf(shelf) {
    return (Math.floor(shelf.offsetWidth / spineWidth));
}

function getAvailableShelf() {
    const shelves = document.querySelectorAll('.shelf');
    for (let shelf of shelves) {
        const currentSpines = shelf.querySelectorAll('.spine').length;
        const maxSpines = getMaxSpinesForShelf(shelf);

        console.log(`Shelf: ${shelf}, Current spines: ${currentSpines}, Max spines: ${maxSpines}`); 

        if (currentSpines < maxSpines) {
            return shelf;
        }
    }
    alert("There no more space on the shelves! Your book has been added to storage.")
}

function addSpineToShelf() {
    let title = document.getElementById('book-title').value;
    let read;
    const readValidation = document.getElementById('read-validation');
    if (readValidation.checked == false) {
        read = "you have not read this book";
    } else {
        read = "you have read this book";
    }
    let spine = document.createElement('div');
    spine.className = 'spine';

    let spineText = document.createElement('p');
    if (read === "you have not read this book") {
        spineText.style.color = "var(--clr-white)";
    } else {
        spineText.style.color = "var(--clr-black)";
    }
    spineText.textContent = `${title}`;
    spine.appendChild(spineText);

    if (read === "you have not read this book") {
        spine.style.backgroundColor = "var(--clr-not-read)";
    } else {
        spine.style.backgroundColor = "var(--clr-read)";
    }

    const targetShelf = getAvailableShelf();
    targetShelf.appendChild(spine);
};
