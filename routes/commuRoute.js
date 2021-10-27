const express = require('express');
const router = express.Router();
const commuController = require('../controllers/commuController');
const {
  createCommunity,
  updateRuleCommunity,
  deleteRuleCommunity,
  updateprofileCommunity,
  ruleCommunity,
  getPostPending,
  approvePostRequest,
  getCommunityPostInCommunity,
  getPopularPostInCommunity,
  getNewPostInCommunity,
  getCommunitybyId,
  updateBannerCommunity,
  getRuleCommunity,
  joinCommunity,
  leaveCommunity,
} = commuController;
const {
  uploadMultiple,
  uploadProfileImg,
  uploadBranner,
} = require('../controllers/uploadCloud');
const passport = require('passport');
const authenticateUser = passport.authenticate('jwt', { session: false });
// route : /communities

router.get('/:communityId', getCommunitybyId);
router.get('/posts/:communityId', getCommunityPostInCommunity);
router.get('/populars/:communityId', getPopularPostInCommunity);
router.get('/news/:communityId', getNewPostInCommunity);
router.post('/', authenticateUser, createCommunity);
router.put('/profile/:communityId', uploadProfileImg, updateprofileCommunity);
router.put('/banner/:communityId', uploadBranner, updateBannerCommunity);
router.get('/rules/:communityId', getRuleCommunity);
router.post('/rules/:communityId', ruleCommunity);
router.put('/rules/:ruleId', updateRuleCommunity);
router.delete('/:ruleId', deleteRuleCommunity);
router.get('/admin/:communityId', getPostPending);
router.put('/admin-prove/:postId', approvePostRequest);
router.post('/member/:communityId', joinCommunity);
router.delete('/member/:communityId', leaveCommunity);
module.exports = router;
