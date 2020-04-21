// 用户表的操作

const mongoose = require("mongoose");

// 创建表
let replySchema = new mongoose.Schema({
  postId: {
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
    .skip((pageNum - 1) * pageSize)
    .limit(+pageSize)
    .sort({ time: -1 });
};

// 数据总数
module.exports.getMyReplyCount = async (telephone) => {
  return await Reply.find({
    telephone: telephone,
  }).countDocuments();
};

// 数据列表
module.exports.getMyReplyList = async (telephone, pageNum, pageSize) => {
  return await Reply.find({
    telephone: telephone,
  })
    .skip((pageNum - 1) * pageSize)
    .limit(+pageSize)
    .sort({ time: -1 });
};
