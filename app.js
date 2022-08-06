const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards')
const errHandler = require('./middlewares/errHandler')

const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '62eab324f8ac69420c13a7f1'
  }
  next();
})
app.use(bodyParser.json());
app.use('/', userRouter);
app.use('/', cardRouter);
app.use((req, res, next) => res.status(404).send({message:  "Неправильный маршрут" }));
app.use(errHandler);

mongoose.connect('mongodb://localhost:27017/mestodb', {
});

app.listen(PORT, (req, res) => console.log(PORT))