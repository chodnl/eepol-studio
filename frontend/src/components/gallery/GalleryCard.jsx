function GalleryCard({ photo, isFeatured, onClick }) {
    return (
        <button
            type="button"
            className={`gallery-card ${isFeatured ? 'active' : ''}`}
            onClick={onClick}
        >
            <img
                src={photo.src}
                alt={photo.title}
            />

            <div className="gallery-card-text">
                <span>{photo.category}</span>
                <strong>{photo.title}</strong>
            </div>
        </button>
    )
}

export default GalleryCard