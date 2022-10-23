const { Command } = require("commander");
const program = new Command();

const { listContacts, getContactById, addContact, removeContact } = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const contactList = await listContacts();
        console.table(contactList);
        
      } catch (err) {
        console.error(err);
      }
      break;

    case "get":
      try {
        const contact = await getContactById(id);
        console.log("getContactById:", contact);
      } catch (err) {
        console.error(err);
      }
      break;

    case "add":
      try {
        const addedContact = await addContact(name, email, phone);
        console.log("Added contact:", addedContact);
      } catch (err) {
        console.error(err);
      }
      break;

    case "remove":
      try {
        const removedContact = await removeContact(id);
        console.log("Removed contact:", removedContact);
      } catch (err) {
        console.error(err);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);





