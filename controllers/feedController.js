const { Community, User, Member } = require('../models');

exports.getAllUserCommu = async (req, res, next) => {
  try {
    const user = await User.findAll({
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'googleId',
          'facebookId',
          'password',
        ],
      },
    });
    const community = await Community.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    const arr = [...user, ...community];
    res.status(200).json({ alldata: arr });
  } catch (err) {
    next(err);
  }
};

exports.getAllUserCommunity = async (req, res, next) => {
  try {
    // const { id } = req.user;
    const communityLists = await Member.findAll({
      where: { userId: 2 },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Community,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    });
    res.json({ communityLists });
  } catch (err) {
    next(err);
  }
};
exports.getFeedUserAll = (req, res, next) => {};
exports.getFeedUserHide = (req, res, next) => {};
exports.getFeedUserSave = (req, res, next) => {};

// Main Feed see only content from community
//  User feed on overview tab (only ur post)
exports.getFeedPopularMain = (req, res, next) => {};
exports.getFeedPopularUser = (req, res, next) => {};
exports.getFeedPopularComminity = (req, res, next) => {};
