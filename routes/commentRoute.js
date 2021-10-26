const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticateUser = passport.authenticate('jwt', { session: false });
const commentController = require('../controllers/commentController');
const { createComment } = commentController;
// route : /comments

router.post('/', authenticateUser, createComment);

module.exports = router;
