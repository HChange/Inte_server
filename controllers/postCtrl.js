// 引入用户表操作对象
const Post = require("../model/postTable");

const publishPost = async (req, res, next) => {
  Post.add(req.body)
    .then((result) => {
      if (result) {
        res.json({
          code: 0,
          msg: "发表成功",
          data: result,
        });
      } else {
        res.json({
          code: -1,
          msg: "发表失败",
          data: result,
        });
      }
    })
    .catch((error) => {
      res.json({
        code: -2,
        msg: "数据库异常:" + error,
        data: null,
      });
    });
};
const getUserAllPost = async (req, res, next) => {
  let {userId,pageNum, pageSize } = req.query;
  const count = await Post.getPostCount( userId , "all");
  Post.getUserAllPost(userId, +pageNum, +pageSize)
    .then((result) => {
      if (result) {
        res.json({
          code: 0,
          msg: "查询成功",
          data: { data: result, count, pageNum: +pageNum, pageSize: +pageSize },
        });
      } else {
        res.json({
          code: -1,
          msg: "查询失败",
          data: result,
        });
      }
    })
    .catch((error) => {
      res.json({
        code: -2,
        msg: "数据库异常:" + error,
        data: null,
      });
    });
};
const getPost = async (req, res, next) => {
  let { keyword, pageNum, pageSize } = req.query;
  const count = await Post.getPostCount(keyword, "fuzzy");
  Post.getUserFuzzyPost(keyword, +pageNum, +pageSize)
    .then((result) => {
      if (result) {
        res.json({
          code: 0,
          msg: "查询成功",
          data: { data: result, count, pageNum: +pageNum, pageSize: +pageSize },
        });
      } else {
        res.json({
          code: -1,
          msg: "查询失败",
          data: result,
        });
      }
    })
    .catch((error) => {
      res.json({
        code: -2,
        msg: "数据库异常:" + error,
        data: null,
      });
    });
};
/**查询通过id */
const getPostById = async (req, res, next) => {
  let { postId } = req.body;
  Post.getPostById(postId)
    .then((result) => {
      if (result) {
        res.json({
          code: 0,
          msg: "查询成功",
          data: result,
        });
      } else {
        res.json({
          code: -1,
          msg: "查询失败",
          data: result,
        });
      }
    })
    .catch((error) => {
      res.json({
        code: -2,
        msg: "数据库异常:" + error,
        data: null,
      });
    });
};

/**帖子总数 */
const getPostCount = async (req, res, next) => {
  let {telephone} = req.query;
  const count = await Post.getPostCount(telephone, "all");
   res.json({
     code: 0,
     msg: "查询成功",
     data: count,
   });
}
// delete
const deletePost = async (req, res, next) => {
  let { postId } = req.body;
  Post.deletePost(postId)
    .then((result) => {
      if (result) {
        res.json({
          code: 0,
          msg: "删除成功",
          data: result,
        });
      } else {
        res.json({
          code: -1,
          msg: "删除失败",
          data: result,
        });
      }
    })
    .catch((error) => {
      res.json({
        code: -2,
        msg: "数据库异常:" + error,
        data: null,
      });
    });
};

/**发表帖子 */
module.exports = {
  publishPost,
  getUserAllPost,
  getPost,
  getPostById,
  deletePost,
  getPostCount
};
