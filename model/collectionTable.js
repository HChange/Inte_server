// 用户表的操作

const mongoose = require("mongoose");

// 创建表
let collectionSchema = new mongoose.Schema({
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
module.exports.getCollectionCount = async (telephone) => {
  return await Collection.find({
    telephone: telephone,
  }).countDocuments();
};

// 数据列表
module.exports.getCollectionList = async (telephone, pageNum, pageSize) => {
  return await Collection.find({
    telephone: telephone,
  })
    .skip((pageNum - 1) * pageSize)
    .limit(+pageSize)
    .sort({ time: -1 });
};
