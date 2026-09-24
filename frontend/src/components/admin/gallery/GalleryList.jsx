import { useState } from 'react'
import GalleryItem from './GalleryItem'

function GalleryList({
    photos,
    onEdit,
    onDelete,
}) {
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 9

    const totalPages = Math.ceil(
        photos.length / itemsPerPage,
    )

    const startIndex =
        (currentPage - 1) * itemsPerPage

    const currentPhotos = photos.slice(
        startIndex,
        startIndex + itemsPerPage,
    )

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <section className="gallery-list-section">
            <div className="gallery-list-header">
                <div>
                    <p className="editor-eyebrow">
                        REGISTERED PHOTOS
                    </p>

                    <h3>등록된 사진</h3>
                </div>

                <span>
                    {photos.length}장
                </span>
            </div>

            <div className="photo-list">
                {currentPhotos.map((photo, index) => (
                    <GalleryItem
                        key={photo.id}
                        photo={photo}
                        index={startIndex + index}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="gallery-pagination">
                    <button
                        type="button"
                        onClick={() =>
                            handlePageChange(
                                currentPage - 1,
                            )
                        }
                        disabled={currentPage === 1}
                    >
                        ‹
                    </button>

                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1,
                    ).map((page) => (
                        <button
                            key={page}
                            type="button"
                            className={
                                currentPage === page
                                    ? 'active'
                                    : ''
                            }
                            onClick={() =>
                                handlePageChange(page)
                            }
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        type="button"
                        onClick={() =>
                            handlePageChange(
                                currentPage + 1,
                            )
                        }
                        disabled={
                            currentPage === totalPages
                        }
                    >
                        ›
                    </button>
                </div>
            )}
        </section>
    )
}

export default GalleryList