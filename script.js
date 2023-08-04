function Book(title,author,pages,read)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function (){
        return `${title} by ${author}, ${pages} pages, ${read}`
    }
}

const theHobbit = new Book('The Hobbit','J.R.R. Tolkien',295,true);

let library = [theHobbit];

function addBookToLibrary(book){
    library.push(book);
}

function displayBooks(library)
{
    for (const book of library) {
        console.log(book);
    }
}

displayBooks(library);


