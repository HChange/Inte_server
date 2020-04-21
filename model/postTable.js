// 用户表的操作

const mongoose = require("mongoose");

// 创建表
let postSchema = new mongoose.Schema({
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
  imageUrl: {
    type: Array,
    required: true,
  },
  time: {
    type: Date,
    default: new Date().getTime(),
  },
  desc: {
    type: String,
    required: true,
  },
});
/**用户名模糊查询 */
postSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

/**创建表 */
const Post = mongoose.model("post", postSchema);

// 发表帖子
module.exports.add = async (postInfo) => {
  const post = new Post(postInfo);
  return await post.save();
};

// 查询一个人的全部帖子
module.exports.getUserAllPost = async (telephone, pageNum, pageSize) => {
  return await Post.find({
    telephone,
  })
    .skip((pageNum-1) * pageSize)
    .limit(+pageSize)
    .sort({time: -1 });
};

// 模糊查询帖子
module.exports.getUserFuzzyPost = async (name, pageNum, pageSize) => {
  let query = new RegExp(name, "i");
  return await Post.find({
    $or: [{ desc: query }],
  })
    .skip((pageNum-1) * pageSize)
    .limit(+pageSize)
    .sort({ time: -1 });
};

// 数据总数
module.exports.getPostCount = async(keyword,type)=>{
  if(type==="all"){
    return await Post.find({
      telephone: keyword,
    }).countDocuments();
  }else if(type==="fuzzy"){
    let query = new RegExp(keyword, "i");
    return await Post.find({
      $or: [{ desc: query }],
    }).countDocuments();
  }
};
module.exports.getPostById = async (_id) => {
  return Post.findOne(_id);
};
module.exports.deletePost = async (_id) => {
  return Post.deleteOne({ _id });
};

