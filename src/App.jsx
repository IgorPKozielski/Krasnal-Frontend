import "./App.css"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Program from "./components/Program"
import Register from "./components/Register"
import Contact from "./components/Contact"
import Footer from "./components/Footer"


function App() {
  return (
    <div> 
      <Navbar />
      <Hero />
      <About />
      <Program />
      <Register />
      <Contact />
      <Footer />
      {/*sponsorzy */}
    </div>
  )
}

export default App