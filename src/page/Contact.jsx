import { useState } from "react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Please enter your name";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.message.trim())
      newErrors.message = "Please enter your message";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await axios.post("http://localhost:5000/contacts", formData);

      setSuccess("✅ Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setErrors({});
    } catch (err) {
      console.error(err);
      setSuccess("❌ Failed to send message");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setErrors({});
    setSuccess("");
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div
        className="card shadow-lg p-4"
        style={{ width: "500px", borderRadius: "15px" }}
      >
        <h3 className="text-primary fw-bold mb-3">📩 Contact Us</h3>

        {/* Success message */}
        {success && (
          <div className="alert alert-info">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="text-start">
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* Message */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Message</label>
            <textarea
              name="message"
              className={`form-control ${errors.message ? "is-invalid" : ""}`}
              rows="4"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && (
              <div className="invalid-feedback">{errors.message}</div>
            )}
          </div>

          {/* Buttons */}
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary w-100">
              📨 Send Message
            </button>

            <button
              type="reset"
              className="btn btn-outline-secondary w-100"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;