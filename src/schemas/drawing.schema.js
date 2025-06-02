const Joi = require('@hapi/joi');

const drawingSchema = Joi.object({
    name: Joi.string().required(),
    layers: Joi.array().min(1).items(
        Joi.object({
            _id: Joi.string().hex().length(24).optional(),
            strokeWidth: Joi.number().default(5),
            strokeColor: Joi.string().default('#000000'),
            drawMode: Joi.boolean().default(true),
            paths: Joi.array().min(1).items(
                Joi.object({
                    x: Joi.number().required(),
                    y: Joi.number().required()
                })
            ).required()
        })
    ),
});

module.exports = drawingSchema;
