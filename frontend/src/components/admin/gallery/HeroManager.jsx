import { useState } from 'react'
import { updateHeroOrder } from './galleryApi'

function HeroManager({ photos, onUpdate }) {
    const heroPhotos = photos
        .filter((photo) => photo.isHero)
        .sort((a, b) => {
            return (
                (a.heroOrder ?? 999) -
                (b.heroOrder ?? 999)
            )
        })

    const [message, setMessage] = useState('')

    const handleMove = async (fromIndex, toIndex) => {
        if (
            toIndex < 0 ||
            toIndex >= heroPhotos.length
        ) {
            return
        }

        const newPhotos = [...heroPhotos]

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
            heroOrder: index + 1,
        }))

        try {
            await updateHeroOrder(items)

            onUpdate(
                photos.map((photo) => {
                    const heroIndex = newPhotos.findIndex(
                        (heroPhoto) =>
                            heroPhoto.id === photo.id,
                    )

                    if (heroIndex === -1) {
                        return photo
                    }

                    return {
                        ...photo,
                        heroOrder: heroIndex + 1,
                    }
                }),
            )

            setMessage('Hero 순서가 변경되었습니다.')
        } catch (error) {
            console.error(
                'Hero order update error:',
                error,
            )

            setMessage(error.message)
        }
    }

    return (
        <section className="hero-manager">
            <div className="hero-manager-header">
                <div>
                    <p className="editor-eyebrow">
                        HERO
                    </p>

                    <h3>Hero 슬라이드 관리</h3>
                </div>

                <span>
                    {heroPhotos.length}장
                </span>
            </div>

            {heroPhotos.length === 0 ? (
                <p className="hero-manager-empty">
                    Hero 슬라이드로 사용할 사진이 없습니다.
                </p>
            ) : (
                <div className="hero-manager-list">
                    {heroPhotos.map(
                        (photo, index) => (
                            <div
                                key={photo.id}
                                className="hero-manager-item"
                            >
                                <span className="hero-manager-order">
                                    {String(
                                        index + 1,
                                    ).padStart(2, '0')}
                                </span>

                                <img
                                    src={photo.src}
                                    alt={photo.title}
                                />

                                <div className="hero-manager-info">
                                    <strong>
                                        {photo.title}
                                    </strong>

                                    <span>
                                        {photo.category}
                                    </span>
                                </div>

                                <div className="hero-manager-actions">
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
                                            heroPhotos.length -
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

export default HeroManager