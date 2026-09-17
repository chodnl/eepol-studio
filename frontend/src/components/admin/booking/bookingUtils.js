export const filterBookingsByMonth = (
    bookings,
    selectedMonth
) => {
    const selectedYear = selectedMonth.getFullYear()
    const selectedMonthNumber =
        selectedMonth.getMonth() + 1

    return bookings
        .filter((booking) => {
            const [year, month] = booking.date.split('-')

            return (
                Number(year) === selectedYear &&
                Number(month) === selectedMonthNumber
            )
        })
        .sort((a, b) => {
            if (a.date !== b.date) {
                return a.date.localeCompare(b.date)
            }

            return a.time.localeCompare(b.time)
        })
}

export const getPaginatedBookings = (
    bookings,
    currentPage,
    itemsPerPage
) => {
    const startIndex =
        (currentPage - 1) * itemsPerPage

    return bookings.slice(
        startIndex,
        startIndex + itemsPerPage
    )
}

export const getTotalPages = (
    bookings,
    itemsPerPage
) => {
    return Math.ceil(
        bookings.length / itemsPerPage
    )
}