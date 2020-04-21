const express = require("express");
const router = new express.Router();
// 引入user表的controller
const postCtrl = require("../controllers/postCtrl");

// 发表帖子
/**发表帖子 */
router.post("/publish_post", postCtrl.publishPost);
/**获得一个用户的全部帖子 */
router.get("/get_userAllPost", postCtrl.getUserAllPost);

/**按desc模糊查询帖子 */
router.get("/get_post", postCtrl.getPost);
/**获得帖子总数 */
router.get("/get_postCount", postCtrl.getPostCount);
/**删除帖子 */
router.post("/delete_post", postCtrl.deletePost);

module.exports = router;
