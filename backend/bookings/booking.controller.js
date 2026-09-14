const bookingService = require("./booking.service");

const getBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getBookings();

        res.json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        console.error("Get bookings error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch bookings",
        });
    }
};

const getBookingById = async (req, res) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        res.json({
            success: true,
            data: booking,
        });
    } catch (error) {
        console.error("Get booking by id error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch booking",
        });
    }
};

const createBooking = async (req, res) => {
    try {
        const booking = await bookingService.createBooking(req.body);

        res.status(201).json({
            success: true,
            data: booking,
        });
    } catch (error) {
        console.error("Create booking error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create booking",
        });
    }
};

const updateBooking = async (req, res) => {
    try {
        const booking = await bookingService.updateBooking(
            req.params.id,
            req.body
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        res.json({
            success: true,
            data: booking,
        });
    } catch (error) {
        console.error("Update booking error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update booking",
        });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const booking = await bookingService.deleteBooking(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        res.json({
            success: true,
            message: "Booking deleted successfully",
            data: booking,
        });
    } catch (error) {
        console.error("Delete booking error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete booking",
        });
    }
};

module.exports = {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
};