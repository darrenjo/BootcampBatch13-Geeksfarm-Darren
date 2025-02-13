import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as view engine and use layouts
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/layout"); // Default layout file

// Routes
app.get("/", (req, res) => {
  res.render("index", { nama: "bbbbbbbbb", title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page from layout",
    description: "About page",
    header: "About us",
  });
});

app.get("/contact", (req, res) => {
  const cont = [
    { nama: "a", email: "a@mail.com" },
    { nama: "b", email: "b@mail.com" },
  ];
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
