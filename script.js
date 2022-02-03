window.onload = () => {
    for (let i = 0; i < localStorage.length; i++) {
        addBookToTable(i);
    }
};

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
        addBookToTable(localStorage.length - 1);
        clearFields();
    }
}

function getBook() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let status = document.getElementById("status").value;

    if (title && author && pages) {
        localStorage.setItem(`book${localStorage.length}`, JSON.stringify(new book(title, author, pages, status)));
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

function addBookToTable (number) {
    let table = document.querySelector("table");
    let tr = document.createElement("tr");

    tr.id = "book" + number;
    tr.className = "book";
    table.append(tr);

    addBookInfo(number);
    addOptions(tr.id);
}

function addOptions (bookID) {
    let bookNumber = "#" + bookID;
    let book = document.querySelector(bookNumber);
    let td = document.createElement("td");

    td.id = "options-container-" + bookID
    book.appendChild(td);

    addDeleteButton(bookID);
    addChangeStatus(bookID);
}

function addDeleteButton(bookID) {
    let container= "#options-container-" + bookID;
    let optionContainer = document.querySelector(container);
    let deleteButton = document.createElement("button");

    deleteButton.className = "delete";
    deleteButton.id = "delete-" + bookID;
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
        deleteBook(bookID);
    }

    optionContainer.appendChild(deleteButton);
}

function addBookInfo(newBook) {
    let bookNumber = "#book" + newBook;
    let book = document.querySelector(bookNumber);
    const storedBook = JSON.parse(localStorage.getItem(`book${newBook}`));

    for (const property in storedBook) {
        if (property === "read") {
            let td = document.createElement("td");
            td.id = "status-book" + newBook;
            td.textContent = storedBook[property];
            book.append(td);
        }else {
            let td = document.createElement("td");
            td.textContent = storedBook[property];
            book.append(td);
        }
    }
}

function deleteBook(bookID) {
    let book = document.getElementById(bookID);
    book.remove();
    localStorage.removeItem(bookID);
}

function deleteAll() {
    let confirmation = deleteConfirmationPrompt();

    if (confirmation) {  
        let allBooks = document.getElementsByClassName("book");
        
        while (allBooks.length > 0) {
            allBooks[0].remove();
        }

        localStorage.clear();
    }
}

function deleteConfirmationPrompt () {
    return window.confirm("Are you sure want to erase your library?")
}

//Change Status

function addChangeStatus(bookID) {
    let optionsContainer = "#options-container-" + bookID;
    let book = document.querySelector(optionsContainer);
    let statusButton = document.createElement("Select");
    statusButton.className = "change"
    statusButton.id = "options-" + bookID

    book.appendChild(statusButton);

    let x = "#" + statusButton.id
    let status = document.querySelector(x);

    status.options[0] = new Option ("Plan to ead", "Plan to Read");
    status.options[1] = new Option ("Currently Reading", "Currently Reading");
    status.options[2] = new Option ("Finished", "Finished");

    status.addEventListener("change", (e) => {
        let currentStatus = getStatusChange(e);
        changeStatus(bookID, currentStatus);
    })
}

function getStatusChange (event) {
    return event.target.value;
}

function changeStatus (bookID, currentStatus) {
    removeStatus(bookID);

    let td = document.createElement("td");
    td.textContent = currentStatus;
    td.id = "status-" + bookID;


    let optionsContainer = "options-container-" + bookID;
    let parent = document.getElementById(bookID);
    let elementBefore = document.getElementById(optionsContainer);

    parent.insertBefore(td, elementBefore);

    const book = JSON.parse(localStorage.getItem(bookID));
    book.read = currentStatus;
    localStorage.setItem(bookID, JSON.stringify(book));
}

function removeStatus (bookID) {
    let bookStatus = "status-" + bookID;
    let targetStatus = document.getElementById(bookStatus);
    targetStatus.remove();
}

