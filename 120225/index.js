import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import morgan from "morgan";
import moment from "moment-timezone";
import { body, validationResult } from "express-validator";
import pool from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as view engine and use layouts
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/layout");
app.use(express.static("public"));

// Custom date format for Morgan (WIB / GMT+7)
morgan.token("local-date", () =>
  moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")
);
app.use(
  morgan(
    ':local-date ":method :url :status :res[content-length] - :response-time ms"'
  )
);

// Routes
app.get("/", (req, res) => {
  res.render("index", { nama: "bbbbbbbbb", title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    description: "About Us",
    header: "About",
  });
});

// Get all contacts
app.get("/contact", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM contacts");
    res.render("contact", { cont: rows, title: "Contact" });
  } catch (err) {
    res.status(500).send("Error fetching contacts");
  }
});

// Add Contact
app.post(
  "/contact/add",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("phone")
      .optional()
      .isMobilePhone("id-ID")
      .withMessage("Invalid phone number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { name, email, phone } = req.body;
      await pool.query(
        "INSERT INTO contacts (name, email, phone) VALUES ($1, $2, $3)",
        [name, email, phone]
      );
      res.status(201).json({ message: "Contact added successfully!" });
    } catch (err) {
      res.status(500).json({ error: "Database error" });
    }
  }
);

// Update Contact
app.post(
  "/contact/update",
  [
    body("newName").notEmpty().withMessage("Name is required"),
    body("newEmail").isEmail().withMessage("Invalid email format"),
    body("newPhone")
      .optional()
      .isMobilePhone("id-ID")
      .withMessage("Invalid phone number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { oldName, newName, newEmail, newPhone } = req.body;
      const { rowCount } = await pool.query(
        "UPDATE contacts SET name = $1, email = $2, phone = $3 WHERE name = $4",
        [newName, newEmail, newPhone, oldName]
      );
      if (rowCount === 0)
        return res.status(404).json({ error: "Contact not found" });
      res.json({ message: "Contact updated successfully!" });
    } catch (err) {
      res.status(500).json({ error: "Database error" });
    }
  }
);

// Delete Contact
app.post("/contact/delete", async (req, res) => {
  try {
    const { name } = req.body;
    const { rowCount } = await pool.query(
      "DELETE FROM contacts WHERE name = $1",
      [name]
    );
    if (rowCount === 0)
      return res.status(404).json({ error: "Contact not found" });
    res.status(200).send("Deleted contact");
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render("notfound", { title: "404 Page not found" });
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
