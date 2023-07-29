/*
Regarding object creation and 'myLibrary' array
*/

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
    saveLibraryToLocalStorage();
};
        

/*
Regarding appending spines to the page
*/
 
const spineWidth = 55 + 3.2;  // this is the border-box size + the 'gap' value on the shelf

function getMaxSpinesForShelf(shelf) {
    return (Math.floor(shelf.offsetWidth / spineWidth));
};

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
};

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

// On the page being reloaded this will re-append books from the library to the page
function addSpineForBook(book) {
    const title = book.title;
    const spine = document.createElement('div');
    spine.className = 'spine';
    const titleElement = document.createElement('p');

    if (book.read === "you have not read this book") {
        titleElement.style.color = "var(--clr-white)";
    } else {
        titleElement.style.color = "var(--clr-black)";
    }
    titleElement.innerText = title;
    spine.appendChild(titleElement);

    if (book.read === "you have not read this book") {
        spine.style.backgroundColor = "var(--clr-not-read)";
    } else {
        spine.style.backgroundColor = "var(--clr-read)";
    }

    const targetShelf = getAvailableShelf();
    targetShelf.appendChild(spine);
}

/*
Regarding local storage
*/

function saveLibraryToLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};

function loadLibraryFromLocalStorage() {
    const savedLibrary = localStorage.getItem('myLibrary');
    if (savedLibrary) {
        try {
            myLibrary = JSON.parse(savedLibrary);

            myLibrary.forEach(book => {
                addSpineForBook(book);  // Assuming you have a function to add a spine for a book
            });
        } catch (error) {
            alert("There was an error loading your saved library. Data might be corrupted or in an unexpected format.");
        }
}};

function clearMemory() {
    const userConfirmed = confirm("Are you sure you want to reset all data? This action cannot be undone.");

    if (userConfirmed) {
        localStorage.removeItem('myLibrary');  
        myLibrary = [];  

        const spines = document.querySelectorAll('.spine');
        spines.forEach(spine => {
            spine.parentElement.removeChild(spine);
        });
        
        alert("Data has been reset!");  
    } else {
        alert("Data reset has been canceled.");
    }
};

document.addEventListener('DOMContentLoaded', loadLibraryFromLocalStorage);