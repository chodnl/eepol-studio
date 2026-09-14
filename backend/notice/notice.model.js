const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
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

        isPinned: {
            type: Boolean,
            default: false,
        },

        isPopup: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;