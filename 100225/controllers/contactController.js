import fs from "fs";

export function addContact(name, phone, email) {
  const data = { name, phone, email };
  console.log(data);

  try {
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(file);
    contacts.push(data);
    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
    console.log("Contact added successfully.");
  } catch (error) {
    console.error("Error adding contact:", error);
  }
}

export function listContact() {
  const file = fs.readFileSync("./data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  console.log(contacts);
}

export function updateContact(name, phone, email) {
  try {
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    let contacts = JSON.parse(file);

    const index = contacts.findIndex((contact) => contact.name === name);
    if (index !== -1) {
      if (phone) contacts[index].phone = phone;
      if (email) contacts[index].email = email;
      fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
      console.log(`Contact ${name} updated successfully.`);
    } else {
      console.log(`Contact ${name} not found.`);
    }
  } catch (error) {
    console.error("Error updating contact:", error);
  }
}

export function deleteContact(name) {
  try {
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    let contacts = JSON.parse(file);

    const filteredContacts = contacts.filter(
      (contact) => contact.name !== name
    );

    if (contacts.length === filteredContacts.length) {
      console.log(`Contact ${name} not found.`);
    } else {
      fs.writeFileSync("data/contacts.json", JSON.stringify(filteredContacts));
      console.log(`Contact ${name} deleted successfully.`);
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
}
