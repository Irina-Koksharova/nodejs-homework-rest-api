const Joi = require('joi')
const { HttpCode } = require('../../../helpers/constants')

const schemaPostContact = Joi.object({
  name: Joi.string().min(3).max(20).pattern(/^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
  phone: Joi.string().required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(20).pattern(/^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/).optional(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).optional(),
  phone: Joi.string().optional(),
})

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)
  const customMessage = () => {
    const joiMessage = error.message
    const message = joiMessage.includes('pattern') || joiMessage.includes('valid') || joiMessage.includes('must')
      ? `Input Error: '${error.details[0].path}' is not valid`
      : `Missing required field '${error.details[0].path}'`
    return message
  }
  if (error) {
    return next({
      status: HttpCode.BAD_REQUEST,
      message: customMessage()
    })
  }
  next()
}

module.exports.postContact = (req, res, next) => {
  return validate(schemaPostContact, req.body, next)
}

module.exports.updateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}
