const mongoose = require('mongoose');
const { DB_MODELS, USER_TYPES } = require('../constants');

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
        },
        // TODO: add user devices array
        user_type: {
            type: String,
            enum: Object.values(USER_TYPES),
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const UserModel = mongoose.model(DB_MODELS.USERS, userSchema);

module.exports = UserModel;
