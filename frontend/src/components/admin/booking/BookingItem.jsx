function BookingItem({
    booking,
    onEdit,
    children,
}) {
    const statusLabel = {
        pending: '예약 대기',
        confirmed: '예약 확정',
        completed: '촬영 완료',
    }

    return (
        <div
            id={`booking-${booking._id}`}
            className={`booking-item status-${booking.status}`}
        >
            <div className="booking-item-header">
                <div>
                    <p className="booking-item-eyebrow">
                        RESERVATION
                    </p>

                    <h3>{booking.customerName}</h3>
                </div>

                <span className="booking-status">
                    {statusLabel[booking.status] ||
                        booking.status}
                </span>
            </div>

            <div className="booking-item-info">
                <p>
                    <span>전화번호</span>
                    {booking.phone}
                </p>

                <p>
                    <span>예약일</span>
                    {booking.date} {booking.time}
                </p>

                <p>
                    <span>촬영 유형</span>
                    {booking.type}
                </p>

                <p>
                    <span>예약 채널</span>
                    {booking.channel}
                </p>

                {booking.memo && (
                    <p>
                        <span>메모</span>
                        {booking.memo}
                    </p>
                )}
            </div>

            <div className="booking-item-actions">
                <button
                    type="button"
                    onClick={() => onEdit(booking)}
                >
                    수정
                </button>
            </div>

            {children}
        </div>
    )
}

export default BookingItem