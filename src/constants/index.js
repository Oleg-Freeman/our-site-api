const DB_MODELS = require('./db-model-names');
const COMPLIMENT_TYPES = require('./compliment-types');
const compliments = require('./compliments');
const USER_TYPES = require('./user-types');

module.exports = {
    DB_MODELS,
    COMPLIMENT_TYPES,
    USER_TYPES,
    ...compliments
}