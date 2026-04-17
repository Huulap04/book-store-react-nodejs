import { useState } from "react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Please enter your name";
    if (!formData.email) newErrors.email = "Please enter a valid email";
    if (!formData.message) newErrors.message = "Please enter your message";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    axios
      .post("http://localhost:5000/contacts", formData)
      .then(() => {
        alert("Contact submitted successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setErrors({});
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <div>
      <form className="container py-4 text-start" onSubmit={handleSubmit}>
        <h3>Contact Us</h3>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            name="message"
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
            rows="3"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && (
            <div className="invalid-feedback">{errors.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>

        <button
          type="reset"
          className="btn btn-secondary ms-2"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default Contact;
