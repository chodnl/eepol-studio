function BookingItem({
    booking,
    onEdit,
    onDelete,
    children,
}) {
    return (
        <div
            id={`booking-${booking._id}`}
            className="booking-item"
        >
            <h3>{booking.customerName}</h3>

            <p>전화번호: {booking.phone}</p>

            <p>
                예약일: {booking.date} {booking.time}
            </p>

            <p>촬영 유형: {booking.type}</p>

            <p>예약 채널: {booking.channel}</p>

            <p>예약 상태: {booking.status}</p>

            {booking.memo && (
                <p>메모: {booking.memo}</p>
            )}

            <button
                type="button"
                onClick={() => onEdit(booking)}
            >
                수정
            </button>

            <button
                type="button"
                onClick={() => onDelete(booking._id)}
            >
                삭제
            </button>

            {children}
        </div>
    )
}

export default BookingItem