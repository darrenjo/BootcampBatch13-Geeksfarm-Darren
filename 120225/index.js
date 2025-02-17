import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import morgan from "morgan";
import fs from "fs";
import moment from "moment-timezone";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as view engine and use layouts
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/layout"); // Default layout file

app.use(express.static("public"));

// Custom date format for Morgan (WIB / GMT+7)
morgan.token("local-date", () => {
  return moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
});

app.use(
  morgan(
    ':local-date ":method :url :status :res[content-length] - :response-time ms"'
  )
);

// app.use((req, res, next) => {
//   console.log("morgan runs well");
//   next();
// });

const contactFile = path.join(process.cwd(), "data", "contacts.json");

// Function to read contacts from JSON
const getContacts = () => {
  return JSON.parse(fs.readFileSync(contactFile, "utf-8"));
};

const saveContacts = (contacts) => {
  fs.writeFileSync(contactFile, JSON.stringify(contacts, null, 2), "utf8");
};

// Routes
app.get("/", (req, res) => {
  res.render("index", { nama: "bbbbbbbbb", title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page from layout",
    description:
      "Highly creative and experienced graphic designer with more than 2 years of experience in managing design campaigns and projects by creating Facebook ad creatives, social media conceptualization, and more. I am passionate about working in a digital marketing agency where I can be involved in a team to deliver the best result for clients in all fields.",
    header: "About",
  });
});

app.get("/contact", (req, res) => {
  const cont = getContacts();
  res.render("contact", { cont, title: "Contact" });
});

app.post("/contact/update", (req, res) => {
  const { oldName, newName, newEmail, newPhone } = req.body;
  let contacts = getContacts();

  contacts = contacts.map((c) =>
    c.name === oldName
      ? {
          ...c,
          name: newName || c.name,
          email: newEmail || c.email,
          phone: newPhone || c.phone,
        }
      : c
  );

  saveContacts(contacts);
  res.json({ message: "Contact updated successfully!" });
});

app.post("/contact/delete", express.json(), (req, res) => {
  const { name } = req.body;
  let contacts = getContacts();

  const newContacts = contacts.filter((c) => c.name !== name);

  if (contacts.length === newContacts.length) {
    return res.status(404).send("Contact not found!");
  }

  saveContacts(newContacts);
  res.status(200).send("Deleted contact");
});

app.post("/contact/add", (req, res) => {
  const { name, phone, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required!" });
  }

  let contacts = getContacts();

  contacts.push({ name, phone, email });
  saveContacts(contacts);

  res.status(201).json({ message: "Contact added successfully!" });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render("notfound", { title: "404 Page not found" });
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});

// app.get("/product/:idProduct", (req, res) => {
//   res.send(
//     `product page with id: ${req.params.idProduct} and category: ${req.query.idCategory}`
//   );
// });
