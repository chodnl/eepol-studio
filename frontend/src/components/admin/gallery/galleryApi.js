const API_URL = 'http://localhost:3000/api/gallery'

export const getGallery = async () => {
    const response = await fetch(API_URL)
    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '갤러리를 불러오지 못했습니다.',
        )
    }

    return result.data
}

export const deleteGallery = async (id) => {
    const token = localStorage.getItem('adminToken')

    if (!token) {
        throw new Error('관리자 인증이 필요합니다.')
    }

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '사진 삭제에 실패했습니다.',
        )
    }

    return result.data
}

export const updateGallery = async (id, data) => {
    const token = localStorage.getItem('adminToken')

    if (!token) {
        throw new Error('관리자 인증이 필요합니다.')
    }

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '사진 수정에 실패했습니다.',
        )
    }


    return result.data
}

export const updateGalleryOrder = async (items) => {
    const token = localStorage.getItem('adminToken')

    if (!token) {
        throw new Error('관리자 인증이 필요합니다.')
    }

    const response = await fetch(`${API_URL}/order`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            items,
        }),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '사진 순서 변경에 실패했습니다.',
        )
    }

    return result.data
}

export const createGallery = async ({
    file,
    title,
    category,
}) => {
    const token = localStorage.getItem('adminToken')

    if (!token) {
        throw new Error('관리자 인증이 필요합니다.')
    }

    const formData = new FormData()

    formData.append('image', file)
    formData.append('title', title)
    formData.append('category', category)
    formData.append('order', 1)

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '사진 등록에 실패했습니다.',
        )
    }

    return result.data
}