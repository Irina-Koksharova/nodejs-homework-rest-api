const db = require('./db')
const { ObjectID } = require('mongodb')

// Вспомагательная функция
const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name)
  return collection
}

const listContacts = async () => {
  const collection = await getCollection(db, 'contacts')
  const results = await collection.find({}).toArray()
  return results
}

const getContactById = async (contactId) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectID(contactId)
  console.log(objectId.getTimestamp())
  const [result] = await collection.find({ _id: objectId }).toArray()
  return result
}

const addContact = async (body) => {
  const contactsList = await listContacts()
  const isExist = contactsList.find(({ name }) => name === body.name)
  if (!isExist) {
    const contactToAdd = {
      ...body,
      ...(body.areСolleagues ? {} : { areСolleagues: false })
    }
    const collection = await getCollection(db, 'contacts')
    const { ops: [result] } = await collection.insertOne(contactToAdd)
    return result
  } else {
    const message = `${body.name} is already in your contacts list`
    return message
  }
}

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectID(contactId)
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: body },
    { returnOriginal: false }
  )
  return result
}

const removeContact = async (contactId) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectID(contactId)
  const { value: result } = await collection.findOneAndDelete(
    { _id: objectId }
  )
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
