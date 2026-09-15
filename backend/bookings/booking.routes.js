const express = require("express");

const bookingController = require("./booking.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", bookingController.getBookings);
router.get("/:id", bookingController.getBookingById);

router.post("/", bookingController.createBooking);

router.patch(
    "/:id",
    authMiddleware,
    bookingController.updateBooking
);

router.delete(
    "/:id",
    authMiddleware,
    bookingController.deleteBooking
);

module.exports = router;