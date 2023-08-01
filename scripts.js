/* -- Regarding object creation and 'myLibrary' array -- */

let myLibrary = [];

function book(title, author, read, rating, extraNotes) {
    rating = rating || 0
    extraNotes = extraNotes || ""
    this.title = title
    this.author = author
    this.read = read
    this.rating = rating
    this.extraNotes = extraNotes
};

function addBookToLibrary() {
    let title = document.getElementById('book-title').value
    let author = document.getElementById('book-author').value
    let read = document.getElementById('read-validation').checked
    let rating = document.getElementById('rating-input').value;
    let extraNotes = ""
    
    
    const commitBook = new book(title, author, read, rating, extraNotes);
    myLibrary.push(commitBook);
    saveLibraryToLocalStorage();
};
        

/* -- Regarding appending spines to the page -- */
 
const spineWidth = 55 + 3.2;  // this is the border-box size + the 'gap' value on the shelf

function getMaxSpinesForShelf(shelf) {
    return (Math.floor(shelf.offsetWidth / spineWidth));
};

function getAvailableShelf() {
    const shelves = document.querySelectorAll('.shelf');
    for (let shelf of shelves) {
        const currentSpines = shelf.querySelectorAll('.spine').length;
        const maxSpines = getMaxSpinesForShelf(shelf);

        if (currentSpines < maxSpines) {
            return shelf;
        }
    }
    alert("There no more space on the shelves! Your book has been added to storage.")
};

function addSpineToShelf() {
    // Get the values from the input fields
    let title = document.getElementById('book-title').value;
    let author = document.getElementById('book-author').value;
    let read = document.getElementById('read-validation').checked;
    let rating = document.getElementById('rating-input').value;

    // Create spine
    let spine = document.createElement('article');
    spine.className = 'spine';

    // Make visible spine header
    let spineTitle = document.createElement('header');
    spineTitle.className = 'spine-title';
    let bookmarkIcon = document.createElement('i');
    bookmarkIcon.className = 'ph ph-bookmark';
    let titleText = document.createElement('p');
    titleText.textContent = title;
    if (read) {
        spineTitle.appendChild(bookmarkIcon);
    }
    spineTitle.appendChild(titleText);
    spine.appendChild(spineTitle);

    // Make hidden spine body
    let spineBody = document.createElement('div');
    spineBody.className = 'spine-body';

    // Create author gird 
    let authorText = document.createElement('div');
    authorText.textContent = "Author:";
    let authorName = document.createElement('p');
    authorName.textContent = `${author}`;
    authorText.appendChild(authorName);
    spineBody.appendChild(authorText);

    // Create update buttons gird 
    let updateButtons = document.createElement('div');
    updateButtons.className = 'update-container';

    let readWrapper = document.createElement('div');
    readWrapper.className = 'button-wrapper';
    let readLabel = document.createElement('label');
    readLabel.setAttribute('for', 'read');
    readLabel.textContent = "Read?";
    let readButton = document.createElement('button');
    readButton.id = 'read';
    readButton.classList.add( 'read-button', 'update-button');
    let readIcon = document.createElement('i');
    readIcon.className = 'ph ph-check';
    readButton.appendChild(readIcon);

    readWrapper.appendChild(readLabel);
    readWrapper.appendChild(readButton);
    updateButtons.appendChild(readWrapper);

    let removeWrapper = document.createElement('div');
    removeWrapper.className = 'button-wrapper';
    let removeLabel = document.createElement('label');
    removeLabel.setAttribute('for', 'delete');
    removeLabel.textContent = "Remove?";
    let removeButton = document.createElement('button');
    removeButton.id = 'delete';
    removeButton.classList.add( 'remove-button', 'update-button');
    let removeIcon = document.createElement('i');
    removeIcon.className = 'ph ph-x';
    removeButton.appendChild(removeIcon);

    removeWrapper.appendChild(removeLabel);
    removeWrapper.appendChild(removeButton);
    updateButtons.appendChild(removeWrapper);

    spineBody.appendChild(updateButtons);

    // Create ratings grid
    let ratingDisplay = document.createElement('div');
    ratingDisplay.className = 'rating';
    let ratingText = document.createElement('p');
    ratingText.textContent = "Rating:"
    ratingDisplay.appendChild(ratingText);
    let starIcon = document.createElement('i');
    starIcon.className = 'ph-fill ph-star';
    let ratingIcon = document.createElement('i');
    ratingIcon.className = 'ph ph-star'

    const ratingValue = parseInt(rating, 10);
    for (let i = 0; i < ratingValue; i++) {
        const filledStar = starIcon.cloneNode(true); 
        ratingDisplay.appendChild(filledStar);
    }

    const remainingStars = 5 - ratingValue;
    for (let i = 0; i < remainingStars; i++) {
        const emptyStar = ratingIcon.cloneNode(true); 
        ratingDisplay.appendChild(emptyStar);
    }

    spineBody.appendChild(ratingDisplay);

    // Create notes grid
    let extraNotes = document.createElement('div');
    extraNotes.className = 'extra-notes';
    let notesLabel = document.createElement('label');
    notesLabel.className = 'notes-label';
    notesLabel.textContent = 'Additional notes:';
    let notesTextarea = document.createElement('textarea');
    notesTextarea.name = 'notes';
    notesTextarea.id = 'notes';
    notesTextarea.cols = '36';
    notesTextarea.rows = '3';
    extraNotes.appendChild(notesLabel);
    extraNotes.appendChild(notesTextarea);
    spineBody.appendChild(extraNotes);

    spine.dataset.index = myLibrary.length - 1; 

    notesTextarea.addEventListener('input', function() {
        updateExtraNotes(spine.dataset.index, this.value);
    });

    spine.appendChild(spineBody);

    const targetShelf = getAvailableShelf();
    targetShelf.appendChild(spine);
};

