const express = require("express");
const galleryController = require("./gallery.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", galleryController.getGallery);
router.get("/:id", galleryController.getGalleryById);

router.post("/", authMiddleware, galleryController.createGallery);

router.patch("/order", galleryController.updateGalleryOrder);
router.patch("/:id", galleryController.updateGallery);

router.delete("/:id", galleryController.deleteGallery);


module.exports = router;