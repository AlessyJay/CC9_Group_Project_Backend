const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');

const { getFeedUserAll, getFeedUserHide, getFeedUserSave } = feedController;

module.exports = router;
