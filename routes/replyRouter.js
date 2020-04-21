const express = require("express");
const router = new express.Router();
const replyCtrl = require("../controllers/replyCtrl");

router.post("/add_reply", replyCtrl.addReply);
router.post("/delete_reply", replyCtrl.deleteReply);
router.get("/get_replyCount", replyCtrl.getReplyCount);
router.get("/get_replyList", replyCtrl.getReplyList);
router.get("/get_myReplyCount", replyCtrl.getMyReplyCount);
router.get("/get_myReplyList", replyCtrl.getMyReplyList);

module.exports = router;
