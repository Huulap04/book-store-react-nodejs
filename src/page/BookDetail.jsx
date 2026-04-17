import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
      });
  }, [id]);

  return (
    <div className="container mt-4  d-flex flex-column align-items-start">
      <h2>{book.title}</h2>

      <p>Author: {book.author}</p>
      <p>Price: {book.price}</p>

      <img src={book.image} alt={book.title} style={{ width: "200px" }} />

      <br />
      <br />

      <Link to="/books" className="btn btn-success">
        ← Back to Book List
      </Link>
    </div>
  );
}

export default BookDetail;