// On the page being reloaded this will re-append books from the library to the page
function addSpineForBook(book, spineId) {
    // Get the values from the object keys
    const title = book.title;
    const author = book.author;
    const read = book.read;
    const rating = book.rating;
    const extraNotes = book.extraNotes;

    // Create spine
    const spine = document.createElement('article');
    spine.className = 'spine';
    spine.dataset.index = spineId;

    // Make visible spine header
    const spineTitle = document.createElement('header');
    spineTitle.className = 'spine-title';
    const bookmarkIcon = document.createElement('i');
    bookmarkIcon.className = 'ph ph-bookmark';
    const titleText = document.createElement('p');
    titleText.textContent = title;
    if (read) {spineTitle.appendChild(bookmarkIcon);}
    spineTitle.appendChild(titleText);
    spine.appendChild(spineTitle);

    // Make hidden spine body
    const spineBody = document.createElement('div');
    spineBody.className = 'spine-body';

    // Create author gird 
    let authorText = document.createElement('div');
    authorText.textContent = "Author:";
    let authorName = document.createElement('p');
    authorName.textContent = `${author}`;
    authorText.appendChild(authorName);
    spineBody.appendChild(authorText);

    // Create update buttons gird 
    let updateButtons = document.createElement('div');
    updateButtons.className = 'update-container';

    let readWrapper = document.createElement('div');
    readWrapper.className = 'button-wrapper';
    let readLabel = document.createElement('label');
    readLabel.setAttribute('for', 'read');
    readLabel.textContent = "Read?";
    let readButton = document.createElement('button');
    readButton.id = 'read';
    readButton.classList.add( 'read-button', 'update-button');
    let readIcon = document.createElement('i');
    readIcon.className = 'ph ph-check';
    readButton.appendChild(readIcon);

    readWrapper.appendChild(readLabel);
    readWrapper.appendChild(readButton);
    updateButtons.appendChild(readWrapper);

    let removeWrapper = document.createElement('div');
    removeWrapper.className = 'button-wrapper';
    let removeLabel = document.createElement('label');
    removeLabel.setAttribute('for', 'delete');
    removeLabel.textContent = "Remove?";
    let removeButton = document.createElement('button');
    removeButton.id = 'delete';
    removeButton.classList.add( 'remove-button', 'update-button');
    let removeIcon = document.createElement('i');
    removeIcon.className = 'ph ph-x';
    removeButton.appendChild(removeIcon);

    removeWrapper.appendChild(removeLabel);
    removeWrapper.appendChild(removeButton);
    updateButtons.appendChild(removeWrapper);

    spineBody.appendChild(updateButtons);

    // Create ratings grid
    const ratingDisplay = document.createElement('div');
    ratingDisplay.className = 'rating';
    const ratingText = document.createElement('p');
    ratingText.textContent = 'Rating:';
    ratingDisplay.appendChild(ratingText);

    for (let i = 0; i < 5; i++) {
        const starIcon = document.createElement('i');
        starIcon.className = i < rating ? 'ph-fill ph-star' : 'ph ph-star';
        ratingDisplay.appendChild(starIcon);
    }

    spineBody.appendChild(ratingDisplay);

    // Create notes grid  
    const extraNotesContainer = document.createElement('div');
    extraNotesContainer.className = 'extra-notes';
    const notesLabel = document.createElement('label');
    notesLabel.className = 'notes-label';
    notesLabel.textContent = 'Additional notes:';
    const notesTextarea = document.createElement('textarea');  
    notesTextarea.name = 'notes';
    notesTextarea.id = 'notes';
    notesTextarea.cols = '36';
    notesTextarea.rows = '3';
    notesTextarea.value = extraNotes || '';
    extraNotesContainer.appendChild(notesLabel);
    extraNotesContainer.appendChild(notesTextarea);
    spineBody.appendChild(extraNotesContainer);
    
    notesTextarea.addEventListener('input', function() {
        updateExtraNotes(spineId, this.value);
    });

    spine.appendChild(spineBody);

    const targetShelf = getAvailableShelf();
    targetShelf.appendChild(spine);
};

