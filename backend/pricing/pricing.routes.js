const express = require("express");
const pricingController = require("./pricing.controller");

const router = express.Router();

router.get("/", pricingController.getPricing);
router.get("/:id", pricingController.getPricingById);
router.post("/", pricingController.createPricing);
router.patch("/:id", pricingController.updatePricing);
router.delete("/:id", pricingController.deletePricing);

module.exports = router;