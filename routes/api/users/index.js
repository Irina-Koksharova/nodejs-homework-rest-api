const express = require('express')
const router = express.Router()
const validation = require('./validation')
const {
  register, login, logout
} = require('../../../controllers/users')

router.post('/register', validation.createUser, register)
router.post('/login', validation.loginUser, login)
router.post('/logout', logout)

module.exports = router
