// 用户表的操作

const mongoose = require("mongoose");

// 创建表
let followSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  myUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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
module.exports.getFollowCount = async (userId) => {
  return await Follow.find({
    userId: userId,
  }).countDocuments();
};

// 数据列表
module.exports.getFollowList = async (userId, pageNum, pageSize) => {
  return await Follow.find({
    userId: userId,
  })
    .populate("myUserId")
    .skip((pageNum - 1) * pageSize)
    .limit(+pageSize)
    .sort({ time: -1 });
};

/**我关注的列表 */
// 数据总数
module.exports.getMyFollowCount = async (myUserId) => {
  return await Follow.find({
    myUserId: myUserId,
  }).countDocuments();
};

// 数据列表
module.exports.getMyFollowList = async (myUserId, pageNum, pageSize) => {
  return await Follow.find({
    myUserId: myUserId,
  })
    .populate("userId")
    .skip((pageNum - 1) * pageSize)
    .limit(+pageSize)
    .sort({ time: -1 });
};
