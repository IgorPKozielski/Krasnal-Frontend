import { useState } from 'react';
import mpkDworzec from '../assets/MPK-z-dworca.png';
import pasazPwr from '../assets/Pasaz-PWR.png';
import mierzejImg from '../assets/mierzej.png';
import ciorgaImg from '../assets/ciorga.png';
import zaleskiImg from '../assets/TommyZaleski.png';
const programDays = [
  {
    id: 'friday',
    day: 'PIĄTEK',
    date: '25.09',
    events: [
      {
        start: '10:00',
        end: '13:00',
        title: 'Wycieczka INTiBS',
        type: 'trip',
        lane: 'left',
      },
      {
        start: '11:30',
        end: '13:00',
        title: 'Wycieczka WCSS',
        type: 'trip',
        lane: 'right',
      },
      {
        start: '13:00',
        end: '14:00',
        title: 'Otwarcie konferencji',
        type: 'ceremony',
        lane: 'full',
      },
      {
        start: '14:00',
        end: '15:00',
        title: 'Wykład – prof. Marcin Mierzejewski',
        type: 'lecture',
        lane: 'full',
      },
      {
        start: '15:00',
        end: '16:30',
        title: 'Obiad',
        type: 'break',
        lane: 'full',
      },
      {
        start: '16:30',
        end: '17:30',
        title: 'Sesja prezentacji ustnych',
        type: 'oral',
        lane: 'full',
      },
      {
        start: '17:30',
        end: '18:15',
        title: 'Wydarzenie PSSF – mikroForFiz – Norbert Nieścior',
        type: 'special',
        lane: 'full',
      },
    ],
  },

  {
    id: 'saturday',
    day: 'SOBOTA',
    date: '26.09',
    events: [
      {
        start: '09:00',
        end: '11:00',
        title: 'Sesja prezentacji ustnych',
        type: 'oral',
        lane: 'full',
      },
      {
        start: '11:00',
        end: '12:00',
        title: 'Wykład – prof. Tomasz Zaleski',
        type: 'lecture',
        lane: 'full',
      },
      {
        start: '12:00',
        end: '12:30',
        title: 'Przerwa kawowa',
        type: 'break',
        lane: 'full',
      },
      {
        start: '12:30',
        end: '15:00',
        title: 'Sesja prezentacji ustnych',
        type: 'oral',
        lane: 'full',
      },
      {
        start: '15:00',
        end: '16:30',
        title: 'Obiad',
        type: 'break',
        lane: 'full',
      },
      {
        start: '16:30',
        end: '18:00',
        title: 'Sesja plakatowa',
        type: 'oral',
        lane: 'full',
      },
      {
        start: '18:00',
        end: '18:15',
        title: 'Integracja',
        type: 'ceremony',
        lane: 'full',
      },
    ],
  },

  {
    id: 'sunday',
    day: 'NIEDZIELA',
    date: '27.09',
    events: [
      {
        start: '09:00',
        end: '10:00',
        title: 'Sesja prezentacji ustnych',
        type: 'oral',
        lane: 'full',
      },
      {
        start: '10:00',
        end: '11:00',
        title: 'Wykład – prof. Mariusz Ciorga',
        type: 'lecture',
        lane: 'full',
      },
      {
        start: '11:00',
        end: '13:00',
        title: 'Sesja prezentacji ustnych',
        type: 'oral',
        lane: 'full',
      },
      {
        start: '13:00',
        end: '15:00',
        title: 'Zamknięcie konferencji',
        type: 'ceremony',
        lane: 'full',
      },
    ],
  },
];
const TIMELINE_START = 9 * 60;
const TIMELINE_END = 18 * 60 + 15;
const SLOT_MINUTES = 15;
const SLOT_HEIGHT = 14;

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const getEventStyle = (event) => {
  const start = timeToMinutes(event.start);
  const end = timeToMinutes(event.end);

  const top =
    ((start - TIMELINE_START) / SLOT_MINUTES) * SLOT_HEIGHT;

  const height =
    ((end - start) / SLOT_MINUTES) * SLOT_HEIGHT;

  return {
    top: `${top}px`,
    height: `${Math.max(height - 2, 18)}px`,
  };
};

