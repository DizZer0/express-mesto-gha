const { getCards, createCards, deleteCard } = require('../controllers/cards');

const router = require('express').Router();

router.get('/cards', getCards);
router.post('/cards', createCards);
router.delete('/cards/:cardId', deleteCard);

module.exports = router;