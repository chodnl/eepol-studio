import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
    const [isChecking, setIsChecking] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const verifyAdmin = async () => {
            const token = localStorage.getItem('adminToken')

            if (!token) {
                setIsChecking(false)
                return
            }

            try {
                const response = await fetch(
                    'http://localhost:3000/api/admin/me',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )

                const result = await response.json()

                if (!response.ok || !result.success) {
                    localStorage.removeItem('adminToken')
                    setIsAuthenticated(false)
                    return
                }

                setIsAuthenticated(true)
            } catch (error) {
                console.error(
                    'Admin authentication check error:',
                    error,
                )

                localStorage.removeItem('adminToken')
                setIsAuthenticated(false)
            } finally {
                setIsChecking(false)
            }
        }

        verifyAdmin()
    }, [])

    if (isChecking) {
        return <p>관리자 인증 확인 중...</p>
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute