const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  uploadBranner,
  uploadProfileImg,
} = require("../controllers/uploadCloud");
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
  getUserProfilebyId,
  checkUsername,
} = userController;

const passport = require("passport");
const authenticateUser = passport.authenticate("jwt", { session: false });

router.post("/googleauth", userLoginGoogle);
router.post("/facebookauth", userLoginFacebook);
router.post("/login", userLoginform);
router.post("/register", userRegisterform);
router.post("/verifyuser", verifyUserforReset);
router.put("/resetpassword/:id", resetpassword);

router.put(
  "/updateProfile",
  authenticateUser,
  uploadProfileImg,
  updateProfileImg
);
router.put("/updateBanner", authenticateUser, uploadBranner, updateBannerImg);
// router.put("/updateUserProfile", authenticateUser, updateProfile);
router.get("/:id", getUserProfilebyId);
router.post("/check/username", checkUsername);

module.exports = router;
