import { useEffect, useState } from 'react'

import GalleryList from './gallery/GalleryList'
import GalleryEditor from './gallery/GalleryEditor'

import {
    getGallery,
    deleteGallery,
    updateGallery,
} from './gallery/galleryApi'

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

    const handleSave = async () => {
        if (!photoEditor.id) return

        try {
            const updatedPhoto = await updateGallery(
                photoEditor.id,
                {
                    title: photoEditor.title,
                    category: photoEditor.category,
                },
            )

            setPhotos((prev) =>
                prev.map((photo) =>
                    photo.id === updatedPhoto._id
                        ? {
                            ...photo,
                            title: updatedPhoto.title,
                            category: updatedPhoto.category,
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
        } catch (error) {
            console.error('Gallery update error:', error)
            setMessage(error.message)
        }
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