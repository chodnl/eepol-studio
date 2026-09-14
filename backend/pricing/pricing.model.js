const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema(
    {
        order: {
            type: Number,
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        basePrice: {
            type: Number,
            required: true,
        },

        options: [
            {
                title: {
                    type: String,
                    trim: true,
                },

                price: {
                    type: Number,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Pricing = mongoose.model("Pricing", pricingSchema);

module.exports = Pricing;