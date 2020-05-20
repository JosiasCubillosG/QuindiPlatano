const express = require('express');
const router = express.Router();
const UsersService = require('../../services/users');

router.get('/', UsersService.getUsers);
router.post('/', UsersService.createUser);
router.get('/:userId', UsersService.getUser);
router.put('/:userId', UsersService.updateUser);
router.delete('/:userId', UsersService.deleteUser);
router.post('/signup', UsersService.signUp);
router.post('/login', UsersService.login);


module.exports = router;