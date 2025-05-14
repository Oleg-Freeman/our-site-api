const Joi = require('@hapi/joi');
const { COMPLIMENT_TYPES } = require('../constants');

const getComplimentsSchema = Joi.object({
    type: Joi.string().valid(...Object.values(COMPLIMENT_TYPES)).required()
});

module.exports = getComplimentsSchema;
