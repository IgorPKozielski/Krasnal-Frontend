import "./App.css";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Program from "./components/Program";
import Register from "./components/Register";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Sponsors from "./components/Sponsors";

function App() {
  const [aboutFace, setAboutFace] = useState(0);
  const [programFace, setProgramFace] = useState(0);

  return (
    <div>
      <Navbar
        setAboutFace={setAboutFace}
        setProgramFace={setProgramFace}
      />
      <Hero />
      <About aboutFace={aboutFace} setAboutFace={setAboutFace} />
      <Program programFace={programFace} setProgramFace={setProgramFace} />
      <Sponsors />
      <Register />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;