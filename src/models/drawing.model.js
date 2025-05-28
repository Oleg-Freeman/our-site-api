const mongoose = require('mongoose');
const { DB_MODELS } = require('../constants');

const Schema = mongoose.Schema;

const DrawingSchema = new Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        stroke_width: {
            type: Number,
        },
        stroke_color: {
            type: String,
        },
        draw_mode: {
            type: Boolean,
        },
        paths: {
            type: [
                {
                    x: {
                        type: Number,
                        required: true,
                    },
                    y: {
                        type: Number,
                        required: true,
                    },
                },
            ],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const DrawingModel = mongoose.model(DB_MODELS.DRAWINGS, DrawingSchema);

module.exports = DrawingModel;