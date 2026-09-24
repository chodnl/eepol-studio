const Gallery = require("./gallery.model");

const getGallery = async () => {
    return await Gallery.find().sort({ order: 1 });
};

const createGallery = async (galleryData) => {
    if (galleryData.isHero) {
        const lastHero = await Gallery.findOne({
            isHero: true,
        }).sort({ heroOrder: -1 });

        galleryData.heroOrder =
            lastHero?.heroOrder
                ? lastHero.heroOrder + 1
                : 1;
    } else {
        galleryData.heroOrder = null;
    }

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
    const currentGallery = await Gallery.findById(id);

    if (!currentGallery) {
        throw new Error("갤러리 사진을 찾을 수 없습니다.");
    }

    if (
        galleryData.isHero === true &&
        !currentGallery.isHero
    ) {
        const lastHero = await Gallery.findOne({
            isHero: true,
        }).sort({ heroOrder: -1 });

        galleryData.heroOrder =
            lastHero?.heroOrder
                ? lastHero.heroOrder + 1
                : 1;
    }

    if (
        galleryData.isHero === false &&
        currentGallery.isHero
    ) {
        galleryData.heroOrder = null;
    }

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

const updateHeroOrder = async (items) => {
    const operations = items.map((item) => ({
        updateOne: {
            filter: {
                _id: item.id,
                isHero: true,
            },
            update: {
                heroOrder: item.heroOrder,
            },
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
    updateHeroOrder,
    deleteGallery,
};