import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import morgan from "morgan";
import fs from "fs";
import moment from "moment-timezone";

const app = express();
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

// Function to read contacts from JSON
const getContacts = () => {
  const dataPath = path.join(process.cwd(), "data", "contacts.json");
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
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
