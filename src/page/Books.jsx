import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);
  return (
    <div className=" mt-4 d-flex flex-column align-items-start">
      <div>
        <Link to="/add-book" className="btn btn-success mt-auto">
          + Add Book
        </Link>
      </div>
      <h2>Book List</h2>

      <div className="row text-start">
        {books.map((book) => (
          <div className="col-md-3 mb-4" key={book.id}>
            <div className="card h-100 w-100">
              <img
                src={book.image}
                className="card-img-top"
                alt={book.title}
                style={{ height: "300px", objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{book.title}</h6>
                <p
                  className="card-text mb-1  text-muted"
                  style={{ fontSize: "14px" }}
                >
                  Author: {book.author}
                </p>
                <p className="card-text">Price: {book.price}</p>
                <Link
                  to={`/books/${book.id}`}
                  className="btn btn-success mt-auto"
                >
                  <i className="bi bi-arrow-right me-1"> </i>
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Books;
