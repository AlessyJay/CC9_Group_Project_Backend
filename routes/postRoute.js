const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { uploadMultiple } = require('../controllers/uploadCloud');
const { userCreatePost, deletepost, deleteDraft, getDraftPost } =
  postController;

// Post

router.post('/createpost', uploadMultiple, userCreatePost);
router.delete('/:id', deletepost);
// Draft
router.get('/draft', getDraftPost);
router.delete('/draft/:id', deleteDraft);

module.exports = router;
