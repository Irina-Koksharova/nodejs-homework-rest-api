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
  if (body?.name && body?.email && body?.phone) {
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
      const message = `${body.name} is already exist`
      return message
    }
  } else {
    const message = 'Missing required name field'
    return message
  }
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
