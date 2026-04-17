const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let home = {
    "title": "Welcome to the Book Store",
    "content": "<p class=\"lead\">Discover a world of stories and knowledge at our Book Store, where every page is a portal to a new adventure.</p><p>With an extensive collection of over 10,000 titles, you'll always find something tailored to your interests. From thrilling mysteries to heartwarming romances, captivating science fiction to insightful non-fiction, our shelves are brimming with possibilities.</p><p>What sets us apart?</p><ul><li><strong>Curated Bestsellers:</strong> Stay ahead of the literary curve with the latest must-reads and award winners.</li><li><strong>Timeless Classics:</strong> Rediscover the magic of iconic works that have stood the test of time.</li><li><strong>Diverse Genres:</strong> Explore everything from historical fiction and biographies to fantasy and self-help.</li><li><strong>Expert Recommendations:</strong> Our team of book enthusiasts curates personalized lists to help you find your next great read.</li></ul><p>More than just a store, we are a community of passionate readers. Join us for author signings, book clubs, and literary discussions that promise to ignite your love for literature. Dive into the world of books, where every story is waiting to be uncovered.</p>"
  };

const books = [
  {
      "id": "1",
      "title": "Harry Potter",
      "author": "J.K. Rowling",
      "price": "$20",
      "image": "/images/book-1.jpg"
    },
    {
      "id": "2",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "price": "$15",
      "image": "/images/book-2.jpg"
    },
    {
      "id": "3",
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "price": "$18",
      "image": "/images/book-3.jpg"
    },
    {
      "id": "4",
      "title": "1984",
      "author": "George Orwell",
      "price": "$22",
      "image": "/images/book-4.jpg"
    },
    {
      "id": "5",
      "title": "The Catcher in the Rye",
      "author": "J.D. Salinger",
      "price": "$19",
      "image": "/images/book-5.jpg"
    },
    {
      "id": "6",
      "title": "Pet Sematary",
      "author": "Stephen King",
      "price": "$29",
      "image": "/images/book-6.jpg"
    },
    {
      "id": "7",
      "title": "C++ Primer 5th edition",
      "author": "Stanley B.Lippman",
      "price": "$49",
      "image": "/images/book-7.jpg"
    },
    {
      "id": "8",
      "title": "Where The Crawdads Sing",
      "author": "Della Owens",
      "price": "$39",
      "image": "/images/book-8.jpg"
    },
    {
      "id": "9",
      "title": "The Hobbit",
      "author": "J.R.R Tolkien",
      "price": "$50",
      "image": "/images/book-9.jpg"
    },
    {
      "id": "10",
      "title": "The Lord Of The Rings",
      "author": "J.R.R Tolkien",
      "price": "$59",
      "image": "/images/book-10.jpg"
    },
    {
      "id": "11",
      "title": "Mastering ChatGPT for Beginners",
      "author": "Shane Corbitt",
      "price": "$99",
      "image": "/images/book-11.jpg"
    },
    {
      "id": "12",
      "title": "Make American Greate Again",
      "author": "Donald J.Trump",
      "price": "$19",
      "image": "/images/book-12.jpg"
    }
];
app.get('/home', (req, res) => {
  res.json(home);
});

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json(book);
});



app.post('/books', (req, res) => {
  const newBook = req.body;

  newBook.id = Date.now().toString(); // tạo id đơn giản

  books.push(newBook);

  res.status(201).json(newBook);
});


let contacts = [];
app.post('/contacts', (req, res) => {
  const newContact = req.body;
  newContact.id = Date.now().toString();
  contacts.push(newContact);
  res.status(201).json(newContact);
});

app.get('/contacts', (req, res) => {
  res.json(contacts);
});

app.listen(5000, () => {
  console.log('Server is running at http://localhost:5000');
});