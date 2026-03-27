///*import logoKrasnal from "../assets/Logos/logo-krasnal.svg";*/
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-brand">
          <span className="navbar-logo-text">KRASNAL</span> {/*<img src={logoKrasnal} alt="KRASNAL" className="navbar-logo" />*/}
        </a>

        <div className="navbar-links">
          <a href="#about">O konferencji</a>
          <a href="#program">Program</a>
          <a href="#register">Zgłoszenia</a>
          <a href="#contact">Kontakt</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;