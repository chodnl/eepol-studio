import { useEffect, useState } from 'react'
import GalleryCard from './GalleryCard'

function Gallery() {
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/gallery')
                const result = await response.json()

                if (result.success) {
                    const galleryPhotos = result.data.map((item) => ({
                        id: item._id,
                        title: item.title,
                        category: item.category,
                        src: item.imageUrl,
                    }))

                    setPhotos(galleryPhotos)
                }
            } catch (error) {
                console.error('Gallery fetch error:', error)
            }
        }

        fetchGallery()
    }, [])

    const featuredPhoto = photos[0]

    return (
        <section className="section" id="gallery">
            <div className="section-header">
                <p className="eyebrow">portfolio</p>
                <h2>스토리와 분위기를 담은 촬영</h2>
            </div>

            <div className="gallery-grid">
                {photos.map((photo) => (
                    <GalleryCard
                        key={photo.id}
                        photo={photo}
                        isFeatured={featuredPhoto?.id === photo.id}
                    />
                ))}
            </div>
        </section>
    )
}

export default Gallery