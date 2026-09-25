const express = require("express");

const bookingController = require("./booking.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get(
    "/availability",
    bookingController.getBookingAvailability
);

router.get(
    "/",
    authMiddleware,
    bookingController.getBookings
);

router.get(
    "/:id",
    authMiddleware,
    bookingController.getBookingById
);

router.post("/", authMiddleware, bookingController.createBooking);

router.post(
    "/public",
    bookingController.createBooking
);

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