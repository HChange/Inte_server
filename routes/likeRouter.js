const express = require("express");
const router = new express.Router();
const likeCtrl = require("../controllers/likeCtrl");

router.post("/add_like", likeCtrl.addLike);
router.post("/delete_like", likeCtrl.deleteLike);
router.get("/get_likeCount", likeCtrl.getLikeCount);
router.get("/get_likeList", likeCtrl.getLikeList);
router.get("/get_myLikeCount", likeCtrl.getMyLikeCount);
router.get("/get_myLikeList", likeCtrl.getMyLikeList);

module.exports = router;
