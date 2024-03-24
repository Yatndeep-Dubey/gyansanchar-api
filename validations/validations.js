const joi = require('joi')

const student_register_validation = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        phone_number: joi.string().required().max(10).min(10),
        password: joi.string().required()
    })
    return schema.validate(data)
}

module.exports = {student_register_validation}