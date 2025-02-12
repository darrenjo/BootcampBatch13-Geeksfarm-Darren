import express from "express";
import fs from "fs";
const app = express();

const port = 3000;

const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.write(data);
    res.end();
  });
};

app.get("/", (req, res) => {
  renderHTML("./index.html", res);
});

app.get("/contact", (req, res) => {
  renderHTML("./contact.html", res);
});

app.get("/about", (req, res) => {
  renderHTML("./about.html", res);
});

app.use("/", (req, res) => {
  res.status(404);
  renderHTML("./notfound.html", res);
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
