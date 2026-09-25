import BookingItem from './BookingItem'

function BookingList({
    bookings,
    editingBookingId,
    onEdit,
    renderEditor,
}) {
    if (bookings.length === 0) {
        return (
            <p className="booking-empty">
                등록된 예약이 없습니다.
            </p>
        )
    }

    return (
        <div className="booking-list">
            {bookings.map((booking) => (
                <BookingItem
                    key={booking._id}
                    booking={booking}
                    onEdit={onEdit}
                >
                    {editingBookingId === booking._id &&
                        renderEditor(booking)}
                </BookingItem>
            ))}
        </div>
    )
}

export default BookingList