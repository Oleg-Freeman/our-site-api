const Joi = require('@hapi/joi');

const idSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
});

module.exports = idSchema;
