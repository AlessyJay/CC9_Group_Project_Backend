const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');

const {
  getFeedUserOverviewTab,
  getFeedUserHide,
  getFeedUserSave,
  getAllJoinedCommunity,
  getAllUserCommu,
  getFeedPopularUser,
  getFeedUserPostTab,
} = feedController;
const passport = require('passport');
const authenticateUser = passport.authenticate('jwt', { session: false });
// Route :/feeds
router.get('/allusers-communitys', getAllUserCommu);
router.get('/usercommunitys', authenticateUser, getAllJoinedCommunity);
router.get('/useroverview', getFeedUserOverviewTab);
router.get('/userposts', getFeedUserPostTab);
router.get('/userhidepost', getFeedUserHide);
router.get('/usersavepost', getFeedUserSave);
router.get('/userpopularpost', getFeedPopularUser);
module.exports = router;
