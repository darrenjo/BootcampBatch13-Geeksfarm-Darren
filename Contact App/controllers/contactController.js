import fs from "fs";
import validator from "validator";

const filePath = "data/contacts.json";

export function addContact(name, phone, email) {
  const file = fs.readFileSync(filePath, "utf-8");
  const contacts = JSON.parse(file);

  // Normalize input name (convert to lowercase)
  const lowerCaseName = name.toLowerCase();

  // Check if name already exists
  const isNameExists = contacts.some(
    (contact) => contact.name.toLowerCase() === lowerCaseName
  );

  if (isNameExists) {
    console.error(`❌ Error: Contact with name "${name}" already exists.`);
    return;
  }

  // Validate email
  if (!validator.isEmail(email)) {
    console.error(`❌ Error: "${email}" is not a valid email address.`);
    return;
  }

  // Validate phone number (Assuming Indonesian phone numbers)
  if (!validator.isMobilePhone(phone, ["id-ID"])) {
    console.error(
      `❌ Error: "${phone}" is not a valid Indonesian phone number.`
    );
    return;
  }

  // Add new contact
  const newContact = { name, phone, email };
  contacts.push(newContact);
  fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

  console.log(`Contact "${name}" added successfully.`);
}

export function listContact() {
  const file = fs.readFileSync(filePath, "utf-8");
  const contacts = JSON.parse(file);
  console.log(contacts);
}

export function updateContact(name, phone, email) {
  try {
    const file = fs.readFileSync(filePath, "utf-8");
    let contacts = JSON.parse(file);

    const index = contacts.findIndex((contact) => contact.name === name);
    if (index !== -1) {
      if (phone) contacts[index].phone = phone;
      if (email) contacts[index].email = email;
      fs.writeFileSync(filePath, JSON.stringify(contacts));
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
    const file = fs.readFileSync(filePath, "utf-8");
    let contacts = JSON.parse(file);

    const filteredContacts = contacts.filter(
      (contact) => contact.name !== name
    );

    if (contacts.length === filteredContacts.length) {
      console.log(`Contact ${name} not found.`);
    } else {
      fs.writeFileSync(filePath, JSON.stringify(filteredContacts));
      console.log(`Contact ${name} deleted successfully.`);
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
}

export function getContactDetail(name) {
  const file = fs.readFileSync(filePath, "utf-8");
  const contacts = JSON.parse(file);

  // Normalize input name (case insensitive)
  const lowerCaseName = name.toLowerCase();

  // Find the contact with a matching name
  const contact = contacts.find((c) => c.name.toLowerCase() === lowerCaseName);

  if (!contact) {
    console.error(`❌ Error: Contact with name "${name}" not found.`);
    return;
  }

  // Display contact details
  console.log("📌 Contact Details:");
  console.log(`👤 Name: ${contact.name}`);
  console.log(`📞 Phone: ${contact.phone}`);
  console.log(`📧 Email: ${contact.email}`);
}
