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

const updateGallery = async (id, galleryData) => {
    return await Gallery.findByIdAndUpdate(
        id,
        galleryData,
        {
            new: true,
            runValidators: true,
        }
    );
};

const updateGalleryOrder = async (items) => {
    const operations = items.map((item) => ({
        updateOne: {
            filter: { _id: item.id },
            update: { order: item.order },
        },
    }));

    return await Gallery.bulkWrite(operations);
};

module.exports = {
    getGallery,
    getGalleryById,
    createGallery,
    updateGallery,
    updateGalleryOrder,
    deleteGallery,
};