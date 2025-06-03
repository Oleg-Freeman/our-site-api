const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { port } = require('./config');
const { UserController, PhotoController, ComplimentController, HealthController, DrawingController } = require('./controllers');
const { connectDb } = require('./utils');
const { UserService } = require('./services');
const { errorMiddleware, loggerMiddleware } = require('./middlewares');

const app = express();
morgan.token('body', loggerMiddleware);

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':date[iso] :method :url :status :response-time ms body :body'));

app.use('/health', HealthController);
app.use('/users', UserController);
app.use('/photos', PhotoController);
app.use('/compliments', ComplimentController);
app.use('/drawings', DrawingController);

app.use(errorMiddleware);

(async () => {
    await connectDb();
    await UserService.pullUsers();

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
})();