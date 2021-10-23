const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {
  uploadMultiple,
  uploadSingle,
  uploadBanner,
  uploadProfileImg,
} = require('../controllers/uploadCloud');
const {
  userLoginGoogle,
  userLoginFacebook,
  userLoginform,
  userRegisterform,
  resetpassword,
  verifyUserforReset,
  updateProfile,
  updateProfileImg,
  updateBannerImg,
} = userController;

router.post('/googleauth', userLoginGoogle);
router.post('/facebookauth', userLoginFacebook);
router.post('/login', userLoginform);
router.post('/register', userRegisterform);
router.post('/verififyuser', verifyUserforReset);
router.post('/resetpassword/:id', resetpassword);

router.post('/updateProfile', uploadProfileImg, updateProfileImg);
router.post('/updateBanner', uploadBanner, updateBannerImg);
router.post('/updateUserProfile', uploadMultiple, updateProfile);
// update username imgprofile branner firstname lastname
// change password
module.exports = router;
