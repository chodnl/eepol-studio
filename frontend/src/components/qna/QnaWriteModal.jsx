import { useState } from 'react'

function QnaWriteModal({ onClose, onSuccess }) {
    const [form, setForm] = useState({
        author: '',
        password: '',
        title: '',
        content: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!form.author || !form.password || !form.title || !form.content) {
            setSubmitMessage('모든 항목을 입력해 주세요.')
            return
        }

        try {
            setIsSubmitting(true)
            setSubmitMessage('')

            const response = await fetch(
                'http://localhost:3000/api/qna',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                }
            )

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || '문의 등록에 실패했습니다.'
                )
            }

            setSubmitMessage('문의가 등록되었습니다.')

            if (onSuccess) {
                await onSuccess()
            }

            setForm({
                author: '',
                password: '',
                title: '',
                content: '',
            })

            setTimeout(() => {
                onClose()
            }, 500)
        } catch (error) {
            console.error('Q&A submit error:', error)

            setSubmitMessage(
                '문의 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="qna-modal-backdrop">
            <div className="qna-modal">
                <button
                    type="button"
                    className="qna-modal-close"
                    onClick={onClose}
                >
                    ×
                </button>

                <p className="qna-modal-eyebrow">
                    PRIVATE Q&amp;A
                </p>

                <h2>
                    문의하기
                </h2>

                <p className="qna-modal-description">
                    문의 내용을 남겨주시면
                    <br />
                    확인 후 답변드리겠습니다.
                </p>

                <form
                    className="qna-write-form"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        name="author"
                        value={form.author}
                        onChange={handleChange}
                        placeholder="작성자"
                    />

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="비밀번호"
                    />

                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="문의 제목"
                    />

                    <textarea
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                        placeholder="문의 내용을 입력해 주세요."
                        rows={6}
                    />

                    {submitMessage && (
                        <p className="qna-submit-message">
                            {submitMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? '등록 중...'
                            : '문의 등록 →'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default QnaWriteModal

