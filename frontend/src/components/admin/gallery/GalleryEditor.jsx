function GalleryEditor({
    photoEditor,
    setPhotoEditor,
    onSave,
}) {
    if (!photoEditor.id) return null

    return (
        <div className="editor-box">
            <input
                type="text"
                value={photoEditor.title}
                onChange={(event) =>
                    setPhotoEditor((prev) => ({
                        ...prev,
                        title: event.target.value,
                    }))
                }
                placeholder="사진 제목"
            />

            <input
                type="text"
                value={photoEditor.category}
                onChange={(event) =>
                    setPhotoEditor((prev) => ({
                        ...prev,
                        category: event.target.value,
                    }))
                }
                placeholder="카테고리"
            />

            <button
                type="button"
                className="primary-btn"
                onClick={onSave}
            >
                수정 저장
            </button>
        </div>
    )
}

export default GalleryEditor