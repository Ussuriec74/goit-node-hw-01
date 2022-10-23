const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const contactsRaw = await fs.readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(contactsRaw);
  return contacts;
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find(contact => contact.id === contactId);
  return contact ? contact : null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const removedContact = allContacts.find((contact) => contact.id === contactId);
  if (!removeContact) {
    return null;
  }
  const newContactList = allContacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContactList));
  return removedContact ? removedContact : null;
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
}

module.exports = {
  listContacts, getContactById, addContact, removeContact
}