/* -- Regarding updating book object from spine UI --*/

function addEventListenersForReadStatus() {
    const spines = document.querySelectorAll('.spine');

    spines.forEach((spine) => {
        const readButton = spine.querySelector('.read-button');
        const bookIndex = spine.dataset.index; 

        if (readButton) {
            readButton.addEventListener('click', function() {
                toggleReadForBook(bookIndex);
            });
        }
    });
};

function toggleReadForBook(bookIndex) {
    
    if (bookIndex >= 0 && bookIndex < myLibrary.length) {
        myLibrary[bookIndex].read = !myLibrary[bookIndex].read;


        if (myLibrary[bookIndex].read) {
            let newRating = prompt("Update your rating (0-5 stars):");

            if (newRating !== null && !isNaN(newRating) && newRating >= 0 && newRating <= 5) {
                myLibrary[bookIndex].rating = parseInt(newRating, 10);
                
                const spine = document.querySelector(`.spine[data-index="${bookIndex}"]`);
                const ratingDisplay = spine.querySelector('.rating');

                while (ratingDisplay.firstChild) {
                    ratingDisplay.removeChild(ratingDisplay.firstChild);
                }

                const ratingText = document.createElement('p');
                ratingText.textContent = 'Rating:';
                ratingDisplay.appendChild(ratingText);
                
                for (let i = 0; i < 5; i++) {
                    const starIcon = document.createElement('i');
                    starIcon.className = i < newRating ? 'ph-fill ph-star' : 'ph ph-star';
                    ratingDisplay.appendChild(starIcon);
                }
            }
        }

        const spine = document.querySelector(`.spine[data-index="${bookIndex}"]`);
        const bookmarkIcon = spine.querySelector('.ph-bookmark');
        if (myLibrary[bookIndex].read) {
            if (!bookmarkIcon) {
                const newBookmarkIcon = document.createElement('i');
                newBookmarkIcon.className = 'ph ph-bookmark';
                spine.querySelector('.spine-title').prepend(newBookmarkIcon);
            }
        } else {
            if (bookmarkIcon) {
                bookmarkIcon.remove();
            }
        }
        
        // Save the updated library to local storage
        saveLibraryToLocalStorage();
    }
};

