const libraryContainer = document.querySelector(".cards-container");
const modalContent = document.querySelector(".modal");
const modalBG = document.querySelector(".modal-bg");
const btnAddBook = document.querySelector(".btn.add-book");
const btnCloseModal = document.querySelector("#btn-close-modal");
const btnSubmitBook = document.querySelector(".btn.submit-book");
const descriptionInput = document.querySelector("#description-input");
const formInputs = document.querySelectorAll("input");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const numPagesInput = document.querySelector("#numPages-input");

const myLibrary = [];

let isFormValid = false;

function Book(title, author, numOfPages, description) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.description = description;
  this.hasRead = false;
}

function generateCard(book) {
  // Card div
  const card = document.createElement("div");
  card.classList.add("card");

  // Children of card div
  const btnRemoveBook = document.createElement("img");
  btnRemoveBook.classList.add("x-button", "onBook");
  btnRemoveBook.src = "images/close-small-svgrepo-com card.svg";
  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Children of cardHeader
  const bookTitle = document.createElement("h2");
  bookTitle.textContent = book.title;
  const author = document.createElement("h3");
  author.textContent = book.author;
  author.classList.add("card-author");

  // Children of cardBody
  const bookDescription = document.createElement("p");
  bookDescription.textContent = book.description;
  const bookStats = document.createElement("div");
  bookStats.classList.add("book-stats");
  const cardIcons = document.createElement("div");
  cardIcons.classList.add("card-icons");

  // Children of bookStats
  const numberOfPages = document.createElement("h3");
  numberOfPages.textContent = `${book.numOfPages} Pages`;

  // Children of cardIcons
  const icon1 = document.createElement("img");
  icon1.src = "images/download-ebook-svgrepo-com.svg";
  const icon2 = document.createElement("img");
  icon2.src = "images/like-hand-svgrepo-com.svg";
  const icon3 = document.createElement("img");
  icon3.src = "images/favorite-book-svgrepo-com.svg";
  const containerHasRead = document.createElement("div");
  containerHasRead.classList.add("container-hasRead");
  // Children of container-hasRead
  const hasReadLabel = document.createElement("label");
  hasReadLabel.setAttribute("for", "hasRead");
  hasReadLabel.textContent = "Has Read:";
  const hasReadInput = document.createElement("input");
  hasReadInput.setAttribute("type", "checkbox");
  hasReadInput.setAttribute("name", "hasRead");
  hasReadInput.setAttribute("id", "hasRead");
  hasReadInput.classList.add("hasRead-input");

  containerHasRead.append(hasReadLabel, hasReadInput);
  cardIcons.append(icon1, icon2, icon3, containerHasRead);
  bookStats.append(numberOfPages);
  cardBody.append(bookDescription, bookStats, cardIcons);
  cardHeader.append(bookTitle, author);
  card.append(btnRemoveBook, cardHeader, cardBody);

  return card;
}

const book1 = new Book(
  "Harry Potter and the Goblet of Fire",
  "J. K. Rowling",
  300,
  "Harry Potter and the Goblet of Fire is a fantasy novel written by British author J. K. Rowling and the fourth novel in the Harry Potter series. It follows Harry Potter, a wizard in his fourth year at Hogwarts."
);

myLibrary.push(book1);

function displayBooksFromLibrary() {
  myLibrary.forEach((book) => {
    libraryContainer.append(generateCard(book));
  });
}

function initModalForm() {
  formInputs.forEach((input) => {
    input.value = "";
    input.classList.remove("error", "valid");
  });
  descriptionInput.value = "";
  descriptionInput.classList.remove("error", "valid");
}

function hideModal() {
  modalContent.classList.add("hidden");
  modalBG.classList.add("hidden");
  initModalForm();
}
function showModal() {
  modalContent.classList.remove("hidden");
  modalBG.classList.remove("hidden");
}

function invalidateEl(el) {
  el.classList.remove("valid");
  el.classList.add("error");
}

function validateEl(el) {
  el.classList.remove("error");
  el.classList.add("valid");
}

function checkFormValidation(el) {
  if (el.value.trim() === "") {
    invalidateEl(el);
    isFormValid = false;
    return;
  }
  validateEl(el);
}

function displayLastBook() {
  libraryContainer.append(generateCard(myLibrary[myLibrary.length - 1]));
}

displayBooksFromLibrary();

btnAddBook.addEventListener("click", () => {
  showModal();
});

btnCloseModal.addEventListener("click", () => {
  hideModal();
});

window.addEventListener("keydown", (e) => {
  if (!modalBG.classList.contains("hidden") && e.code === "Escape") {
    hideModal();
  }
});

btnSubmitBook.addEventListener("click", (e) => {
  isFormValid = true;
  e.preventDefault();
  checkFormValidation(titleInput);
  checkFormValidation(authorInput);
  checkFormValidation(numPagesInput);
  checkFormValidation(descriptionInput);
  if (isFormValid) {
    // generate new Book obj and push to library arr
    myLibrary.push(
      new Book(
        titleInput.value.trim(),
        authorInput.value.trim(),
        numPagesInput.value.trim(),
        descriptionInput.value.trim()
      )
    );
    console.log(myLibrary);
    hideModal();
    displayLastBook();
  }
});

descriptionInput.addEventListener("change", () => {
  checkFormValidation(descriptionInput);
});

formInputs.forEach((input) =>
  input.addEventListener("change", () => {
    checkFormValidation(input);
  })
);

document.addEventListener("click", (e) => {
  // handle book removal button
  if (e.target.classList.contains("onBook")) {
    console.log(e.target.closest("div"));
    const cardTitle = e.target.nextElementSibling.firstChild.textContent;
    myLibrary.forEach((book, i) => {
      if (book.title === cardTitle) {
        myLibrary.splice(i, 1);
        console.log(myLibrary);
      }
    });
    e.target.closest("div").remove();
  }
  // handle has read toggle
  if (e.target.id === "hasRead") {
    const inputContainer = e.target.closest("div");
    const cardEl = inputContainer.parentElement.parentElement.parentElement; // there's got to be a better way to do this lol, will research it later
    const cardTitle =
      cardEl.firstChild.nextElementSibling.firstChild.textContent;
    myLibrary.forEach((book, i) => {
      if (book.title === cardTitle) {
        // a cheapie solution to toggle hasRead
        myLibrary[i].hasRead === false
          ? (myLibrary[i].hasRead = true)
          : (myLibrary[i].hasRead = false);
      }
    });
  }
});
