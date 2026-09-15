import { useState } from 'react'

function GalleryEditor({
    photoEditor,
    setPhotoEditor,
    onSave,
    onCreate,
}) {
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
            title: photoEditor.title,
            category: photoEditor.category,
        })

        setSelectedFile(null)
    }

    // 기존 사진 수정
    if (photoEditor.id) {
        return (
            <div className="editor-box">
                <h3>사진 수정</h3>

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

    // 새 사진 등록
    return (
        <div className="editor-box">
            <h3>새 사진 등록</h3>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />

            {selectedFile && (
                <p>
                    선택된 파일: {selectedFile.name}
                </p>
            )}

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
                onClick={handleCreate}
            >
                사진 등록
            </button>
        </div>
    )
}

export default GalleryEditor
