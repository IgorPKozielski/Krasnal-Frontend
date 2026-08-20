import { useEffect, useState } from 'react';
import { fetchData } from '../api';
import mpkDworzec from '../assets/MPK-z-dworca.png';
import pasazPwr from '../assets/Pasaz-PWR.png';
function Program({ programFace, setProgramFace }) {
  const [schedule, setSchedule] = useState([]);
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    fetchData('/schedule').then(setSchedule).catch(console.error);
    fetchData('/speakers').then(setSpeakers).catch(console.error);
  }, []);

  const nextSlide = () => {
    setProgramFace((prev) => (prev + 1) % 4);
  };

  const prevSlide = () => {
    setProgramFace((prev) => (prev - 1 + 4) % 4);
  };

  return (
    <section id="program" className="program">
      <div className="program-container">
        <div className="cube-carousel">
          <button className="carousel-btn left" onClick={prevSlide} aria-label="Previous slide">
            ‹
          </button>

          <div className="cube-scene">
            <div
              className="cube program-cube"
              style={{ transform: `translateZ(-600px) rotateY(${-programFace * 90}deg)` }}
            >
              <div className={`cube-face program-face cube-front ${programFace === 0 ? "active" : ""}`}>
                <h2>Program</h2>
                <div className="section-underline"></div>
                {/*
                <p>
                  W tej sekcji pojawią się informacje o wystąpieniach,
                  harmonogramie i głównych punktach programu konferencji.
                </p>
                */}
                <div className="program-list">
                  {schedule && schedule.length > 0 ? schedule.slice(0, 5).map(item => (
                    <div key={item.id} className="program-item">
                      <strong>{item.start_time ? new Date(item.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}</strong> - {item.title}
                    </div>
                  )) : <p>Harmonogram wkrótce...</p>}
                </div>
              </div>

<div className={`cube-face program-face cube-right ${programFace === 1 ? "active" : ""}`}>
  <h2>Jak dojechać?</h2>
  <div className="section-underline"></div>

  <div className="travel-maps">
    <div className="travel-map-item">
      <a
        href={mpkDworzec}
        target="_blank"
        rel="noopener noreferrer"
        className="travel-map-link"
      >
        <img
          src={mpkDworzec}
          alt="Dojazd z Dworca Głównego komunikacją miejską"
          className="travel-map"
        />
      </a>

      <p>Z Dworca Głównego</p>
    </div>

    <div className="travel-map-item">
      <a
        href={pasazPwr}
        target="_blank"
        rel="noopener noreferrer"
        className="travel-map-link"
      >
        <img
          src={pasazPwr}
          alt="Dojście z Pasażu Grunwaldzkiego do budynku A-1"
          className="travel-map"
        />
      </a>

      <p>Z Pasażu Grunwaldzkiego do A-1</p>
    </div>
  </div>
  <p className="travel-map-hint">
  Kliknij mapę, aby powiększyć zdjęcie.
</p>
</div>
              <div className={`cube-face program-face cube-back ${programFace === 2 ? "active" : ""}`}>
                <h2>Mapka sal</h2>
                <div className="section-underline"></div>
                <p>
                  W tym miejscu pojawi się mapa sal konferencyjnych, która ułatwi
                  poruszanie się po przestrzeni wydarzenia.
                </p>
              </div>

              <div className={`cube-face program-face cube-left ${programFace === 3 ? "active" : ""}`}>
                <h2>Prelegenci</h2>
                <div className="section-underline"></div>
                {/*
                <p>
                  Tutaj znajdą się informacje o prelegentach, ich afiliacjach
                  oraz tematach wystąpień.
                </p>
                */}
                <div className="speakers-list">
                  {speakers && speakers.length > 0 ? speakers.map(speaker => (
                    <div key={speaker.id} className="speaker-mini">
                      <strong>{speaker.name}</strong> - {speaker.talk_title}
                    </div>
                  )) : <p>Prelegenci wkrótce...</p>}
                </div>
              </div>
            </div>
          </div>

          <button className="carousel-btn right" onClick={nextSlide} aria-label="Next slide">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

export default Program;