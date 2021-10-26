const { Community, User, Member, UserInteraction, Post } = require('../models');

// สำหรับดึงข้อมูล Comminity และ user
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
// สำหรับ community ทั้งหมดในระบบ ของ user นั้นๆ
exports.getAllJoinedCommunity = async (req, res, next) => {
  try {
    const { id } = req.user;
    const communityLists = await Member.findAll({
      where: { userId: id },
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

// หน้า User Feed จะแสดงอันที่ post แล้วเท่านั้น
exports.getFeedUserOverviewTab = async (req, res, next) => {
  try {
    // const { id } = req.user;
    const feedLists = await Post.findAll({
      where: { userId: 3, status: true },
      order: [['updatedAt', 'DESC']],
    });

    const newfeedLists = feedLists.map((item) => {
      if (!item.imageUrl) {
        return item;
      } else return { ...item.toJSON(), imageUrl: JSON.parse(item.imageUrl) };
    });

    res.status(200).json({ feedLists: newfeedLists });
  } catch (err) {
    next(err);
  }
};

exports.getFeedUserPostTab = async (req, res, next) => {
  try {
    // const { id } = req.user;
    const feedLists = await Post.findAll({
      where: { userId: 3 },
      order: [['updatedAt', 'DESC']],
    });
    const newfeedLists = feedLists.map((item) => {
      if (!item.imageUrl) {
        return item;
      } else return { ...item.toJSON(), imageUrl: JSON.parse(item.imageUrl) };
    });

    res.status(200).json({ feedLists: newfeedLists });
  } catch (err) {
    next(err);
  }
};
exports.getFeedUserHide = async (req, res, next) => {
  try {
    // const { id } = req.user;
    const feedLists = await UserInteraction.findAll({
      where: { userId: 3, isHided: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: Post,
        order: [['updatedAt', 'DESC']],
      },
    });
    const newfeedLists = feedLists.map((item) => {
      if (item.Post.imageUrl)
        item.Post.imageUrl = JSON.parse(item.Post.imageUrl);
      return item;
    });
    res.status(200).json({ feedLists: newfeedLists });
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
    const newfeedLists = feedLists.map((item) => {
      if (item.Post.imageUrl)
        item.Post.imageUrl = JSON.parse(item.Post.imageUrl);
      return item;
    });
    res.status(200).json({ feedLists: newfeedLists });
  } catch (err) {
    next(err);
  }
};

// Main Feed see only content from community

//  User feed on overview tab (only ur post)
exports.getFeedPopularMain = async (req, res, next) => {
  try {
    const postLists = await Post.findAll({
      order: [['like', 'DESC']],
    });

    const newfeedLists = feedLists.map((item) => {
      if (!item.imageUrl) {
        return item;
      } else return { ...item.toJSON(), imageUrl: JSON.parse(item.imageUrl) };
    });
    res.status(200).json({ postLists: newfeedLists });
  } catch (err) {
    next(err);
  }
};
exports.getFeedPopularUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const postLists = await Post.findAll({
      where: { userId: id, communityId: null },
      order: [['like', 'DESC']],
    });

    const newfeedLists = feedLists.map((item) => {
      if (!item.imageUrl) {
        return item;
      } else return { ...item.toJSON(), imageUrl: JSON.parse(item.imageUrl) };
    });
    res.status(200).json({ postLists: newfeedLists });
  } catch (err) {
    next(err);
  }
};
