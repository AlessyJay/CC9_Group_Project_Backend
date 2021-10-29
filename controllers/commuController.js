const { uploadPromise } = require('./uploadCloud');
const fs = require('fs');
const { Community, Rule, Post, Comment, Member } = require('../models');

// get ข้อมูล community และ จำนวนคนใน community
exports.getCommunitybyId = async (req, res, next) => {
  try {
    const { communityId } = req.params;
    const community = await Community.findOne({ where: { id: communityId } });
    const amount = await Member.count({ where: { communityId } });
    res.status(200).json({ community: { ...community.toJSON(), amount } });
  } catch (err) {
    next(err);
  }
};
//ข้อมูลสำหรับแสดงในหน้า feed ของ community
exports.getCommunityPostInCommunity = async (req, res, next) => {
  try {
    const { communityId } = req.params;
    const postList = await Post.findAll({
      where: { communityId, status: true },
      include: { model: Comment },
    });
    const newfeedLists = postList.map((item) => {
      if (!item.imageUrl) {
        return item;
      } else return { ...item.toJSON(), imageUrl: JSON.parse(item.imageUrl) };
    });
    res.status(200).json({ postList: newfeedLists });
  } catch (err) {
    next(err);
  }
};

// ข้อมูลสำหรับแสดงหน้า Feed Tab Popular
exports.getPopularPostInCommunity = async (req, res, next) => {
  try {
    const { communityId } = req.params;
    const postList = await Post.findAll({
      where: { communityId, status: true },
      include: { model: Comment },
      order: [['like', 'DESC']],
    });
    const newfeedLists = postList.map((item) => {
      if (!item.imageUrl) {
        return item;
      } else return { ...item.toJSON(), imageUrl: JSON.parse(item.imageUrl) };
    });
    res.status(200).json({ postList: newfeedLists });
  } catch (err) {
    next(err);
  }
};
// ข้อมูลสำหรับแสดงหน้า feed tab New
exports.getNewPostInCommunity = async (req, res, next) => {
  try {
    const { communityId } = req.params;
    const postList = await Post.findAll({
      where: { communityId, status: true },
      order: [['createdAt', 'DESC']],
      include: { model: Comment },
    });
    const newfeedLists = postList.map((item) => {
      if (!item.imageUrl) {
        return item;
      } else return { ...item.toJSON(), imageUrl: JSON.parse(item.imageUrl) };
    });
    res.status(200).json({ postList: newfeedLists });
  } catch (err) {
    next(err);
  }
};

exports.checkCommunity = async (req, res, next) => {
  try {
    const { name } = req.body;
    const findCommunity = await Community.findOne({ where: { name } });
    console.log(findCommunity);
    if (findCommunity) {
      return res.status(400).json({ message: 'Community is already used' });
    }
    res.status(201).json({ message: 'Verify' });
  } catch (err) {
    next(err);
  }
};
exports.createCommunity = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { type, name } = req.body;
    const findCommunity = await Community.findOne({ where: { name } });
    if (findCommunity)
      return res.status(400).json({ message: 'Community is already used' });
    const community = await Community.create({ type, name, userId: id });
    const member = await Member.create({
      role: 'ADMIN',
      communityId: community.id,
      userId: id,
    });
    res.status(201).json({ community, member });
  } catch (err) {
    next(err);
  }
};
exports.updateprofileCommunity = async (req, res, next) => {
  try {
    const { communityId } = req.params;
    const { descriptions } = req.body;
    console.log(communityId);
    console.log(descriptions);
    console.log(req.file);
    if (req.file) {
      const result = await uploadPromise(req.file.path);
      fs.unlinkSync(req.file.path);
      const rows = await Community.update(
        {
          descriptions,
          profileUrl: result.secure_url,
        },
        { where: { id: communityId } }
      );
      if (!rows) return res.status(400).json({ message: 'Id does not match' });
      res.status(201).json({ message: 'Update Successfully' });
    } else {
      await Community.update({ descriptions }, { where: { id: communityId } });
      res.status(201).json({ message: 'Update Successfully' });
    }
  } catch (err) {
    next(err);
  }
};
exports.updateBannerCommunity = async (req, res, next) => {
  try {
    const { communityId } = req.params;
    const { descriptions } = req.body;
    if (req.file) {
      const result = await uploadPromise(req.file.path);
      fs.unlinkSync(req.file.path);
      const rows = await Community.update(
        {
          descriptions,
          bannerUrl: result.secure_url,
        },
        { where: { id: communityId } }
      );
      if (!rows) return res.status(400).json({ message: 'Id does not match' });
      res.status(201).json({ message: 'Update Successfully' });
    } else {
      await Community.update({ descriptions }, { where: { id: communityId } });
      res.status(201).json({ message: 'Update Successfully' });
    }
  } catch (err) {
    next(err);
  }
};

//Get rule each communitys
exports.getRuleCommunity = async (req, res, next) => {
  try {
    const { communityId } = req.params;
    const rules = await Rule.findAll({ where: { communityId } });
    res.status(200).json({ rules });
  } catch (err) {
    next(err);
  }
};
//create rule
exports.ruleCommunity = async (req, res, next) => {
  try {
    const { communityId } = req.params;
    const { rule } = req.body;
    const result = await Rule.create({ ruleDetail: rule, communityId });
    res.status(200).json({ message: 'Create  Successfully', rule: result });
  } catch (err) {
    next(err);
  }
};

// update rule
exports.updateRuleCommunity = async (req, res, next) => {
  try {
    const { ruleId } = req.params;
    const { rule } = req.body;
    console.log(newArrRules);
    await Rule.update({ ruleDetail: rule }, { where: { id: ruleId } });
    res.status(200).json({ message: 'Updated  Successfully' });
  } catch (err) {
    next(err);
  }
};
//Delete rule
exports.deleteRuleCommunity = async (req, res, next) => {
  try {
    const { ruleId } = req.params;
    await Rule.destroy({ where: { id: ruleId } });
    res.status(204);
  } catch (err) {
    next(err);
  }
};

// Get post wait for approve
exports.getPostPending = async (req, res, next) => {
  try {
    const { communityId } = req.params;
    const postLists = await Post.findAll({
      where: { communityId, status: false },
      order: [['updatedAt', 'DESC']],
    });
    const newfeedLists = feedLists.map((item) => {
      if (!item.imageUrl) {
        return item;
      } else return { ...item.toJSON(), imageUrl: JSON.parse(item.imageUrl) };
    });
    res.status(200).json({ postList: newfeedLists });
  } catch (err) {
    next(err);
  }
};
// Update status post to approve
exports.approvePostRequest = async (req, res, next) => {
  try {
    const { postId } = req.params;
    await Post.update({ status: true }, { where: { postId } });
    res.status(201).json({ message: 'Post has been approved' });
  } catch (err) {
    next(err);
  }
};
// Create member
exports.joinCommunity = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { communityId } = req.params;
    const result = await Member.create({
      role: 'MEMBER',
      userId: id,
      communityId,
    });
    res.status(200).json({ member: result, message: 'Joined' });
  } catch (err) {
    next(err);
  }
};
// delete member
exports.leaveCommunity = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { communityId } = req.params;
    await Member.destroy({
      where: { userId: id, communityId, role: 'MEMBER' },
    });
    res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
