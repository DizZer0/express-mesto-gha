const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then(users => res.send( users ))
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports.getByIdUser = (req, res) => {

  User.findById(req.params.userId)
    .then(user => {
      console.log(user)
      if(user) {
        res.send({ data: user});
        return;
      }
      res.status(404).send({message: 'Пользователь не найден'})
    })
    .catch(err => res.status(400).send({message: 'Произошла ошибка'}))
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({name, about, avatar})
    .then(user => res.send( user ))
    .catch(() => res.status(400).send({message: 'переданы некорректные данные'}))
}

module.exports.updateProfile = (req, res) => {
  let { name, about } = req.body
  User.findByIdAndUpdate(req.user._id, { name: name, about: about }, { new: true })
    .then(user => {
      if(name === undefined) {
        name = ''
      }
      if(about === undefined) {
        about = ''
      }
      if(name.length > 2 && 30 > name.length && about.length > 2 && 30 > about.length) {
        res.send( user );
        return;
      }

      res.status(400).send({message: 'переданы некорректные данные'})
    })
    .catch(() => {
      console.log('ff')
      res.status(500).send({message: 'Произошла ошибка'})
    })
}

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body

  User.findByIdAndUpdate(req.user._id, { avatar: avatar }, { new: true })
    .then(user => res.send( user ))
    .catch(() => res.status(400).send({message: 'переданы некорректные данные'}))
}