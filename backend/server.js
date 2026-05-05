const express = require("express");
const cors = require("cors");
const { sql, connectDB } = require("./db");

const app = express();
const PORT = 5000;

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());


// ================= HOME =================
app.get("/home", (req, res) => {
  res.json({
    title: "📚 Welcome to the Book Store",
    content: `
      <p class="lead">
        Discover your next favorite book with us.
      </p>

      <p>We offer a wide collection:</p>

      <ul>
        <li>🔥 Bestsellers</li>
        <li>📖 Classic novels</li>
        <li>🌍 Multiple genres</li>
        <li>⭐ Recommended picks</li>
      </ul>

      <p>Start exploring today!</p>
    `,
  });
});


// ================= GET ALL BOOKS =================
app.get("/books", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Books ORDER BY id DESC");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Server error");
  }
});


// ================= GET BOOK BY ID =================
app.get("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql.query`
      SELECT * FROM Books WHERE id = ${id}
    `;

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "❌ Book not found" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Server error");
  }
});


// ================= ADD BOOK =================
app.post("/books", async (req, res) => {
  const { title, author, price, image } = req.body;

  // Validate
  if (!title || !author || !price) {
    return res.status(400).json({
      message: "❌ Title, Author, Price are required",
    });
  }

  try {
    await sql.query`
      INSERT INTO Books (title, author, price, image)
      VALUES (${title}, ${author}, ${price}, ${image || "/images/default.jpg"})
    `;

    res.status(201).json({ message: "✅ Book added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Server error");
  }
});


// ================= UPDATE BOOK =================
app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, price, image } = req.body;

  try {
    await sql.query`
      UPDATE Books
      SET title = ${title},
          author = ${author},
          price = ${price},
          image = ${image}
      WHERE id = ${id}
    `;

    res.json({ message: "✅ Book updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Server error");
  }
});


// ================= DELETE BOOK =================
app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await sql.query`DELETE FROM Books WHERE id = ${id}`;
    res.json({ message: "🗑️ Book deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Server error");
  }
});


// ================= CONTACT =================
app.post("/contacts", async (req, res) => {
  const { name, email, message } = req.body;

  // Validate
  if (!name || !email || !message) {
    return res.status(400).json({
      message: "❌ All fields are required",
    });
  }

  try {
    await sql.query`
      INSERT INTO Contacts (name, email, message)
      VALUES (${name}, ${email}, ${message})
    `;

    res.status(201).json({
      message: "✅ Contact saved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Server error");
  }
});

app.get("/contacts", async (req, res) => {
  try {
    const result = await sql.query(
      "SELECT * FROM Contacts ORDER BY created_at DESC"
    );
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Server error");
  }
});




// ================= START SERVER =================
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to SQL Server");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();