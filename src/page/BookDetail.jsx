import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this book?")) return;

    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      alert("🗑️ Deleted!");
      navigate("/books");
    } catch (err) {
      console.error(err);
      alert("❌ Delete failed");
    }
  };

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg p-4"
        style={{ borderRadius: "15px" }}
      >
        <div className="row">
          
          {/* LEFT - IMAGE */}
          <div className="col-md-5 text-center">
            <img
              src={book.image}
              alt={book.title}
              style={{
                width: "50%",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>

          {/* RIGHT - INFO */}
          <div className="col-md-7">
            <h2 className="fw-bold text-primary">{book.title}</h2>

            <p className="text-muted mb-2">
              ✍ Author: {book.author}
            </p>

            <h4 className="text-danger fw-bold mb-3">
              {book.price}
            </h4>

            <p>
              📖 This is a great book you should definitely check out!
            </p>

            {/* BUTTONS */}
            <div className="d-flex gap-2 mt-4">
              <Link
                to={`/edit-book/${book.id}`}
                className="btn btn-warning"
              >
                ✏️ Edit
              </Link>

              <button
                className="btn btn-danger"
                onClick={handleDelete}
              >
                🗑 Delete
              </button>

              <Link
                to="/books"
                className="btn btn-outline-success ms-auto"
              >
                ← Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;