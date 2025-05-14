const DB_MODELS = require('./db-model-names');
const COMPLIMENT_TYPES = require('./compliment-types');
const compliments = require('./compliments');

module.exports = {
    DB_MODELS,
    COMPLIMENT_TYPES,
    ...compliments
}