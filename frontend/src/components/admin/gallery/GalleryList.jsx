import GalleryItem from './GalleryItem'

function GalleryList({
    photos,
    onEdit,
    onDelete,
    onMove,
}) {
    return (
        <div className="photo-list">
            {photos.map((photo, index) => (
                <GalleryItem
                    key={photo.id}
                    photo={photo}
                    index={index}
                    total={photos.length}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onMove={onMove}
                />
            ))}
        </div>
    )
}

export default GalleryList