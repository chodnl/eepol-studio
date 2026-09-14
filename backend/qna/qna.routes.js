const express = require("express");
const qnaController = require("./qna.controller");

const router = express.Router();

router.get("/", qnaController.getQnas);
router.get("/:id", qnaController.getQnaById);

router.post("/", qnaController.createQna);
router.post("/:id/verify", qnaController.verifyQnaPassword);
router.post("/:id/answer", qnaController.answerQna);

router.patch("/:id/status", qnaController.updateQnaStatus);

router.delete("/:id", qnaController.deleteQna);

module.exports = router;