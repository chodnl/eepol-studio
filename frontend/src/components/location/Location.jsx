import { useEffect, useRef, useState } from 'react'
import './Location.css'

function Location() {
  const [location, setLocation] = useState(null)
  const [mapReady, setMapReady] = useState(false)
  const mapElement = useRef(null)

  // 1. API 데이터 요청
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/location')
        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Location 정보를 불러오지 못했습니다.')
        }

        setLocation(result.data)
      } catch (error) {
        console.error('Location fetch error:', error)
      }
    }

    fetchLocation()
  }, [])

  // 2. 네이버 지도 스크립트 로드
  useEffect(() => {
    const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID

    if (!clientId) {
      console.error('VITE_NAVER_MAP_CLIENT_ID가 설정되지 않았습니다.')
      return
    }

    if (window.naver?.maps) {
      setMapReady(true)
      return
    }

    const script = document.createElement('script')
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`
    script.async = true

    // script.onload 정리 (중복 제거)
    script.onload = () => {
      console.log('Naver Maps SDK 로드 완료')
      setMapReady(true)
    }

    script.onerror = () => {
      console.error('Naver Maps SDK를 불러오지 못했습니다.')
    }

    document.head.appendChild(script)
  }, [])

  // 3. 지도 인스턴스 생성 (location 데이터와 DOM 요소가 모두 준비되었을 때 실행)
  // 3. 지도 인스턴스 생성
  useEffect(() => {
    if (!mapReady || !mapElement.current || !location) {
      return
    }

    const studioPosition =
      new window.naver.maps.LatLng(
        37.4802520,
        126.6299059
      )

    const map =
      new window.naver.maps.Map(
        mapElement.current,
        {
          center: studioPosition,
          zoom: 16,
        }
      )

    const markerContent = `
      <div class="eepol-marker">
        <div class="eepol-marker-label">
          이풀 스튜디오
        </div>

        <div class="eepol-marker-pin">
          <span>e</span>
        </div>
      </div>
    `

    new window.naver.maps.Marker({
      position: studioPosition,
      map: map,
      icon: {
        content: markerContent,
        anchor: new window.naver.maps.Point(50, 76),
      },
      title: '이풀 스튜디오',
    })
  }, [mapReady, location]) // location 변경 시에도 재실행되도록 의존성 추가

  return (
    <section className="section location-section" id="location">
      <div className="section-header left-align">
        <p className="eyebrow">location</p>
        <h2>
          스튜디오로
          <br />
          <em>오시는 길</em>
        </h2>
      </div>

      <div className="location-main">
        <div className="location-map">
          {/* 지도가 들어갈 DOM 요소는 항상 그려져 있어야 함 */}
          <div ref={mapElement} className="location-map-inner" />

          {location && (
            <a
              href={location.naverMapUrl}
              target="_blank"
              rel="noreferrer"
              className="location-map-button"
            >
              네이버 지도에서 보기 →
            </a>
          )}
        </div>

        {/* 하단 정보 블록 조건부 렌더링 */}
        {location ? (
          <div className="location-info">
            <div className="location-item">
              <span>ADDRESS</span>
              <strong>{location.address}</strong>
              <p>{location.addressDetail}</p>
            </div>

            <div className="location-item">
              <span>PHONE</span>
              <a href={`tel:${location.phone.replace(/-/g, '')}`}>
                {location.phone}
              </a>
            </div>

            <div className="location-item">
              <span>HOURS</span>
              <strong>{location.hours}</strong>
              <p>{location.closed}</p>
            </div>

            <div className="location-item">
              <span>TRANSPORTATION</span>
              <strong>동인천역 4번 출구</strong>
              <p>약 634m</p>
            </div>

            <div className="location-item">
              <span>PARKING</span>
              <strong>{location.parking}</strong>
            </div>

            <div className="location-item">
              <span>DIRECTIONS</span>
              <strong>{location.directions}</strong>
            </div>
          </div>
        ) : (
          <div>로딩 중...</div>
        )}
      </div>
    </section>
  )
}

export default Location