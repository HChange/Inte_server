// 引入用户表操作对象
const Reply = require("../model/replyTable");

const addReply = async (req, res, next) => {
  Reply.addReply(req.body)
    .then((result) => {
      if (result) {
        res.json({
          code: 0,
          msg: "评论成功",
          data: result,
        });
      } else {
        res.json({
          code: -1,
          msg: "评论失败",
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
const deleteReply = async (req, res, next) => {
    let {_id} = req.body;
    Reply.deleteReply(_id)
      .then((result) => {
        if (result) {
          res.json({
            code: 0,
            msg: "取消评论成功",
            data: result,
          });
        } else {
          res.json({
            code: -1,
            msg: "取消评论失败",
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


const getReplyCount = async (req, res, next) => {
  let { postId } = req.query;
  const count = await Reply.getReplyCount(postId);
  res.json({
    code: 0,
    msg: "查询成功",
    data: count,
  });
};
const getReplyList = async (req, res, next) => {
  let { postId, pageNum, pageSize } = req.query;
    const result = await Reply.getReplyList(postId, pageNum, pageSize);
  const count = await Reply.getReplyCount(postId);
  res.json({
    code: 0,
    msg: "查询成功",
    data: { data: result, count, pageNum, pageSize },
  });
};
const getMyReplyCount = async (req, res, next) => {
  let { userId } = req.query;
  const count = await Reply.getMyReplyCount(userId);
  res.json({
    code: 0,
    msg: "查询成功",
    data: count,
  });
};
const getMyReplyList = async (req, res, next) => {
  let { userId, pageNum, pageSize } = req.query;
    const result = await Reply.getMyReplyList(userId, pageNum, pageSize);
  const count = await Reply.getMyReplyCount(userId);
  res.json({
    code: 0,
    msg: "查询成功",
    data: { data: result, count, pageNum, pageSize },
  });
};

/**发表帖子 */
module.exports = {
  addReply,
  deleteReply,
  getReplyCount,
  getReplyList,
  getMyReplyCount,
  getMyReplyList,
};

