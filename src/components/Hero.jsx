import { useEffect, useMemo, useState } from "react"
import maskotka from "../assets/maskotka.svg"

function Hero() {
  const dayValues = useMemo(
    () => ["01-02", "03", "04", "07-08", "09", "11","13", "15-17", "18", "21", "24", "26", "26-27"],
    []
  )

  const monthValues = useMemo(
    () => ["03", "04", "05", "06", "07", "08", "09"],
    []
  )

  const [dayIndex, setDayIndex] = useState(0)
  const [monthIndex, setMonthIndex] = useState(0)

  useEffect(() => {
    const timeouts = []

    const initialDelay = 800
    const dayStep = 120
    const monthStep = 200

    dayValues.forEach((_, index) => {
      timeouts.push(
        setTimeout(() => {
          setDayIndex(index)
        }, initialDelay + index * dayStep)
      )
    })

    monthValues.forEach((_, index) => {
      timeouts.push(
        setTimeout(() => {
          setMonthIndex(index)
        }, initialDelay + index * monthStep)
      )
    })

    return () => timeouts.forEach(clearTimeout)
  }, [dayValues, monthValues])

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
                  style={{ transform: `translateY(-${dayIndex * 72}px)` }}
                >
                {dayValues.map((day, index) => (
                  <span
                    key={day}
                    className={`date-value ${index === dayValues.length - 1 ? "date-value-final" : ""}`}
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
                  style={{ transform: `translateY(-${monthIndex * 72}px)` }}
                >
                {monthValues.map((month, index) => (
                  <span
                    key={month}
                    className={`date-value ${
                      index === monthValues.length - 1 && monthIndex === monthValues.length - 1
                        ? "date-value-final"
                        : ""
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