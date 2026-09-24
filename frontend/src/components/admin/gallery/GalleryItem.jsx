function GalleryItem({
    photo,
    index,
    onEdit,
    onDelete,
}) {
    return (
        <article className="photo-item">
            <div className="photo-image-wrap">
                <img
                    src={photo.src}
                    alt={photo.title}
                />
            </div>

            <div className="photo-meta">
                <div className="photo-info">
                    <span className="photo-order">
                        {String(index + 1).padStart(2, '0')}
                    </span>

                    <div>
                        <strong>{photo.title}</strong>

                        <span>{photo.category}</span>

                        {photo.isHero && (
                            <span className="hero-badge">
                                HERO
                            </span>
                        )}
                    </div>
                </div>

                <div className="photo-actions">
                    <button
                        type="button"
                        onClick={() => onEdit(photo)}
                    >
                        수정
                    </button>

                    <button
                        type="button"
                        className="danger"
                        onClick={() => onDelete(photo.id)}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </article>
    )
}

export default GalleryItem