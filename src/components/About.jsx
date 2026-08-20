import { useEffect } from "react";
import nablaLogo from "../assets/Logos/logo-nabla.png";
import wycieczkaImg from "../assets/wycieczka.jpg";
import wycieczkaWcssImg from "../assets/wycieczka1.jpg";
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
              <div className={`cube-face cube-front ${aboutFace === 0 ? "active" : ""}`}>
                <h2>O konferencji</h2>
                <div className="section-underline"></div>
                <p className="about-copy">
                   KRASNAL to ogólnopolska konferencja studencka poświęcona fizyce i naukom
    pokrewnym. Wydarzenie daje uczestnikom możliwość zaprezentowania własnych
    badań, udziału w prazentacjach i sesjach posterowych oraz wymiany doświadczeń
    z osobami z różnych ośrodków akademickich.
                </p>
              </div>

              <div className={`cube-face cube-right ${aboutFace === 1 ? "active" : ""}`}>
  <h2>Wycieczki</h2>
  <div className="section-underline"></div>

  <div className="trips-content">

    <div className="trip-card">
      <div className="trip-text">
        <h3>INTiBS PAN</h3>

        <p>
          W piątek przed rozpoczęciem konferencji odbędzie się wycieczka
          do Instytutu Niskich Temperatur i Badań Strukturalnych PAN
          we Wrocławiu.
        </p>

      </div>

      <a
        href="https://www.intibs.pl/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Przejdź na stronę INTiBS PAN"
      >
        <img
          src={wycieczkaImg}
          alt="Budynek INTiBS PAN we Wrocławiu"
          className="trip-image"
        />
      </a>
    </div>


    <div className="trip-card">
      <div className="trip-text">
        <h3>WCSS</h3>

        <p>
          W ramach konferencji odbędzie się również wycieczka do
          Wrocławskiego Centrum Sieciowo-Superkomputerowego, obejmująca
          oprowadzenie po superkomputerach LEM i Odra 5.
        </p>
      </div>

      <a
        href="https://wcss.pl/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Przejdź na stronę WCSS"
      >
        <img
          src={wycieczkaWcssImg}
          alt="Wrocławskie Centrum Sieciowo-Superkomputerowe"
          className="trip-image"
        />
      </a>
    </div>
  </div>
<p className="trips-note">
  Liczba miejsc na wycieczki jest ograniczona. Chęć udziału można zaznaczyć
  podczas wypełniania formularza zgłoszeniowego.
</p>
  
</div>

              <div className={`cube-face cube-back ${aboutFace === 2 ? "active" : ""}`}>
                <h2>Dla kogo</h2>
                <div className="section-underline"></div>
                <p className="about-copy">
                 Konferencja jest skierowana przede wszystkim do studentów, doktorantów
    i młodych badaczy związanych z fizyką oraz dziedzinami pokrewnymi.
    Zapraszamy zarówno osoby chcące zaprezentować wyniki swojej pracy,
    jak i uczestników zainteresowanych poznaniem aktualnych tematów badań
    i nawiązaniem nowych kontaktów naukowych.
                </p>
              </div>

              <div className={`cube-face cube-left ${aboutFace === 3 ? "active" : ""}`}>
                <h2>Organizatorzy</h2>
                <div className="section-underline"></div>
                <p className="about-copy">
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