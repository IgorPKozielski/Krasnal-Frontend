import { useEffect, useState } from 'react';
import { fetchData } from '../api';

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
        <h2>Sponsors</h2>
        <div className="section-underline"></div>

        <p className="sponsors-description">
          The KRASNAL conference is supported by partners and institutions
          that help promote science and the academic community.
        </p>

        <div className="sponsors-grid">
          {/*
          <div className="sponsor-card">Logo</div>
          <div className="sponsor-card">Logo</div>
          <div className="sponsor-card">Logo</div>
          <div className="sponsor-card">Logo</div>
          */}
          {sponsors && sponsors.length > 0 ? sponsors.map(sponsor => (
            <div key={sponsor.id} className="sponsor-card">
              <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                <img src={sponsor.logo_url} alt={sponsor.name} style={{ maxWidth: '100%', height: 'auto' }} />
                <p>{sponsor.name}</p>
              </a>
            </div>
          )) : <p>Sponsorzy wkrótce...</p>}
        </div>
      </div>
    </section>
  );
}

export default Sponsors;