const express = require("express");
const noticeController = require("./notice.controller");

const router = express.Router();

router.get("/", noticeController.getNotices);
router.get("/:id", noticeController.getNoticeById);
router.post("/", noticeController.createNotice);
router.patch("/:id", noticeController.updateNotice);
router.delete("/:id", noticeController.deleteNotice);

module.exports = router;