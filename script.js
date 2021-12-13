let myLibrary = [];

function book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary () {
    if (getBook() == false) {
        warningPrompt();
    } else {
        addBookToTable();
        clearFields();
    }
}

function getBook() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let status = document.getElementById("status").value;

    if (title && author && pages) {
        myLibrary.push(new book(title, author, pages, status));
    } else {
        return false;
    }
}

function clearFields() {
    document.getElementById("form").reset();
}

function warningPrompt() {
    window.alert("Not all fields have been filled.");
}

//Table

function addBookToTable () {
    let table = document.querySelector("table");
    let tr = document.createElement("tr");
    let newBook = myLibrary.length - 1;

    tr.id = "book" + newBook;
    tr.className = "book";
    table.append(tr);

    addBookInfo(newBook);
    addDeleteButton(tr.id);
    addChangeStatus(tr.id);
}

function addDeleteButton(bookID) {
    let bookNumber = "#" + bookID;
    let book = document.querySelector(bookNumber);
    let deleteButton = document.createElement("button");
    deleteButton.id = "delete-" + bookID;
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
        deleteBook(bookID);
    }

    book.append(deleteButton);
}

function addBookInfo(newBook) {
    let bookNumber = "#book" + newBook;
    let book = document.querySelector(bookNumber);

    for (const property in myLibrary[newBook]) {
        if (property === "read") {
            let td = document.createElement("td");
            td.id = "status-book" + newBook;
            td.textContent = myLibrary[newBook][property];
            book.append(td);
        }else {
            let td = document.createElement("td");
            td.textContent = myLibrary[newBook][property];
            book.append(td);
        }}
}

function deleteBook(bookID) {
    let book = document.getElementById(bookID);
    book.remove();
}

function deleteAll() {
    let confirmation = deleteConfirmationPrompt();

    if (confirmation) {  
        let allBooks = document.getElementsByClassName("book");
        
        while (allBooks.length > 0) {
            allBooks[0].remove();
        }
    }
}

function deleteConfirmationPrompt () {
    return window.confirm("Are you sure want to erase your library?")
}

//Change Status

function addChangeStatus(bookID) {
    let bookNumber = "#" + bookID;
    let book = document.querySelector(bookNumber);
    let statusButton = document.createElement("Select");
    statusButton.id = "options"

    book.appendChild(statusButton);

    let status = document.querySelector("#options");

    status.options[0] = new Option ("Plan to read", "Plan to Read");
    status.options[1] = new Option ("Currently Reading", "Currently Reading");
    status.options[2] = new Option ("Finished", "Finished");

    status.addEventListener("change", () => {
        let currentStatus = getStatusChange(event);
        changeStatus(book, bookID, currentStatus);
    })
}

function getStatusChange (event) {
    return event.target.value;
}

function changeStatus (book, bookID, currentStatus) {
    removeStatus(bookID);

    let td = document.createElement("td");
    td.textContent = currentStatus;
    td.id = "status-" + bookID;


    let targetElement = "delete-" + bookID;
    let parent = document.getElementById(bookID);
    let elementBefore = document.getElementById(targetElement);

    parent.insertBefore(td, elementBefore);
}

function removeStatus (bookID) {
    let bookStatus = "status-" + bookID;
    let targetStatus = document.getElementById(bookStatus);
    targetStatus.remove();
}

