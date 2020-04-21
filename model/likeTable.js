// 用户表的操作

const mongoose = require("mongoose");

// 创建表
let likeSchema = new mongoose.Schema({
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
    .skip((pageNum - 1) * pageSize)
    .limit(+pageSize)
    .sort({ time: -1 });
};

/**自己点赞的数据 */
// 数据总数
module.exports.getMyLikeCount = async (telephone) => {
    return await Like.find({
      telephone: telephone,
    }).countDocuments();
};

// 数据数据
module.exports.getMyLikeList = async (telephone,pageNum,pageSize) => {
  return await Like.find({
    telephone: telephone,
  })
    .skip((pageNum - 1) * pageSize)
    .limit(+pageSize)
    .sort({ time: -1 });
};