const Pricing = require("./pricing.model");

const getPricing = async () => {
    return await Pricing.find();
};

const getPricingById = async (id) => {
    return await Pricing.findById(id);
};

const createPricing = async (pricingData) => {
    return await Pricing.create(pricingData);
};

const updatePricing = async (id, pricingData) => {
    return await Pricing.findByIdAndUpdate(
        id,
        pricingData,
        {
            new: true,
            runValidators: true,
        }
    );
};

const deletePricing = async (id) => {
    return await Pricing.findByIdAndDelete(id);
};

module.exports = {
    getPricing,
    getPricingById,
    createPricing,
    updatePricing,
    deletePricing,
};