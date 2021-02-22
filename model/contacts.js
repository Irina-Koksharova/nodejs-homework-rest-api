const db = require('./db')
const { v4: uuid } = require('uuid')

const listContacts = async () => {
  return db.get('contacts').value()
}

const getContactById = async (contactId) => {
  return db.get('contacts').find({ id: contactId }).value()
}

const removeContact = async (contactId) => {
  const [contactToRemove] = db.get('contacts').remove({ id: contactId }).write()
  return contactToRemove
}

const addContact = async (body) => {
  const contactsList = await listContacts()
  const isExist = contactsList.find(({ name }) => name === body.name)
  if (!isExist) {
    const contactToAdd = {
      id: uuid(),
      ...body,
      ...(body.areСolleagues ? {} : { areСolleagues: false })
    }
    db.get('contacts').push(contactToAdd).write()
    return contactToAdd
  } else {
    const message = `${body.name} is already in your contacts list`
    return message
  }
}

const updateContact = async (contactId, body) => {
  const contactToUpdate = db.get('contacts').find({ id: contactId }).assign(body).value()
  db.write()
  return contactToUpdate.id ? contactToUpdate : null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
