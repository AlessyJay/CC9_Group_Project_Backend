const { Community, User, Member, UserInteraction, Post } = require('../models');

// สำหรับดึงข้อมูล Comminity ของ user
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
// สำหรับดึงรายชื่อ user และ community ทั้งหมดในระบบ
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

exports.getFeedUserAll = async (req, res, next) => {
  try {
    // const { id } = req.user;
    const feedLists = await Post.findAll({
      where: { userId: 3 },
      order: [['updatedAt', 'DESC']],
    });
    res.status(200).json({ feedLists });
  } catch (err) {
    next(err);
  }
};
exports.getFeedUserHide = async (req, res, next) => {
  try {
    // const { id } = req.user;
    const feedLists = await UserInteraction.findAll({
      where: { userId: id, isHided: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: Post,
        order: [['updatedAt', 'DESC']],
      },
    });
    res.status(200).json({ feedLists });
  } catch (err) {
    next(err);
  }
};
exports.getFeedUserSave = async (req, res, next) => {
  try {
    // const { id } = req.user;
    const feedLists = await UserInteraction.findAll({
      where: { userId: id, isSaved: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: Post,
        order: [['updatedAt', 'DESC']],
      },
    });
    res.status(200).json({ feedLists });
  } catch (err) {
    next(err);
  }
};

// Main Feed see only content from community

//  User feed on overview tab (only ur post)
exports.getFeedPopularMain = async (req, res, next) => {};
exports.getFeedPopularUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const postLists = await Post.findAll({
      where: { userId: id, communityId: null },
      order: [['like', 'DESC']],
    });
    res.status(200).json({ postLists });
  } catch (err) {
    next(err);
  }
};
exports.getFeedPopularComminity = (req, res, next) => {};
