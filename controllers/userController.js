const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { uploadPromise } = require('./uploadCloud');
const fs = require('fs');

exports.userLoginGoogle = async (req, res, next) => {
  try {
    const { email, lastname, firstname, imageUrl, googleId } = req.body;
    const findUser = await User.findOne({ where: { googleId } });
    // ไม่มีในระบบ ต้องสร้างใหม่และคืน token
    if (!findUser) {
      const newUser = {
        email,
        firstName: firstname,
        lastName: lastname,
        username: `u/${firstname}_${googleId.substring(0, 5)}`,
        profileUrl: imageUrl,
        googleId,
      };

      const user = await User.create(newUser);
      const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        profileUrl: user.profile_url,
        bannerUrl: user.banner_url,
        description: user.description,
      };
      const token = jwt.sign(payload, 'GroupProjectRedditClone', {
        expiresIn: 60 * 60 * 24 * 30,
      });
      res.status(200).json({ message: 'Success logged in', token });
    } else {
      const payload = {
        id: findUser.id,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        email: findUser.email,
        username: findUser.username,
        profileUrl: findUser.profile_url,
        bannerUrl: findUser.banner_url,
        description: findUser.description,
      };
      const token = jwt.sign(payload, 'GroupProjectRedditClone', {
        expiresIn: 60 * 60 * 24 * 30,
      });
      res.status(200).json({ message: 'Success logged in', token });
    }
  } catch (err) {
    next(err);
  }
};
exports.userLoginFacebook = async (req, res, next) => {
  try {
    const { email, lastname, firstname, imageUrl, facebookId } = req.body;
    const findUser = await User.findOne({ where: { facebookId } });
    console.log(req.body);
    if (!findUser) {
      const newUser = {
        email,
        firstName: firstname,
        lastName: lastname,
        username: `u/${firstname}_${facebookId.substring(0, 5)}`,
        profileUrl: imageUrl,
        facebookId,
      };

      const user = await User.create(newUser);
      const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        profileUrl: user.profile_url,
        bannerUrl: user.banner_url,
        description: user.description,
      };
      const token = jwt.sign(payload, 'GroupProjectRedditClone', {
        expiresIn: 60 * 60 * 24 * 30,
      });
      res.status(200).json({ message: 'Success logged in', token });
    } else {
      const payload = {
        id: findUser.id,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        email: findUser.email,
        username: findUser.username,
        profileUrl: findUser.profile_url,
        bannerUrl: findUser.banner_url,
        description: findUser.description,
      };
      const token = jwt.sign(payload, 'GroupProjectRedditClone', {
        expiresIn: 60 * 60 * 24 * 30,
      });
      res.status(200).json({ message: 'Success logged in', token });
    }
  } catch (err) {
    next(err);
  }
};

// Login Form
exports.userLoginform = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email, googleId: null, facebookId: null },
    });

    // Checking email or username
    if (!user)
      return res.status(400).json({ message: 'Incorrect Email or Password' });
    // Checking password
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword)
      return res.status(400).json({ message: 'Incorrect Email or Password' });

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      profileUrl: user.profile_url,
      bannerUrl: user.banner_url,
      description: user.description,
    };

    const token = jwt.sign(payload, 'GroupProjectRedditClone', {
      expiresIn: 60 * 60 * 24 * 30,
    });
    res.status(200).json({ message: 'Success logged in', token });
  } catch (err) {
    next(err);
  }
};

// Register Form
exports.userRegisterform = async (req, res, next) => {
  try {
    const { password, email, username, confirmpassword } = req.body;

    // check password === confirm
    if (password !== confirmpassword)
      return res.status(400).json({ message: 'Confirm password is not match' });

    // // check username
    const findUserName = await User.findOne({ where: { username } });
    if (findUserName)
      return res
        .status(400)
        .json({ message: 'Username is already being used' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = {
      username,
      password: hashedPassword,
      email,
    };
    const result = await User.create(newUser);
    res.status(201).json({ user: result });
  } catch (err) {
    next(err);
  }
};
exports.verifyUserforReset = async (req, res, next) => {
  try {
    const { email, username } = req.body;
    const user = await User.findOne({ where: { username, email } });
    if (!user)
      return res.status(400).json({ message: 'Incorrect Email or Username' });
    res.json({ message: `/resetpassword/${user.id}` });
  } catch (err) {
    next(err);
  }
};
exports.resetpassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { confirmpassword, password } = req.body;
    if (password !== confirmpassword) return res.status(400).json();
    const hashedPassword = await bcrypt.hash(password, 12);
    const rows = await User.update(
      { password: hashedPassword },
      { where: { id } }
    );
    if (!rows)
      return res
        .status(400)
        .json({ message: 'Something wrong!', status: 'failed' });
    res
      .status(201)
      .json({ message: 'Password changed successfully', status: 'success' });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    // ตำแหน่ง  1 คือ profile ตำแหน่ง 2 คือ banner เสมอออ!!!!!!!!
    // const { id } = req.user;
    const { firstname, lastname, username, description } = req.body;
    // console.log(req.files);
    if (req.files) {
      const urls = [];
      for (const file of req.files) {
        const { path } = file;
        const result = await uploadPromise(path);
        urls.push(result);
        fs.unlinkSync(path);
      }
      // console.log(urls);
      // console.log('Profile', urls[0].secure_url);
      // console.log('Banner', urls[1].secure_url);
      const rows = await User.update(
        {
          firstName: firstname,
          lastName: lastname,
          username,
          description,
          profileUrl: urls[0].secure_url,
          bannerUrl: urls[1].secure_url,
        },
        { where: { id } }
      );
      if (!rows) return res.status(400).json({ message: 'Id does not match' });
    } else {
      const rows = await User.update(
        {
          firstName: firstname,
          lastName: lastname,
          username,
          description,
        },
        { where: { id } }
      );
      if (!rows) return res.status(400).json({ message: 'Id does not match' });
    }
  } catch (err) {
    next(err);
  }
};
exports.updateProfileImg = async (req, res, next) => {
  try {
    // const { id } = req.user;
    const { firstname, lastname, username, description } = req.body;
    console.log(req.file);
    if (req.file) {
      const result = await uploadPromise(req.file.path);
      fs.unlinkSync(req.file.path);
      const rows = await User.update(
        {
          firstName: firstname,
          lastName: lastname,
          username,
          description,
          profileUrl: result.secure_url,
        },
        { where: { id } }
      );
      if (!rows) return res.status(400).json({ message: 'Id does not match' });
    } else {
      const rows = await User.update(
        {
          firstName: firstname,
          lastName: lastname,
          username,
          description,
        },
        { where: { id } }
      );
      if (!rows) return res.status(400).json({ message: 'Id does not match' });
    }
  } catch (err) {
    next(err);
  }
};
exports.updateBannerImg = async (req, res, next) => {
  try {
    // const { id } = req.user;
    const { firstname, lastname, username, description } = req.body;
    console.log(req.file);
    if (req.file) {
      const result = await uploadPromise(req.file.path);
      fs.unlinkSync(req.file.path);
      const rows = await User.update(
        {
          firstName: firstname,
          lastName: lastname,
          username,
          description,
          bannerUrl: result.secure_url,
        },
        { where: { id } }
      );
      if (!rows) return res.status(400).json({ message: 'Id does not match' });
    } else {
      const rows = await User.update(
        {
          firstName: firstname,
          lastName: lastname,
          username,
          description,
        },
        { where: { id } }
      );
      if (!rows) return res.status(400).json({ message: 'Id does not match' });
    }
  } catch (err) {
    next(err);
  }
};
