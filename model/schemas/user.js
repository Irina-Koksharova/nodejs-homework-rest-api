const mongoose = require('mongoose')
const { Schema, model } = mongoose
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 8
const { Subscription } = require('../../helpers/constants')

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate(value) {
      const isValid = /\S+@\S+\.\S+/
      return isValid.test(String(value).toLowerCase())
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  token: {
    type: String,
    default: null,
  },
  subscription: {
    type: String,
    enum: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
    default: Subscription.FREE
  }
},
{
  versionKey: false,
  timestamps: true
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
  this.password = await bcrypt.hash(this.password, salt, null)
  next()
})

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User
