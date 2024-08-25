
document.addEventListener('DOMContentLoaded', () => {
  const bookGrid = document.getElementById('bookGrid');
  const searchInput = document.getElementById('search');
  const addBookBtn = document.getElementById('addBookBtn');
  const bookModal = document.getElementById('bookModal');
  const bookForm = document.getElementById('bookForm');
  const reviewsModal = document.getElementById('reviewsModal');
  const closeReviewsModal = document.getElementById('closeReviewsModal');
  const reviewsList = document.getElementById('reviewsList');
  const reviewForm = document.getElementById('reviewForm');
  const reviewBookTitle = document.getElementById('reviewBookTitle');
  const sortCriteria = document.getElementById('sortCriteria');
  const saveBtn = document.getElementById('saveBtn');
  let books = [];
  let filteredBooks = [];
  let currentBookId = null;

  async function loadBooks() {
    try {
      const response = await fetch('books.json');
      books = await response.json();
      filteredBooks = books;
      displayBooks(filteredBooks);
    } catch (error) {
      console.error('Error loading books:', error);
    }
  }

  function displayBooks(books) {
    bookGrid.innerHTML = '';
    books.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.className = 'book-card';
      bookCard.innerHTML = `
        <div class="content">
          <h3 class="title">${book.title}</h3>
          <p class="author">${book.author}</p>
          <div class="rating">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>${book.rating}</span>
          </div>
          <p class="genre-year">${book.genre} - ${book.year}</p>
        </div>
      `;
      bookCard.addEventListener('click', () => {
        openReviewsModal(book.id);
      });
      bookGrid.appendChild(bookCard);
    });
  }

  function filterBooks() {
    const searchTerm = searchInput.value.toLowerCase();
    filteredBooks = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm) || 
      book.author.toLowerCase().includes(searchTerm) || 
      book.genre.toLowerCase().includes(searchTerm)
    );
    sortBooks();
    displayBooks(filteredBooks);
  }

  function sortBooks() {
    const criteria = sortCriteria.value;
    filteredBooks.sort((a, b) => {
      if (criteria === 'title') {
        return a.title.localeCompare(b.title);
      } else if (criteria === 'author') {
        return a.author.localeCompare(b.author);
      } else if (criteria === 'rating') {
        return b.rating - a.rating;
      }
    });
  }

  function openReviewsModal(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    currentBookId = bookId;
    reviewBookTitle.textContent = book.title;
    reviewsList.innerHTML = '';
    book.reviews.forEach(review => {
      const reviewItem = document.createElement('div');
      reviewItem.className = 'review-item';
      reviewItem.innerHTML = `
        <div class="rating">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <span>${review.rating}</span>
          <span class="user">${review.user}</span>
        </div>
        <p>${review.comment}</p>
      `;
      reviewsList.appendChild(reviewItem);
    });
    reviewsModal.classList.remove('hidden');
  }

  function closeReviewsModalFunc() {
    reviewsModal.classList.add('hidden');
  }

  function saveBooks() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(books, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "books.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  searchInput.addEventListener('input', filterBooks);
  sortCriteria.addEventListener('change', filterBooks);
  addBookBtn.addEventListener('click', () => {
    bookModal.classList.remove('hidden');
  });
  closeReviewsModal.addEventListener('click', closeReviewsModalFunc);
  saveBtn.addEventListener('click', saveBooks);

  bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newBook = {
      id: books.length + 1,
      title: bookForm.title.value,
      author: bookForm.author.value,
      genre: bookForm.genre.value,
      year: parseInt(bookForm.year.value),
      rating: 0,
      reviews: []
    };
    books.push(newBook);
    filterBooks();
    bookModal.classList.add('hidden');
    bookForm.reset();
  });

  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newReview = {
      user: reviewForm.reviewUser.value,
      rating: parseInt(reviewForm.reviewRating.value),
      comment: reviewForm.reviewComment.value
    };
    const book = books.find(b => b.id === currentBookId);
    if (book) {
      book.reviews.push(newReview);
      book.rating = book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length;
      filterBooks();
      openReviewsModal(currentBookId);
    }
    reviewForm.reset();
  });

  loadBooks();
});
document.addEventListener('DOMContentLoaded', () => {
  const bookGrid = document.getElementById('bookGrid');
  const searchInput = document.getElementById('search');
  const addBookBtn = document.getElementById('addBookBtn');
  const bookModal = document.getElementById('bookModal');
  const bookForm = document.getElementById('bookForm');
  const reviewsModal = document.getElementById('reviewsModal');
  const closeReviewsModal = document.getElementById('closeReviewsModal');
  const reviewsList = document.getElementById('reviewsList');
  const reviewForm = document.getElementById('reviewForm');
  const reviewBookTitle = document.getElementById('reviewBookTitle');
  const sortCriteria = document.getElementById('sortCriteria');
  let books = [];
  let filteredBooks = [];
  let currentBookId = null;

  async function loadBooks() {
    try {
      const response = await fetch('books.json');
      books = await response.json();
      filteredBooks = books;
      displayBooks(filteredBooks);
    } catch (error) {
      console.error('Error loading books:', error);
    }
  }

  function displayBooks(books) {
    bookGrid.innerHTML = '';
    books.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.className = 'book-card';
      bookCard.innerHTML = `
        <div class="content">
          <h3 class="title">${book.title}</h3>
          <p class="author">${book.author}</p>
          <div class="rating">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>${book.rating.toFixed(1)}</span>
          </div>
          <p class="genre-year">${book.genre} - ${book.year}</p>
        </div>
      `;
      bookCard.addEventListener('click', () => {
        openReviewsModal(book.id);
      });
      bookGrid.appendChild(bookCard);
    });
  }

  function filterBooks() {
    const searchTerm = searchInput.value.toLowerCase();
    filteredBooks = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm) || 
      book.author.toLowerCase().includes(searchTerm) || 
      book.genre.toLowerCase().includes(searchTerm)
    );
    sortBooks();
    displayBooks(filteredBooks);
  }

  function sortBooks() {
    const criteria = sortCriteria.value;
    filteredBooks.sort((a, b) => {
      if (criteria === 'title') {
        return a.title.localeCompare(b.title);
      } else if (criteria === 'author') {
        return a.author.localeCompare(b.author);
      } else if (criteria === 'rating') {
        return b.rating - a.rating;
      }
    });
  }

  function openReviewsModal(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    currentBookId = bookId;
    reviewBookTitle.textContent = book.title;
    reviewsList.innerHTML = '';
    book.reviews.forEach(review => {
      const reviewItem = document.createElement('div');
      reviewItem.className = 'review-item';
      reviewItem.innerHTML = `
        <div class="rating">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <span>${review.rating}</span>
          <span class="user">${review.user}</span>
        </div>
        <p>${review.comment}</p>
      `;
      reviewsList.appendChild(reviewItem);
    });
    reviewsModal.classList.add('show');
  }

  function closeReviewsModalFunc() {
    reviewsModal.classList.remove('show');
  }

  function addBook() {
    const newBook = {
      id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1, // Generate a new unique ID
      title: bookForm.title.value,
      author: bookForm.author.value,
      genre: bookForm.genre.value,
      year: parseInt(bookForm.year.value),
      rating: 0,
      reviews: []
    };
    books.push(newBook);
    filterBooks();
    bookModal.classList.remove('show');
    bookForm.reset();
  }

  searchInput.addEventListener('input', filterBooks);
  sortCriteria.addEventListener('change', filterBooks);
  addBookBtn.addEventListener('click', () => {
    bookModal.classList.add('show');
  });
  closeReviewsModal.addEventListener('click', closeReviewsModalFunc);

  bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBook();
  });

  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newReview = {
      user: reviewForm.reviewUser.value,
      rating: parseInt(reviewForm.reviewRating.value),
      comment: reviewForm.reviewComment.value
    };
    const book = books.find(b => b.id === currentBookId);
    if (book) {
      book.reviews.push(newReview);
      book.rating = book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length;
      filterBooks();
      openReviewsModal(currentBookId);
      reviewForm.reset();
    }
  });

  loadBooks();
});
