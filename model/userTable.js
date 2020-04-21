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
    sex: {
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
    qq: {
      type: String,
      required: false,
    },
    wechat: {
      type: String,
      required: false,
    },
    sign: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    blog: {
      type: String,
      required: false,
    },
    realName: {
      type: String,
      required: false,
    },
  })
);

// 注册用户
module.exports.add = async (username, telephone, password) => {
  // var result1 = await User.findOne({
  //   username,
  // });
  var result2 = await User.findOne({
    telephone,
  });
  if (result2) {
    throw new Error("该手机号已经注册过Inte账号");
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
module.exports.findByPhone = async (telephone) => {
  return await User.findOne({
    telephone,
  });
};

module.exports.findByUsername = async (username) => {
  return await User.findOne({
    username,
  });
};

module.exports.findByPhoneAndPsd = async (telephone, password) => {
  return await User.findOne({
    telephone,
    password,
  });
};

//修改密码
module.exports.changePassword = async (telephone, password) => {
  return User.updateOne({telephone}, {
    password,
  });
};
//设置个性签名
module.exports.setSign = async (telephone, sign) => {
  return User.updateOne({telephone}, {
    sign,
  });
};

// 设置信息

module.exports.setuserInfo = async (telephone, newUserInfo) => {
  return User.updateOne({ telephone }, newUserInfo);
};