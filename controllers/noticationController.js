const { Notification } = require('../models');
exports.getNotificationByUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const result = await Notification.findAll({
      where: { userIdToNoti: id, isSeen: false },
    });
    res
      .status(201)
      .json({ message: 'Create Successfully', newNotification: result });
  } catch (err) {
    next(err);
  }
};

exports.seenNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Notification.update({ isSeen: true }, { where: { id } });
    res.status(201).json({ message: 'Updated successfully' });
  } catch (err) {
    next(err);
  }
};
