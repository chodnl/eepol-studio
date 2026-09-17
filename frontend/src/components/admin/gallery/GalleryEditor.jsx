import { useState } from 'react'

function GalleryEditor({
    photoEditor,
    setPhotoEditor,
    onSave,
    onCreate,
}) {
    const editor = {
        id: photoEditor?.id ?? null,
        title: photoEditor?.title ?? '',
        category: photoEditor?.category ?? '',
        src: photoEditor?.src ?? '',
        isHero: photoEditor?.isHero ?? false,
    }

    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileChange = (event) => {
        const file = event.target.files[0]

        if (!file) {
            setSelectedFile(null)
            return
        }

        setSelectedFile(file)
    }

    const handleCreate = async () => {
        if (!selectedFile) {
            alert('사진을 선택해주세요.')
            return
        }

        await onCreate({
            file: selectedFile,
            title: editor.title,
            category: editor.category,
            isHero: editor.isHero,
        })

        setSelectedFile(null)
    }

    if (editor.id) {
        return (
            <div className="editor-box">
                <h3>사진 수정</h3>

                <input
                    type="text"
                    value={editor.title}
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
                    value={editor.category}
                    onChange={(event) =>
                        setPhotoEditor((prev) => ({
                            ...prev,
                            category: event.target.value,
                        }))
                    }
                    placeholder="카테고리"
                />

                <label>
                    <input
                        type="checkbox"
                        checked={editor.isHero}
                        onChange={(event) =>
                            setPhotoEditor((prev) => ({
                                ...prev,
                                isHero: event.target.checked,
                            }))
                        }
                    />
                    Hero 슬라이드에 사용
                </label>

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

    return (
        <div className="editor-box">
            <h3>새 사진 등록</h3>

            <input
                key={editor.id ?? 'new'}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />

            {selectedFile && (
                <p>선택된 파일: {selectedFile.name}</p>
            )}

            <input
                type="text"
                value={editor.title}
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
                value={editor.category}
                onChange={(event) =>
                    setPhotoEditor((prev) => ({
                        ...prev,
                        category: event.target.value,
                    }))
                }
                placeholder="카테고리"
            />

            <label>
                <input
                    type="checkbox"
                    checked={editor.isHero}
                    onChange={(event) =>
                        setPhotoEditor((prev) => ({
                            ...prev,
                            isHero: event.target.checked,
                        }))
                    }
                />
                Hero 슬라이드에 사용
            </label>

            <button
                type="button"
                className="primary-btn"
                onClick={handleCreate}
            >
                사진 등록
            </button>
        </div>
    )
}

export default GalleryEditor