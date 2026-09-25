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
    const existingBooking = await Booking.findOne({
        date: bookingData.date,
        time: bookingData.time,
        status: {
            $in: ["pending", "confirmed"],
        },
    });

    if (existingBooking) {
        const error = new Error(
            "이미 예약된 시간입니다."
        );

        error.statusCode = 409;

        throw error;
    }

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

const getBookingAvailability = async () => {
    return await Booking.find(
        {
            status: {
                $in: ["pending", "confirmed"],
            },
        },
        {
            _id: 0,
            date: 1,
            time: 1,
        }
    ).sort({
        date: 1,
        time: 1,
    });
};

module.exports = {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
    getBookingAvailability,
};