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

module.exports = {
    getGallery,
};