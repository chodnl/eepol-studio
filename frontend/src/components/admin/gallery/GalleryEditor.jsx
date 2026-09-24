import { useEffect, useState } from 'react'

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
    const [previewUrl, setPreviewUrl] = useState('')

    useEffect(() => {
        if (editor.id) {
            setPreviewUrl(editor.src)
        } else {
            setPreviewUrl('')
        }
    }, [editor.id, editor.src])

    const handleFileChange = (event) => {
        const file = event.target.files[0]

        if (!file) {
            setSelectedFile(null)
            setPreviewUrl('')
            return
        }

        setSelectedFile(file)

        const preview = URL.createObjectURL(file)
        setPreviewUrl(preview)
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
        setPreviewUrl('')
    }

    const handleChange = (field, value) => {
        setPhotoEditor((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    if (editor.id) {
        return (
            <div className="editor-box">
                <div className="editor-header">
                    <p className="editor-eyebrow">EDIT</p>
                    <h3>사진 수정</h3>
                </div>

                <div className="editor-fields">
                    <div className="editor-field">
                        <span>이미지</span>

                        {previewUrl && (
                            <div className="image-preview">
                                <img
                                    src={previewUrl}
                                    alt={editor.title}
                                />
                            </div>
                        )}
                    </div>

                    <label className="editor-field">
                        <span>사진 제목</span>

                        <input
                            type="text"
                            value={editor.title}
                            onChange={(event) =>
                                handleChange(
                                    'title',
                                    event.target.value,
                                )
                            }
                            placeholder="사진 제목을 입력해주세요."
                        />
                    </label>

                    <label className="editor-field">
                        <span>카테고리</span>

                        <input
                            type="text"
                            value={editor.category}
                            onChange={(event) =>
                                handleChange(
                                    'category',
                                    event.target.value,
                                )
                            }
                            placeholder="카테고리를 입력해주세요."
                        />
                    </label>

                    <label className="editor-checkbox">
                        <input
                            type="checkbox"
                            checked={editor.isHero}
                            onChange={(event) =>
                                handleChange(
                                    'isHero',
                                    event.target.checked,
                                )
                            }
                        />
                        <span>Hero 슬라이드에 사용</span>
                    </label>
                </div>

                <div className="editor-actions">
                    <button
                        type="button"
                        className="primary-btn"
                        onClick={onSave}
                    >
                        수정 저장
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="editor-box">
            <div className="editor-header">
                <p className="editor-eyebrow">NEW PHOTO</p>
                <h3>새 사진 등록</h3>
            </div>

            {previewUrl && (
                <div className="image-preview">
                    <img
                        src={previewUrl}
                        alt="선택한 사진 미리보기"
                    />
                </div>
            )}

            <div className="editor-fields">
                <label className="editor-field">
                    <span>이미지</span>

                    <input
                        key={editor.id ?? 'new'}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    {selectedFile && (
                        <small>
                            선택된 파일: {selectedFile.name}
                        </small>
                    )}
                </label>

                <label className="editor-field">
                    <span>사진 제목</span>

                    <input
                        type="text"
                        value={editor.title}
                        onChange={(event) =>
                            handleChange(
                                'title',
                                event.target.value,
                            )
                        }
                        placeholder="사진 제목을 입력해주세요."
                    />
                </label>

                <label className="editor-field">
                    <span>카테고리</span>

                    <input
                        type="text"
                        value={editor.category}
                        onChange={(event) =>
                            handleChange(
                                'category',
                                event.target.value,
                            )
                        }
                        placeholder="카테고리를 입력해주세요."
                    />
                </label>

                <label className="editor-checkbox">
                    <input
                        type="checkbox"
                        checked={editor.isHero}
                        onChange={(event) =>
                            handleChange(
                                'isHero',
                                event.target.checked,
                            )
                        }
                    />
                    <span>Hero 슬라이드에 사용</span>
                </label>
            </div>

            <div className="editor-actions">
                <button
                    type="button"
                    className="primary-btn"
                    onClick={handleCreate}
                >
                    사진 등록
                </button>
            </div>
        </div>
    )
}

export default GalleryEditor