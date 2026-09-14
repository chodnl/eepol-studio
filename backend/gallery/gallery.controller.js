const galleryService = require("./gallery.service");

const getGallery = (req, res) => {
    const gallery = galleryService.getGallery();

    res.json({
        success: true,
        data: gallery,
    });
};

module.exports = {
    getGallery,
};