// noinspection ExceptionCaughtLocallyJS

const { CustomError } = require('../utils');

module.exports = (schema) => (req, res, next) => {
    try {
        let errors = [];
        const target = { ...req.body, ...req.params, ...req.query };

        const { error } = schema.validate(target);

        // TODO: test validation
        console.log('validation', error);

        if (errors.length) {
            const message = errors.map(({ message }) => message).join(',\n');

            throw new CustomError(400, message);
        }

        next();
    } catch (err) {
        next(err);
    }
};
