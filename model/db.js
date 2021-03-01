const mongoose = require('mongoose')
require('dotenv').config()
const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

mongoose.connection.on('connected', () => {
  console.log('Database connection successful')
})

mongoose.connection.on('error', (error) => {
  console.log(`Database connection error: ${error.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('Database was disconnected')
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  console.log('Connection for db was closed')
  process.exit(1)
})

module.exports = db
