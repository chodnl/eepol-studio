const express = require("express");
const galleryController = require("./gallery.controller");

const router = express.Router();

router.get("/", galleryController.getGallery);
router.get("/:id", galleryController.getGalleryById);
router.post("/", galleryController.createGallery);
router.patch("/:id", galleryController.updateGallery);
router.delete("/:id", galleryController.deleteGallery);


module.exports = router;