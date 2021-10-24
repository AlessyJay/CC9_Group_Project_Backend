const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { uploadMultiple } = require('../controllers/uploadCloud');
const { userCreatePost, userCreateImgPost } = postController;

// Post
router.post('/createpost', uploadMultiple, userCreatePost);

// Draft

router.put('/login');
router.post('/register');

module.exports = router;
