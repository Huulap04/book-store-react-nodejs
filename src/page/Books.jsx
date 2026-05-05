import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">📚 Book Store</h2>

        <Link to="/add-book" className="btn btn-success fw-bold">
          ➕ Add Book
        </Link>
      </div>

      {/* Grid */}
      <div className="row">
        {books.map((book) => (
          <div className="col-md-3 mb-4" key={book.id}>
            <div
              className="card h-100 shadow-sm border-0"
              style={{
                borderRadius: "15px",
                overflow: "hidden",
                transition: "0.3s",
              }}
            >
              {/* Image */}
              <img
                src={book.image}
                alt={book.title}
                className="card-img-top"
                style={{
                  height: "280px",
                  objectFit: "cover",
                }}
              />

              {/* Body */}
              <div className="card-body d-flex flex-column">
                <h6 className="fw-bold">{book.title}</h6>

                <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
                  ✍ {book.author}
                </p>

                <p className="text-danger fw-bold">{book.price}</p>

                <Link
                  to={`/books/${book.id}`}
                  className="btn btn-outline-success mt-auto"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {books.length === 0 && (
        <div className="text-center mt-5">
          <h5>No books found 📭</h5>
        </div>
      )}
    </div>
  );
}

export default Books;
