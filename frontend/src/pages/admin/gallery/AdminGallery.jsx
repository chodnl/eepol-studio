import { useEffect, useState } from 'react'

import GalleryList from '../../../components/admin/gallery/GalleryList'
import GalleryEditor from '../../../components/admin/gallery/GalleryEditor'

import {
    getGallery,
    createGallery,
    deleteGallery,
    updateGallery,
    updateGalleryOrder,
} from '../../../components/admin/gallery/galleryApi'

function AdminGallery() {
    const [photos, setPhotos] = useState([])
    const [message, setMessage] = useState('')
    const [photoEditor, setPhotoEditor] = useState({
        id: null,
        title: '',
        category: '',
        src: '',
        isHero: false,
    })

    useEffect(() => {
        const loadGallery = async () => {
            try {
                const data = await getGallery()

                console.log('gallery data:', data)

                setPhotos(
                    data.map((item) => ({
                        id: item._id,
                        title: item.title,
                        category: item.category,
                        src: item.imageUrl,
                        isHero: item.isHero ?? false,
                    })),
                )
            } catch (error) {
                console.error('Gallery fetch error:', error)
                setMessage(error.message)
            }
        }

        loadGallery()
    }, [])

    const handleCreate = async ({
        file,
        title,
        category,
        isHero,
    }) => {
        try {
            const createdPhoto = await createGallery({
                file,
                title,
                category,
                isHero,
            })

            setPhotos((prev) => [
                ...prev,
                {
                    id: createdPhoto._id,
                    title: createdPhoto.title,
                    category: createdPhoto.category,
                    src: createdPhoto.imageUrl,
                    isHero: createdPhoto.isHero ?? false,
                },
            ])

            setPhotoEditor({
                id: null,
                title: '',
                category: '',
                src: '',
                isHero: false,
            })

            setMessage('사진이 등록되었습니다.')
        } catch (error) {
            console.error('Gallery create error:', error)
            setMessage(error.message)
        }
    }

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
        setPhotoEditor({
            id: photo.id ?? null,
            title: photo.title ?? '',
            category: photo.category ?? '',
            src: photo.src ?? '',
            isHero: photo.isHero ?? false,
        })
    }

    const handleMove = async (fromIndex, toIndex) => {
        if (
            toIndex < 0 ||
            toIndex >= photos.length
        ) {
            return
        }

        const newPhotos = [...photos]

        const [movedPhoto] = newPhotos.splice(
            fromIndex,
            1,
        )

        newPhotos.splice(
            toIndex,
            0,
            movedPhoto,
        )

        const items = newPhotos.map((photo, index) => ({
            id: photo.id,
            order: index + 1,
        }))

        try {
            await updateGalleryOrder(items)

            setPhotos(newPhotos)
            setMessage('사진 순서가 변경되었습니다.')
        } catch (error) {
            console.error(
                'Gallery order update error:',
                error,
            )

            setMessage(error.message)
        }
    }

    const handleSave = async () => {
        if (!photoEditor.id) return

        try {
            const updatedPhoto = await updateGallery(
                photoEditor.id,
                {
                    title: photoEditor.title,
                    category: photoEditor.category,
                    isHero: photoEditor.isHero,
                },
            )

            setPhotos((prev) =>
                prev.map((photo) =>
                    photo.id === updatedPhoto._id
                        ? {
                            ...photo,
                            title: updatedPhoto.title,
                            category: updatedPhoto.category,
                            isHero: updatedPhoto.isHero,
                        }
                        : photo,
                ),
            )

            setPhotoEditor({
                id: null,
                title: '',
                category: '',
                src: '',
                isHero: false,
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
                    onCreate={handleCreate}
                />


                <GalleryList
                    photos={photos}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onMove={handleMove}
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