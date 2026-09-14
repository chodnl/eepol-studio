const Notice = require("./notice.model");

const getNotices = async () => {
    return await Notice.find().sort({
        isPinned: -1,
        createdAt: -1,
    });
};

const getNoticeById = async (id) => {
    return await Notice.findById(id);
};

const createNotice = async (noticeData) => {
    return await Notice.create(noticeData);
};

const updateNotice = async (id, noticeData) => {
    return await Notice.findByIdAndUpdate(
        id,
        noticeData,
        {
            new: true,
            runValidators: true,
        }
    );
};

const deleteNotice = async (id) => {
    return await Notice.findByIdAndDelete(id);
};

module.exports = {
    getNotices,
    getNoticeById,
    createNotice,
    updateNotice,
    deleteNotice,
};