function addEventListenersForRemove() {
    const spines = document.querySelectorAll('.spine');

    spines.forEach((spine) => {
        const removeButton = spine.querySelector('.remove-button');
        const bookIndex = spine.dataset.index; 

        if (removeButton) {
            removeButton.addEventListener('click', function() {
                removeBookAndSpine(bookIndex, spine);
            });
        }
    });
};

function removeBookAndSpine(bookIndex, spine) {

    const parsedBookIndex = parseInt(bookIndex, 10);

    if (parsedBookIndex >= 0 && parsedBookIndex < myLibrary.length) {

        myLibrary.splice(parsedBookIndex, 1);

        spine.remove();

        const subsequentSpines = document.querySelectorAll(`.spine[data-index="${bookIndex}"] ~ .spine`);
        subsequentSpines.forEach(s => {
            s.dataset.index = parseInt(s.dataset.index, 10) - 1;
        });

        saveLibraryToLocalStorage();
    }
}


function addEventListenersForExtraNotes() {
    const spines = document.querySelectorAll('.spine');

    spines.forEach((spine, index) => {
        const textarea = spine.querySelector('textarea');
        if (textarea) {
            textarea.addEventListener('input', function() {
                updateExtraNotes(index, this.value);
            });
        }
    });
};

function updateExtraNotes(bookIndex, notes) {
    if (bookIndex >= 0 && bookIndex < myLibrary.length) {
        myLibrary[bookIndex].extraNotes = notes;
        saveLibraryToLocalStorage();
    }
};

/* -- Regarding local storage -- */

function saveLibraryToLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};

function loadLibraryFromLocalStorage() {
    const savedLibrary = localStorage.getItem('myLibrary');
    if (savedLibrary) {
        try {
            myLibrary = JSON.parse(savedLibrary);

            myLibrary.forEach((book, index) => {
                addSpineForBook(book, index);
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

document.addEventListener('DOMContentLoaded', function() {
    loadLibraryFromLocalStorage();
    addEventListenersForExtraNotes();
    addEventListenersForReadStatus();
    addEventListenersForRemove();
});

/* -- Regarding form validation -- */

function validateAndClearForm() {
    const form = document.querySelector('.form-card');
    const requiredInputs = form.querySelectorAll('input[required]');

    let allValid = true;

    requiredInputs.forEach(input => {
        if (!input.checkValidity()) {
            input.classList.add('invalid-input');
            allValid = false;
        } else {
            input.classList.remove('invalid-input');
        }
    });

    if (allValid) {
        addBookToLibrary();
        addSpineToShelf();
        saveLibraryToLocalStorage();
        form.reset();
    }
};

/* -- Regarding card swiping animations -- */

let activeIndex = 0;

const groups = document.getElementsByClassName("card");

const handleSwipeRight = () => {
  const nextIndex = activeIndex + 1 <= groups.length - 1 ? activeIndex + 1 : 0;
  
  const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`),
        nextGroup = document.querySelector(`[data-index="${nextIndex}"]`);
        
  currentGroup.dataset.status = "after";
  
  nextGroup.dataset.status = "becoming-active-from-before";
  
  setTimeout(() => {
    nextGroup.dataset.status = "active";
    activeIndex = nextIndex;
  });
};

const handleSwipeLeft = () => {
  const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : groups.length - 1;
  
  const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`),
        nextGroup = document.querySelector(`[data-index="${nextIndex}"]`);
  
  currentGroup.dataset.status = "before";
  
  nextGroup.dataset.status = "becoming-active-from-after";
  
  setTimeout(() => {
    nextGroup.dataset.status = "active";
    activeIndex = nextIndex;
  });
};