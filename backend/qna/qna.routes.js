const express = require("express");
const qnaController = require("./qna.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", qnaController.getQnas);
router.get("/:id", qnaController.getQnaById);

router.post("/", qnaController.createQna);
router.post("/:id/verify", qnaController.verifyQnaPassword);

router.post(
    "/:id/answer",
    authMiddleware,
    qnaController.answerQna
);

router.patch(
    "/:id/status",
    authMiddleware,
    qnaController.updateQnaStatus
);

router.delete(
    "/:id",
    authMiddleware,
    qnaController.deleteQna
);

module.exports = router;