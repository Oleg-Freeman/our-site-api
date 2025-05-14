const { ComplimentModel } = require('../models');
const { COMPLIMENTS_FOR_HIM, COMPLIMENTS_FOR_HER, COMPLIMENT_TYPES } = require('../constants');
const { CustomError } = require('../utils');

async function getCompliments(type) {
    const compliments = await ComplimentModel.find({ compliment_type: type });

    return compliments || [];
}

async function addCompliment({ type, text }) {
    const compliment = await ComplimentModel.create({ text, compliment_type: type });

    return compliment;
}

async function deleteCompliment(id) {
    const compliment = await ComplimentModel.findById(id);

    if (!compliment) {
        throw new CustomError(404, 'Compliment not found');
    }

    await ComplimentModel.findByIdAndDelete(id);
}

async function seedCompliments() {
    const compliments = await ComplimentModel.find();

    if (compliments?.length !== 0) {
        console.info('Compliments already seeded');
        return;
    }

    console.info('Seeding compliments...');

    const data = [];
    COMPLIMENTS_FOR_HIM.forEach(text => {
        data.push({ text, compliment_type: COMPLIMENT_TYPES.FOR_HIM });
    });
    COMPLIMENTS_FOR_HER.forEach(text => {
        data.push({ text, compliment_type: COMPLIMENT_TYPES.FOR_HER });
    });

    await ComplimentModel.create(data);

    console.info('Compliments seeded successfully.');
}

module.exports = {
    getCompliments,
    addCompliment,
    seedCompliments,
    deleteCompliment
}