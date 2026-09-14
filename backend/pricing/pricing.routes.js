const express = require("express");

const pricingController = require("./pricing.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", pricingController.getPricing);

router.get("/:id", pricingController.getPricingById);

router.post(
    "/",
    authMiddleware,
    pricingController.createPricing
);

router.patch(
    "/:id",
    authMiddleware,
    pricingController.updatePricing
);

router.delete(
    "/:id",
    authMiddleware,
    pricingController.deletePricing
);

module.exports = router;