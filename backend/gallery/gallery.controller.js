const galleryService = require("./gallery.service");

const getGallery = async (req, res) => {
    try {
        const gallery = await galleryService.getGallery();

        res.json({
            success: true,
            data: gallery,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch gallery",
        });
    }
};

const createGallery = async (req, res) => {
    try {
        const gallery = await galleryService.createGallery(req.body);

        res.status(201).json({
            success: true,
            data: gallery,
        });
    } catch (error) {
        console.error("Create gallery error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create gallery",
        });
    }
};

module.exports = {
    getGallery,
    createGallery,
};