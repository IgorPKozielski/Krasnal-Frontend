function Program({ programFace, setProgramFace }) {
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
              <div className="cube-face program-face cube-front">
                <h2>Program</h2>
                <div className="section-underline"></div>
                <p>
                  W tej sekcji pojawią się informacje o wystąpieniach,
                  harmonogramie i głównych punktach programu konferencji.
                </p>
              </div>

              <div className="cube-face program-face cube-right">
                <h2>Szczegółowy plan</h2>
                <div className="section-underline"></div>
                <p>
                  Tutaj zostanie opublikowany szczegółowy harmonogram wydarzenia,
                  z podziałem na dni, godziny i bloki tematyczne.
                </p>
              </div>

              <div className="cube-face program-face cube-back">
                <h2>Mapka sal</h2>
                <div className="section-underline"></div>
                <p>
                  W tym miejscu pojawi się mapa sal konferencyjnych, która ułatwi
                  poruszanie się po przestrzeni wydarzenia.
                </p>
              </div>

              <div className="cube-face program-face cube-left">
                <h2>Prelegenci</h2>
                <div className="section-underline"></div>
                <p>
                  Tutaj znajdą się informacje o prelegentach, ich afiliacjach
                  oraz tematach wystąpień.
                </p>
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