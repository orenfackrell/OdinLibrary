  let myLibrary = [];

  function book(title, author, pages, read) {
    pages = pages || undefined
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
      return `${title} by ${author} has ${pages} pages, ${read}.`
    };
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
    
    console.log(title);
    console.log(author);
    console.log(pages);
    console.log(read);

    const commitBook = new book(title, author, pages, read)
    myLibrary.push(commitBook)
    console.log(myLibrary)

    let spine = document.createElement('div');
    spine.className = 'spine';
    
    let spineText = document.createElement('p');
    spineText.textContent = `${title}`;
    spine.appendChild(spineText);
    
    if (read === "you have not read this book") {
        spine.style.backgroundColor = "var(--clr-not-read)";
    } else {
        spine.style.backgroundColor = "var(--clr-read)";
    }
    
    const shelf = document.querySelector('.shelf');
    shelf.appendChild(spine);
  };




