const mongoose = require('mongoose');
const { DB_MODELS, COMPLIMENT_TYPES } = require('../constants');

const Schema = mongoose.Schema;

const ComplimentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    compliment_type: {
        type: String,
        enum: Object.values(COMPLIMENT_TYPES),
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false,
});

const ComplimentModel = mongoose.model(DB_MODELS.COMPLIMENTS, ComplimentSchema);

module.exports = ComplimentModel;