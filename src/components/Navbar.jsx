import logoKrasnal from "../assets/Logos/logo-krasnal-białe.png";

function Navbar({ setAboutFace, setProgramFace }) {
  const goToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToAboutFace = (face) => {
    setAboutFace(face);
    goToSection("o-konferencji");
  };

  const goToProgramFace = (face) => {
    setProgramFace(face);
    goToSection("program");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#top" className="navbar-brand">
          <img src={logoKrasnal} alt="KRASNAL" className="navbar-logo" />
        </a>

        <div className="navbar-links">
          <div className="nav-item dropdown">
           <button className="nav-link-btn" onClick={() => goToAboutFace(0)}>
             O konferencji <span className="nav-caret">▾</span>
           </button>
            <div className="dropdown-menu">
              <button onClick={() => goToAboutFace(0)}>O konferencji</button>
              <button onClick={() => goToAboutFace(1)}>Uczestnicy</button>
              <button onClick={() => goToAboutFace(2)}>Dla kogo</button>
              <button onClick={() => goToAboutFace(3)}>Organizatorzy</button>
            </div>
          </div>

          <div className="nav-item dropdown">
            <button className="nav-link-btn" onClick={() => goToAboutFace(0)}>
             Program <span className="nav-caret">▾</span>
           </button>
            <div className="dropdown-menu">
              <button onClick={() => goToProgramFace(0)}>Program</button>
              <button onClick={() => goToProgramFace(1)}>Szczegółowy plan</button>
              <button onClick={() => goToProgramFace(2)}>Mapka sal</button>
              <button onClick={() => goToProgramFace(3)}>Prelegenci</button>
            </div>
          </div>

          <a href="#sponsorzy">Sponsorzy</a>
          <a href="#zglos-sie">Zgłoś się</a>
          <a href="#kontakt">Kontakt</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;