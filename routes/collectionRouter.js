const express = require("express");
const router = new express.Router();
const collectionCtrl = require("../controllers/collectionCtrl");

router.post("/add_collection", collectionCtrl.addCollection);
router.post("/delete_collection", collectionCtrl.deleteCollection);
router.get("/get_collectionCount", collectionCtrl.getCollectionCount);
router.get("/get_collectionList", collectionCtrl.getCollectionList);

module.exports = router;
