const { uploadPromise, uploadVideoPromise } = require('./uploadCloud');
const fs = require('fs');
const { Post, Draft } = require('../models');

exports.userCreatePost = async (req, res, next) => {
  try {
    // const { id } = req.user;
    const { title, descriptions, type, notification, communityId, status } =
      req.body;
    // console.log(req.body);
    if (
      req.files &&
      (req.files[0].path.includes('.mp4') ||
        req.files[0].path.includes('.mov4'))
    ) {
      console.log(req.files);
      const urls = [];
      for (const file of req.files) {
        const { path } = file;
        const result = await uploadVideoPromise(path);
        urls.push(result);
        fs.unlinkSync(path);
      }
      // const postObj = {
      //   title,
      //   descriptions,
      //   type,
      //   like: 0,
      //   allow_notification: notification,
      //   videoUrl: urls[0].secure_url,
      //   status,
      //   communityId: communityId ?? null,
      //   userId: 3,
      //   userId: id,
      // };
      // const post = await Post.create(postObj);
      // res.json({ post });
    } else if (req.files) {
      const urls = [];
      for (const file of req.files) {
        const { path } = file;
        const result = await uploadPromise(path);
        urls.push(result);
        fs.unlinkSync(path);
      }
      const arrPath = urls.map((item) => item.secure_url);
      console.log(arrPath);
      const postObj = {
        title,
        descriptions,
        type,
        like: 0,
        allow_notification: notification,
        imageUrl: JSON.stringify(arrPath),
        status,
        communityId: communityId ?? null,
        userId: 3,
        // userId: id,
      };
      const post = await Post.create(postObj);
      res.json({
        post: { ...post.toJSON(), imageUrl: JSON.parse(post.imageUrl) },
      });
    } else {
      const postObj = {
        title,
        descriptions,
        type,
        like: 0,
        allow_notification: notification,
        status,
        communityId: communityId ?? null,
        userId: 3,
        // userId:id,
      };
      const post = await Post.create(postObj);
      res.json({ post });
    }
  } catch (err) {
    next(err);
  }
};

//delete post
exports.deletepost = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Post.destroy({ where: { id } });
    res.json(204);
  } catch (err) {
    next(err);
  }
};
// edit post

// createdraft post
exports.createDraftPost = async (req, res, next) => {
  try {
    // const { id } = req.user;
    const { title, descriptions, type, notification, communityId, status } =
      req.body;
    // console.log(req.body);
    if (
      req.files &&
      (req.files[0].path.includes('.mp4') ||
        req.files[0].path.includes('.mov4'))
    ) {
      console.log(req.files);
      const urls = [];
      for (const file of req.files) {
        const { path } = file;
        const result = await uploadVideoPromise(path);
        urls.push(result);
        fs.unlinkSync(path);
      }
      // const postObj = {
      //   title,
      //   descriptions,
      //   type,
      //   like: 0,
      //   allow_notification: notification,
      //   videoUrl: urls[0].secure_url,
      //   status,
      //   communityId: communityId ?? null,
      //   userId: 3,
      //   userId: id,
      // };
      // const post = await Draft.create(postObj);
      // res.json({ post });
    } else if (req.files) {
      const urls = [];
      for (const file of req.files) {
        const { path } = file;
        const result = await uploadPromise(path);
        urls.push(result);
        fs.unlinkSync(path);
      }
      const arrPath = urls.map((item) => item.secure_url);
      console.log(arrPath);
      const postObj = {
        title,
        descriptions,
        type,
        like: 0,
        allow_notification: notification,
        imageUrl: JSON.stringify(arrPath),
        status,
        communityId: communityId ?? null,
        userId: 3,
        // userId: id,
      };
      const post = await Draft.create(postObj);
      res.json({
        post: { ...post.toJSON(), imageUrl: JSON.parse(post.imageUrl) },
      });
    } else {
      const postObj = {
        title,
        descriptions,
        type,
        like: 0,
        allow_notification: notification,
        status,
        communityId: communityId ?? null,
        userId: 3,
        // userId:id,
      };
      const post = await Draft.create(postObj);
      res.json({ post });
    }
  } catch (err) {
    next(err);
  }
};
// get draft post
exports.getDraftPost = async (req, res, next) => {
  try {
    const draft = await Draft.findAll({ where: { userId: id } });

    res.status(200).json({ draft });
  } catch (err) {
    next(err);
  }
};
// edit draft post

//delete draft post
exports.deleteDraft = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Draft.destroy({ where: { id } });
    res.json(204);
  } catch (err) {
    next(err);
  }
};
