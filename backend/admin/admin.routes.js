const express = require("express");

const adminController = require("./admin.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/login", adminController.loginAdmin);

router.get(
    "/me",
    authMiddleware,
    adminController.getAdminMe
);

module.exports = router;