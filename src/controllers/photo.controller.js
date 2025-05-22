const router = require('express').Router();
const { checkAuth, imageUpload, validateRequest } = require('../middlewares');
const { PhotoService } = require('../services');
const { idSchema } = require('../schemas');

router.get('/', checkAuth, async (req, res, next) => {
    try {
        const photos = await PhotoService.getPhotos();

        res.json(photos);
    } catch (error) {
        next(error);
    }
});

router.post('/upload', checkAuth, imageUpload.single('photo'), async (req, res, next) => {
    try {
        const photo = await PhotoService.uploadPhoto(req.user, req.file);

        res.json(photo);
    } catch (error) {
        next(error);
    }
});

router.delete('/', checkAuth, validateRequest(idSchema), async (req, res, next) => {
    try {
        const { id } = req.query;

        await PhotoService.deletePhoto(id);

        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;