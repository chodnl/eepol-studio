const noticeService = require("./notice.service");

const getNotices = async (req, res) => {
    try {
        const notices = await noticeService.getNotices();

        res.json({
            success: true,
            data: notices,
        });
    } catch (error) {
        console.error("Get notices error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch notices",
        });
    }
};

const getNoticeById = async (req, res) => {
    try {
        const notice = await noticeService.getNoticeById(req.params.id);

        if (!notice) {
            return res.status(404).json({
                success: false,
                message: "Notice not found",
            });
        }

        res.json({
            success: true,
            data: notice,
        });
    } catch (error) {
        console.error("Get notice by id error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch notice",
        });
    }
};

const createNotice = async (req, res) => {
    try {
        const notice = await noticeService.createNotice(req.body);

        res.status(201).json({
            success: true,
            data: notice,
        });
    } catch (error) {
        console.error("Create notice error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create notice",
        });
    }
};

const updateNotice = async (req, res) => {
    try {
        const notice = await noticeService.updateNotice(
            req.params.id,
            req.body
        );

        if (!notice) {
            return res.status(404).json({
                success: false,
                message: "Notice not found",
            });
        }

        res.json({
            success: true,
            data: notice,
        });
    } catch (error) {
        console.error("Update notice error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update notice",
        });
    }
};

const deleteNotice = async (req, res) => {
    try {
        const notice = await noticeService.deleteNotice(req.params.id);

        if (!notice) {
            return res.status(404).json({
                success: false,
                message: "Notice not found",
            });
        }

        res.json({
            success: true,
            message: "Notice deleted successfully",
            data: notice,
        });
    } catch (error) {
        console.error("Delete notice error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete notice",
        });
    }
};

module.exports = {
    getNotices,
    getNoticeById,
    createNotice,
    updateNotice,
    deleteNotice,
};