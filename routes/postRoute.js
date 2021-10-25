const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const {
  uploadMultiple,
  uploadProfileImg,
} = require('../controllers/uploadCloud');
const {
  userCreatePost,
  deletepost,
  deleteDraft,
  getDraftPost,
  userSavePost,
  userHidePost,
  userLikePost,
  userEditPost,
  getPostbyId,
  createDraftPost,
} = postController;

// Post
router.get('/:id', getPostbyId);
router.post('/createpost', uploadMultiple, userCreatePost);
router.post('/savepost/:id', userSavePost);
router.post('/hidepost/:id', userHidePost);
router.post('/likepost/:id', userLikePost);
router.put('/:postId', uploadMultiple, userEditPost);
router.delete('/:id', deletepost);
// Draft
router.get('/drafts', getDraftPost);
router.post('/drafts/createdraft', uploadMultiple, createDraftPost);
router.put('/drafts/:postId', uploadMultiple, userEditPost);
router.delete('/drafts/:id', deleteDraft);

module.exports = router;
