
async function addBook() {
    let book = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let type = document.getElementById("bookType").value;
    let imageFile = document.getElementById("bookImage").files[0];

    let publisher = document.getElementById("publisher").value;
    let language = document.getElementById("language").value;
    let printLength = document.getElementById("printLength").value;
    let dimensions = document.getElementById("dimensions").value;
    let price = document.getElementById("price").value;
    let quantity = document.getElementById("quantity").value;
    let addToHomepage = document.getElementById("addToHomepage").value;
    let description = quill.root.innerHTML;

    if (
        book.trim() === "" ||
        author.trim() === "" ||
        type.trim() === "" ||
        quill.getText().trim() === ""
    ) {
        alert("Please fill all required fields");
        return;
    }

    let books = JSON.parse(localStorage.getItem("books")) || [];
    let imageData = "";

    if (imageFile) {
        imageData = await new Promise((resolve, reject) => {
            let reader = new FileReader();

            reader.onload = function () {
                resolve(reader.result);
            };

            reader.onerror = reject;
            reader.readAsDataURL(imageFile);
        });
    }
    let newBook = {
        bookName: book,
        bookImage: imageData,
        author: author,
        bookType: type,
        publisher: publisher,
        language: language,
        printLength: printLength,
        dimensions: dimensions,
        price: price,
        quantity: quantity,
        addToHomepage: addToHomepage,
        description: description

    };

    books.push(newBook);

    localStorage.setItem("books", JSON.stringify(books));

    alert("Book Added Successfully!");

    document.getElementById("bookName").value = "";
    document.getElementById("author").value = "";
    document.getElementById("bookType").value = "";
    document.getElementById("publisher").value = "";
    document.getElementById("language").value = "";
    document.getElementById("printLength").value = "";
    document.getElementById("dimensions").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("addToHomepage").value = "no";

    quill.setText("");
}


function issueBook() {
    let member = document.getElementById("memberName").value.trim();
    let book = document.getElementById("bookName").value.trim();
    let issueDate = document.getElementById("issueDate").value;
    let issueDetails = document.getElementById("issueDetails").value.trim();
    let returnDate = document.getElementById("returnDate").value;

    if (
        member === "" ||
        book === "" ||
        issueDate === "" ||
        issueDetails === "" ||
        returnDate === ""

    ) {
        alert("Please fill all fields");
        return;
    }

    let issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];

    let newIssue = {
        memberName: member,
        bookName: book,
        issueDate: issueDate,
        issueDetails: issueDetails,
        returnDate: returnDate
    };
    issuedBooks.push(newIssue);

    localStorage.setItem("issuedBooks", JSON.stringify(issuedBooks));

    alert("Book Issued Successfully!");

    document.getElementById("memberName").value = "";
    document.getElementById("bookName").value = "";
    document.getElementById("issueDate").value = "";
    document.getElementById("returnDate").value = "";
    document.getElementById("issueDetails").value = "";
}




function addMember() {
    let form = document.getElementById("memberForm");
    form.style.display = "block";
}

function showMembers() {
    document.getElementById("membersSection").style.display = "block";
    document.getElementById("memberForm").style.display = "none";

    displayMembers();
}

