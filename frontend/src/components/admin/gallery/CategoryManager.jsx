import { useEffect, useState } from 'react'
import { updateCategoryOrder } from './galleryApi'


function CategoryManager({ photos, onUpdate }) {
    const categories = [
        ...new Set(
            photos
                .map((photo) => photo.category)
                .filter(Boolean),
        ),
    ]

    const [selectedCategory, setSelectedCategory] = useState(
        categories[0] ?? '',
    )

    const [message, setMessage] = useState('')

    useEffect(() => {
        if (
            categories.length > 0 &&
            !categories.includes(selectedCategory)
        ) {
            setSelectedCategory(categories[0])
        }
    }, [categories, selectedCategory])

    const categoryPhotos = photos
        .filter((photo) => photo.category === selectedCategory)
        .sort(
            (a, b) =>
                (a.categoryOrder ?? 999) -
                (b.categoryOrder ?? 999),
        )

    const handleMove = async (fromIndex, toIndex) => {
        if (
            toIndex < 0 ||
            toIndex >= categoryPhotos.length
        ) {
            return
        }

        const newPhotos = [...categoryPhotos]

        const [movedPhoto] = newPhotos.splice(
            fromIndex,
            1,
        )

        newPhotos.splice(
            toIndex,
            0,
            movedPhoto,
        )

        const items = newPhotos.map(
            (photo, index) => ({
                id: photo.id,
                category: selectedCategory,
                categoryOrder: index + 1,
            }),
        )

        try {
            await updateCategoryOrder(items)

            onUpdate(
                photos.map((photo) => {
                    const categoryIndex =
                        newPhotos.findIndex(
                            (categoryPhoto) =>
                                categoryPhoto.id ===
                                photo.id,
                        )

                    if (categoryIndex === -1) {
                        return photo
                    }

                    return {
                        ...photo,
                        categoryOrder:
                            categoryIndex + 1,
                    }
                }),
            )

            setMessage('카테고리 순서가 변경되었습니다.')
        } catch (error) {
            console.error(
                'Category order update error:',
                error,
            )

            setMessage(error.message)
        }
    }

    return (
        <section className="category-manager">
            <div className="category-manager-header">
                <div>
                    <p className="editor-eyebrow">
                        CATEGORY
                    </p>

                    <h3>카테고리 순서 관리</h3>
                </div>

                <span>
                    {categoryPhotos.length}장
                </span>
            </div>

            <div className="category-manager-tabs">
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        className={
                            selectedCategory ===
                                category
                                ? 'active'
                                : ''
                        }
                        onClick={() => {
                            setSelectedCategory(
                                category,
                            )
                            setMessage('')
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {categoryPhotos.length === 0 ? (
                <p className="category-manager-empty">
                    해당 카테고리에 등록된 사진이 없습니다.
                </p>
            ) : (
                <div className="category-manager-list">
                    {categoryPhotos.map(
                        (photo, index) => (
                            <div
                                key={photo.id}
                                className="category-manager-item"
                            >
                                <span className="category-manager-order">
                                    {String(
                                        index + 1,
                                    ).padStart(2, '0')}
                                </span>

                                <img
                                    src={photo.src}
                                    alt={photo.title}
                                />

                                <div className="category-manager-info">
                                    <strong>
                                        {photo.title}
                                    </strong>

                                    <span>
                                        {photo.category}
                                    </span>
                                </div>

                                <div className="category-manager-actions">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleMove(
                                                index,
                                                index - 1,
                                            )
                                        }
                                        disabled={
                                            index === 0
                                        }
                                    >
                                        ↑
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleMove(
                                                index,
                                                index + 1,
                                            )
                                        }
                                        disabled={
                                            index ===
                                            categoryPhotos.length -
                                            1
                                        }
                                    >
                                        ↓
                                    </button>
                                </div>
                            </div>
                        ),
                    )}
                </div>
            )}

            {message && (
                <p className="system-message">
                    {message}
                </p>
            )}
        </section>
    )
}

export default CategoryManager