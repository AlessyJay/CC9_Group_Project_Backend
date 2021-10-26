const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const passport = require('passport');
const authenticateUser = passport.authenticate('jwt', { session: false });
const {
  uploadMultiple,
  uploadProfileImg,
} = require('../controllers/uploadCloud');

// uploadmultiple => cloudimage

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
router.get('/:id', authenticateUser, getPostbyId);
router.post('/createpost', authenticateUser, uploadMultiple, userCreatePost);
router.post('/savepost/:id', authenticateUser, userSavePost);
router.post('/hidepost/:id', authenticateUser, userHidePost);
router.post('/likepost/:id', authenticateUser, userLikePost);
router.put('/:postId', authenticateUser, uploadMultiple, userEditPost);
router.delete('/:id', authenticateUser, deletepost);
// Draft
router.get('/drafts', authenticateUser, getDraftPost);
router.post(
  '/drafts/createdraft',
  authenticateUser,
  uploadMultiple,
  createDraftPost
);
router.put('/drafts/:postId', authenticateUser, uploadMultiple, userEditPost);
router.delete('/drafts/:id', authenticateUser, deleteDraft);

module.exports = router;
