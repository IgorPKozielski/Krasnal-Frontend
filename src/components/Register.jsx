import { useState } from 'react';
import { postData } from '../api';

function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    affiliation: '',
    dietary_needs: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await postData('/register', formData);
      setStatus('Registration successful!');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        affiliation: '',
        dietary_needs: ''
      });
    } catch (err) {
      setStatus('Error: ' + err.message);
    }
  };

  return (
    <section className="register" id="zglos-sie">
      <div className="register-container">
        <h2>Zgłoszenia</h2>
        {/*
        <p>
          Rejestracja na konferencję zostanie uruchomiona wkrótce. W tej sekcji
          pojawią się informacje o zapisach, opłatach i terminach.
        </p>

        <a className="register-link" href="#">
          Formularz wkrótce
        </a>
        */}

        <form onSubmit={handleSubmit} className="register-form">
          <input type="text" name="first_name" placeholder="Imię" value={formData.first_name} onChange={handleChange} required />
          <input type="text" name="last_name" placeholder="Nazwisko" value={formData.last_name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="affiliation" placeholder="Afiliacja" value={formData.affiliation} onChange={handleChange} />
          <textarea
          className="full-width"
          name="dietary_needs"
          placeholder="Potrzeby żywieniowe"
          value={formData.dietary_needs}
          onChange={handleChange}
          />
            <button type="submit" className="register-link full-width">
              Wyślij zgłoszenie
            </button>
        </form>
        {status && <p className="status-message">{status}</p>}
      </div>
    </section>
  )
}

export default Register;