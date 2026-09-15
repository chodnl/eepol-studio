import GalleryItem from './GalleryItem'

function GalleryList({
    photos,
    onEdit,
    onDelete,
}) {
    return (
        <div className="photo-list">
            {photos.map((photo) => (
                <GalleryItem
                    key={photo.id}
                    photo={photo}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export default GalleryList