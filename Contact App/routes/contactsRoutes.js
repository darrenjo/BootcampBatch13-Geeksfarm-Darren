import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  addContact,
  listContact,
  updateContact,
  deleteContact,
  getContactDetail,
} from "../controllers/contactController.js";

export function registerCommands() {
  return (
    yargs(hideBin(process.argv))
      // ADD CONTACT
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
        (argv) => addContact(argv.name, argv.phone, argv.email)
      )
      // LIST ALL CONTACTS
      .command("list", "list contacts", {}, () => {
        listContact();
      })
      // UPDATE CONTACT
      .command(
        "update",
        "Update a contact",
        {
          name: {
            describe: "Contact name to update",
            demandOption: true,
            type: "string",
          },
          phone: { describe: "New contact phone", type: "string" },
          email: { describe: "New contact email", type: "string" },
        },
        (argv) => updateContact(argv.name, argv.phone, argv.email)
      )
      // DELETE CONTACT BASED ON NAME
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
        (argv) => deleteContact(argv.name)
      )
      // GET CONTACT DETAILS BASED ON NAME
      .command(
        "detail",
        "View contact details",
        {
          name: {
            describe: "Contact name to view",
            demandOption: true,
            type: "string",
          },
        },
        (argv) => {
          getContactDetail(argv.name);
        }
      )
  );
}
