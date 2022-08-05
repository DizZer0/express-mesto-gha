const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send( cards ))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports.createCards = (req, res) => {
  const { name, link } = req.body
  const owner = req.user._id

  Card.create({ name, link, owner })
    .then(card => res.send( card ))
    .catch(() => res.status(400).send({message: 'переданы некорректные данные'}))
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => {
      if(card) {
        res.send( card )
      }
      res.status(404).send({message: "Карточки не существует"})
    })
    .catch(() => res.status(400).send({message: 'Данные не корректны'}))
}

module.exports.likeCard = (req, res) => {
  console.log(res)
  Card.findByIdAndUpdate(req.params.cardId,{ $addToSet: { likes: req.user._id } }, { new: true })
    .then(card => {
      if(card) {
        res.send( card )
      }
      res.status(404).send({message: "Карточки не существует"})
    })
    .catch(() => res.status(400).send({message: 'Не корректно введены данные'}))
}

module.exports.dislikeCard = (req, res) => {

  Card.findByIdAndUpdate(req.params.cardId,{ $pull: { likes: req.user._id } }, { new: true })
    .then(card => {
      if(card) {
        res.send( card )
      }
      res.status(404).send({message: "Карточки не существует"})
    })
    .catch(() => res.status(400).send({message: 'Не корректно введены данные'}))
}