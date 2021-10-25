const { uploadPromise } = require('./uploadCloud');
const fs = require('fs');
const { Community, Rule, Post } = require('../models');

exports.getCommunityPostFeed = async (req, res, next) => {};

exports.createCommunity = async (req, res, next) => {
  try {
    // const { id } = req.user;
    const { type, name } = req.body;
    const community = await Community.create({ type, name, userId: id });
    res.status(200).json({ community });
  } catch (err) {
    next(err);
  }
};
exports.updateCommunity = async (req, res, next) => {
  try {
    const { communityId } = req.params;
    const { descriptions } = req.body;
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
      await Community.update({ descriptions }, { where: { communityId } });
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
      await Community.update({ descriptions }, { where: { communityId } });
    }
  } catch (err) {
    next(err);
  }
};

//create rule
exports.ruleCommunity = async (req, res, next) => {
  try {
    const { communityId } = req.params;
    const { rule } = req.body; //expect Array
    await Rule.create({ ruleDetail: rule, communityId });
    res.status(200).json({ message: 'Create  Successfully' });
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
    res.status(200).json({ postLists });
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
