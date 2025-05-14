const router = require('express').Router();

router.get('/', async (req, res, next) => {
    try {
        res.json({ status: 'ok' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;