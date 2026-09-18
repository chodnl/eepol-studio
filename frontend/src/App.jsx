import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'

import Qna from "./components/qna/Qna";

import AdminLogin from './pages/AdminLogin'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminGallery from './pages/admin/gallery/AdminGallery'
import AdminBooking from './pages/admin/booking/AdminBooking'
import AdminPricing from './pages/admin/pricing/AdminPricing'
import AdminQna from './pages/admin/qna/AdminQna'
import AdminNotice from './pages/admin/notice/AdminNotice'

import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/qna" element={<Qna />} />

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="booking" element={<AdminBooking />} />
          <Route path="pricing" element={<AdminPricing />} />
          <Route path="qna" element={<AdminQna />} />
          <Route path="notice" element={<AdminNotice />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App