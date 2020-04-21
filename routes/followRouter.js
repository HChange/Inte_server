const express = require("express");
const router = new express.Router();
const followCtrl = require("../controllers/followCtrl");

router.post("/add_follow", followCtrl.addFollow);
router.post("/delete_follow", followCtrl.deleteFollow);
router.get("/get_followCount", followCtrl.getFollowCount);
router.get("/get_followList", followCtrl.getFollowList);
router.get("/get_myFollowCount", followCtrl.getMyFollowCount);
router.get("/get_myFollowList", followCtrl.getMyFollowList);

module.exports = router;
