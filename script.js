function Book(title,author,pages,read)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = read;
    this.info = function (){
        return `${title} by ${author}, ${pages} pages, ${read}`
    }
}

const theHobbit = new Book('The Hobbit','J.R.R. Tolkien',295,true);

let library = [theHobbit];

function addBookToLibrary(book){
    library.push(book);
}

const bookGrid = document.querySelector('.books-grid');

function displayBooks(library)
{
    for (const book of library) {
        const cardDiv = document.createElement('div');
        const cardTitle = document.createElement('p');
        const cardAuthor = document.createElement('p');
        const cardPages = document.createElement('p');
        const btnGroup = document.createElement('div');
        const readBtn = document.createElement('button');
        const removeBtn = document.createElement('button');
        cardTitle.innerText = book.title;
        cardAuthor.innerText = book.author;
        cardPages.innerText = book.pages;
        removeBtn.textContent = 'remove';
        if (book.isRead) {
            readBtn.textContent = 'Read'
            readBtn.classList.add('btn-light-green')
          } else {
            readBtn.textContent = 'Not read'
            readBtn.classList.add('btn-light-red')
          }
        cardDiv.appendChild(cardTitle);
        cardDiv.appendChild(cardAuthor);
        cardDiv.appendChild(cardPages);
        readBtn.classList.add('read-btn');
        removeBtn.classList.add('remove-btn');
        btnGroup.appendChild(readBtn);
        btnGroup.appendChild(removeBtn);
        btnGroup.classList.add('button-group')
        cardDiv.appendChild(btnGroup);
        cardDiv.classList.add('book-card');
        bookGrid.appendChild(cardDiv);
    }
}

displayBooks(library);

function btnClick(){
    const readBtns = document.querySelectorAll('.read-btn');

    const readFunc = (e)=>{
        if(e.target.innerText==='Read'){
            e.target.innerText='Not Read';
            e.target.classList.remove('btn-light-green');
            e.target.classList.add('btn-light-red');}
        else{
            e.target.innerText='Read';
            e.target.classList.add('btn-light-green');
            e.target.classList.remove('btn-light-red');
        }
    };

    readBtns.forEach((readBtn)=>{
        readBtn.addEventListener('click',readFunc);
    })

    const removeBtns = document.querySelectorAll('.remove-btn');

    removeBtns.forEach((removeBtn)=>{
        removeBtn.addEventListener('click',(e)=>{
            let bookTitle = e.target.parentElement.parentElement.firstChild.textContent;
            let bookElement = e.target.parentElement.parentElement;
            library = library.filter((book)=>{book.title!==bookTitle});
            bookElement.remove();
            });
    })
}
btnClick();


const addBtn = document.querySelector('.add-btn');

const body = document.querySelector('body');

addBtn.addEventListener('click',(e)=>{
    const addBookDiv = document.createElement('div');
    addBookDiv.classList.add('addBookModal');

    const addbookForm = document.createElement('form');
    addbookForm.classList.add('addBookForm');
    const formHeading = document.createElement('h3');
    formHeading.textContent = "Add new book";
    const titleInput = document.createElement('input');
    titleInput.setAttribute('id','title');
    titleInput.setAttribute('placeholder','Title');
    const authorInput = document.createElement('input');
    authorInput.setAttribute('id','author');
    authorInput.setAttribute('placeholder','Author');
    const pagesInput = document.createElement('input');
    pagesInput.setAttribute('id','pages');
    pagesInput.setAttribute('placeholder','Pages');
    pagesInput.setAttribute('type','number');

    const checkBoxDiv = document.createElement('div');
    checkBoxDiv.classList.add('checkbox');
    const checkboxLabel = document.createElement('label');
    checkboxLabel.textContent = "Have you read it?";
    checkboxLabel.setAttribute('for','readIt');
    const checkboxInput = document.createElement('input');
    checkboxInput.setAttribute('type','checkbox');
    checkboxInput.setAttribute('id','readIt');

    const subBtn = document.createElement('button');
    subBtn.textContent = 'Submit';
    subBtn.setAttribute('type','submit');
    subBtn.classList.add('submitBtn');

    checkBoxDiv.append(checkboxLabel,checkboxInput);

    addbookForm.append(formHeading,titleInput,authorInput,pagesInput,checkBoxDiv,subBtn);

    addBookDiv.appendChild(addbookForm);
    body.appendChild(addBookDiv);

    const submitBtn = document.querySelector('.submitBtn');
    const addBookForm = document.querySelector('.addBookForm');
    submitBtn.addEventListener('click',(e)=>{
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('readIt').checked;
    const newBook = new Book(title,author,pages,read);
    addBookToLibrary(newBook);
    addBookForm.reset();
    removeAllChildNodes(bookGrid);
    displayBooks(library)
    btnClick();
    addBookDiv.remove();
    e.preventDefault();
})
});

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

