const express = require('express');
const router = express.Router();
// const authToken = require('../middlewares/authToken');
const AuthController = require ('../controllers/AuthController');

router.post('/signin', AuthController.singIn);
router.post('/logout', AuthController.logout);

module.exports = router;