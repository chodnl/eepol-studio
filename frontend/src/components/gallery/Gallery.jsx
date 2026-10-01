import { useEffect, useState } from 'react'
import GalleryCard from './GalleryCard'
import './Gallery.css'

function Gallery() {
    const [photos, setPhotos] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedPhoto, setSelectedPhoto] = useState(null)

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await fetch(
                    'http://localhost:3000/api/gallery'
                )

                const result = await response.json()

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message ||
                        'Gallery를 불러오지 못했습니다.'
                    )
                }

                const galleryPhotos = result.data.map((item) => ({
                    id: item._id,
                    title: item.title,
                    category: item.category,
                    src: item.imageUrl,
                }))

                setPhotos(galleryPhotos)

                if (galleryPhotos.length > 0) {
                    setSelectedCategory(galleryPhotos[0].category)
                }
            } catch (error) {
                console.error(
                    'Gallery fetch error:',
                    error
                )
            }
        }

        fetchGallery()
    }, [])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setSelectedPhoto(null)
            }
        }

        window.addEventListener(
            'keydown',
            handleKeyDown
        )

        return () => {
            window.removeEventListener(
                'keydown',
                handleKeyDown
            )
        }
    }, [])

    const categories = [
        ...new Set(
            photos
                .map((photo) => photo.category)
                .filter(Boolean)
        ),
    ]

    const filteredPhotos = photos.filter(
        (photo) =>
            photo.category === selectedCategory
    )

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo)
    }

    const handleCloseLightbox = () => {
        setSelectedPhoto(null)
    }

    return (
        <section className="section" id="gallery">
            <div className="section-header">
                <p className="eyebrow">portfolio</p>

                <h2>
                    스토리와 분위기를 담은 촬영
                </h2>
            </div>

            <div className="gallery-filter">
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        className={
                            selectedCategory === category
                                ? 'active'
                                : ''
                        }
                        onClick={() =>
                            setSelectedCategory(category)
                        }
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="gallery-grid">
                {filteredPhotos.map((photo, index) => (
                    <GalleryCard
                        key={photo.id}
                        photo={photo}
                        isFeatured={index === 0}
                        onClick={() =>
                            handlePhotoClick(photo)
                        }
                    />
                ))}
            </div>

            {filteredPhotos.length === 0 && (
                <p className="gallery-empty">
                    등록된 사진이 없습니다.
                </p>
            )}

            {selectedPhoto && (
                <div
                    className="gallery-lightbox"
                    onClick={handleCloseLightbox}
                >
                    <button
                        type="button"
                        className="gallery-lightbox-close"
                        onClick={handleCloseLightbox}
                        aria-label="사진 닫기"
                    >
                        ×
                    </button>

                    <div
                        className="gallery-lightbox-content"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <img
                            src={selectedPhoto.src}
                            alt={selectedPhoto.title}
                        />

                        <div className="gallery-lightbox-info">
                            <span>
                                {selectedPhoto.category}
                            </span>

                            <strong>
                                {selectedPhoto.title}
                            </strong>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Gallery