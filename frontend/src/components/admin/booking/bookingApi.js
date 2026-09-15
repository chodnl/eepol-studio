const API_URL = 'http://localhost:3000/api/bookings'

export const getBookings = async () => {
    const token = localStorage.getItem('adminToken')

    if (!token) {
        throw new Error('관리자 인증이 필요합니다.')
    }

    const response = await fetch(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '예약 목록을 불러오지 못했습니다.',
        )
    }

    return result.data
}

