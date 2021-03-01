const Contacts = require('../model/contacts')

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      }
    })
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      return res.status(200).json({
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
}

const create = async (req, res, next) => {
  try {
    const result = await Contacts.addContact(req.body)
    if (result?._id) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          contact: result,
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
}

const update = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body)
    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const updateParams = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body)
    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const remove = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Contact deleted'
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
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateParams,
  remove
}