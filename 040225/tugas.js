import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

const name = await rl.question("What is your name? ");
const phone = await rl.question("What is your phone number? ");
const email = await rl.question("What is your email? ");

console.log(`Your name: ${name}`);
console.log(`Your phone: ${phone}`);
console.log(`Your email: ${email}`);

rl.close();
