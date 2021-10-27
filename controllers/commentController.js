const { Comment, Notification } = require('../models');

//create comment
exports.createComment = async (req, res, next) => {
  try {
    const { id } = req.user; // คน comment
    const { userToNoti, postId, commentDetails } = req.body;
    const comment = await Comment.create({
      commentDetails,
      like,
      userId: id,
      postId,
    });

    const notification = await Notification.create({
      userToNoti,
      postId,
      userId,
      isSeen: false,
    });
    res.status(200).json({ comment, notification });
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
    res.status(201).json({ message: 'Updated successfully' });
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

// ยังไม่เรียบร้อย ถ้าจะเก็บอาจจะต้องสร้าง table เพิ่มเช็คว่า user like comment แล้วยัง
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
