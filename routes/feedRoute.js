const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');

const {
  getFeedUserAll,
  getFeedUserHide,
  getFeedUserSave,
  getAllUserCommunity,
  getAllUserCommu,
} = feedController;

// Route :/feeds
router.get('/allusers-communitys', getAllUserCommu);
router.get('/userscommunity', getAllUserCommunity);
module.exports = router;
