import fs from "fs";

export function jsonChecker() {
  const path = "./data";
  let fileExists = fs.existsSync("./data/contacts.json");
  // console.log(fileExists);

  if (!fileExists) {
    fs.mkdirSync(path, { recursive: true });
    fs.writeFileSync("./data/contacts.json", "[]");
  }
}
