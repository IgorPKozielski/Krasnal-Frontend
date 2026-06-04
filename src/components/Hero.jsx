import { useEffect, useMemo, useRef, useState } from "react"
import maskotka from "../assets/maskotka.svg"

function Hero() {
const dateValues = useMemo(
  () => [
    ["01-02", "03"],
    ["03", "04"],
    ["04", "05"],
    ["07-08", "06"],
    ["09", "07"],
    ["11", "08"],
    ["13", "08"],
    ["15-17", "08"],
    ["18", "08"],
    ["21", "08"],
    ["24", "08"],
    ["27", "08"],
    ["30", "08"],
    ["02", "09"],
    ["06", "09"],
    ["11", "09"],
    ["17", "09"],
    ["22", "09"],
    ["25-27", "09"],
  ],
  []
)

const [dateIndex, setDateIndex] = useState(0)

const dateStep =
  window.innerWidth <= 430 ? 54 :
  window.innerWidth <= 640 ? 58 :
  72

useEffect(() => {
  const timeouts = []

  const initialDelay = 800
  const step = 140

  dateValues.forEach((_, index) => {
    timeouts.push(
      setTimeout(() => {
        setDateIndex(index)
      }, initialDelay + index * step)
    )
  })

  return () => timeouts.forEach(clearTimeout)
}, [dateValues])
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-visual">
          <img
            src={maskotka}
            alt="Maskotka konferencji Krasnal"
            className="hero-mascot"
          />
        </div>

        <div className="hero-content">
          <p className="hero-subtitle">Ogólnopolska Konferencja Fizyków</p>
          <h1>KRASNAL 2026</h1>

          <div className="hero-date-wrap">
            <p className="hero-date-label">Już wkrótce</p>

            <div className="hero-date-machine" aria-live="polite">
              <div className="date-window date-window-day">
         <div
              className="date-strip"
              style={{ transform: `translateY(-${dateIndex * dateStep}px)` }}
        >
          {dateValues.map(([day], index) => (
             <span
                key={`${day}-${index}`}
                className={`date-value ${
                  index === dateValues.length - 1 ? "date-value-final" : ""
                }`}
             >
                {day}
             </span>
          ))}
        </div>
              </div>

              <span className="date-separator">–</span>

              <div className="date-window">
                <div
                  className="date-strip date-strip-slower"
                  style={{ transform: `translateY(-${dateIndex * dateStep}px)` }}
                >
                  {dateValues.map(([, month], index) => (
                    <span
                      key={`${month}-${index}`}
                      className={`date-value ${
                        index === dateValues.length - 1 ? "date-value-final" : ""
                      }`}
                    >
                      {month}
                    </span>
                ))}
              </div>
              </div>

              <span className="date-separator">–</span>

              <div className="date-window date-window-static">
                <span className="date-value date-value-static">2026</span>
              </div>
            </div>
          </div>

          <a href="#zglos-sie" className="hero-button">
            Zgłoś się już teraz
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero;