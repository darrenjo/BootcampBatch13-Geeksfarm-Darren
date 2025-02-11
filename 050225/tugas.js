import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import validator from "validator";

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

console.log(`Your name: ${name}`);
console.log(`Your phone: ${phone}, ${validator.isMobilePhone(phone)}`);
console.log(`Your email: ${email}, ${validator.isEmail(email)}`);

rl.close();
