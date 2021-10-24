const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {
  uploadMultiple,
  uploadBranner,
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
router.post('/verifyuser', verifyUserforReset);
router.put('/resetpassword/:id', resetpassword);

router.put('/updateProfile', uploadProfileImg, updateProfileImg);
router.put('/updateBanner', uploadBranner, updateBannerImg);
router.put('/updateUserProfile', uploadMultiple, updateProfile);
// update username imgprofile branner firstname lastname
// change password
module.exports = router;
