// noinspection ExceptionCaughtLocallyJS

const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');
const { CustomError } = require('../utils');
const { jwtSecret } = require('../config');

module.exports = async (req, res, next) => {
    try {
        const { authorization = '' } = req.headers;
        const [bearer, token] = authorization.split(' ');

        if (bearer !== 'Bearer') {
            throw new CustomError(401, 'Unauthorized');
        }

        const { id } = jwt.verify(token, jwtSecret);
        const user = await UserModel.findById(id);

        if (!user || !user.token || token !== user.token) {
            throw new CustomError(401, 'Unauthorized');
        }

        req.user = user;

        next();
    } catch (error) {
        const authError = new CustomError(
            error.status || 401,
            error.message || 'Unauthorized'
        );
        next(authError);
    }
};