function showAddMember() {
    document.getElementById("membersSection").style.display = "none";
    document.getElementById("memberForm").style.display = "block";
}
function saveMember() {
    let name = document.getElementById("memberName").value;
    let email = document.getElementById("memberEmail").value;
    let phone = document.getElementById("memberPhone").value;

    if (name.trim() === "" || email.trim() === "" || phone.trim() === "") {
        alert("Please fill all fields");
        return;
    }

    let members = JSON.parse(localStorage.getItem("members")) || [];

    let newMember = {
        name: name,
        email: email,
        phone: phone
    };

    members.push(newMember);
    localStorage.setItem("members", JSON.stringify(members));

    alert("Member Added Successfully!");

    document.getElementById("memberName").value = "";
    document.getElementById("memberEmail").value = "";
    document.getElementById("memberPhone").value = "";

}
function displayMembers() {
    let members = JSON.parse(localStorage.getItem("members")) || [];
    let memberList = document.getElementById("memberList");

    if (!memberList) return;

    memberList.innerHTML = "";

    members.forEach((member, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.phone}</td>
            <td><button onclick="deleteMember(${index})">Delete</button></td>

        `;

        memberList.appendChild(row);
    });
}

function returnBook() {
    let member = document.getElementById("memberName").value;
    let book = document.getElementById("bookName").value;

    if (member.trim() === "" || book.trim() === "") {
        alert("Please fill all fields");
    } else {
        alert("Book Returned Successfully!\n\n" +
            "Member Name: " + member +
            "\nBook Name: " + book);


    }
}
function viewBooks() {

    let searchResults = localStorage.getItem("searchResults");

    let books = searchResults !== null
        ? JSON.parse(searchResults)
        : JSON.parse(localStorage.getItem("books")) || [];
}
function toggleTheme() {

    document.body.classList.toggle("dark-theme");

    let button = document.getElementById("themeToggle");

    if (document.body.classList.contains("dark-theme")) {

        if (button) button.innerHTML = "☀️";

        localStorage.setItem("theme", "dark");
    }
    else {

        if (button) button.innerHTML = "🌙";

        localStorage.setItem("theme", "light");
    }
}
window.onload = function () {

    let theme = localStorage.getItem("theme");
    let button = document.getElementById("themeToggle");

    if (theme === "dark") {
        document.body.classList.add("dark-theme");
        if (button) {
            button.innerHTML = "☀️";
        }
    }
    displayMembers();
};


function displayBooks() {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let bookList = document.getElementById("bookList");

    if (!bookList) return;

    bookList.innerHTML = "";

    books.forEach((book, index) => {
        let card = document.createElement("div");
        card.className = "book-card";

        card.innerHTML = `
            <h3>${book.bookName}</h3>

            <img src="${book.bookImage || 'assets/image/owl.png'}"
                 alt="${book.bookName}">

            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Book Type:</strong> ${book.bookType}</p>

            <button onclick="viewBook(${index})">View</button>

            <div>
                <label>Add to Homepage:</label>
                <select id="homeOption${index}">
                    <option value="yes" ${book.addToHomepage === "yes" ? "selected" : ""}>
                        Yes
                    </option>
                    <option value="no" ${book.addToHomepage !== "yes" ? "selected" : ""}>
                        No
                    </option>
                </select>

                <button onclick="updateHomepageBook(${index})">
                    Save
                </button>
            </div>

            <button onclick="deleteBook(${index})">Delete</button>
        `;

        bookList.appendChild(card);
    });
}



function updateHomepageBook(index) {
    let books = JSON.parse(localStorage.getItem("books")) || [];

    let value = document.getElementById("homeOption" + index).value;

    books[index].addToHomepage = value;

    localStorage.setItem("books", JSON.stringify(books));

    alert("Homepage setting updated!");

    displayBooks();
}


function deleteBook(index) {
    let confirmDelete = confirm("Are you sure you want to delete this book?");

    if (confirmDelete) {
        let books = JSON.parse(localStorage.getItem("books")) || [];

        books.splice(index, 1);

        localStorage.setItem("books", JSON.stringify(books));

        displayBooks();
        alert("Book deleted successfully!");
    }
}
function deleteMember(index) {
    let confirmDelete = confirm("Are you sure you want to delete this member?");

    if (confirmDelete) {
        let members = JSON.parse(localStorage.getItem("members")) || [];

        members.splice(index, 1);

        localStorage.setItem("members", JSON.stringify(members));

        displayMembers();

        alert("Member deleted successfully!");
    }
}
function searchBooks() {

    let searchValue = document.getElementById("searchInput").value.trim().toLowerCase();

    let books = JSON.parse(localStorage.getItem("books")) || [];

    let filteredBooks = books.filter(book =>
        book.bookName.toLowerCase().includes(searchValue) ||
        book.author.toLowerCase().includes(searchValue)
    );

    localStorage.setItem("searchResults", JSON.stringify(filteredBooks));

    window.location.href = "viewbook.html";
}

function previewImage(event) {
    let image = document.getElementById("imagePreview");
    let file = event.target.files[0];

    if (file) {
        image.src = URL.createObjectURL(file);
        image.style.display = "block";
    } else {
        image.src = "";
        image.style.display = "none";
    }
}

function displayHomeBooks() {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let bookContainer = document.getElementById("homeBookList");

    if (!bookContainer) return;

    bookContainer.innerHTML = "";

    books.forEach((book, index) => {

        if (book.addToHomepage === "yes") {

            let card = document.createElement("div");
            card.className = "book-card";

            card.innerHTML = `
                <img src="${book.bookImage}" alt="${book.bookName}">
                <h3>${book.bookName}</h3>
                <p>${book.author}</p>
            `;

            card.onclick = function () {
                window.location.href = "bookdetails.html?index=" + index;
            };

            bookContainer.appendChild(card);
        }
    });
}

function displayBookDetails() {

    let params = new URLSearchParams(window.location.search);
    let index = Number(params.get("index"));

    let books = JSON.parse(localStorage.getItem("books")) || [];
    let book = books[index];

    let details = document.getElementById("bookDetails");

    if (!book || !details) {
        details.textContent = "Book not found!";
        return;
    }

    details.innerHTML = `
        <div class="book-detail-container">

            <div class="book-detail-image">
                <img src="${book.bookImage || ''}" alt="${book.bookName}">
            </div>

            <div class="book-detail-info">

                <h2>${book.bookName}</h2>

                <p><strong>Author:</strong> ${book.author}</p>

                <p><strong>Book Type:</strong> ${book.bookType}</p>

                <p><strong>Publisher:</strong> ${book.publisher}</p>

                <p><strong>Language:</strong> ${book.language}</p>

                <p><strong>Print Length:</strong> ${book.printLength}</p>

                <p><strong>Dimensions:</strong> ${book.dimensions}</p>

                <p><strong>Price:</strong> ₹${book.price}</p>

                <p><strong>Available Quantity:</strong> ${book.quantity}</p>

                <h3>Book Description</h3>

                <div>${book.description || ""}</div>

            </div>

        </div>
    `;
}
function viewBook(index) {
    window.location.href = "bookdetails.html?index=" + index;
}
function showIssuedBooks() {
    let section = document.getElementById("issuedBooksSection");

    section.style.display = "block";

    displayIssuedBooks();
}

function displayIssuedBooks() {
    let issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];

    let list = document.getElementById("issuedBooksList");

    list.innerHTML = "";

    issuedBooks.forEach((item, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.memberName}</td>
            <td>${item.bookName}</td>
            <td>${item.issueDate}</td>
            <td>${item.issueDetails}</td>
            <td>${item.returnDate}</td>
        `;

        list.appendChild(row);
    });
}
function showIssuedBooks() {
    document.getElementById("issuedBooksSection").style.display = "block";
    displayIssuedBooks();
}
