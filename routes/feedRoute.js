const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feedController");
const passport = require("passport");
const authenticateUser = passport.authenticate("jwt", { session: false });

const {
  getFeedUserOverviewTab,
  getFeedUserHide,
  getFeedUserSave,
  getAllJoinedCommunity,
  getAllUserCommu,
  getFeedPopularUser,
  getFeedUserPostTab,
  getAllCommunity,
  getAllCommnutyPostMainPage,
  getPostOverviewbyUserId,
  getAllCommnutyPostMainPageGuest,
} = feedController;
// Route :/feeds

router.get("/allusers-communitys", getAllUserCommu);
router.get("/usercommunitys", authenticateUser, getAllJoinedCommunity);
router.get("/allcommunity", getAllCommunity);
router.get("/mainpage", authenticateUser, getAllCommnutyPostMainPage);
router.get("/mainpage-guest", getAllCommnutyPostMainPageGuest);
router.get("/useroverview/:id", getPostOverviewbyUserId);
router.get("/userposts", authenticateUser, getFeedUserPostTab);
router.get("/userhidepost", authenticateUser, getFeedUserHide);
router.get("/usersavepost", authenticateUser, getFeedUserSave);
router.get("/userpopularpost", authenticateUser, getFeedPopularUser);
module.exports = router;
