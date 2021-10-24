const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');

const {
  getFeedUserAll,
  getFeedUserHide,
  getFeedUserSave,
  getAllUserCommunity,
  getAllUserCommu,
  getFeedPopularUser,
} = feedController;

// Route :/feeds
router.get('/allusers-communitys', getAllUserCommu);
router.get('/userscommunity', getAllUserCommunity);
router.get('/userpost', getFeedUserAll);
router.get('/userhidepost', getFeedUserHide);
router.get('/usersavepost', getFeedUserSave);
router.get('/userpopularpost', getFeedPopularUser);
module.exports = router;
