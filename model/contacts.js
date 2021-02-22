const { v4: uuid } = require('uuid')

// Для работы через lowdb
// const db = require('./db')

// Для работы через FileSystem
const fs = require('fs').promises
const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json')

// Для работы через lowdb
// const listContacts = async () => {
//   return db.get('contacts').value()
// }

// Для работы через FileSystem
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    const { contacts } = JSON.parse(data)
    return contacts
  } catch (error) {
    throw new Error(error.message)
  }
}

// Для работы через lowdb
// const getContactById = async (contactId) => {
//   return db.get('contacts').find({ id: contactId }).value()
// }

// Для работы через FileSystem
const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath)
    const { contacts } = JSON.parse(data)
    const selectedContact = contacts.find(({ id }) => id.toString() === contactId)
    return selectedContact
  } catch (error) {
    throw new Error(error.message)
  }
}

// Для работы через lowdb
// const removeContact = async (contactId) => {
//   const [contactToRemove] = db.get('contacts').remove({ id: contactId }).write()
//   return contactToRemove
// }

// Для работы через FileSystem
const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath)
    const { contacts } = JSON.parse(data)
    if (contacts.find(({ id }) => id === contactId)) {
      const updatedContactsList = { contacts: contacts.filter(({ id }) => id !== contactId) }
      await fs.writeFile(contactsPath, JSON.stringify(updatedContactsList, null, 2))
      return contactId
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

// Для работы через lowdb
// const addContact = async (body) => {
//   const contactsList = await listContacts()
//   const isExist = contactsList.find(({ name }) => name === body.name)
//   if (!isExist) {
//     const contactToAdd = {
//       id: uuid(),
//       ...body,
//       ...(body.areСolleagues ? {} : { areСolleagues: false })
//     }
//     db.get('contacts').push(contactToAdd).write()
//     return contactToAdd
//   } else {
//     const message = `${body.name} is already in your contacts list`
//     return message
//   }
// }

// Для работы через FileSystem
const addContact = async (body) => {
  try {
    const contactsList = await listContacts()
    const isExist = contactsList.find(({ name }) => name === body.name)
    if (!isExist) {
      const newContact = {
        id: uuid(),
        ...body,
        ...(body.areСolleagues ? {} : { areСolleagues: false })
      }
      const updatedContactsList = { contacts: [...contactsList, newContact] }
      await fs.writeFile(contactsPath, JSON.stringify(updatedContactsList, null, 2))
      return newContact
    } else {
      const message = `${body.name} is already in your contacts list`
      return message
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

// Для работы через lowdb
// const updateContact = async (contactId, body) => {
//   const contactToUpdate = db.get('contacts').find({ id: contactId }).assign(body).value()
//   db.write()
//   return contactToUpdate.id ? contactToUpdate : null
// }

// Для работы через FileSystem
const updateContact = async (contactId, body) => {
  try {
    const contactsList = await listContacts()
    const isExist = contactsList.find(({ id }) => id === contactId)
    if (isExist) {
      const updatedContact = { ...isExist, ...body }
      const notUpdatedContacts = contactsList.filter(({ id }) => id !== contactId)
      const updatedContactsList = { contacts: [...notUpdatedContacts, updatedContact] }
      await fs.writeFile(contactsPath, JSON.stringify(updatedContactsList, null, 2))
      return updatedContact
    } else {
      return null
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
