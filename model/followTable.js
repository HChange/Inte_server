// 用户表的操作

const mongoose = require("mongoose");

// 创建表
let followSchema = new mongoose.Schema({
  userTelephone: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: new Date().getTime(),
  },
});

/**创建表 */
const Follow = mongoose.model("follow", followSchema);

// 关注
module.exports.addFollow = async (followInfo) => {
  const follow = new Follow(followInfo);
  return await follow.save();
};

// 取消关注
module.exports.deleteFollow = async (_id) => {
  return Follow.deleteOne({ _id });
};

// 数据总数
module.exports.getFollowCount = async (userTelephone) => {
  return await Follow.find({
    userTelephone: userTelephone,
  }).countDocuments();
};

// 数据列表
module.exports.getFollowList = async (userTelephone, pageNum, pageSize) => {
  return await Follow.find({
    userTelephone: userTelephone,
  })
    .skip((pageNum - 1) * pageSize)
    .limit(+pageSize)
    .sort({ time: -1 });
};

/**我关注的列表 */
// 数据总数
module.exports.getMyFollowCount = async (telephone) => {
  return await Follow.find({
    telephone: telephone,
  }).countDocuments();
};

// 数据列表
module.exports.getMyFollowList = async (telephone, pageNum, pageSize) => {
  return await Follow.find({
    telephone: telephone,
  })
    .skip((pageNum - 1) * pageSize)
    .limit(+pageSize)
    .sort({ time: -1 });
};
