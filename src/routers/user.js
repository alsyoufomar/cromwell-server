const express = require('express');
const { createUser, loginUser, getUser } = require('../controllers/user.js');
const { checkToken } = require('../middleware/auth');

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/info', checkToken, getUser);

module.exports = router;
