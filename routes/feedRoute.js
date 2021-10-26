const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');

const {
  getFeedUserOverviewTab,
  getFeedUserHide,
  getFeedUserSave,
  getAllUserCommunity,
  getAllUserCommu,
  getFeedPopularUser,
  getFeedUserPostTab,
} = feedController;

// Route :/feeds
router.get('/allusers-communitys', getAllUserCommu);
router.get('/userscommunity', getAllUserCommunity);
router.get('/useroverview', getFeedUserOverviewTab);
router.get('/userposts', getFeedUserPostTab);
router.get('/userhidepost', getFeedUserHide);
router.get('/usersavepost', getFeedUserSave);
router.get('/userpopularpost', getFeedPopularUser);
module.exports = router;
