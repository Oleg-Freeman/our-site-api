const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { port } = require('./config');
const { UserController, PhotoController } = require('./controllers');
const { connectDb } = require('./utils');
const { UserService } = require('./services');
const { errorMiddleware, loggerMiddleware } = require('./middlewares');

const app = express();
morgan.token('body', loggerMiddleware);

(async () => {
    await connectDb();
    await UserService.seedUsers();
    await UserService.pullUsers();
})();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':date[iso] :method :url :status :response-time ms body :body'));

app.use('/users', UserController);
app.use('/photos', PhotoController);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});