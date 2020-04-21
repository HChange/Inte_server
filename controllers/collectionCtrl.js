// 引入用户表操作对象
const Collection = require("../model/collectionTable");

const addCollection = async (req, res, next) => {
  Collection.addCollection(req.body)
    .then((result) => {
      if (result) {
        res.json({
          code: 0,
          msg: "收藏成功",
          data: result,
        });
      } else {
        res.json({
          code: -1,
          msg: "收藏失败",
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
const deleteCollection = async (req, res, next) => {
  let { _id } = req.body;
  Collection.deleteCollection(_id)
    .then((result) => {
      if (result) {
        res.json({
          code: 0,
          msg: "取消收藏成功",
          data: result,
        });
      } else {
        res.json({
          code: -1,
          msg: "取消收藏失败",
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

const getCollectionCount = async (req, res, next) => {
  let { telephone } = req.query;
  const count = await Collection.getCollectionCount(telephone);
  res.json({
    code: 0,
    msg: "查询成功",
    data: count,
  });
};
const getCollectionList = async (req, res, next) => {
  let { telephone, pageNum, pageSize } = req.query;
  const result = await Collection.getCollectionList(telephone, pageNum, pageSize);
  const count = await Collection.getCollectionCount(telephone);
  res.json({
    code: 0,
    msg: "查询成功",
    data: { data: result, count, pageNum, pageSize },
  });
};


/**发表帖子 */
module.exports = {
  addCollection,
  deleteCollection,
  getCollectionCount,
  getCollectionList,
};
