const { v2: cloudinary } = require('cloudinary');
const { cloudinary: config } = require('../config');

const { api_key, api_secret, asset_folder, cloud_name } = config;

cloudinary.config({ cloud_name, api_key, api_secret, asset_folder });

const upload = async (path) => {
    const { secure_url: imageURL } = await cloudinary.uploader.upload(path);

    return imageURL;
};

const deleteImage = async (imageURL) => {
    const publicId = imageURL.split('/').pop().split('.')[0];

    await cloudinary.uploader.destroy(publicId);
};

module.exports = { upload, deleteImage };
