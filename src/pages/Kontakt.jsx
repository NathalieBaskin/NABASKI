import  { useState } from 'react';
import emailjs from 'emailjs-com';

function Kontakt() {
  const [formData, setFormData] = useState({
    user_email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Skicka formuläret via EmailJS
    emailjs
      .sendForm('service_krh8r1w', 'template_qgh2vdt', e.target, 'Z3WD4ZES9N1LKNRBl')
      .then(
        (result) => {
          console.log('Meddelandet skickades:', result.text);
          // Här kan du lägga till en bekräftelsemeddelande för användaren om det behövs.
        },
        (error) => {
          console.log('Fel:', error.text);
        }
      );
  };

  return (
    <div>
      <h1>Kontakt</h1>
      <p>Här kan du kontakta oss!</p>
      <form onSubmit={handleSubmit}>
        <div>
        <div>
          <label htmlFor="user_name">Ditt namn</label>
          <input
            type="text"
            id="user_name"
            name="from_name"  // Matchar template variabel
            value={formData.user_name}
            onChange={handleChange}  // Uppdaterar formData vid input
            required
          />
        </div>
          <label htmlFor="user_email">Din e-post</label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Meddelande</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Skicka</button>
      </form>
    </div>
  );
}

export default Kontakt;
