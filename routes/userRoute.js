const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {
  userLoginGoogle,
  userLoginFacebook,
  userLoginform,
  userRegisterform,
  resetpassword,
  verifyUserforReset,
} = userController;

router.post('/googleauth', userLoginGoogle);
router.post('/facebookauth', userLoginFacebook);
router.post('/login', userLoginform);
router.post('/register', userRegisterform);
router.post('/resetpassword', verifyUserforReset, resetpassword);

// update username imgprofile branner firstname lastname
// change password
module.exports = router;