const timeSlots = [];

for (
  let minutes = TIMELINE_START;
  minutes <= TIMELINE_END;
  minutes += SLOT_MINUTES
) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  timeSlots.push({
    label: `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`,
    top:
      ((minutes - TIMELINE_START) / SLOT_MINUTES) * SLOT_HEIGHT,
  });
}
function Program({ programFace, setProgramFace }) {
  const [activeProgramDay, setActiveProgramDay] = useState('friday');
  const [flippedSpeaker, setFlippedSpeaker] = useState(null);

  const selectedProgramDay =
  programDays.find((day) => day.id === activeProgramDay) || programDays[0];

  const nextSlide = () => {
    setProgramFace((prev) => (prev + 1) % 4);
  };

  const prevSlide = () => {
    setProgramFace((prev) => (prev - 1 + 4) % 4);
  };

  return (
    <section id="program" className="program">
      <div className="program-container">
        <div className="cube-carousel">
          <button className="carousel-btn left" onClick={prevSlide} aria-label="Previous slide">
            ‹
          </button>

          <div className="cube-scene">
            <div
              className="cube program-cube"
              style={{ transform: `translateZ(-600px) rotateY(${-programFace * 90}deg)` }}
            >
              <div className={`cube-face program-face cube-front ${programFace === 0 ? "active" : ""}`}>
  <h2>Program</h2>
  <div className="section-underline"></div>

   {/* ===== DESKTOP ===== */}

  <div className="timeline-desktop">

    <div className="timeline-header-empty"></div>

    {programDays.map((day) => (
      <div className="timeline-day-header" key={`header-${day.id}`}>
        <strong>{day.day}</strong>
        <span>{day.date}</span>
      </div>
    ))}


    <div className="timeline-time-axis">
      {timeSlots
  .filter((_, index) => index % 2 === 0)
  .map((slot) => (
        <span
          key={slot.label}
          className="timeline-time-label"
          style={{ top: `${slot.top}px` }}
        >
          {slot.label}
        </span>
      ))}
    </div>


    {programDays.map((day) => (
      <div className="timeline-day-track" key={day.id}>

        {day.events.map((event, index) => (
          <div
            key={`${day.id}-${index}`}
            className={`
              timeline-event
              timeline-event-${event.type}
              timeline-event-${event.lane}
            `}
            style={getEventStyle(event)}
          >
            <span>{event.title}</span>
          </div>
        ))}

      </div>
    ))}

  </div>


  {/* ===== TELEFON ===== */}

  <div className="timeline-mobile">

    <div className="program-day-tabs">
      {programDays.map((day) => (
        <button
          key={day.id}
          type="button"
          onClick={() => setActiveProgramDay(day.id)}
          className={activeProgramDay === day.id ? 'active' : ''}
        >
          {day.day}
        </button>
      ))}
    </div>

    <div className="timeline-mobile-header">
      <strong>{selectedProgramDay.day}</strong>
      <span>{selectedProgramDay.date}</span>
    </div>

    <div className="timeline-mobile-body">

 <div className="timeline-time-axis">
  {timeSlots
    .filter((_, index) => index % 2 === 0)
    .map((slot) => (
      <span
        key={slot.label}
        className="timeline-time-label"
        style={{ top: `${slot.top}px` }}
      >
        {slot.label}
      </span>
    ))}
</div>

      <div className="timeline-day-track">

        {selectedProgramDay.events.map((event, index) => (
          <div
            key={`${selectedProgramDay.id}-${index}`}
            className={`
              timeline-event
              timeline-event-${event.type}
              timeline-event-${event.lane}
            `}
            style={getEventStyle(event)}
          >
            <span>{event.title}</span>
          </div>
        ))}

      </div>

    </div>

  </div>
</div>

<div className={`cube-face program-face cube-right ${programFace === 1 ? "active" : ""}`}>
  <h2>Jak dojechać?</h2>
  <div className="section-underline"></div>

  <div className="travel-maps">
    <div className="travel-map-item">
      <a
        href={mpkDworzec}
        target="_blank"
        rel="noopener noreferrer"
        className="travel-map-link"
      >
        <img
          src={mpkDworzec}
          alt="Dojazd z Dworca Głównego komunikacją miejską"
          className="travel-map"
        />
      </a>

      <p>Z Dworca Głównego</p>
    </div>

    <div className="travel-map-item">
      <a
        href={pasazPwr}
        target="_blank"
        rel="noopener noreferrer"
        className="travel-map-link"
      >
        <img
          src={pasazPwr}
          alt="Dojście z Pasażu Grunwaldzkiego do budynku A-1"
          className="travel-map"
        />
      </a>

      <p>Z Pasażu Grunwaldzkiego do A-1</p>
    </div>
  </div>
  <p className="travel-map-hint">
  Kliknij mapę, aby powiększyć zdjęcie.
</p>
</div>
              <div className={`cube-face program-face cube-back ${programFace === 2 ? "active" : ""}`}>
                <h2>Mapka sal</h2>
                <div className="section-underline"></div>
                <p>
                  W tym miejscu pojawi się mapa sal konferencyjnych, która ułatwi
                  poruszanie się po przestrzeni wydarzenia.
                </p>
              </div>

<div className={`cube-face program-face cube-left ${programFace === 3 ? "active" : ""}`}>
  <h2>Prelegenci</h2>
  <div className="section-underline"></div>

  <div className="speakers-grid">

    {/* ===== MARCIN MIERZEJEWSKI ===== */}

    <div
      className={`speaker-card speaker-flip-card ${
        flippedSpeaker === 'mierzej' ? 'flipped' : ''
      }`}
      onClick={() =>
        setFlippedSpeaker(
          flippedSpeaker === 'mierzej' ? null : 'mierzej'
        )
      }
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlippedSpeaker(
            flippedSpeaker === 'mierzej' ? null : 'mierzej'
          );
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Pokaż szczegóły wykładu profesora Marcina Mierzejewskiego"
    >
      <div className="speaker-card-inner">

        <div className="speaker-card-front">
          <img
            src={mierzejImg}
            alt="Prof. Marcin Mierzejewski"
            className="speaker-photo"
          />

          <h3>Prof. Marcin Mierzejewski</h3>

          <p>
            jest specjalistą w dziedzinie teoretycznej fizyki materii
            skondensowanej i układów silnie skorelowanych. Jego badania
            koncentrują się na dynamice nierównowagowej, transporcie kwantowym
            oraz właściwościach niskowymiarowych układów kwantowych, łącząc
            zaawansowane metody analityczne i numeryczne.
          </p>
        </div>

        <div className="speaker-card-back">
          <h3>
            W jaki sposób makroskopowe układy zapominają o swojej przeszłości
            i czy jest to nieuniknione?
          </h3>

          <div className="speaker-abstract">
            <p>
              Zjawisko termalizacji występuje powszechnie w otaczającym nas
              świecie złożonym z obiektów makroskopowych. Chociaż obiekty takie
              mają ogromną liczbę stopni swobody, po dostatecznie długim czasie
              ich własności fizyczne określone są przez stosunkowo niewielką
              liczbę parametrów takich jak temperatura, liczba cząsteczek czy
              magnetyzacja.
            </p>

            <p>
              Pozostałe informacje o stanie początkowym takich układów są
              tracone w trakcie ewolucji. Ponieważ termalizacja układów
              makroskopowych jest nierozłącznie związana z utratą informacji,
              szczególnym zainteresowaniem w ostatnich latach cieszyły się
              układy kwantowe, które nie wykazują termalizacji.
            </p>

            <p>
              W tym kontekście badano układy, w których brak termalizacji
              wynika z dodatkowych praw zachowania, oraz takie, gdzie silny
              nieporządek jest przyczyną braku termalizacji. W trakcie wykładu
              zostanie omówiona hipoteza wyjaśniająca powody termalizacji
              typowych, makroskopowych układów kwantowych oraz wybrane
              własności tych układów, które jej nie wykazują.
            </p>
          </div>
        </div>

      </div>
    </div>


    {/* ===== MARIUSZ CIORGA ===== */}

    <div
      className={`speaker-card speaker-flip-card ${
        flippedSpeaker === 'ciorga' ? 'flipped' : ''
      }`}
      onClick={() =>
        setFlippedSpeaker(
          flippedSpeaker === 'ciorga' ? null : 'ciorga'
        )
      }
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlippedSpeaker(
            flippedSpeaker === 'ciorga' ? null : 'ciorga'
          );
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Pokaż szczegóły wykładu profesora Mariusza Ciorgi"
    >
      <div className="speaker-card-inner">

        <div className="speaker-card-front">
          <img
            src={ciorgaImg}
            alt="Prof. Mariusz Ciorga"
            className="speaker-photo"
          />

          <h3>Prof. Mariusz Ciorga</h3>

          <p>
            zajmuje się eksperymentalną fizyką półprzewodników, transportem
            kwantowym i spintroniką. Jego badania obejmują transport spinowy
            oraz właściwości nowoczesnych nanostruktur i materiałów
            dwuwymiarowych, ze szczególnym uwzględnieniem zjawisk związanych
            ze spinem i oddziaływaniem spin-orbita.
          </p>
        </div>

        <div className="speaker-card-back">
          <h3>Prof. Mariusz Ciorga</h3>

          <div className="speaker-details-placeholder">
            Szczegóły wykładu pojawią się wkrótce.
          </div>
        </div>

      </div>
    </div>


    {/* ===== TOMASZ ZALESKI ===== */}

    <div
      className={`speaker-card speaker-flip-card ${
        flippedSpeaker === 'zaleski' ? 'flipped' : ''
      }`}
      onClick={() =>
        setFlippedSpeaker(
          flippedSpeaker === 'zaleski' ? null : 'zaleski'
        )
      }
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlippedSpeaker(
            flippedSpeaker === 'zaleski' ? null : 'zaleski'
          );
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Pokaż szczegóły wykładu profesora Tomasza Zaleskiego"
    >
      <div className="speaker-card-inner">

        <div className="speaker-card-front">
          <img
            src={zaleskiImg}
            alt="Prof. Tomasz Zaleski"
            className="speaker-photo speaker-photo-zaleski"
          />

          <h3>Prof. Tomasz Zaleski</h3>

          <p>
            jest specjalistą w dziedzinie teoretycznej fizyki materii
            skondensowanej i układów silnie skorelowanych. Jego badania
            koncentrują się m.in. na ultrazimnych atomach w sieciach optycznych,
            które pozwalają badać zjawiska znane z fizyki ciała stałego
            w precyzyjnie kontrolowanych układach kwantowych. Jest również
            zastępcą dyrektora ds. naukowych INTiBS PAN.
          </p>
        </div>

        <div className="speaker-card-back">
          <h3>Fizyka ciała stałego w sieciach optycznych</h3>

          <div className="speaker-details-placeholder">
            Szczegóły wykładu pojawią się wkrótce.
          </div>
        </div>

      </div>
    </div>

  </div>

  <p className="speaker-click-hint">
    Kliknij wykładowcę, aby zobaczyć szczegóły wykładu.
  </p>
</div>

            </div>
          </div>

          <button className="carousel-btn right" onClick={nextSlide} aria-label="Next slide">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

export default Program;