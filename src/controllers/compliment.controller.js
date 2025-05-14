const router = require('express').Router();
const { checkAuth, validateRequest } = require('../middlewares');
const { getComplimentsSchema, addComplimentsSchema, idSchema } = require('../schemas');
const { ComplimentService } = require('../services');

router.get('/', checkAuth, validateRequest(getComplimentsSchema), async (req, res, next) => {
    try {
        const { type } = req.query;

        const compliments = await ComplimentService.getCompliments(type);

        res.json(compliments);
    } catch (error) {
        next(error);
    }
});

router.post('/', checkAuth, validateRequest(addComplimentsSchema), async (req, res, next) => {
    try {
        const compliment = await ComplimentService.addCompliment(req.body);

        res.status(201).json(compliment);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', checkAuth, validateRequest(idSchema), async (req, res, next) => {
    try {
        const { id } = req.params;

        await ComplimentService.deleteCompliment(id);

        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;