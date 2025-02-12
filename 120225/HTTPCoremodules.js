import fs from "fs";
import { createServer } from "http";
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

const server = createServer((req, res) => {
  const url = req.url;
  console.log(url);

  res.writeHead(200, { "Content-Type": "text/html" });

  if (url === "/about") {
    renderHTML("./about.html", res);
  } else if (url === "/contact") {
    renderHTML("./contact.html", res);
  } else {
    renderHTML("./index.html", res);
  }
});

server.listen(port, () => {
  //   console.log(`Server running at http://${hostname}:${port}/`);
  console.log(`Server running at port ${port}`);
});
