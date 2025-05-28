const router = require('express').Router();
const { checkAuth, validateRequest } = require('../middlewares');
const { idSchema, drawingSchema } = require('../schemas');
const { DrawingService } = require('../services');

router.get('/', checkAuth, async (req, res, next) => {
    try {
        const drawings = await DrawingService.getDrawingShortList();

        res.json(drawings);
    } catch (error) {
        next(error);
    }
})

router.get('/:id', checkAuth, validateRequest(idSchema), async (req, res, next) => {
    try {
        const drawing = await DrawingService.getDrawingById(req.params.id);

        res.json(drawing);
    } catch (error) {
        next(error);
    }
})

router.post('/', checkAuth, validateRequest(drawingSchema), async (req, res, next) => {
    try {
        const drawing = await DrawingService.createDrawing(req.user, req.body);

        res.json(drawing);
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', checkAuth, validateRequest(idSchema), async (req, res, next) => {
    try {
        await DrawingService.deleteDrawing(req.params.id);

        res.status(204).end();
    } catch (error) {
        next(error);
    }
})

module.exports = router;