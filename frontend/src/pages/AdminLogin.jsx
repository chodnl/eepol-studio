import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminLogin.css'

function AdminLogin() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!username || !password) {
            setMessage('아이디와 비밀번호를 입력해 주세요.')
            return
        }

        try {
            setIsSubmitting(true)
            setMessage('로그인 중입니다.')

            const response = await fetch(
                'http://localhost:3000/api/admin/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                },
            )

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || '로그인에 실패했습니다.',
                )
            }

            localStorage.setItem('adminToken', result.token)

            navigate('/admin')
        } catch (error) {
            console.error('Admin login error:', error)

            setMessage(
                error.message || '로그인에 실패했습니다.',
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="admin-login-page">
            <div className="admin-login-box">
                <div className="section-header">
                    <p className="eyebrow">admin</p>

                    <h1>관리자 로그인</h1>

                    <p>
                        관리자 계정으로 로그인해 주세요.
                    </p>
                </div>

                <form
                    className="admin-login-form"
                    onSubmit={handleSubmit}
                >
                    <label>
                        아이디

                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            placeholder="관리자 아이디"
                        />
                    </label>

                    <label>
                        비밀번호

                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="관리자 비밀번호"
                        />
                    </label>

                    <button
                        type="submit"
                        className="primary-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? '로그인 중...' : '로그인'}
                    </button>

                    {message && (
                        <p className="system-message">
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </main>
    )
}

export default AdminLogin