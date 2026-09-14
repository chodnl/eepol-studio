const pricingService = require("./pricing.service");

const getPricing = async (req, res) => {
    try {
        const pricing = await pricingService.getPricing();

        res.json({
            success: true,
            data: pricing,
        });
    } catch (error) {
        console.error("Get pricing error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch pricing",
        });
    }
};

const getPricingById = async (req, res) => {
    try {
        const pricing = await pricingService.getPricingById(req.params.id);

        if (!pricing) {
            return res.status(404).json({
                success: false,
                message: "Pricing not found",
            });
        }

        res.json({
            success: true,
            data: pricing,
        });
    } catch (error) {
        console.error("Get pricing by id error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch pricing",
        });
    }
};

const createPricing = async (req, res) => {
    try {
        const pricing = await pricingService.createPricing(req.body);

        res.status(201).json({
            success: true,
            data: pricing,
        });
    } catch (error) {
        console.error("Create pricing error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create pricing",
        });
    }
};

const updatePricing = async (req, res) => {
    try {
        const pricing = await pricingService.updatePricing(
            req.params.id,
            req.body
        );

        if (!pricing) {
            return res.status(404).json({
                success: false,
                message: "Pricing not found",
            });
        }

        res.json({
            success: true,
            data: pricing,
        });
    } catch (error) {
        console.error("Update pricing error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update pricing",
        });
    }
};

const deletePricing = async (req, res) => {
    try {
        const pricing = await pricingService.deletePricing(req.params.id);

        if (!pricing) {
            return res.status(404).json({
                success: false,
                message: "Pricing not found",
            });
        }

        res.json({
            success: true,
            message: "Pricing deleted successfully",
            data: pricing,
        });
    } catch (error) {
        console.error("Delete pricing error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete pricing",
        });
    }
};

module.exports = {
    getPricing,
    getPricingById,
    createPricing,
    updatePricing,
    deletePricing,
};