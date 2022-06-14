const path = require('path');
const fs = require('fs/promises');
const { v4 } = require("uuid");


contactsPath = path.join(__dirname, "/db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contactItem = contacts.find(contact => contact.id === contactId);
    if (!contactItem) {
        return null;
    }
    return contactItem;
}



async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === contactId);
    if (idx === -1) {
        return null;
    }
    const newListContacts = contacts.filter((_, index) => index !== idx);
    await await fs.writeFile(contactsPath, JSON.stringify(newListContacts));;
    return console.log(`${contacts[idx].name} is deleted`);
}



async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: v4(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return console.log(`New contact ${newContact.name} is added `)
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact

}