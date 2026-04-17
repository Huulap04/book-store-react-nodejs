import { useState } from "react";
import axios from "axios";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/books", book)
      .then((res) => {
        alert("Add book success!");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Add Book</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="author"
          placeholder="Author"
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          className="form-control mb-2"
        />

        <button className="btn btn-primary">Add</button>
      </form>
      <Link to="/books" className="btn btn-success mt-3 ">
        ← Back to Book List
      </Link>
    </div>
  );
}

export default AddBook;
