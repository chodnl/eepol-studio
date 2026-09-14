const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        imageUrl: {
            type: String,
            required: true,
            trim: true,
        },

        order: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;