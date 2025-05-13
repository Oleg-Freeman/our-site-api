const checkAuth = require('./auth.middleware');
const validateRequest = require('./validation.middleware');
const imageUpload = require('./image-upload.middleware');
const errorMiddleware = require('./error.middleware');
const loggerMiddleware = require('./logger.middleware');

module.exports = {
    checkAuth,
    validateRequest,
    imageUpload,
    errorMiddleware,
    loggerMiddleware
};
