const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '62eab324f8ac69420c13a7f1'
  }
  next();
})
app.use(bodyParser.json());
app.use('/', userRouter)

mongoose.connect('mongodb://localhost:27017/mestodb', {
});

app.listen(PORT, (req, res) => console.log(PORT))