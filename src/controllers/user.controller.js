const router = require('express').Router();
const { validateRequest, checkAuth } = require('../middlewares');
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

router.get('/logout', checkAuth, async(req, res, next) => {
    try {
        await UserService.logoutUser(req.user);

        res.status(204).end();
    } catch (error) {
        next(error);
    }
})

router.get('/me', checkAuth, async (req, res, next) => {
    try {
        res.json(req.user);
    } catch (error) {
        next(error);
    }
})

module.exports = router;