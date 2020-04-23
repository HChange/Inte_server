// 用户表的操作

const mongoose = require("mongoose");

// 创建表
let likeSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  userId: {
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
const Like = mongoose.model("like", likeSchema);

// 点赞
module.exports.addLike = async (likeInfo) => {
  const like = new Like(likeInfo);
  return await like.save();
};

// 取消点赞
module.exports.deleteLike = async (_id) => {
  return Like.deleteOne({ _id });
};


// 数据总数
module.exports.getLikeCount = async (postId) => {
    return await Like.find({
      postId: postId,
    }).countDocuments();
};

// 数据数据
module.exports.getLikeList = async (postId,pageNum,pageSize) => {
  return await Like.find({
    postId: postId,
  })
    .populate("userId")
    .skip((pageNum - 1) * pageSize)
    .limit(+pageSize)
    .sort({ time: -1 });
};

/**自己点赞的数据 */
// 数据总数
module.exports.getMyLikeCount = async (userId) => {
    return await Like.find({
      userId: userId,
    }).countDocuments();
};

// 数据数据
module.exports.getMyLikeList = async (userId,pageNum,pageSize) => {
  return await Like.find({
    userId: userId,
  })
    .populate("userId")
    .populate("postId")
    .skip((pageNum - 1) * pageSize)
    .limit(+pageSize)
    .sort({ time: -1 });
};