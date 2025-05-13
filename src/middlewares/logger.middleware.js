function loggerMiddleware(req) {
    const bodyEntries = Object.entries(req.body || {});
    const blackListKeys = ['password', 'oldPassword', 'newPassword', 'token']

    if (bodyEntries && bodyEntries.length > 0) {
        return '{ ' + bodyEntries.map(([key, value]) => {
            let keyValue = value;

            if (blackListKeys.includes(key)) {
                keyValue = '********';
            }
            return `${key}: ${keyValue}`;
        }).join(', ') + ' }';
    }

    return null;
}

module.exports = loggerMiddleware;