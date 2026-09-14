const Gallery = require("./gallery.model");

const getGallery = async () => {
    return await Gallery.find().sort({ order: 1 });
};

const createGallery = async (galleryData) => {
    const gallery = await Gallery.create(galleryData);

    return gallery;
};

const deleteGallery = async (id) => {
    return await Gallery.findByIdAndDelete(id);
};

const getGalleryById = async (id) => {
    return await Gallery.findById(id);
};

module.exports = {
    getGallery,
    getGalleryById,
    createGallery,
    deleteGallery
};