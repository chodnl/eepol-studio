const API_URL = 'http://localhost:3000/api/pricing'

const getToken = () => {
    const token = localStorage.getItem('adminToken')

    if (!token) {
        throw new Error('관리자 인증이 필요합니다.')
    }

    return token
}

export const getPricing = async () => {
    const response = await fetch(API_URL)

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '가격 정보를 불러오지 못했습니다.'
        )
    }

    return result.data
}

export const getPricingById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`)

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '가격 정보를 불러오지 못했습니다.'
        )
    }

    return result.data
}

export const createPricing = async (pricingData) => {
    const token = getToken()

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pricingData),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '가격 등록에 실패했습니다.'
        )
    }

    return result.data
}

export const updatePricing = async (id, pricingData) => {
    const token = getToken()

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pricingData),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '가격 수정에 실패했습니다.'
        )
    }

    return result.data
}

export const deletePricing = async (id) => {
    const token = getToken()

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '가격 삭제에 실패했습니다.'
        )
    }

    return result.data
}