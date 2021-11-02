const express = require("express");
const router = express.Router();
const commuController = require("../controllers/commuController");
const {
  createCommunity,
  updateRuleCommunity,
  deleteRuleCommunity,
  updateprofileCommunity,
  ruleCommunity,
  getPostPending,
  approvePostRequest,
  getCommunityPostInCommunity,
  getPopularPostInCommunity,
  getNewPostInCommunity,
  getCommunitybyId,
  updateBannerCommunity,
  getRuleCommunity,
  joinCommunity,
  leaveCommunity,
  checkCommunity,
} = commuController;
const {
  uploadMultiple,
  uploadProfileImg,
  uploadBranner,
} = require("../controllers/uploadCloud");
const passport = require("passport");
const authenticateUser = passport.authenticate("jwt", { session: false });
// route : /communities

router.get("/:communityId", getCommunitybyId);
router.get("/posts/:communityId", getCommunityPostInCommunity);
router.get("/populars/:communityId", getPopularPostInCommunity);
router.get("/news/:communityId", getNewPostInCommunity);
// router.post('/checkname', authenticateUser, checkCommunity);
router.post("/checkname", checkCommunity);
router.post("/", authenticateUser, createCommunity);
router.put(
  "/profile/:communityId",
  authenticateUser,
  uploadProfileImg,
  updateprofileCommunity
);
router.put(
  "/banner/:communityId",
  authenticateUser,
  uploadBranner,
  updateBannerCommunity
);
router.get("/rules/:communityId", getRuleCommunity);
router.post("/rules/:communityId", ruleCommunity);
router.put("/rules/:ruleId", authenticateUser, updateRuleCommunity);
router.delete("/:ruleId", authenticateUser, deleteRuleCommunity);
router.get("/admin/:communityId", authenticateUser, getPostPending);
router.put("/admin-prove/:postId", authenticateUser, approvePostRequest);
router.post("/member/:communityId", authenticateUser, joinCommunity);
router.delete("/member/:communityId", authenticateUser, leaveCommunity);
module.exports = router;
