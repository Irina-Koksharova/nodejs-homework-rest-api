const Joi = require('joi')

const schemaPostContact = Joi.object({
  name: Joi.string().min(3).max(20).pattern(/^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().length(10).required(),
  areСolleagues: Joi.boolean().optional()
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(20).pattern(/^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/).optional(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
  phone: Joi.string().length(10).optional(),
  areСolleagues: Joi.boolean().optional()
})

const schemaUpdateStatusContact = Joi.object({
  areСolleagues: Joi.boolean().required()
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
      status: 400,
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

module.exports.updateStatusContact = (req, res, next) => {
  return validate(schemaUpdateStatusContact, req.body, next)
}
