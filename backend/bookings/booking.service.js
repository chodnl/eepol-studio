const Booking = require("./booking.model");

const getBookings = async () => {
    return await Booking.find().sort({
        date: 1,
        time: 1,
    });
};

const getBookingById = async (id) => {
    return await Booking.findById(id);
};

const createBooking = async (bookingData) => {
    return await Booking.create(bookingData);
};

const updateBooking = async (id, bookingData) => {
    return await Booking.findByIdAndUpdate(
        id,
        bookingData,
        {
            new: true,
            runValidators: true,
        }
    );
};

const deleteBooking = async (id) => {
    return await Booking.findByIdAndDelete(id);
};

module.exports = {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
};