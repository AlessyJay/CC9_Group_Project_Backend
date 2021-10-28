const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticateUser = passport.authenticate('jwt', { session: false });
const notificationController = require('../controllers/noticationController');
const { getNotificationByUser, seenNotification } = notificationController;

// route : /notifications

router.get('/', authenticateUser, getNotificationByUser);
router.put('/:id', authenticateUser, seenNotification);

module.exports = router;
