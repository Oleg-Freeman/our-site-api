const Joi = require('@hapi/joi');
const { COMPLIMENT_TYPES } = require('../constants');

const addComplimentsSchema = Joi.object({
    text: Joi.string().required(),
    type: Joi.string().valid(...Object.values(COMPLIMENT_TYPES)).required()
});

module.exports = addComplimentsSchema;
