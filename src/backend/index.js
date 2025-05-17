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
    if (result.length > 0) {
      const user = result[0];
      return res.status(200).json({
       message: 'Login success',
        userId: user.id,
        username: user.name,
        email: user.email  
      });
    }
    return res.status(401).json({ message: "Invalid credentials" });
  });
});

const fs = require("fs");
app.put("/api/profile/update", upload.single("authorPic"), (req, res) => {
  const { authorId, name, email } = req.body;
  const file = req.file;

  if (!authorId) {
    return res.status(400).json({ message: "authorId is required" });
  }

  if (!file && !name && !email) {
    return res.status(400).json({ message: "No data to update" });
  }

  let newFilename = null;

  if (file) {
    const ext = path.extname(file.originalname); 
    newFilename = `${authorId}${ext}`;
    const oldPath = file.path;
    const newPath = path.join(__dirname, "uploads", newFilename);

    if (fs.existsSync(newPath)) {
      try {
        fs.unlinkSync(newPath);
      } catch (err) {
        console.error("Failed to delete old profile pic:", err);
      }
    }

    try {
      fs.renameSync(oldPath, newPath);
    } catch (err) {
      console.error("File rename failed:", err);
      return res.status(500).json({ message: "File processing error" });
    }
  }

  const updateFields = [];
  const params = [];

  if (newFilename) {
    updateFields.push("authorPic = ?");
    params.push(newFilename);
  }
  if (name) {
    updateFields.push("name = ?");
    params.push(name);
  }
  if (email) {
    updateFields.push("email = ?");
    params.push(email);
  }

  const sql = `UPDATE author SET ${updateFields.join(", ")} WHERE authorId = ?`;
  params.push(authorId);

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Profile update failed:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      filename: newFilename,
    });
  });
});




app.post("/api/createBlog", upload.single("blogImage"), (req, res) => {
  const { blogTitle, blogDate, blogCategory, blogContent, registerId } = req.body;
  const blogImage = req.file ? req.file.filename : null;

  if (!blogTitle || !blogDate || !blogCategory || !blogContent || !registerId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const cleanBlogContent = String(blogContent).replace(/<[^>]*>/g, "");

  const insertSql =
    "INSERT INTO postDetails (blogTitle, blogDate, blogCategory, blogContent, blogImage, registerId) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    insertSql,
    [blogTitle, blogDate, blogCategory, cleanBlogContent, blogImage, registerId],
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

app.get("/api/userBlogs/:userId", (req, res) => {
  const userId = req.params.userId;
  const sql = "SELECT * FROM postDetails WHERE registerId = ? ORDER BY blogDate DESC";

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.status(200).json(result);
  });
});



app.get("/api/blogs", (req, res) => {
  const sql = "SELECT * FROM postDetails ORDER BY blogDate DESC";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.status(200).json(result);
  });
});

app.put('/api/userBlogsList/:id', upload.single('image'), (req, res) => {
  const blogId = req.params.id;
  const { blogTitle, blogDate, blogCategory, blogContent} = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = image
    ? "UPDATE postDetails SET blogTitle = ?, blogDate = ?,  blogCategory = ?, blogContent = ?, blogImage = ? WHERE blogId = ?"
    : "UPDATE postDetails SET blogTitle = ?, blogDate = ?, blogCategory = ?, blogContent = ?  WHERE blogId = ?";

  const params = image
    ? [blogTitle, blogDate, blogCategory, blogContent, image, blogId]
    : [blogTitle, blogDate, blogCategory, blogContent, blogId];

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ message: "Update failed", error: err });
    res.status(200).json({ message: "Blog updated successfully" });
  });
});

app.delete('/api/userBlogsList/:id', (req, res) => {
  const blogId = req.params.id;
  const sql = "DELETE FROM postDetails WHERE blogId = ?";

  db.query(sql, [blogId], (err, result) => {
    if (err) return res.status(500).json({ message: "Delete failed", error: err });
    res.status(200).json({ message: "Blog deleted successfully" });
  });
});

app.listen(8081, () => {
  console.log("Server running on http://localhost:8081");
});