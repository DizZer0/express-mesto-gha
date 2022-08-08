const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const errHandler = require('./middlewares/errHandler');
const NoDataFound = require('./errors/NoDataFound');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use((req, res, next) => {
  req.user = {
    _id: '62eab324f8ac69420c13a7f1',
  };
  next();
});
app.use(bodyParser.json());
app.use('/', userRouter);
app.use('/', cardRouter);
app.use((req, res, next) => next(new NoDataFound('Неправильный маршрут')));
app.use(errHandler);

app.listen(PORT);
