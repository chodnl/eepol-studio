function QnaPasswordModal({
    password,
    passwordError,
    isVerifying,
    onPasswordChange,
    onSubmit,
    onClose,
}) {
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
                    비밀글입니다.
                </h2>

                <p className="qna-modal-description">
                    작성할 때 입력한 비밀번호를
                    <br />
                    입력해 주세요.
                </p>

                <form
                    onSubmit={onSubmit}
                    className="qna-password-form"
                >
                    <input
                        type="password"
                        value={password}
                        onChange={onPasswordChange}
                        placeholder="비밀번호"
                        autoFocus
                    />

                    {passwordError && (
                        <p className="qna-password-error">
                            {passwordError}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isVerifying}
                    >
                        {isVerifying
                            ? '확인 중...'
                            : '확인 →'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default QnaPasswordModal
