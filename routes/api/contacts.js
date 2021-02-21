const express = require('express')
const router = express.Router()
const Contacts = require('../../model/contacts')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        }
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const result = await Contacts.addContact(req.body)
    if (result?.id) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          result,
        }
      })
    } else {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: result
      })
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
