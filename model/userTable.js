// 用户表的操作

const mongoose = require("mongoose");

// 创建表
const User = mongoose.model(
  "user",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    birthday: {
      type: String,
      required: false,
    },
    sexID: {
      type: String,
      default: "男",
    },
    desc: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      default: "/assets/icon.png",
    },
  })
);

// 注册用户
module.exports.add = async (username, telephone, password) => {
  var result1 = await User.findOne({
    username,
  });
  var result2 = await User.findOne({
    telephone,
  });
  if (result1 || result2) {
    throw new Error("该账号已存在");
  } else {
    // 创建
    const user = new User({
      username,
      telephone,
      password,
    });
    // 保存
    return await user.save();
  }
};

// 查询
module.exports.findByPhone = async (Phone) => {
  return await User.findOne({
    Phone,
  });
};

module.exports.findByUsername = async (username) => {
  return await User.findOne({
    username,
  });
};

module.exports.findByPhoneAndPsd = async (phone, password) => {
  return await User.findOne({
    phone,
    password,
  });
};

