const mongoose = require('mongoose');
const { DB_MODELS } = require('../constants');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            minlength: 6,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        token: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const UserModel = mongoose.model(DB_MODELS.USERS, userSchema);

module.exports = UserModel;
