const { getCards, createCards, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

const router = require('express').Router();

router.get('/cards', getCards);
router.post('/cards', createCards);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', likeCard)
router.delete('/cards/:cardId/likes', dislikeCard)

module.exports = router;