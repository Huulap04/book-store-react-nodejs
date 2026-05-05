import { useState } from "react";
import { Link } from "react-router-dom";

function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });

      if (res.ok) {
        alert("✅ Book added successfully!");
        setBook({
          title: "",
          author: "",
          price: "",
          image: "",
        });
      } else {
        alert("❌ Failed to add book");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error connecting to server");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div
        className="card p-4 shadow-lg"
        style={{ width: "500px", borderRadius: "15px" }}
      >
        <h2 className="text-center mb-4 text-primary fw-bold">
          📚 Add New Book
        </h2>

        <form onSubmit={handleSubmit} className="text-start">
          {/* Title */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter book title"
              required
            />
          </div>

          {/* Author */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Author</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter author name"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Price</label>
            <input
              type="text"
              name="price"
              value={book.price}
              onChange={handleChange}
              className="form-control"
              placeholder="$20"
              required
            />
          </div>

          {/* Image */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Image URL</label>
            <input
              type="text"
              name="image"
              value={book.image}
              onChange={handleChange}
              className="form-control"
              placeholder="/images/book-1.jpg"
            />
          </div>

          {/* Preview ảnh */}
          {book.image && (
            <div className="text-center mb-3">
              <img
                src={book.image}
                alt="preview"
                style={{
                  width: "150px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
          )}

          {/* Button */}
          <button className="btn btn-primary w-100 fw-bold">
            ➕ Add Book
          </button>
        </form>

        {/* Back */}
        <Link to="/books" className="btn btn-outline-success mt-3 w-100">
          ← Back to Book List
        </Link>
      </div>
    </div>
  );
}

export default AddBook;