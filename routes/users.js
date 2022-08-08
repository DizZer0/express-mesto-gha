const router = require('express').Router();

const {
  getAllUsers, getByIdUser, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:userId', getByIdUser);
router.post('/users', createUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
