const qnaService = require("./qna.service");

const getQnas = async (req, res) => {
    try {
        const qnas = await qnaService.getQnas();

        res.json({
            success: true,
            data: qnas,
        });
    } catch (error) {
        console.error("Get Q&A error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch Q&A",
        });
    }
};

const getQnaById = async (req, res) => {
    try {
        const qna = await qnaService.getQnaById(req.params.id);

        if (!qna) {
            return res.status(404).json({
                success: false,
                message: "Q&A not found",
            });
        }

        res.json({
            success: true,
            data: qna,
        });
    } catch (error) {
        console.error("Get Q&A by id error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch Q&A",
        });
    }
};

const createQna = async (req, res) => {
    try {
        const qna = await qnaService.createQna(req.body);

        res.status(201).json({
            success: true,
            data: qna,
        });
    } catch (error) {
        console.error("Create Q&A error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create Q&A",
        });
    }
};

const verifyQnaPassword = async (req, res) => {
    try {
        const qna = await qnaService.verifyQnaPassword(
            req.params.id,
            req.body.password
        );

        if (qna === null) {
            return res.status(404).json({
                success: false,
                message: "Q&A not found",
            });
        }

        if (qna === false) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        res.json({
            success: true,
            data: qna,
        });
    } catch (error) {
        console.error("Verify Q&A password error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to verify password",
        });
    }
};

const answerQna = async (req, res) => {
    try {
        const qna = await qnaService.answerQna(
            req.params.id,
            req.body.answer
        );

        if (!qna) {
            return res.status(404).json({
                success: false,
                message: "Q&A not found",
            });
        }

        res.json({
            success: true,
            data: qna,
        });
    } catch (error) {
        console.error("Answer Q&A error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to answer Q&A",
        });
    }
};

const updateQnaStatus = async (req, res) => {
    try {
        const qna = await qnaService.updateQnaStatus(
            req.params.id,
            req.body.status
        );

        if (!qna) {
            return res.status(404).json({
                success: false,
                message: "Q&A not found",
            });
        }

        res.json({
            success: true,
            data: qna,
        });
    } catch (error) {
        console.error("Update Q&A status error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update Q&A status",
        });
    }
};

const deleteQna = async (req, res) => {
    try {
        const qna = await qnaService.deleteQna(req.params.id);

        if (!qna) {
            return res.status(404).json({
                success: false,
                message: "Q&A not found",
            });
        }

        res.json({
            success: true,
            message: "Q&A deleted successfully",
            data: qna,
        });
    } catch (error) {
        console.error("Delete Q&A error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete Q&A",
        });
    }
};

module.exports = {
    getQnas,
    getQnaById,
    createQna,
    verifyQnaPassword,
    answerQna,
    updateQnaStatus,
    deleteQna,
};