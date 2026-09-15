import { useEffect, useState } from 'react'

function Location() {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/location'
        )

        const result = await response.json()

        if (result.success) {
          setLocation(result.data)
        }
      } catch (error) {
        console.error('Location fetch error:', error)
      }
    }

    fetchLocation()
  }, [])

  if (!location) {
    return null
  }

  return (
    <section
      className="section location-section"
      id="location"
    >
      <div className="section-header left-align">
        <p className="eyebrow">location</p>
        <h2>스튜디오 위치</h2>
      </div>

      <div className="map-box">
        <div className="map-pin">
          Studio
        </div>

        <div className="map-label">
          <strong>Eepol Studio</strong>
          <span>{location.address}</span>
        </div>
      </div>

      <div className="location-detail">
        <div>
          <span>주차</span>
          <strong>{location.parking}</strong>
        </div>

        <div>
          <span>찾아오는 길</span>
          <strong>{location.directions}</strong>
        </div>

        <div>
          <span>지도</span>

          <div className="location-links">
            {location.kakaoMapUrl && (
              <a
                href={location.kakaoMapUrl}
                target="_blank"
                rel="noreferrer"
              >
                카카오맵
              </a>
            )}

            {location.naverMapUrl && (
              <a
                href={location.naverMapUrl}
                target="_blank"
                rel="noreferrer"
              >
                네이버지도
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Location