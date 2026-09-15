function GalleryItem({
    photo,
    index,
    total,
    onEdit,
    onDelete,
    onMove,
}) {
    return (
        <div className="photo-item">
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
                        onMove(index, index - 1)
                    }
                    disabled={index === 0}
                >
                    ↑
                </button>

                <button
                    type="button"
                    onClick={() =>
                        onMove(index, index + 1)
                    }
                    disabled={index === total - 1}
                >
                    ↓
                </button>

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
    )
}

export default GalleryItem
