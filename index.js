//node index add --name="Budi" --phone="0848484848" --email="mail@mail.com"

import yargs from "yargs";
import fs from "fs";
// import { hideBin } from "yargs/helpers";

const path = "./data";
let fileExists = fs.existsSync("./data/contacts.json");
// console.log(fileExists);

if (!fileExists) {
  fs.mkdirSync(path, { recursive: true });
  fs.writeFileSync("./data/contacts.json", "[]");
}

const y = yargs();

y.command({
  command: "add",
  describe: "add new contact",
  builder: {
    name: {
      describe: "contact name",
      demandOption: true,
      type: "string",
    },
    phone: {
      describe: "contact phone",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "contact email",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    const data = {
      name: argv.name,
      phone: argv.phone,
      email: argv.email,
    };
    console.log(data);
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(file);
    contacts.push(data);
    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  },
});

y.parse(process.argv.slice(2));

// const file = fs.readFileSync("data/contacts.json", "utf-8");
// const contact = JSON.parse(file);
// contact.push(contact);
// fs.writeFileSync("data/contacts.json", JSON.stringify(contact));

// yargs({
//   command: "add",
//   describe: "add new contact",
//   builder: {
//     name: {
//       describe: "contact name",
//       demandOption: true,
//       type: "string",
//     },
//     phone: {
//       describe: "contact phone",
//       demandOption: true,
//       type: "string",
//     },
//     email: {
//       describe: "contact email",
//       demandOption: true,
//       type: "string",
//     },
//   },
//   handler(argv) {
//     const contact = {
//       name: argv.name,
//       phone: argv.phone,
//       email: argv.email,
//     };
//     console.log(contact);
//   },
// });

// yargs.parse();
