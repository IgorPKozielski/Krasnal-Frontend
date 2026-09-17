import logoForFiz from '../assets/logo-ForFiz.png';
import norbertPhoto from '../assets/Norbert-Niescior.jpeg';

const MikroForFiz = () => {
  return (
    <section id="mikroforfiz" className="microforfiz-section">
      <div className="microforfiz-container">

        {/* Nagłówek sekcji */}
        <div className="microforfiz-header">

          <img
            src={logoForFiz}
            alt="Logo mikroForFiz"
            className="microforfiz-logo"
          />

          <p className="microforfiz-intro">
            W ramach konferencji KRASNAL 2026 odbędzie się również wydarzenie
            μForFiz organizowane przez Polskie Stowarzyszenie Studentów Fizyki.
          </p>
        </div>

        {/* Główna część */}
        <div className="microforfiz-content">

          {/* Opis warsztatu */}
          <div className="microforfiz-description">
  <span className="microforfiz-label">Warsztat</span>

  <h3>
    Jak uzyskać finansowanie na projekt w kole naukowym?
  </h3>

  <p>
    Dzięki warsztatowi zdobędziesz wiedzę na temat dostępnych funduszy
    i nauczysz się, jak przygotować budżet, harmonogram i opis projektu tak,
    aby uzyskać finansowanie na realizację swoich pomysłów. W trakcie
    spotkania omówione zostaną dostępne możliwości finansowania
    z publicznych programów ministerialnych, grantów od fundacji
    czy też prywatnych sponsorów.
  </p>

  <p>
    Następną częścią warsztatu będzie praca grupowa, podczas której
    uczestnicy będą planować budżet, dobiorą źródła finansowania,
    napiszą krótki opis projektu i podzielą się zadaniami
    w zespole projektowym.
  </p>

  <p>
    Na koniec warsztatów zrobimy podsumowanie i omówimy rezultaty
    pracy grupowej.
  </p>

  <div className="microforfiz-topics">
    <div className="microforfiz-topic">
      Dostępne granty i źródła finansowania
    </div>

    <div className="microforfiz-topic">
      Przygotowanie budżetu i harmonogramu projektu
    </div>

    <div className="microforfiz-topic">
      Planowanie działań w zespole
    </div>

    <div className="microforfiz-topic">
      Skuteczne rozwijanie inicjatyw naukowych
    </div>
  </div>

  <p className="microforfiz-audience">
    Warsztat skierowany jest zarówno do osób działających w kołach naukowych,
    jak i wszystkich zainteresowanych działalnością akademicką.
  </p>
</div>

          {/* Prowadzący */}
          <div className="microforfiz-speaker">
            <div className="microforfiz-photo-wrapper">
              <img
                src={norbertPhoto}
                alt="Norbert Nieścior"
                className="microforfiz-photo"
              />
            </div>

            <div className="microforfiz-speaker-info">
              <span>Prowadzący warsztat</span>
              <h3>Norbert Nieścior</h3>
              <p>Polskie Stowarzyszenie Studentów Fizyki</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MikroForFiz;