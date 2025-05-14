const mongoose = require('mongoose');
const { DB_MODELS } = require('../constants');

const Schema = mongoose.Schema;

const PhotoSchema = new Schema(
    {
        url: {
            type: String,
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const PhotoModel = mongoose.model(DB_MODELS.PHOTOS, PhotoSchema);

module.exports = PhotoModel;