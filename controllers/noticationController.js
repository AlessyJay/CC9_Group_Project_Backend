const { Notification, User, Post, Community } = require("../models");
exports.getNotificationByUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const result = await Notification.findAll({
      where: { userIdToNoti: id },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["profileUrl", "id", "username", "bannerUrl"],
        },
        {
          model: Post,
          attributes: ["communityId", "id", "title"],
          include: { model: Community, attributes: ["id", "userId"] },
        },
      ],
    });
    res.status(200).json({ notification: result });
  } catch (err) {
    next(err);
  }
};

exports.seenNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Notification.update({ isSeen: true }, { where: { id } });
    res.status(201).json({ message: "Updated successfully" });
  } catch (err) {
    next(err);
  }
};
