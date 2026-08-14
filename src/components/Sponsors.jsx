import { useEffect, useState } from 'react';
import { fetchData } from '../api';
import wydzialLogo from '../assets/Logos/logo-wydział.png';
import pwrLogo from '../assets/Logos/logo-pwr.png';
import ptfLogo from '../assets/Logos/logo-ptf.png';
import solarisLogo from '../assets/Logos/logo-solaris.png';
import quantumAILogo from '../assets/Logos/logo-quantumAI.jpg';
const patronages = [
  {
    name: 'Wydział Podstawowych Problemów Techniki PWr',
    logo: wydzialLogo,
    website: 'https://wppt.pwr.edu.pl/',
  },
  {
    name: 'Polskie Towarzystwo Fizyczne',
    logo: ptfLogo,
    website: 'https://www.ptf.net.pl/',
  },
  {
    name: 'Narodowe Centrum Promieniowania Synchrotronowego SOLARIS',
    logo: solarisLogo,
    website: 'https://synchrotron.uj.edu.pl/',
  },
  {
    name: 'Quantum AI Foundation',
    logo: quantumAILogo,
    website: 'https://www.qaif.org/',
  },
];
function Sponsors() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetchData('/sponsors')
      .then(data => setSponsors(data))
      .catch(err => console.error("Failed to load sponsors:", err));
  }, []);

  return (
    <section id="sponsorzy" className="sponsors-section">
      <div className="container">
        <h2>Patronaty</h2>
        <div className="section-underline"></div>

        <p className="sponsors-description">
          Konferencja KRASNAL odbywa się przy wsparciu instytucji naukowych
          i organizacji wspierających rozwój młodych naukowców.
        </p>
      <div className="patronages-grid">
        {patronages.map((patronage) => (
          <a
            key={patronage.name}
            href={patronage.website}
            target="_blank"
            rel="noopener noreferrer"
            className="patronage-card"
            aria-label={`Strona: ${patronage.name}`}
          >
            <img
              src={patronage.logo}
              alt={patronage.name}
              className="patronage-logo"
            />
        </a>
          ))}
        </div>
        <h2 className="sponsors-subtitle">Sponsorzy i partnerzy</h2>
        <div className="sponsors-grid">
          {/*
          <div className="sponsor-card">Logo</div>
          <div className="sponsor-card">Logo</div>
          <div className="sponsor-card">Logo</div>
          <div className="sponsor-card">Logo</div>
          */}
          {sponsors && sponsors.length > 0 ? sponsors.map(sponsor => (
            <div key={sponsor.id} className="sponsor-card">
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={sponsor.logo_url}
                  alt={sponsor.name}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <p>{sponsor.name}</p>
              </a>
            </div>
          )) : (
            <p>Sponsorzy wkrótce...</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Sponsors;