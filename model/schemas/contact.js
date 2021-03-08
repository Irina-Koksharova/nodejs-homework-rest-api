const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set a name for your contact'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Set an email for your contact']
  },
  phone: {
    type: String,
    required: [true, 'Set a phone number for your contact']
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  }
},
{
  versionKey: false,
  timestamps: true
})

const Contact = model('contact', contactSchema)

module.exports = Contact
