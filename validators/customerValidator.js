const joi = require('joi');

exports.validateCustomer = joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().email().required()
});