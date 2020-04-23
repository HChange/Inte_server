// 引入用户表操作对象
const Follow = require("../model/followTable");

const addFollow = async (req, res, next) => {
  Follow.addFollow(req.body)
    .then((result) => {
      if (result) {
        res.json({
          code: 0,
          msg: "关注成功",
          data: result,
        });
      } else {
        res.json({
          code: -1,
          msg: "关注失败",
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
const deleteFollow = async (req, res, next) => {
  let { _id } = req.body;
  Follow.deleteFollow(_id)
    .then((result) => {
      if (result) {
        res.json({
          code: 0,
          msg: "取消关注成功",
          data: result,
        });
      } else {
        res.json({
          code: -1,
          msg: "取消关注失败",
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

const getFollowCount = async (req, res, next) => {
  let { userId } = req.query;
  const count = await Follow.getFollowCount(userId);
  res.json({
    code: 0,
    msg: "查询成功",
    data: count,
  });
};
const getFollowList = async (req, res, next) => {
  let { userId, pageNum, pageSize } = req.query;
  const result = await Follow.getFollowList(userId, pageNum, pageSize);
  const count = await Follow.getFollowCount(userId);
  res.json({
    code: 0,
    msg: "查询成功",
    data: { data: result, count, pageNum, pageSize },
  });
};
const getMyFollowCount = async (req, res, next) => {
  let { myUserId } = req.query;
  const count = await Follow.getMyFollowCount(myUserId);
  res.json({
    code: 0,
    msg: "查询成功",
    data: count,
  });
};
const getMyFollowList = async (req, res, next) => {
  let { myUserId, pageNum, pageSize } = req.query;
  const result = await Follow.getMyFollowList(myUserId, pageNum, pageSize);
  const count = await Follow.getMyFollowCount(myUserId);
  res.json({
    code: 0,
    msg: "查询成功",
    data: { data: result, count, pageNum, pageSize },
  });
};

/**发表帖子 */
module.exports = {
  addFollow,
  deleteFollow,
  getFollowCount,
  getFollowList,
  getMyFollowCount,
  getMyFollowList,
};
