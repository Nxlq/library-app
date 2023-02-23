const libraryContainer = document.querySelector(".cards-container");
const modalContent = document.querySelector(".modal");
const modalBG = document.querySelector(".modal-bg");
const btnAddBook = document.querySelector(".btn.add-book");
const btnCloseModal = document.querySelector("#btn-close-modal");

const myLibrary = [];

function Book(title, author, numOfPages, description) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.description = description;
}

function generateCard(book) {
  // Card div
  const card = document.createElement("div");
  card.classList.add("card");

  // Children of card div
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
  numberOfPages.textContent = book.numOfPages;

  // Children of cardIcons
  const icon1 = document.createElement("img");
  icon1.src = "images/download-ebook-svgrepo-com.svg";
  const icon2 = document.createElement("img");
  icon2.src = "images/like-hand-svgrepo-com.svg";
  const icon3 = document.createElement("img");
  icon3.src = "images/favorite-book-svgrepo-com.svg";

  cardIcons.append(icon1, icon2, icon3);
  bookStats.append(numberOfPages, hasRead);
  cardBody.append(bookDescription, bookStats, cardIcons);
  cardHeader.append(bookTitle, author);
  card.append(cardHeader, cardBody);
  return card;
}

const book1 = new Book(
  "Harry Potter and the Goblet of Fire",
  "J. K. Rowling",
  300,
  "Harry Potter and the Goblet of Fire is a fantasy novel written by British author......."
);

myLibrary.push(book1);
console.log(myLibrary);

function displayBooksToLibrary() {
  myLibrary.forEach((book) => {
    libraryContainer.append(generateCard(book));
  });
}

function hideModal() {
  modalContent.classList.add("hidden");
  modalBG.classList.add("hidden");
}

function showModal() {
  modalContent.classList.remove("hidden");
  modalBG.classList.remove("hidden");
}

btnAddBook.addEventListener("click", () => {
  showModal();
});

btnCloseModal.addEventListener("click", () => {
  hideModal();
});

modalContent.addEventListener("keydown", (e) => {
  console.log(e);
});

window.addEventListener("keydown", (e) => {
  if (!modalBG.classList.contains("hidden") && e.code === "Escape") {
    hideModal();
  }
});
