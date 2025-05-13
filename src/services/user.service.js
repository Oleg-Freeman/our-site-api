const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');
const { CustomError } = require('../utils');
const { jwtSecret, users: usersConfig } = require('../config');

async function seedUsers() {
    const { oleg, olesya } = usersConfig;
    const defaultUsers = [
        {
            email: oleg.email,
            password: oleg.password,
        },
        {
            email: olesya.email,
            password: olesya.password,
        }
    ];

    try {
        const users = await UserModel.find();

        if (!users?.length) {
            console.info('Seeding users...');
            const salt = await bcrypt.genSalt(10);
            defaultUsers[0].password = await bcrypt.hash(defaultUsers[0].password, salt);
            defaultUsers[1].password = await bcrypt.hash(defaultUsers[1].password, salt);

            await UserModel.create(defaultUsers);

            console.info('Users seeded successfully');
        }
    } catch (error) {
        console.error('Error seeding users', error);
    }
}

async function loginUser({ email, password }) {
    let user = await UserModel.findOne({ email });

    if (!user) {
        throw new CustomError(400, 'Wrong credentials, try again');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new CustomError(400, 'Wrong credentials, try again');
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, {
        expiresIn: '1 day',
    });

    await UserModel.updateOne({ _id: user._id }, { $set: { token } });

    user = await UserModel.findById(user._id, '-password -token');

    return { user, token };
}

async function pullUsers() {
    setInterval(async () => {
        const d = new Date();
        const hours = d.getHours();
        const minutes = d.getMinutes();

        if (hours === 9 && minutes === 5) {
            console.log(`Pulling users at ${hours}:${minutes}`);

            const users = await UserModel.find();

            console.log('Pulled Users:', users.map(user => user._id));
        }
    }, 1000 * 60) // 1 minute
}

module.exports = {
    loginUser,
    seedUsers,
    pullUsers
}