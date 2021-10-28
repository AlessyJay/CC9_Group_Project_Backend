const {
  Community,
  Comment,
  User,
  Member,
  UserInteraction,
  Post,
  sequelize,
} = require('../models');
const { Op } = require('sequelize');

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

// select * from members join (select c.id as id, c.name as name, c.profile_url as profile_url, c.banner_url as banner_url, c.type as type, count(m.community_id) as amount from communities c join members m on c.id = m.community_id group by m.community_id) t on t.id = members.community_id where members.user_id =2
exports.getAllJoinedCommunity = async (req, res, next) => {
  try {
    // const { id } = req.user;
    const communityLists = await Member.findAll({
      where: { userId: 1 },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Community,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    });
    const arrCommu = communityLists.map((item) => item.Community.name);
    const amount = await Community.findAll({
      where: { name: { [Op.or]: arrCommu } },
      include: [{ model: Member }],
    });
    const t = amount.map((item) => {
      return { name: item.name, value: item.Members.length };
    });
    // console.log(t);
    const arr = [];
    communityLists.map((item) => {
      t.map((v) => {
        if (item.Community.name === v.name) {
          arr.push({ ...item.toJSON(), amount: v.value });
        }
      });
    });
    res.json({ communityLists: arr });
  } catch (err) {
    next(err);
  }
};
// exports.getAllJoinedCommunity = async (req, res, next) => {
//   try {
//     // const { id } = req.user;
//     // const communityLists = await Member.findAll({
//     //   where: { userId: 2 },

//     //   include: [
//     //     {
//     //       model: Community,
//     //       include: [
//     //         {
//     //           model: Member,
//     //           attributes: [
//     //             [
//     //               sequelize.fn('count', sequelize.col('Member.community_id')),
//     //               'amount',
//     //             ],
//     //             'communityId',
//     //             'userId',

//     //             // { exclude: ['createdAt', 'updatedAt'] },
//     //           ],
//     //           group: ['Member.community_id'],
//     //         },
//     //       ],
//     //     },
//     //   ],
//     // });
//     const communityLists = await Community.findAll({
//       include: [Member],
//     });
//     const userCommunitys = await Member.findAll({
//       where: { userId: 2 },
//       attributes: ['communityId'],
//     });
//     const myCommunitys = JSON.parse(JSON.stringify(userCommunitys)).map(
//       (item) => item.communityId
//     );
//     console.log('xxx', JSON.parse(JSON.stringify(communityLists)));
//     const x = JSON.parse(JSON.stringify(communityLists)).filter((item) =>
//       myCommunitys.includes(item.id)
//     );
//     const xx = x.map((item) => ({ ...item, Members: item.Members.length }));
//     res.json({ xx, myCommunitys });
//   } catch (err) {
//     next(err);
//   }
// };

// สำหรับ ดึงข้อมูล community ทั้งหมด
exports.getAllCommunity = async (req, res, next) => {
  try {
    // const communityLists = await Community.findAll({});
    // const communityLists = await Member.findAll({
    //   group: ['communityId'],
    //   include: [
    //     {
    //       model: Community,
    //     },
    //   ],
    // });
    const communityLists = await sequelize.query(
      'select c.id as id, c.name as name, c.profile_url as profile_url, c.banner_url as banner_url, c.type as type, count(m.community_id) as amount from communities c left join members m on c.id = m.community_id group by c.name order by amount  desc',
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(communityLists);
    res.status(200).json({ communityLists });
  } catch (err) {
    next(err);
  }
};
// หน้า User Feed จะแสดงอันที่ post แล้วเท่านั้น
exports.getFeedUserOverviewTab = async (req, res, next) => {
  try {
    // const { id } = req.user;
    const feedLists = await Post.findAll({
      where: { userId: 1, status: true },
      order: [['updatedAt', 'DESC']],
      include: [
        { model: Comment },
        {
          model: UserInteraction,
          attributes: ['isLiked', 'isHided', 'isSaved', 'userId', 'postId'],
        },
      ],
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
    const { id } = req.user;
    const feedLists = await Post.findAll({
      where: { userId: id },
      order: [['updatedAt', 'DESC']],
      include: [
        { model: Comment },
        {
          model: UserInteraction,
          attributes: ['isLiked', 'isHided', 'isSaved', 'userId', 'postId'],
        },
      ],
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
    const { id } = req.user;
    const feedLists = await UserInteraction.findAll({
      where: { userId: id, isHided: true },
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
    const { id } = req.user;
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
exports.getAllCommnutyPostMainPage = async (req, res, next) => {
  try {
    const postLists = await Post.findAll({
      where: { communityId: { [Op.not]: null } },
      include: [
        { model: Comment },
        {
          model: UserInteraction,
          attributes: ['isLiked', 'isHided', 'isSaved', 'userId', 'postId'],
        },
      ],
    });
    const newfeedLists = postLists.map((item) => {
      if (!item.imageUrl) {
        return item;
      } else return { ...item.toJSON(), imageUrl: JSON.parse(item.imageUrl) };
    });
    res.status(200).json({ feedLists: newfeedLists });
  } catch (err) {
    next(err);
  }
};
//  User feed on overview tab (only ur post)
exports.getFeedPopularMain = async (req, res, next) => {
  try {
    const postLists = await Post.findAll({
      order: [['like', 'DESC']],
      include: [
        { model: Comment },
        {
          model: UserInteraction,
          attributes: ['isLiked', 'isHided', 'isSaved', 'userId', 'postId'],
        },
      ],
    });

    const newfeedLists = postLists.map((item) => {
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
      include: [
        { model: Comment },
        {
          model: UserInteraction,
          attributes: ['isLiked', 'isHided', 'isSaved', 'userId', 'postId'],
        },
      ],
    });

    const newfeedLists = postLists.map((item) => {
      if (!item.imageUrl) {
        return item;
      } else return { ...item.toJSON(), imageUrl: JSON.parse(item.imageUrl) };
    });
    res.status(200).json({ postLists: newfeedLists });
  } catch (err) {
    next(err);
  }
};
