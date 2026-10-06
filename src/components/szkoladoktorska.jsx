import szkolaDoktorskaPdf from '../assets/Szkola_doktorska.pdf';
import szkolaDoktorskaLogo from '../assets/Logos/logo-szd.webp';
const SzkolaDoktorska = () => {
  return (
    <section id="szkola-doktorska" className="doctoral-section">
      <div className="doctoral-container">

        <div className="doctoral-content">

          <div className="doctoral-description">
            <span className="doctoral-label">
              Szkoła Doktorska PWr
            </span>

            <h2>
              Rozwijaj swoją karierę naukową na Politechnice Wrocławskiej
            </h2>

            <p>
              Zachęcamy do zapoznania się z prezentacją Szkoły Doktorskiej
              Politechniki Wrocławskiej, przedstawiającą możliwości dalszego
              rozwoju naukowego oraz kształcenia doktorantów na PWr.
            </p>

            <p>
              Jeśli rozważasz kontynuowanie działalności naukowej po studiach,
              znajdziesz tam najważniejsze informacje dotyczące Szkoły Doktorskiej.
            </p>
          </div>

          <div className="doctoral-card">
            <div className="doctoral-card-logo">
  <img
    src={szkolaDoktorskaLogo}
    alt="Logo Szkoły Doktorskiej Politechniki Wrocławskiej"
  />
</div>

            <div className="doctoral-card-info">
              <span>Prezentacja</span>

              <h3>
                Szkoła Doktorska Politechniki Wrocławskiej
              </h3>

              <p>
                Materiał informacyjny dotyczący kształcenia w Szkole Doktorskiej PWr.
              </p>

              <a
                href={szkolaDoktorskaPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="doctoral-button"
              >
                Otwórz prezentację
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SzkolaDoktorska;