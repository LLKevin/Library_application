let Library = [];

//get dom elements 
let title = document.querySelector(".book-title");
let author = document.querySelector(".book-author");
let page_number = document.querySelector(".book-page-count");
let isRead = document.querySelector(".isRead");
let bookshelf = document.querySelector(".bookshelf");

const Book = class{
    constructor(title, author, pageNumber, isRead){
        this.title = title;
        this.author = author;
        this.pageNumber = pageNumber;
        this.isRead = isRead;
    }
}
//flip the read status value
Book.prototype.changeReadStatus = function(){
    this.isRead = !this.isRead;
}

function addBookToLibrary(isRead){
    Library.push(new Book(title.value, author.value, page_number.value, isRead))
    displayLibrary();
}
function removeBook(index){

    index = 1 ? Library.splice(0, 1) : Library.splice(index, 1);

    if(index < 2){
        if(index != 0)
            bookshelf.deleteRow(index)
        else{
            bookshelf.deleteRow(index + 1)
        }
    }
    else{
        bookshelf.deleteRow(-1)
    }
} 
function displayLibrary(){
    for(let i = 0; i < Library.length; i++){

        if ((bookshelf.rows.length - 1) > i) {
            continue;
          }

        let row = bookshelf.insertRow(-1);
        let titleCell = row.insertCell(-1);
        let authorCell = row.insertCell(-1);
        let pageNumberCell = row.insertCell(-1);
        let isReadCell = row.insertCell(-1);
        let deleteBook = row.insertCell(-1);
        row.setAttribute('dataIndex', i);

        // create a delete button 
        
        let btnRemoveBook = document.createElement("input");
        btnRemoveBook.setAttribute("dataIndex", i);
        btnRemoveBook.addEventListener("click", (e) => {
        //removeBook(e.path[2].attributes.dataIndex.value);
        removeBook(e.target.attributes.dataIndex.value)
        });

        btnRemoveBook.type = "button";
        btnRemoveBook.value = "Remove";

    
        isReadCell.addEventListener("click",function(){
            Book.changeReadStatus();
        })

        authorCell.innerHTML = Library[i].author;
        titleCell.innerHTML = Library[i].title;
        pageNumberCell.innerHTML = Library[i].pageNumber;
        isReadCell.innerHTML = Library[i].isRead;
       
        //isReadCell.appendChild(btnChangeRead);
        deleteBook.appendChild(btnRemoveBook);
    }
}


let btnAddBook = document.querySelector("#addBook").addEventListener("click", (event) => {
    event.preventDefault();
  
    let checkbox_IsRead = document.querySelector('input[name = "isRead"]:checked');
    if (author.value !== "" && title.value !== "" && page_number.value !== "" && isRead.value !== undefined) {        
        addBookToLibrary(checkbox_IsRead == null ? "has not been read" : "has been read" );
    }
  });
