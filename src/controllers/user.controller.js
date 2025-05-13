const router = require('express').Router();
const { validateRequest } = require('../middlewares');
const { loginUserSchema } = require('../schemas');
const { UserService } = require('../services');

router.post('/login', validateRequest(loginUserSchema), async (req, res, next) => {
    try {
        const result = await UserService.loginUser(req.body);

        res.json(result);
    } catch (error) {
        next(error);
    }
})

module.exports = router;