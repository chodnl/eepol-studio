const Gallery = require("./gallery.model");

const getGallery = async () => {
    return await Gallery.find().sort({ order: 1 });
};

module.exports = {
    getGallery,
};