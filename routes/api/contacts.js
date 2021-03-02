const express = require('express')
const router = express.Router()
const validation = require('./validation')
const {
  getAll,
  getById,
  create,
  update,
  updateParams,
  remove
} = require('../../controllers/contacts')

router.get('/', getAll)
router.post('/', validation.postContact, create)

router.get('/:contactId', getById)
router.delete('/:contactId', remove)
router.put('/:contactId', validation.updateContact, update)

router.patch('/:contactId/subscription', validation.updateStatusContact, updateParams)

module.exports = router
