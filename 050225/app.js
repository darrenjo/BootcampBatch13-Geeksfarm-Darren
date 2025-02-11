import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import validator from "validator";
import fs from "fs";

const path = "./data";
let fileExists = fs.existsSync("./data/contacts.json");
console.log(fileExists);

if (!fileExists) {
  fs.mkdirSync(path, { recursive: true });
  fs.writeFileSync("./data/contacts.json", "[]");
}

const rl = readline.createInterface({ input, output });

const name = await rl.question("What is your name? ");

do {
  var phone = await rl.question("What is your phone number? ");
  var phone_validator = validator.isMobilePhone(phone, ["id-ID"]);
  if (phone_validator === false) {
    console.log("invalid phone number");
  }
} while (phone_validator === false);

do {
  var email = await rl.question("What is your email? ");
  var email_validator = validator.isEmail(email);
  if (email_validator === false) {
    console.log("invalid email");
  }
} while (email_validator === false);

rl.close();

const data = { name, phone, email };

const file = fs.readFileSync("data/contacts.json", "utf-8");
const contacts = JSON.parse(file);
contacts.push(data);
fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
