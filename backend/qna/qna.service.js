const bcrypt = require("bcryptjs");

const Qna = require("./qna.model");

const getQnas = async () => {
    return await Qna.find()
        .select("-password")
        .sort({ createdAt: -1 });
};

const getQnaById = async (id) => {
    return await Qna.findById(id).select("-password");
};

const createQna = async (qnaData) => {
    const hashedPassword = await bcrypt.hash(qnaData.password, 10);

    const qna = await Qna.create({
        ...qnaData,
        password: hashedPassword,
    });

    const qnaWithoutPassword = qna.toObject();
    delete qnaWithoutPassword.password;

    return qnaWithoutPassword;
};

const verifyQnaPassword = async (id, password) => {
    const qna = await Qna.findById(id);

    if (!qna) {
        return null;
    }

    const isMatch = await bcrypt.compare(password, qna.password);

    if (!isMatch) {
        return false;
    }

    const qnaWithoutPassword = qna.toObject();
    delete qnaWithoutPassword.password;

    return qnaWithoutPassword;
};

const answerQna = async (id, answer) => {
    return await Qna.findByIdAndUpdate(
        id,
        {
            answer,
            status: "answered",
        },
        {
            new: true,
            runValidators: true,
        }
    ).select("-password");
};

const updateQnaStatus = async (id, status) => {
    return await Qna.findByIdAndUpdate(
        id,
        { status },
        {
            new: true,
            runValidators: true,
        }
    ).select("-password");
};

const deleteQna = async (id) => {
    return await Qna.findByIdAndDelete(id);
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