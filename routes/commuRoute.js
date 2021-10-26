const express = require('express');
const router = express.Router();
const commuController = require('../controllers/commuController');
const {
  createCommunity,
  updateRuleCommunity,
  deleteRuleCommunity,
  updateCommunity,
  ruleCommunity,
  getPostPending,
  approvePostRequest,
  getCommunityPostInCommunity,
  getPopularPostInCommunity,
  getNewPostInCommunity,
} = commuController;
const {
  uploadMultiple,
  uploadProfileImg,
  uploadBranner,
} = require('../controllers/uploadCloud');
const passport = require('passport');
const authenticateUser = passport.authenticate('jwt', { session: false });
// route : /communities

router.get('/posts/:communityId', getCommunityPostInCommunity);
router.get('/populars/:communityId', getPopularPostInCommunity);
router.get('/news/:communityId', getNewPostInCommunity);
router.post('/', authenticateUser, createCommunity);
router.put('/:communityId', uploadProfileImg, updateCommunity);
router.put('/:communityId', uploadBranner, updateCommunity);
router.post('/rules/:communityId', ruleCommunity);
router.put('/rules/:ruleId', updateRuleCommunity);
router.get('/admin/:communityId', getPostPending);
router.put('/admin-prove/:postId', approvePostRequest);
router.delete('/:ruleId', deleteRuleCommunity);
module.exports = router;
