// 用户表的操作

const mongoose = require("mongoose");

// 创建表
let replySchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  time: {
    type: Date,
    default: new Date().getTime(),
  },
  content: {
    type: String,
    required: true,
  },
});

/**创建表 */
const Reply = mongoose.model("reply", replySchema);

// 收藏
module.exports.addReply = async (replyInfo) => {
  const reply = new Reply(replyInfo);
  return await reply.save();
};

// 取消收藏
module.exports.deleteReply = async (_id) => {
  return Reply.deleteOne({ _id });
};

// 数据总数
module.exports.getReplyCount = async (postId) => {
  return await Reply.find({
    postId: postId,
  }).countDocuments();
};

// 数据列表
module.exports.getReplyList = async (postId, pageNum, pageSize) => {
  return await Reply.find({
    postId: postId,
  })
    .populate("userId")
    .populate("postId")
    .skip((pageNum - 1) * pageSize)
    .limit(+pageSize)
    .sort({ time: -1 });
};

// 数据总数
module.exports.getMyReplyCount = async (userId) => {
  return await Reply.find({
    userId: userId,
  }).countDocuments();
};

// 数据列表
module.exports.getMyReplyList = async (userId, pageNum, pageSize) => {
  return await Reply.find({
    userId: userId,
  })
    .populate("userId")
    .populate("postId")
    .skip((pageNum - 1) * pageSize)
    .limit(+pageSize)
    .sort({ time: -1 });
};
