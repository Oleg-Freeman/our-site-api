const Joi = require('@hapi/joi');

const drawingSchema = Joi.object({
    name: Joi.string().required(),
    strokeWidth: Joi.number(),
    strokeColor: Joi.string(),
    drawMode: Joi.boolean(),
    paths: Joi.array().min(1).items(
        Joi.object({
            x: Joi.number().required(),
            y: Joi.number().required()
        })
    ).required()
});

module.exports = drawingSchema;
