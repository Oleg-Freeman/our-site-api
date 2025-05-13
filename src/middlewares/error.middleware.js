function errorMiddleware(error, req, res, next) {
    const { status = 500, message = 'Internal server error' } = error;
    const { method, originalUrl } = req;

    console.log(`Error ${status} ${method} ${originalUrl} - `, message);
    console.error(error);

    if (error) {
        res.status(status).json({ message, method, path: originalUrl });
    }
}

module.exports = errorMiddleware;