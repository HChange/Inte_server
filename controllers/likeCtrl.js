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
  let { _id } = req.query;
  const count = await Like.getLikeCount(_id);
  res.json({
    code: 0,
    msg: "查询成功",
    data: count,
  });
};
const getLikeList = async (req, res, next) => {
  let { _id, pageNum, pageSize } = req.query;
    const result = await Like.getLikeList(_id, pageNum, pageSize);
  const count = await Like.getLikeCount(_id);
  res.json({
    code: 0,
    msg: "查询成功",
    data: { data: result, count, pageNum, pageSize },
  });
};
const getMyLikeCount = async (req, res, next) => {
  let { telephone } = req.query;
  const count = await Like.getMyLikeCount(telephone);
  res.json({
    code: 0,
    msg: "查询成功",
    data: count,
  });
};
const getMyLikeList = async (req, res, next) => {
  let { telephone, pageNum, pageSize } = req.query;
    const result = await Like.getMyLikeList(telephone, pageNum, pageSize);
  const count = await Like.getMyLikeCount(telephone);
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
