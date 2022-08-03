const { getAllUsers, getByIdUser, createUser} = require('../controllers/users');

const router = require('express').Router();

router.get('/users', getAllUsers);
router.get('/users/:userId', getByIdUser);
router.post('/users', createUser);

module.exports = router;