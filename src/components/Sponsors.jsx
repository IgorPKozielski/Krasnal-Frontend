import { useEffect, useState } from 'react';
import { fetchData } from '../api';
import wpptLogo from "../assets/Logos/logo-wppt.png";
import pwrLogo from "../assets/Logos/logo-pwr.png";
import ptfLogo from '../assets/Logos/logo-ptf.png';
import solarisLogo from '../assets/Logos/logo-solaris.png';
import quantumAILogo from '../assets/Logos/logo-quantumAI.jpg';
import pssfLogo from "../assets/Logos/pssf-logo.png";
import redbullLogo from "../assets/Logos/logo-redbull.png";
import kolejkowoLogo from "../assets/Logos/logo-kolejkowo.png";
import skyblueLogo from "../assets/Logos/logo-skyblue.png"
const patronages = [
  {
    name: 'Politechnika Wrocławska',
    logo: pwrLogo,
    website: 'https://pwr.edu.pl/',
  },
  {
    name: 'Wydział Podstawowych Problemów Techniki - PWr',
    logo: wpptLogo,
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
  {
    name: 'Polskie Stowarzyszenie Studentów Fizyki',
    logo: pssfLogo,
    website: 'https://pssf.edu.pl/',
  },
 {
    name: 'Red Bull',
    logo: redbullLogo,
    website: 'https://www.redbull.com/pl-pl/',
  },
  {
    name: 'Kolejkowo',
    logo: kolejkowoLogo,
    website: 'https://kolejkowo.pl/',
  },
  {
    name: 'Skyblue',
    logo: skyblueLogo,
    website: 'https://skyblue.education/',
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
        <h2>Patronaty i partnerzy</h2>
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
        
      </div>
    </section>
  );
}

export default Sponsors;