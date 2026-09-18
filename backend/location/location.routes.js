const express = require("express");

const locationController = require("./location.controller");

const router = express.Router();

router.get("/", locationController.getLocation);

module.exports = router;