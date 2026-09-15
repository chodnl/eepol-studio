import { useEffect, useState } from 'react'

import GalleryList from './GalleryList'
import GalleryEditor from './GalleryEditor'

import {
    getGallery,
    deleteGallery,
} from './galleryApi'

function AdminGallery() {
    const [photos, setPhotos] = useState([])
    const [message, setMessage] = useState('')
    const [photoEditor, setPhotoEditor] = useState({
        id: null,
        title: '',
        category: '',
        src: '',
    })

    useEffect(() => {
        const loadGallery = async () => {
            try {
                const data = await getGallery()

                setPhotos(
                    data.map((item) => ({
                        id: item._id,
                        title: item.title,
                        category: item.category,
                        src: item.imageUrl,
                    })),
                )
            } catch (error) {
                console.error('Gallery fetch error:', error)
                setMessage(error.message)
            }
        }

        loadGallery()
    }, [])

    const handleDelete = async (id) => {
        try {
            await deleteGallery(id)

            setPhotos((prev) =>
                prev.filter((photo) => photo.id !== id),
            )

            setMessage('사진이 삭제되었습니다.')
        } catch (error) {
            console.error('Gallery delete error:', error)
            setMessage(error.message)
        }
    }

    const handleEdit = (photo) => {
        setPhotoEditor(photo)
    }

    const handleSave = () => {
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

                <GalleryEditor
                    photoEditor={photoEditor}
                    setPhotoEditor={setPhotoEditor}
                    onSave={handleSave}
                />

                <GalleryList
                    photos={photos}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

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