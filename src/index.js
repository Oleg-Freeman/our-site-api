const express = require('express');
const app = express();
const cors = require('cors');
const { port } = require('./config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((error, req, res, next) => {
    const { status = 500, message = 'Internal server error' } = error;
    const { method, originalUrl } = req;

    console.error(`Error ${status} ${method} ${originalUrl} - `, message);

    if (error) {
        res.status(status).json({ message, method, path: originalUrl });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});