// noinspection ExceptionCaughtLocallyJS

const { CustomError } = require('../utils');

module.exports = (schema) => (req, res, next) => {
    try {
        const target = { ...req.body, ...req.params, ...req.query };

        const { error } = schema.validate(target);

        if (error) {
            throw new CustomError(400, error.message || 'Validation error');
        }

        next();
    } catch (err) {
        next(err);
    }
};
