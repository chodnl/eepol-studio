const {
    PutObjectCommand,
    GetObjectCommand,
} = require("@aws-sdk/client-s3");

const {
    getSignedUrl,
} = require("@aws-sdk/s3-request-presigner");

const crypto = require("crypto");

const s3 = require("../config/s3");
const galleryService = require("./gallery.service");

const createPresignedUrl = async (imageUrl) => {
    const bucketName = process.env.AWS_S3_BUCKET_NAME;

    const url = new URL(imageUrl);

    const key = decodeURIComponent(
        url.pathname.replace(/^\/+/, "")
    );

    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
    });

    return await getSignedUrl(s3, command, {
        expiresIn: 60 * 60,
    });
};

const getGallery = async (req, res) => {
    try {
        const gallery = await galleryService.getGallery();

        const galleryWithSignedUrls = await Promise.all(
            gallery.map(async (item) => ({
                ...item.toObject(),
                imageUrl: await createPresignedUrl(
                    item.imageUrl
                ),
            }))
        );

        res.json({
            success: true,
            data: galleryWithSignedUrls,
        });
    } catch (error) {
        console.error("Get gallery error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch gallery",
        });
    }
};

const createGallery = async (req, res) => {
    try {
        const {
            title,
            category,
            order,
        } = req.body

        const isHero = req.body.isHero === "true"

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image file is required",
            })
        }

        const file = req.file;

        const fileExtension =
            file.originalname.split(".").pop();

        const fileName = `${crypto.randomUUID()}.${fileExtension}`;

        const key = `gallery/${fileName}`;

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        await s3.send(command);

        const imageUrl =
            `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

        const gallery = await galleryService.createGallery({
            title,
            category,
            imageUrl,
            order,
            isHero,
        })

        const signedImageUrl = await createPresignedUrl(gallery.imageUrl)

        const responseGallery = {
            ...gallery.toObject(),
            imageUrl: signedImageUrl,
        }

        res.status(201).json({
            success: true,
            data: responseGallery,
        })
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
        let gallery =
            await galleryService.getGalleryById(
                req.params.id
            );

        if (!gallery) {
            return res.status(404).json({
                success: false,
                message: "Gallery not found",
            });
        }

        gallery = {
            ...gallery.toObject(),
            imageUrl: await createPresignedUrl(
                gallery.imageUrl
            ),
        };

        res.json({
            success: true,
            data: gallery,
        });
    } catch (error) {
        console.error(
            "Get gallery by id error:",
            error
        );

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
        const items = req.body.items;

        const result =
            await galleryService.updateGalleryOrder(items);

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error(
            "Update gallery order error:",
            error,
        );

        res.status(500).json({
            success: false,
            message: "Failed to update gallery order",
        });
    }
};

const updateHeroOrder = async (req, res) => {
    try {
        const items = req.body.items;

        const result =
            await galleryService.updateHeroOrder(items);

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error(
            "Update hero order error:",
            error,
        );

        res.status(500).json({
            success: false,
            message: "Failed to update hero order",
        });
    }
};

const deleteGallery = async (req, res) => {
    try {
        const gallery =
            await galleryService.deleteGallery(
                req.params.id,
            );

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
    updateHeroOrder,
    deleteGallery,
};
