const router = require('express').Router();
const { UserModel } = require('../models');

router.get('/', async (req, res, next) => {
    try {
        res.json({ status: 'ok' });
    } catch (error) {
        next(error);
    }
});

router.get('/db', async (req, res, next) => {
    try {
        console.log('Checking database connection...');
        const users = await UserModel.find();
        if (!users) {
            throw new Error('Database connection failed');
        }
        res.json({ status: users?.length > 0 ? 'ok' : 'empty' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;