// 用户表的操作

const mongoose = require("mongoose");

// 创建表
let collectionSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "post",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  time: {
    type: Date,
    default: new Date().getTime(),
  },
});

/**创建表 */
const Collection = mongoose.model("collection", collectionSchema);

// 收藏
module.exports.addCollection = async (collectionInfo) => {
  const collection = new Collection(collectionInfo);
  return await collection.save();
};

// 取消收藏
module.exports.deleteCollection = async (_id) => {
  return Collection.deleteOne({ _id });
};

// 数据总数
module.exports.getCollectionCount = async (userId) => {
  return await Collection.find({
    userId: userId,
  }).countDocuments();
};

// 数据列表
module.exports.getCollectionList = async (userId, pageNum, pageSize) => {
  return await Collection.find({
    userId: userId,
  })
  .populate("userId")
    .populate("postId")
    .skip((pageNum - 1) * pageSize)
    .limit(+pageSize)
    .sort({ time: -1 });
};
