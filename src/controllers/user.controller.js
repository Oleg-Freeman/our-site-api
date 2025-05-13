const router = require('express').Router();
const { validateRequest } = require('../middlewares');
const { loginUserSchema } = require('../schemas');

router.post('/login', validateRequest(loginUserSchema), async (req, res, next) => {
    try {
        // const result = await loginUser(req.body);

        res.json({ OK: true});
    } catch (error) {
        next(error);
    }
})

module.exports = router;