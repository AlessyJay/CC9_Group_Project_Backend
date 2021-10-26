const { Comment, Notification } = require('../models');

exports.createComment = async (req, res, next) => {
  try {
    const { id } = req.user; // คน comment
    const { userToNoti, noticationType, postId, commentDetails } = req.body;
    const comment = await Comment.create({
      commentDetails,
      like,
      userId: id,
      postId,
    });

    const noti = await Notification.create({
      userToNoti,
      postId,
      userId,
      isSeen: false,
    });
    res.status(200).json({ comment, noti });
  } catch (err) {
    next(err);
  }
};

exports.editComment = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { commentId } = req.params;
    const { commentDetails } = req.body;
    await Comment.update(
      { commentDetails },
      { where: { id: commentId, userId: id } }
    );
  } catch (err) {
    next(err);
  }
};
exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { postId } = req.params;
    await Notification.destroy({ where: { postId, userId: id } });
    await Comment.destroy({ where: { id: postId } });
    res.status(204);
  } catch (err) {
    next(err);
  }
};

exports.likeComment = async (req, res, next) => {
  try {
    const { commendId } = req.params;
    const { like } = req.body;
    await Comment.update({ like }, { where: { id: commendId } });
    res.status(201).json({ message: 'Updated' });
  } catch (err) {
    next(err);
  }
};
