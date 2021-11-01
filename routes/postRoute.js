const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const passport = require("passport");
const authenticateUser = passport.authenticate("jwt", { session: false });
const {
  uploadMultiple,
  uploadProfileImg,
} = require("../controllers/uploadCloud");

// uploadmultiple => cloudimage

const {
  userCreatePost,
  userEditDraft,
  deletepost,
  deleteDraft,
  getDraftPost,
  userSavePost,
  userHidePost,
  userLikePost,
  userEditPost,
  getPostbyId,
  createDraftPost,
} = postController;

router.put("/drafts/:draftId", authenticateUser, uploadMultiple, userEditDraft);
router.get("/drafts", authenticateUser, getDraftPost);
router.get("/:id", getPostbyId);
router.post("/createpost", authenticateUser, uploadMultiple, userCreatePost);
router.post("/savepost/:postId", authenticateUser, userSavePost);
router.post("/hidepost/:postId", authenticateUser, userHidePost);
router.post("/likepost/:postId", authenticateUser, userLikePost);
router.put("/:postId", authenticateUser, uploadMultiple, userEditPost);
router.delete("/:id", authenticateUser, deletepost);
router.post(
  "/drafts/createdraft",
  authenticateUser,
  uploadMultiple,
  createDraftPost
);
router.delete("/drafts/:id", authenticateUser, deleteDraft);

module.exports = router;
