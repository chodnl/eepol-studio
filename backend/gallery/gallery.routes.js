const express = require("express");
const galleryController = require("./gallery.controller");

const router = express.Router();

router.get("/", galleryController.getGallery);
router.post("/", galleryController.createGallery);
router.delete("/:id", galleryController.deleteGallery);

module.exports = router;