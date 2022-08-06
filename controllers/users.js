const User = require('../models/user');
const ValidationError = require('../errors/ValidationError')
const NoDataFound = require('../errors/NoDataFound')

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then(users => res.send( users ))
    .catch(err => next({message: 'Произошла ошибка'}))
}

module.exports.getByIdUser = (req, res, next) => {

  User.findById(req.params.userId)
    .then(user => {
      console.log(user)
      if(user) {
        res.send({ data: user});
        return;
      } else {
        next(new NoDataFound('Пользователь с таким id не найден'))
      }
    })
    .catch(() => {
      if(err.name === 'CastError') {
        next(new ValidationError('Невалидный id'))
      } else {
        next({message: 'Произошла ошибка'})
      }
    })
}

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({name, about, avatar})
    .then(user => res.send( user ))
    .catch(() => {
      if(err.name === 'CastError') {
        next(new ValidationError('Некорректные данные'))
      } else {
        next({message: 'Произошла ошибка'})
      }
    })
}

module.exports.updateProfile = (req, res, next) => {
  let { name, about } = req.body
  User.findByIdAndUpdate(req.user._id, { name: name, about: about }, { new: true, runValidators: true })
    .then(user => {
      if(name.length > 2 && 30 > name.length && about.length > 2 && 30 > about.length) {
        res.send( user );
        return;
      }
    })
    .catch(() => {
      if(err.name === 'CastError') {
        next(new ValidationError('Некорректные данные'))
      } else {
        next({message: 'Произошла ошибка'})
      }
    })
}

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body

  User.findByIdAndUpdate(req.user._id, { avatar: avatar }, { new: true, runValidators: true })
    .then(user => res.send( user ))
    .catch(() => {
      if(err.name === 'CastError') {
        next(new ValidationError('Некорректные данные'))
      } else {
        next({message: 'Произошла ошибка'})
      }
    })
}