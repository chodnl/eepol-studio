const mongoose = require("mongoose");

const qnaSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
        },

        author: {
            type: String,
            required: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        answer: {
            type: String,
            default: "",
            trim: true,
        },

        status: {
            type: String,
            enum: ["waiting", "answered"],
            default: "waiting",
        },
    },
    {
        timestamps: true,
    }
);

const Qna = mongoose.model("Qna", qnaSchema);

module.exports = Qna;