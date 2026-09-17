import BookingItem from './BookingItem'

function BookingList({
    bookings,
    editingBookingId,
    onEdit,
    onDelete,
    renderEditor,
}) {
    if (bookings.length === 0) {
        return (
            <p>
                등록된 예약이 없습니다.
            </p>
        )
    }

    return (
        <div>
            {bookings.map((booking) => (
                <BookingItem
                    key={booking._id}
                    booking={booking}
                    onEdit={onEdit}
                    onDelete={onDelete}
                >
                    {editingBookingId === booking._id &&
                        renderEditor(booking)}
                </BookingItem>
            ))}
        </div>
    )
}

export default BookingList