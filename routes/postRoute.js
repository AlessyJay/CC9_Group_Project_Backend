const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const {} = postController;

// Post
router.post('/postmain');

// Draft

router.post('/postmainImg');

router.post('/login');
router.post('/register');

module.exports = router;
