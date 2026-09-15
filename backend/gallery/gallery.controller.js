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
        console.log("Request body:", req.body);

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

const getGalleryById = async (req, res) => {
    try {
        const gallery = await galleryService.getGalleryById(req.params.id);

        if (!gallery) {
            return res.status(404).json({
                success: false,
                message: "Gallery not found",
            });
        }

        res.json({
            success: true,
            data: gallery,
        });
    } catch (error) {
        console.error("Get gallery by id error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch gallery",
        });
    }
};

const updateGallery = async (req, res) => {
    try {
        const gallery = await galleryService.updateGallery(
            req.params.id,
            req.body
        );

        if (!gallery) {
            return res.status(404).json({
                success: false,
                message: "Gallery not found",
            });
        }

        res.json({
            success: true,
            data: gallery,
        });
    } catch (error) {
        console.error("Update gallery error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update gallery",
        });
    }
};

const updateGalleryOrder = async (req, res) => {
    try {
        const items = req.body.items

        const result =
            await galleryService.updateGalleryOrder(items)

        res.json({
            success: true,
            data: result,
        })
    } catch (error) {
        console.error(
            'Update gallery order error:',
            error,
        )

        res.status(500).json({
            success: false,
            message: 'Failed to update gallery order',
        })
    }
};

const deleteGallery = async (req, res) => {
    try {
        const gallery = await galleryService.deleteGallery(req.params.id);

        if (!gallery) {
            return res.status(404).json({
                success: false,
                message: "Gallery not found",
            });
        }

        res.json({
            success: true,
            message: "Gallery deleted successfully",
            data: gallery,
        });
    } catch (error) {
        console.error("Delete gallery error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete gallery",
        });
    }
};

module.exports = {
    getGallery,
    getGalleryById,
    createGallery,
    updateGallery,
    updateGalleryOrder,
    deleteGallery,
};