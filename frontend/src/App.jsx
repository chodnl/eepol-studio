import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminGallery from './pages/admin/gallery/AdminGallery'
import AdminBooking from './pages/admin/booking/AdminBooking'
import AdminPricing from './pages/admin/pricing/AdminPricing'
import AdminQna from './pages/admin/qna/AdminQna'
import AdminNotice from './pages/admin/notice/AdminNotice'

import ProtectedRoute from './components/admin/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/gallery" element={<AdminGallery />} />
        <Route path="/admin/booking" element={<AdminBooking />} />
        <Route path="/admin/pricing" element={<AdminPricing />} />
        <Route path="/admin/qna" element={<AdminQna />} />
        <Route path="/admin/notice" element={<AdminNotice />} />
      </Route>
    </Routes>
  )
}

export default App