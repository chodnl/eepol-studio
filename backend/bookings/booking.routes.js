const express = require("express");
const bookingController = require("./booking.controller");

const router = express.Router();

router.get("/", bookingController.getBookings);
router.get("/:id", bookingController.getBookingById);

router.post("/", bookingController.createBooking);

router.patch("/:id", bookingController.updateBooking);

router.delete("/:id", bookingController.deleteBooking);

module.exports = router;