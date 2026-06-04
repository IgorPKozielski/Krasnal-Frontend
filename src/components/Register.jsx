import { useState } from 'react';
import { postData } from '../api';

function Register() {
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
    trip_to_intibs: false,
    diet: "",
    application_requirements: "",
    attendance_days: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.abstract_file && !formData.abstract_file_later) {
      setStatus('Dodaj PDF z abstraktem albo zaznacz, że podeślesz go później.');
      return;
    }

    if (formData.attendance_days.length === 0) {
      setStatus('Zaznacz, kiedy będziesz obecny/a.');
      return;
    }

    setStatus('Sending...');

    try {
      await postData('/register', formData);
      setStatus('Registration successful!');
      setFormData(initialFormData);
    } catch (err) {
      setStatus('Error: ' + err.message);
    }
  };

  return (
    <section className="register" id="zglos-sie">
      <div className="register-container">
        <h2>Zgłoszenia</h2>

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

          <div className="form-section full-width">
            <p className="form-section-title">
              Wymagania dotyczące zakwaterowania i organizacji pobytu
              <span className="optional-badge">Opcjonalne</span>
            </p>

            <textarea
              name="application_requirements"
              value={formData.application_requirements}
              onChange={handleChange}
              placeholder="Np. pokój jednoosobowy, alergie, szczególne potrzeby zdrowotne, preferencje dotyczące zakwaterowania..."
              maxLength={500}
              rows={5}
            />

            <small>Opcjonalnie. Maksymalnie 500 znaków.</small>
          </div>

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
              Abstrakt podeślę później
            </label>
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

          <div className="form-section full-width">
            <p className="form-section-title">
              Wycieczka do INTiBS
              <span className="optional-badge">Opcjonalne</span>
            </p>

            <label className="form-check">
              <input
                type="checkbox"
                name="trip_to_intibs"
                checked={formData.trip_to_intibs}
                onChange={handleChange}
              />
              Chcę zapisać się na wycieczkę do INTiBS w piątek przed rozpoczęciem konferencji.
            </label>
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
              Akceptuję politykę RODO.
            </label>
          </div>

          <button type="submit" className="register-link full-width">
            Wyślij zgłoszenie
          </button>
        </form>

        {status && <p className="status-message">{status}</p>}
      </div>
    </section>
  );
}

export default Register;