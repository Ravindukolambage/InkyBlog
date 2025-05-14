const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "inky",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post("/api/register", (req, res) => {
  const { name, email, password, conPassword } = req.body;

  if (!name || !email || !password || !conPassword) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const checkSql = "SELECT * FROM register WHERE name = ? OR email = ?";
  db.query(checkSql, [name, email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length > 0) {
      return res
        .status(409)
        .json({ message: "Username or Email already exists" });
    }

    const insertSql =
      "INSERT INTO register (name, email, password, conPassword) VALUES (?, ?, ?, ?)";
    db.query(insertSql, [name, email, password, conPassword], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(200).json({ message: "User registered successfully" });
    });
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM register WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (result.length > 0)
      return res.status(200).json({ message: "Login success" });
    return res.status(401).json({ message: "Invalid credentials" });
  });
});

app.post("/api/createBlog", upload.single("blogImage"), (req, res) => {
  const { blogTitle, blogDate, blogCategory, blogContent } = req.body;
  const blogImage = req.file ? req.file.filename : null;

  if (!blogTitle || !blogDate || !blogCategory || !blogContent) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const cleanBlogContent = String(blogContent).replace(/<[^>]*>/g, "");

  const insertSql =
    "INSERT INTO postDetails (blogTitle, blogDate, blogCategory, blogContent, blogImage) VALUES (?, ?, ?, ?, ?)";

  db.query(
    insertSql,
    [blogTitle, blogDate, blogCategory, cleanBlogContent, blogImage],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      res.status(200).json({
        message: "Blog created successfully",
        image: blogImage,
        result,
      });
    }
  );
});


app.get("/api/blogs", (req, res) => {
  const sql = "SELECT * FROM postDetails ORDER BY blogDate DESC";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.status(200).json(result);
  });
});


app.listen(8081, () => {
  console.log("Server running on http://localhost:8081");
});
