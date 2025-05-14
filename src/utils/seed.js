const connectDb = require('./db');
const { UserService, ComplimentService } = require('../services');

async function seed() {
    await connectDb();
    await UserService.seedUsers();
    await ComplimentService.seedCompliments();
}

seed().catch((error) => {
    console.error('Error seeding database:', error);
}).finally(() => {
    process.exit(0);
});