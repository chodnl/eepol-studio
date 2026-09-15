import { useEffect, useState } from 'react'
import './App.css'

import Header from './components/layout/Header'
import Gallery from './components/gallery/Gallery'
import Hero from './components/home/Hero'
import About from './components/home/About'
import Pricing from './components/pricing/Pricing'
import Booking from './components/booking/Booking'
import Location from './components/location/Location'

const initialPhotos = [
  {
    id: 1,
    title: '빈티지 웨딩 촬영',
    category: 'Wedding',
    src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: '모던 인물컷',
    category: 'Portrait',
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    title: '스튜디오 패션',
    category: 'Fashion',
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    title: '브라이덜 스토리',
    category: 'Story',
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
  },
]

const initialReservations = [
  {
    id: 1,
    name: '윤서진',
    phone: '010-1122-3344',
    date: '2026-09-20',
    packageName: '프리미엄 패키지',
    status: '대기',
    note: '가족 프로필 촬영',
  },
  {
    id: 2,
    name: '김민재',
    phone: '010-9988-7766',
    date: '2026-09-21',
    packageName: '스토리 패키지',
    status: '확정',
    note: '커플 스냅',
  },
]


function App() {
  const [photos, setPhotos] = useState([])
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/gallery')
        const result = await response.json()

        if (result.success) {
          const galleryPhotos = result.data.map((item) => ({
            id: item._id,
            title: item.title,
            category: item.category,
            src: item.imageUrl,
          }))

          setPhotos(galleryPhotos)
        }
      } catch (error) {
        console.error('Gallery fetch error:', error)
      }
    }

    fetchGallery()
  }, [])
  const [reservations, setReservations] = useState(initialReservations)
  const [message, setMessage] = useState('신규 예약을 등록하면 문자 안내와 카카오톡 상담이 연결됩니다.')
  const [photoEditor, setPhotoEditor] = useState({ id: null, title: '', category: '', src: '' })


  const handleReservationStatus = (id, status) => {
    setReservations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    )
  }

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files || [])
    if (!files.length) return

    const uploadedPhotos = files.map((file, index) => ({
      id: Date.now() + index,
      title: file.name.replace(/\.[^/.]+$/, '') || `업로드 사진 ${index + 1}`,
      category: 'Custom',
      src: URL.createObjectURL(file),
    }))

    setPhotos((prev) => [...uploadedPhotos, ...prev])
    setMessage(`${uploadedPhotos.length}개의 사진이 업로드되어 갤러리에 반영되었습니다.`)
    event.target.value = ''
  }

  const reorderPhoto = (id, direction) => {
    setPhotos((prev) => {
      const index = prev.findIndex((photo) => photo.id === id)
      const newPhotos = [...prev]
      const targetIndex = index + direction

      if (targetIndex < 0 || targetIndex >= newPhotos.length) return prev

        ;[newPhotos[index], newPhotos[targetIndex]] = [
          newPhotos[targetIndex],
          newPhotos[index],
        ]

      return newPhotos
    })
  }

  const deletePhoto = (id) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id))
    setMessage('사진이 삭제되었습니다.')
  }

  const savePhotoEdit = () => {
    if (!photoEditor.id) return

    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === photoEditor.id
          ? {
            ...photo,
            title: photoEditor.title,
            category: photoEditor.category,
          }
          : photo,
      ),
    )

    setPhotoEditor({ id: null, title: '', category: '', src: '' })
    setMessage('사진 정보가 수정되었습니다.')
  }

  return (
    <div className="app-shell">
      <Header />

      <main>
        <Hero />
        <Gallery />
        <About />
        <Pricing
          onSelectPackage={(packageName) =>
            setBooking((prev) => ({
              ...prev,
              packageName,
            }))
          }
        />
        <Booking />
        <Location />

        <section className="section admin-grid" id="admin">
          <div className="admin-panel">
            <div className="section-header left-align">
              <p className="eyebrow">admin</p>
              <h2>사진 관리</h2>
            </div>

            <label className="upload-box">
              <span>사진 업로드</span>
              <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} />
            </label>

            {photoEditor.id && (
              <div className="editor-box">
                <input
                  type="text"
                  value={photoEditor.title}
                  onChange={(event) => setPhotoEditor((prev) => ({ ...prev, title: event.target.value }))}
                  placeholder="사진 제목"
                />
                <input
                  type="text"
                  value={photoEditor.category}
                  onChange={(event) => setPhotoEditor((prev) => ({ ...prev, category: event.target.value }))}
                  placeholder="카테고리"
                />
                <button type="button" className="primary-btn" onClick={savePhotoEdit}>수정 저장</button>
              </div>
            )}

            <div className="photo-list">
              {photos.map((photo) => (
                <div key={photo.id} className="photo-item">
                  <img src={photo.src} alt={photo.title} />
                  <div className="photo-meta">
                    <strong>{photo.title}</strong>
                    <span>{photo.category}</span>
                  </div>
                  <div className="photo-actions">
                    <button type="button" onClick={() => reorderPhoto(photo.id, -1)}>위로</button>
                    <button type="button" onClick={() => reorderPhoto(photo.id, 1)}>아래로</button>
                    <button type="button" onClick={() => setPhotoEditor({ id: photo.id, title: photo.title, category: photo.category, src: photo.src })}>수정</button>
                    <button type="button" className="danger" onClick={() => deletePhoto(photo.id)}>삭제</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-panel">
            <div className="section-header left-align">
              <p className="eyebrow">admin</p>
              <h2>예약 확인</h2>
            </div>

            <div className="reservation-list">
              {reservations.map((reservation) => (
                <article key={reservation.id} className="reservation-item">
                  <div className="reservation-top">
                    <div>
                      <strong>{reservation.name}</strong>
                      <span>{reservation.phone}</span>
                    </div>
                    <span className={`status ${reservation.status === '확정' ? 'confirm' : 'pending'}`}>
                      {reservation.status}
                    </span>
                  </div>

                  <p>{reservation.date} · {reservation.packageName}</p>
                  <small>{reservation.note}</small>

                  <div className="reservation-actions">
                    <button type="button" onClick={() => handleReservationStatus(reservation.id, '확정')}>확정</button>
                    <button type="button" onClick={() => handleReservationStatus(reservation.id, '대기')}>대기</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 Eepol Studio</p>
        <span>문자 안내 · 카카오톡 예약 · 인플루언서 스튜디오</span>
      </footer>
    </div>
  )
}

export default App
