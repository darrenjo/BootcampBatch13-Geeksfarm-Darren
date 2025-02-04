import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

const answer1 = await rl.question("What is your name? ");
const answer2 = await rl.question("What is your phone number? ");
const answer3 = await rl.question("What is your email? ");

console.log(`Your name: ${answer1}`);
console.log(`Your phone: ${answer2}`);
console.log(`Your email: ${answer3}`);

rl.close();
