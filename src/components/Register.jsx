import { useState } from 'react';
import { postFormData } from '../api';

function Register({ setAboutFace }) {
  const initialFormData = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    affiliation: "",
    rodo: false,
    presentation_type: "",
    abstract_file: null,
    abstract_file_later: false,
    trip_priority_1: "",
    trip_priority_2: "",
    diet: "",
    has_allergies: false,
    application_requirements: "",
    attendance_days: [],
  
  };

  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "presentation_type") {
      setFormData((prev) => ({
        ...prev,
        presentation_type: value,
        ...(value === "none" || value === ""
         ? {
              abstract_file: null,
             abstract_file_later: false,
           }
         : {}),
     }));

     return;
   }

    setFormData((prev) => ({
     ...prev,
     [name]:
       type === "file"
          ? files[0]
          : type === "checkbox"
           ? checked
           : value,
    }));
  };

  const handleMultiCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      attendance_days: checked
        ? [...prev.attendance_days, value]
        : prev.attendance_days.filter((day) => day !== value),
    }));
  };
const handleTripPriorityChange = (priority, value) => {
  setFormData((prev) => {
    const otherPriority =
      priority === "trip_priority_1"
        ? "trip_priority_2"
        : "trip_priority_1";

    // Jeśli klikamy już zaznaczoną opcję — odznacz ją
    if (prev[priority] === value) {
      return {
        ...prev,
        [priority]: "",
      };
    }

    // Zaznacz wybraną opcję.
    // Jeśli ta sama wycieczka była w drugim priorytecie,
    // automatycznie usuń ją stamtąd.
    return {
      ...prev,
      [priority]: value,
      ...(prev[otherPriority] === value
        ? { [otherPriority]: "" }
        : {}),
    };
  });
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPresenting =
      formData.presentation_type === "presentation" ||
      formData.presentation_type === "poster";

    if (
      isPresenting &&
      !formData.abstract_file &&
      !formData.abstract_file_later
    ) {
      setStatus('Dodaj PDF z abstraktem albo zaznacz, że podeślesz go później.');
      return;
    }
    /*
    if (
      formData.has_allergies &&
      !formData.application_requirements.trim()
    ) {
      setStatus('Zaznaczyłeś/aś alergie — opisz je proszę w polu „Uwagi”.');
      return;
    }*/
    if (formData.attendance_days.length === 0) {
      setStatus('Zaznacz, kiedy będziesz obecny/a.');
      return;
    }

    setStatus('Wysyłanie zgłoszenia...');

    try {
      const fd = new FormData();
      fd.append('first_name', formData.first_name);
      fd.append('last_name', formData.last_name);
      fd.append('email', formData.email);
      fd.append('phone', formData.phone);
      fd.append('affiliation', formData.affiliation);
      fd.append('rodo', formData.rodo);
      fd.append('presentation_type', formData.presentation_type);
      fd.append('abstract_file_later', formData.abstract_file_later);
      fd.append('trip_priority_1', formData.trip_priority_1);
      fd.append('trip_priority_2', formData.trip_priority_2);
      fd.append('diet', formData.diet);
      fd.append('has_allergies', formData.has_allergies);
      fd.append('application_requirements', formData.application_requirements);
      formData.attendance_days.forEach(day => fd.append('attendance_days', day));
      if (formData.abstract_file) {
        fd.append('abstract_file', formData.abstract_file);
      }

      await postFormData('/register', fd);
      setStatus('Zgłoszenie zostało wysłane pomyślnie!');
      setFormData(initialFormData);
   } catch (err) {
     if (err.status === 409) {
      setStatus(
        'Z tego adresu e-mail zostało już wysłane zgłoszenie. Jeśli chcesz zmienić dane w swoim zgłoszeniu lub masz pytania, napisz do nas na krasnal@pwr.edu.pl. W temacie wiadomości wpisz „Zmiana danych w zgłoszeniu” i opisz, co chciałbyś/chciałabyś zmienić.'
      );
    } else {
      setStatus('Wystąpił błąd podczas wysyłania zgłoszenia: ' + err.message);
    }
  }
  };
  return (
    
    <section className="register" id="zglos-sie">
      <div className="register-container">
        <h2>Zgłoszenia</h2>




        <div className="registration-locked">

  <div
    className="registration-locked__form"
    inert=""
    aria-hidden="true"
  >


  

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="first_name"
            placeholder="Imię *"
            value={formData.first_name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="last_name"
            placeholder="Nazwisko *"
            value={formData.last_name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Numer telefonu (opcjonalnie)"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="affiliation"
            placeholder="Afiliacja / uczelnia *"
            value={formData.affiliation}
            onChange={handleChange}
            required
          />

          <select
            name="presentation_type"
            value={formData.presentation_type}
            onChange={handleChange}
            required
          >
            <option value="">Czy prezentujesz? *</option>
            <option value="none">Nie prezentuję</option>
            <option value="presentation">Prezentacja</option>
            <option value="poster">Poster</option>
          </select>

          <select
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            required
          >
            <option value="">Wybierz dietę *</option>
            <option value="meat">Mięsna</option>
            <option value="vege">Wegetariańska</option>
          </select>

          {/*<div className="form-section full-width">
            <p className="form-section-title">
              Czy masz jakieś alergie?
              <span className="optional-badge">Opcjonalne</span>
            </p>

            <label className="form-check">
              <input
                type="checkbox"
                name="has_allergies"
                checked={formData.has_allergies}
                onChange={handleChange}
              />
              Tak, mam alergie.
            </label>

            <p className="form-section-title">
              Uwagi
              {formData.has_allergies ? (
                <span className="required-badge">Wymagane</span>
              ) : (
                <span className="optional-badge">Opcjonalne</span>
              )}
              </p>

            <textarea
              name="application_requirements"
              value={formData.application_requirements}
              onChange={handleChange}
              placeholder="Jeśli zaznaczyłeś/aś alergie, opisz je tutaj. Możesz również podać inne istotne uwagi organizacyjne."
              maxLength={500}
              rows={5}
              required={formData.has_allergies}
            />

             <small>
              Maksymalnie 500 znaków. W przypadku zaznaczenia alergii opisz je w tym polu.
             </small>
            </div>
*/}
          {(formData.presentation_type === "presentation" ||
            formData.presentation_type === "poster") && (
            <div className="form-section full-width">
            <p className="form-section-title">
              Abstrakt
              <span className="required-badge">Wymagane</span>
            </p>

            <input
              type="file"
              name="abstract_file"
              accept="application/pdf"
              onChange={handleChange}
            />

            <small>
              Wymagane jest przesłanie PDF-a z abstraktem albo zaznaczenie opcji poniżej.
            </small>

            <label className="form-check">
              <input
              type="checkbox"
              name="abstract_file_later"
              checked={formData.abstract_file_later}
              onChange={handleChange}
            />
            Abstrakt podeślę później drogą mailową (krasnal@pwr.edu.pl)
          </label>
        </div>
        )}

<div className="form-section full-width">
  <p className="form-section-title">
    Uwagi organizacyjne
    <span className="optional-badge">Opcjonalne</span>
  </p>

  <textarea
    name="application_requirements"
    value={formData.application_requirements}
    onChange={handleChange}
    placeholder="Jeśli chcesz przekazać nam dodatkowe informacje istotne przy organizacji Twojego udziału w konferencji, np. dotyczące wyżywienia lub innych potrzeb organizacyjnych, wpisz je tutaj."
    maxLength={500}
    rows={5}
  />

  <small>
    Maksymalnie 500 znaków. Pole jest opcjonalne.
  </small>
</div>
          <div className="form-section full-width">
            <p className="form-section-title">
              Kiedy będziesz obecny?
              <span className="required-badge">Wymagane</span>
            </p>

            <label className="form-check">
              <input
                type="checkbox"
                value="friday"
                checked={formData.attendance_days.includes("friday")}
                onChange={handleMultiCheckboxChange}
              />
              Piątek
            </label>

            <label className="form-check">
              <input
                type="checkbox"
                value="saturday"
                checked={formData.attendance_days.includes("saturday")}
                onChange={handleMultiCheckboxChange}
              />
              Sobota
            </label>

            <label className="form-check">
              <input
                type="checkbox"
                value="sunday"
                checked={formData.attendance_days.includes("sunday")}
                onChange={handleMultiCheckboxChange}
              />
              Niedziela
            </label>
          </div>

  <div className="form-section full-width trips-section">
  <p className="form-section-title">
    Wycieczki
    <span className="optional-badge">Opcjonalne</span>
  </p>

  <small className="trips-info">
    Wycieczki do WCSS i INTiBS odbywają się w tym samym czasie.
    Jeśli chcesz wziąć udział, zaznacz swoje preferencje w kolejności priorytetów.
  </small>

  <div className="trip-priority">
    <p className="form-section-title trip-priority-title">
      Priorytet 1
    </p>

    <label className="form-check">
      <input
        type="radio"
        name="trip_priority_1"
        value="wcss"
        checked={formData.trip_priority_1 === "wcss"}
        onClick={() =>
          handleTripPriorityChange("trip_priority_1", "wcss")
        }
        onChange={() => {}}
      />
      WCSS
    </label>

    <label className="form-check">
      <input
        type="radio"
        name="trip_priority_1"
        value="intibs"
        checked={formData.trip_priority_1 === "intibs"}
        onClick={() =>
          handleTripPriorityChange("trip_priority_1", "intibs")
        }
        onChange={() => {}}
      />
      INTiBS
    </label>
  </div>

  <div className="trip-priority">
    <p className="form-section-title trip-priority-title">
      Priorytet 2
    </p>

    <label className="form-check">
      <input
        type="radio"
        name="trip_priority_2"
        value="wcss"
        checked={formData.trip_priority_2 === "wcss"}
        onClick={() =>
          handleTripPriorityChange("trip_priority_2", "wcss")
        }
        onChange={() => {}}
        disabled={formData.trip_priority_1 === "wcss"}
      />
      WCSS
    </label>

    <label className="form-check">
      <input
        type="radio"
        name="trip_priority_2"
        value="intibs"
        checked={formData.trip_priority_2 === "intibs"}
        onClick={() =>
          handleTripPriorityChange("trip_priority_2", "intibs")
        }
        onChange={() => {}}
        disabled={formData.trip_priority_1 === "intibs"}
      />
      INTiBS
    </label>
  </div>

  <a
    href="#o-konferencji"
    onClick={() => setAboutFace(1)}
    className="trips-more"
  >
    Więcej informacji o wycieczkach
  </a>
</div>
            <div className="form-section full-width">
              <p className="form-section-title">
                RODO
                <span className="required-badge">Wymagane</span>
              </p>

              <label className="form-check">
                <input
                  type="checkbox"
                  name="rodo"
                  checked={formData.rodo}
                  onChange={handleChange}
                  required
                />

                <span>
                  Zapoznałem/am się z informacją dotyczącą przetwarzania moich danych osobowych w związku z rejestracją i udziałem w konferencji KRASNAL 2026.
                </span>
              </label>
            </div>
          
          <button type="submit" className="register-link full-width">
            Wyślij zgłoszenie
          </button>
        </form>



 </div>

  <div className="registration-locked__overlay">
    <div className="registration-locked__message">
      <h2>Zapisy chwilowo niedostępne</h2>
      <p>Formularz rejestracyjny zostanie uruchomiony wkrótce.</p>
    </div>
  </div>




</div>
        {status && <p className="status-message">{status}</p>}
      </div>
    </section>
  );
}

export default Register;