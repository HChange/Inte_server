// 引入用户表操作对象
const Like = require("../model/likeTable");

const addLike = async (req, res, next) => {
  Like.addLike(req.body)
    .then((result) => {
      if (result) {
        res.json({
          code: 0,
          msg: "点赞成功",
          data: result,
        });
      } else {
        res.json({
          code: -1,
          msg: "点赞失败",
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
const deleteLike = async (req, res, next) => {
    let {_id} = req.body;
    console.log(_id);
    
    Like.deleteLike(_id)
      .then((result) => {
        if (result) {
          res.json({
            code: 0,
            msg: "取消点赞成功",
            data: result,
          });
        } else {
          res.json({
            code: -1,
            msg: "取消点赞失败",
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


const getLikeCount = async (req, res, next) => {
  let { postId } = req.query;
  const count = await Like.getLikeCount(postId);
  res.json({
    code: 0,
    msg: "查询成功",
    data: count,
  });
};
const getLikeList = async (req, res, next) => {
  let { postId, pageNum, pageSize } = req.query;
    const result = await Like.getLikeList(postId, pageNum, pageSize);
  const count = await Like.getLikeCount(postId);
  res.json({
    code: 0,
    msg: "查询成功",
    data: { data: result, count, pageNum, pageSize },
  });
};
const getMyLikeCount = async (req, res, next) => {
  let { userId } = req.query;
  const count = await Like.getMyLikeCount(userId);
  res.json({
    code: 0,
    msg: "查询成功",
    data: count,
  });
};
const getMyLikeList = async (req, res, next) => {
  let { userId, pageNum, pageSize } = req.query;
    const result = await Like.getMyLikeList(userId, pageNum, pageSize);
  const count = await Like.getMyLikeCount(userId);
  res.json({
    code: 0,
    msg: "查询成功",
    data: { data: result, count, pageNum, pageSize },
  });
};

/**发表帖子 */
module.exports = {
  addLike,
  deleteLike,
  getLikeCount,
  getLikeList,
  getMyLikeCount,
  getMyLikeList,
};
