const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports.getByIdUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({data: user}))
    .catch(() => res.status(404).send({message: 'Пользователь не найден'}))
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({name, about, avatar})
    .then(user => res.send({ data: user }))
    .catch(() => res.status(400).send({message: 'переданы некорректные данные'}))
}

module.exports.updateProfile = (req, res) => {
  const {name, about } = req.body

  User.findByIdAndUpdate(req.user._id, { name: name, about: about }, { new: true })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(400).send({message: 'переданы некорректные данные'}))
}

module.exports.updateAvatar = (req, res) => {
  console.log(req.body)
  const { avatar } = req.body

  User.findByIdAndUpdate(req.user._id, { avatar: avatar }, { new: true })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(400).send({message: 'переданы некорректные данные'}))
}