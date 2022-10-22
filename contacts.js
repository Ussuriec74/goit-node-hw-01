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
  const contactIndex = allContacts.findIndex(contact => contact.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  allContacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
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
}

module.exports = {
  listContacts, getContactById, addContact, removeContact
}