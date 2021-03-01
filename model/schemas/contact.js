const mongoose = require('mongoose')
const { Schema, model } = mongoose

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
  subscription: {
    type: String,
    default: 'free'
  },
  password: {
    type: String,
    default: 'password'
  },
  token: {
    type: String,
    default: ''
  }
},
{
  versionKey: false,
  timestamps: true
})

const Contact = model('contact', contactSchema)

module.exports = Contact
