const express = require("express");
const router = express.Router();
const passport = require("passport");
const authenticateUser = passport.authenticate("jwt", { session: false });
const commentController = require("../controllers/commentController");
const { createComment, editComment, deleteComment } = commentController;
// route : /comments

router.post("/", authenticateUser, createComment);
router.put("/:commentId", authenticateUser, editComment);
router.delete("/:commentId", authenticateUser, deleteComment);
// router.put('/like/:commentId', authenticateUser, editComment);

module.exports = router;
