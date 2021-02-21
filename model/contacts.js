const db = require('./db')
const { v4: uuid } = require('uuid')

const listContacts = async () => {
  return db.get('contacts').value()
}

const getContactById = async (contactId) => {
  return db.get('contacts').find({ id: contactId }).value()
}

const removeContact = async (contactId) => {
  const [contactToRemove] = db.get('contacts').find({ contactId }).wtite()
  return contactToRemove
}

const addContact = async (body) => {
  const id = uuid()
  const contactToAdd = {
    id,
    ...body,
    ...(body.areСolleagues ? {} : { areСolleagues: false })
  }
  db.get('contacts').push(contactToAdd).write()
  return contactToAdd
}

const updateContact = async (contactId, body) => {
  const contactToUpdate = db.get('contacts').find({ contactId }).assign(body).value()
  db.write()
  return contactToUpdate.contactId ? contactToUpdate : null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
