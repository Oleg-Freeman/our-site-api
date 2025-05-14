const { imageUploader, CustomError } = require('../utils');
const { PhotoModel } = require('../models');

async function getPhotos() {
    const photos = await PhotoModel.find();

    return photos || [];
}

async function uploadPhoto(user, file) {
    const imageURL = await imageUploader.upload(file.path);

    await PhotoModel.create({ url: imageURL, user_id: user._id })

    return imageURL;
}

async function deletePhoto(id) {
    const photo = await PhotoModel.findById(id);

    if (!photo) {
        throw new CustomError(404, 'Photo not found');
    }

    await imageUploader.deleteImage(photo.url);
    await PhotoModel.findByIdAndDelete(id);
}

module.exports = {
    uploadPhoto,
    getPhotos,
    deletePhoto
}