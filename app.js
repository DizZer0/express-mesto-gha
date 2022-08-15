const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');

const { urlValid } = require('./utils/urlValid');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const errHandler = require('./middlewares/errHandler');
const auth = require('./middlewares/auth');

const NoDataFound = require('./errors/NoDataFound');

const {
  login, createUser,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(urlValid),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.use(cookieParser());
app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);
app.use((req, res, next) => next(new NoDataFound('Неправильный маршрут')));
app.use(errors());
app.use(errHandler);

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.listen(PORT);
