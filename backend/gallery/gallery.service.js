const Gallery = require("./gallery.model");

const getGallery = async () => {
    return await Gallery.find().sort({ order: 1 });
};

const createGallery = async (galleryData) => {
    const gallery = await Gallery.create(galleryData);

    return gallery;
};

module.exports = {
    getGallery,
    createGallery,
};