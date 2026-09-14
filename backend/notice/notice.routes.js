const express = require("express");

const noticeController = require("./notice.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", noticeController.getNotices);

router.get("/:id", noticeController.getNoticeById);

router.post(
    "/",
    authMiddleware,
    noticeController.createNotice
);

router.patch(
    "/:id",
    authMiddleware,
    noticeController.updateNotice
);

router.delete(
    "/:id",
    authMiddleware,
    noticeController.deleteNotice
);

module.exports = router;