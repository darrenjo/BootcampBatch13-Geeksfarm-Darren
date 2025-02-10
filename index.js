//node index add --name="Budi" --phone="0848484848" --email="mail@mail.com"
//node index list
//node index update --name="Budi" --phone="084"
//node index delete --name="Budi"

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { jsonChecker } from "./utils/checkjson.js";
import {
  addContact,
  listContact,
  updateContact,
  deleteContact,
} from "./controllers/contactController.js";

jsonChecker();

yargs(hideBin(process.argv))
  // ADD USER
  .command(
    "add",
    "Add new contact",
    {
      name: {
        describe: "Contact name",
        demandOption: true,
        type: "string",
      },
      phone: {
        describe: "Contact phone",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Contact email",
        demandOption: true,
        type: "string",
      },
    },
    (argv) => {
      addContact(argv.name, argv.phone, argv.email);
    }
  )
  // LIST ALL USER
  .command("list", "list contacts", {}, () => {
    listContact();
  })
  // UPDATE USER BASED ON NAME
  .command(
    "update",
    "Update a contact",
    {
      name: {
        describe: "Contact name to update",
        demandOption: true,
        type: "string",
      },
      phone: {
        describe: "New contact phone",
        type: "string",
      },
      email: {
        describe: "New contact email",
        type: "string",
      },
    },
    (argv) => {
      updateContact(argv.name, argv.phone, argv.email);
    }
  )
  // DELETE CONTACT
  .command(
    "delete",
    "Delete a contact",
    {
      name: {
        describe: "Contact name to delete",
        demandOption: true,
        type: "string",
      },
    },
    (argv) => {
      deleteContact(argv.name);
    }
  )
  .parse();
