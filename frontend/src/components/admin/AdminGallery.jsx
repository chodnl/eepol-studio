import { useState } from 'react'

function AdminGallery() {
    const [photos, setPhotos] = useState([])
    const [message, setMessage] = useState('')
    const [photoEditor, setPhotoEditor] = useState({
        id: null,
        title: '',
        category: '',
        src: '',
    })

    const handlePhotoUpload = (event) => {
        const files = Array.from(event.target.files || [])

        if (!files.length) return

        const uploadedPhotos = files.map((file, index) => ({
            id: Date.now() + index,
            title:
                file.name.replace(/\.[^/.]+$/, '') ||
                `업로드 사진 ${index + 1}`,
            category: 'Custom',
            src: URL.createObjectURL(file),
        }))

        setPhotos((prev) => [...uploadedPhotos, ...prev])

        setMessage(
            `${uploadedPhotos.length}개의 사진이 업로드되어 갤러리에 반영되었습니다.`,
        )

        event.target.value = ''
    }

    const reorderPhoto = (id, direction) => {
        setPhotos((prev) => {
            const index = prev.findIndex(
                (photo) => photo.id === id,
            )

            if (index === -1) return prev

            const targetIndex = index + direction

            if (
                targetIndex < 0 ||
                targetIndex >= prev.length
            ) {
                return prev
            }

            const newPhotos = [...prev]

                ;[newPhotos[index], newPhotos[targetIndex]] = [
                    newPhotos[targetIndex],
                    newPhotos[index],
                ]

            return newPhotos
        })
    }

    const deletePhoto = (id) => {
        setPhotos((prev) =>
            prev.filter((photo) => photo.id !== id),
        )

        setMessage('사진이 삭제되었습니다.')
    }

    const savePhotoEdit = () => {
        if (!photoEditor.id) return

        setPhotos((prev) =>
            prev.map((photo) =>
                photo.id === photoEditor.id
                    ? {
                        ...photo,
                        title: photoEditor.title,
                        category: photoEditor.category,
                    }
                    : photo,
            ),
        )

        setPhotoEditor({
            id: null,
            title: '',
            category: '',
            src: '',
        })

        setMessage('사진 정보가 수정되었습니다.')
    }

    return (
        <section className="section admin-grid">
            <div className="admin-panel">
                <div className="section-header left-align">
                    <p className="eyebrow">admin</p>
                    <h2>사진 관리</h2>
                </div>

                <label className="upload-box">
                    <span>사진 업로드</span>

                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                    />
                </label>

                {photoEditor.id && (
                    <div className="editor-box">
                        <input
                            type="text"
                            value={photoEditor.title}
                            onChange={(event) =>
                                setPhotoEditor((prev) => ({
                                    ...prev,
                                    title: event.target.value,
                                }))
                            }
                            placeholder="사진 제목"
                        />

                        <input
                            type="text"
                            value={photoEditor.category}
                            onChange={(event) =>
                                setPhotoEditor((prev) => ({
                                    ...prev,
                                    category: event.target.value,
                                }))
                            }
                            placeholder="카테고리"
                        />

                        <button
                            type="button"
                            className="primary-btn"
                            onClick={savePhotoEdit}
                        >
                            수정 저장
                        </button>
                    </div>
                )}

                <div className="photo-list">
                    {photos.map((photo) => (
                        <div
                            key={photo.id}
                            className="photo-item"
                        >
                            <img
                                src={photo.src}
                                alt={photo.title}
                            />

                            <div className="photo-meta">
                                <strong>{photo.title}</strong>
                                <span>{photo.category}</span>
                            </div>

                            <div className="photo-actions">
                                <button
                                    type="button"
                                    onClick={() =>
                                        reorderPhoto(photo.id, -1)
                                    }
                                >
                                    위로
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        reorderPhoto(photo.id, 1)
                                    }
                                >
                                    아래로
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setPhotoEditor({
                                            id: photo.id,
                                            title: photo.title,
                                            category: photo.category,
                                            src: photo.src,
                                        })
                                    }
                                >
                                    수정
                                </button>

                                <button
                                    type="button"
                                    className="danger"
                                    onClick={() =>
                                        deletePhoto(photo.id)
                                    }
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {message && (
                    <p className="system-message">
                        {message}
                    </p>
                )}
            </div>
        </section>
    )
}

export default AdminGallery