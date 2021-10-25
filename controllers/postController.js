const { uploadPromise, uploadVideoPromise } = require('./uploadCloud');
const fs = require('fs');
const {
  Post,
  Draft,
  Comment,
  UserInterAction,
  Notification,
} = require('../models');

//Get post each Id by PostId

exports.getPostbyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({
      where: { id },
      include: { model: Comment, where: { postId: id, isDeleted: false } },
    });
    if (!post) return res.status(400).json({ message: "Id doesn't match" });
    res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
};

// Create post
exports.userCreatePost = async (req, res, next) => {
  try {
    // const { id } = req.user;
    const { title, descriptions, type, notification, communityId, status } =
      req.body;
    if (
      req.files &&
      (req.files[0].path.includes('.mp4') ||
        req.files[0].path.includes('.mov4'))
    ) {
      console.log(req.files);
      const urls = [];
      for (const file of req.files) {
        const { path } = file;
        const result = await uploadPromise(path, {
          resource_type: 'video',
        });
        urls.push(result);
        fs.unlinkSync(path);
      }
      const postObj = {
        title,
        descriptions,
        type,
        like: 0,
        allow_notification: notification,
        videoUrl: urls[0].secure_url,
        status,
        communityId: communityId ?? null,
        userId: 3,
        // userId: id,
      };
      const post = await Post.create(postObj);
      res.json({ post });
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
    await Post.update({ isDeleted: true }, { where: { id } });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
// edit post
exports.userEditPost = async (req, res, next) => {
  try {
    // const { id } = req.user;
    const { postId } = req.params;
    const { title, descriptions, type, notification, communityId, status } =
      req.body;

    // Post ประเภทวิดิโอ
    if (
      req.files &&
      (req.files[0].path.includes('.mp4') ||
        req.files[0].path.includes('.mov4'))
    ) {
      const urls = [];
      for (const file of req.files) {
        const { path } = file;
        const result = await uploadPromise(path, {
          resource_type: 'video',
        });
        urls.push(result);
        fs.unlinkSync(path);
      }
      const postObj = {
        title,
        descriptions,
        type,
        allow_notification: notification,
        videoUrl: urls[0].secure_url,
        status,
        communityId,
        userId: 3,
        // userId: id,
      };
      await Post.update(postObj, { where: { postId } });
      res.json({ message: 'Update successfully' });
      // Post ประเภทรูปภาพ
    } else if (req.files) {
      const urls = [];
      for (const file of req.files) {
        const { path } = file;
        const result = await uploadPromise(path);
        urls.push(result);
        fs.unlinkSync(path);
      }
      const arrPath = urls.map((item) => item.secure_url);

      const postObj = {
        title,
        descriptions,
        type,
        allow_notification: notification,
        imageUrl: JSON.stringify(arrPath),
        status,
        communityId,
        userId: 3,
        // userId: id,
      };
      await Post.update(postObj, { where: { postId } });
      res.json({ message: 'Update successfully' });
      // Post ประเภททั่วไป
    } else {
      const postObj = {
        title,
        descriptions,
        type,
        allow_notification: notification,
        status,
        communityId,
        userId: 3,
        // userId:id,
      };
      await Post.update(postObj, { where: { postId } });
      res.json({ message: 'Update successfully' });
    }
  } catch (err) {
    next(err);
  }
};
// createdraft post
exports.createDraftPost = async (req, res, next) => {
  try {
    // const { id } = req.user;
    const { title, descriptions, type, notification, communityId, status } =
      req.body;
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
      const postObj = {
        title,
        descriptions,
        type,
        like: 0,
        allow_notification: notification,
        videoUrl: urls[0].secure_url,
        status,
        communityId: communityId ?? null,
        userId: 3,
        // userId: id,
      };
      const post = await Draft.create(postObj);
      res.json({ post });
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
    const { id } = req.user;
    const draftLists = await Draft.findAll({ where: { userId: id } });

    res.status(200).json({ draftLists });
  } catch (err) {
    next(err);
  }
};
// edit draft post

exports.userEditDraft = async (req, res, next) => {
  try {
    // const { id } = req.user;
    const { postId } = req.params;
    const { title, descriptions, type, notification, communityId, status } =
      req.body;

    // Post ประเภทวิดิโอ
    if (
      req.files &&
      (req.files[0].path.includes('.mp4') ||
        req.files[0].path.includes('.mov4'))
    ) {
      const urls = [];
      for (const file of req.files) {
        const { path } = file;
        const result = await uploadPromise(path, {
          resource_type: 'video',
        });
        urls.push(result);
        fs.unlinkSync(path);
      }
      const postObj = {
        title,
        descriptions,
        type,
        allow_notification: notification,
        videoUrl: urls[0].secure_url,
        status,
        communityId,
        userId: 3,
        // userId: id,
      };
      await Draft.update(postObj, { where: { postId } });
      res.json({ message: 'Update successfully' });
      // Post ประเภทรูปภาพ
    } else if (req.files) {
      const urls = [];
      for (const file of req.files) {
        const { path } = file;
        const result = await uploadPromise(path);
        urls.push(result);
        fs.unlinkSync(path);
      }
      const arrPath = urls.map((item) => item.secure_url);

      const postObj = {
        title,
        descriptions,
        type,
        allow_notification: notification,
        imageUrl: JSON.stringify(arrPath),
        status,
        communityId,
        userId: 3,
        // userId: id,
      };
      await Draft.update(postObj, { where: { postId } });
      res.json({ message: 'Update successfully' });
      // Post ประเภททั่วไป
    } else {
      const postObj = {
        title,
        descriptions,
        type,
        allow_notification: notification,
        status,
        communityId,
        userId: 3,
        // userId:id,
      };
      await Draft.update(postObj, { where: { postId } });
      res.json({ message: 'Update successfully' });
    }
  } catch (err) {
    next(err);
  }
};
//delete draft post
exports.deleteDraft = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Draft.destroy({ where: { id } });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

// กด Save post
exports.userSavePost = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { postId } = req.params;
    const { isSaved } = req.body;
    // check userinteraction

    const userHaveData = await UserInterAction.findOne({
      where: { userId: id, postId },
    });
    if (userHaveData) {
      await UserInterAction.update(
        {
          isSaved,
          isHided: userHaveData.isHided,
          isLiked: userHaveData.isLiked,
        },
        { where: { userId: id, postId } }
      );
      res.status(201).json({ message: 'Saved' });
    } else {
      const res = await UserInterAction.create({
        isSaved,
        isHided: 0,
        isLiked: 0,
      });
      res.status(200).json({ message: 'Saved', UserInterAction: res });
    }
  } catch (err) {
    next(err);
  }
};
// กด hide post
exports.userHidePost = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { postId } = req.params;
    const { isHided } = req.body;
    // check userinteraction

    const userHaveData = await UserInterAction.findOne({
      where: { userId: id, postId },
    });
    if (userHaveData) {
      await UserInterAction.update(
        {
          isSaved: userHaveData.isSaved,
          isHided,
          isLiked: userHaveData.isLiked,
        },
        { where: { userId: id, postId } }
      );
      res.status(201).json({ message: 'Hided' });
    } else {
      const res = await UserInterAction.create({
        isSaved: 0,
        isHided,
        isLiked: 0,
      });
      res.status(200).json({ message: 'Hided', UserInterAction: res });
    }
  } catch (err) {
    next(err);
  }
};
// กด like post

exports.userLikePost = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { postId } = req.params;
    const { isLiked } = req.body;
    // check userinteraction
    const userHaveData = await UserInterAction.findOne({
      where: { userId: id, postId },
    });
    if (userHaveData) {
      await UserInterAction.update(
        {
          isSaved: userHaveData.isSaved,
          isHided: userHaveData.isHided,
          isLiked,
        },
        { where: { userId: id, postId } }
      );
      const noti = await Notification.create({
        type: 'LIKE',
        isSeen: false,
        postId,
        userId: id,
      });
      res.status(201).json({ message: 'Liked action' });
    } else {
      const res = await UserInterAction.create({
        isSaved: 0,
        isHided: 0,
        isLiked,
      });
      res.status(200).json({ message: 'Liked action', UserInterAction: res });
    }
  } catch (err) {
    next(err);
  }
};
