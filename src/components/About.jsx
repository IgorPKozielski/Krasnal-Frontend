import { useEffect } from "react";
import nablaLogo from "../assets/Logos/logo-nabla.png";

function About({ aboutFace, setAboutFace }) {
  useEffect(() => {
    const section = document.getElementById("o-konferencji");
    if (section && window.location.hash === "#o-konferencji") {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, [aboutFace]);

  const nextSlide = () => {
    setAboutFace((prev) => (prev + 1) % 4);
  };

  const prevSlide = () => {
    setAboutFace((prev) => (prev - 1 + 4) % 4);
  };

  return (
    <section id="o-konferencji" className="about">
      <div className="about-container">
        <div className="cube-carousel">
          <button className="carousel-btn left" onClick={prevSlide} aria-label="Previous slide">
            ‹
          </button>

          <div className="cube-scene">
            <div
              className="cube"
              style={{ transform: `translateZ(-600px) rotateY(${-aboutFace * 90}deg)` }}
            >
              <div className="cube-face cube-front">
                <h2>O konferencji</h2>
                <div className="section-underline"></div>
                <p>
                  KRASNAL to ogólnopolska konferencja fizyków, skupiająca studentów,
                  doktorantów i naukowców.
                </p>
              </div>

              <div className="cube-face cube-right">
                <h2>Uczestnicy</h2>
                <div className="section-underline"></div>
                <p>
                  W konferencji biorą udział uczestnicy z różnych uczelni i ośrodków
                  akademickich z całej Polski.
                </p>
              </div>

              <div className="cube-face cube-back">
                <h2>Dla kogo</h2>
                <div className="section-underline"></div>
                <p>
                  Wydarzenie jest skierowane do studentów, doktorantów, młodych badaczy
                  i wszystkich pasjonatów fizyki.
                </p>
              </div>

              <div className="cube-face cube-left">
                <h2>Organizatorzy</h2>
                <div className="section-underline"></div>
                <p>
                  Konferencja jest przygotowywana przez Koło Naukowe Fizyków Nabla działające przy Politechnice Wrocławskiej.
                </p>

                <a
                  href="https://nabla.pwr.edu.pl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nabla-link"
                  aria-label="Strona Koła Naukowego Fizyków Nabla"
                >
                  <img src={nablaLogo} alt="Nabla" className="nabla-logo" />
                </a>
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

export default About;