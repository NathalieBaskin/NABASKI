import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import "./Kontakt.css";

function Kontakt() {
  const [formData, setFormData] = useState({
    user_email: '',
    message: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_krh8r1w', 'template_qgh2vdt', e.target, 'Z3WD4ZES9N1LKNRBl')
      .then(
        (result) => {
          console.log('Meddelandet skickades:', result.text);
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
            navigate('/'); // Omdirigerar till startsidan
          }, 2000); // Popup visas i 2 sekunder
        },
        (error) => {
          console.log('Fel:', error.text);
        }
      );
  };

  return (
    <div className="kontakt-container">
      <h1 className="kontakt-heading">Kontakt</h1>
      <p className="kontakt-description">Här kan du kontakta oss!</p>
      <form onSubmit={handleSubmit} className="kontakt-form">
        <div className="kontakt-form-group">
          <label htmlFor="user_name" className="kontakt-label">Ditt namn</label>
          <input
            type="text"
            id="user_name"
            name="from_name" 
            className="kontakt-input"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="kontakt-form-group">
          <label htmlFor="user_email" className="kontakt-label">Din e-post</label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            className="kontakt-input"
            value={formData.user_email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="kontakt-form-group">
          <label htmlFor="message" className="kontakt-label">Meddelande</label>
          <textarea
            id="message"
            name="message"
            className="kontakt-textarea"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="kontakt-button">Skicka</button>
      </form>

      {/* Popup */}
      {showPopup && <div className="popup">Meddelandet är skickat!</div>}
    </div>
  );
}

export default Kontakt;
