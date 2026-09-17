import { useMemo, useState } from 'react'

function BookingCalendar({ bookings, onSelectBooking, onMonthChange }) {
    const today = new Date()

    const [currentDate, setCurrentDate] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
    )

    const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false)

    const [pickerYear, setPickerYear] = useState(
        currentDate.getFullYear()
    )

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1).getDay()
    const lastDate = new Date(year, month + 1, 0).getDate()

    const calendarDays = useMemo(() => {
        const days = []

        for (let i = 0; i < firstDay; i += 1) {
            days.push(null)
        }

        for (let day = 1; day <= lastDate; day += 1) {
            days.push(day)
        }

        return days
    }, [firstDay, lastDate])

    const getBookingsForDate = (day) => {
        if (!day) {
            return []
        }

        const dateString = [
            year,
            String(month + 1).padStart(2, '0'),
            String(day).padStart(2, '0'),
        ].join('-')

        return bookings
            .filter((booking) => booking.date === dateString)
            .sort((a, b) =>
                a.time.localeCompare(b.time)
            )
    }

    const handlePreviousMonth = () => {
        const newDate = new Date(year, month - 1, 1)

        setCurrentDate(newDate)
        onMonthChange(newDate)
    }

    const handleNextMonth = () => {
        const newDate = new Date(year, month + 1, 1)

        setCurrentDate(newDate)
        onMonthChange(newDate)
    }

    const handleOpenMonthPicker = () => {
        setPickerYear(year)
        setIsMonthPickerOpen((prev) => !prev)
    }

    const handlePreviousYear = () => {
        setPickerYear((prev) => prev - 1)
    }

    const handleNextYear = () => {
        setPickerYear((prev) => prev + 1)
    }

    const handleSelectMonth = (selectedMonth) => {
        const newDate = new Date(
            pickerYear,
            selectedMonth,
            1
        )

        setCurrentDate(newDate)
        onMonthChange(newDate)

        setIsMonthPickerOpen(false)
    }

    return (
        <section>
            <div>
                <button
                    type="button"
                    onClick={handlePreviousMonth}
                >
                    이전
                </button>

                <button
                    type="button"
                    onClick={handleOpenMonthPicker}
                >
                    <span>
                        {year}년 {month + 1}월
                    </span>
                </button>

                <button
                    type="button"
                    onClick={handleNextMonth}
                >
                    다음
                </button>
            </div>

            {isMonthPickerOpen && (
                <div>
                    <div>
                        <button
                            type="button"
                            onClick={handlePreviousYear}
                        >
                            이전 년
                        </button>

                        <strong>
                            {pickerYear}년
                        </strong>

                        <button
                            type="button"
                            onClick={handleNextYear}
                        >
                            다음 년
                        </button>
                    </div>

                    <div>
                        {Array.from(
                            { length: 12 },
                            (_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() =>
                                        handleSelectMonth(
                                            index
                                        )
                                    }
                                >
                                    {index + 1}월
                                </button>
                            )
                        )}
                    </div>
                </div>
            )}

            <div>
                <div>일</div>
                <div>월</div>
                <div>화</div>
                <div>수</div>
                <div>목</div>
                <div>금</div>
                <div>토</div>
            </div>

            <div>
                {calendarDays.map((day, index) => {
                    const dayBookings =
                        getBookingsForDate(day)

                    return (
                        <div
                            key={`${year}-${month}-${index}`}
                        >
                            {day && (
                                <>
                                    <strong>
                                        {day}
                                    </strong>

                                    <div>
                                        {dayBookings.map(
                                            (booking) => (
                                                <button
                                                    key={booking._id}
                                                    type="button"
                                                    onClick={() =>
                                                        onSelectBooking(
                                                            booking
                                                        )
                                                    }
                                                >
                                                    <span>
                                                        {booking.time}
                                                    </span>

                                                    <span>
                                                        {
                                                            booking.customerName
                                                        }
                                                    </span>

                                                    <span>
                                                        {booking.type}
                                                    </span>
                                                </button>
                                            )
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default BookingCalendar