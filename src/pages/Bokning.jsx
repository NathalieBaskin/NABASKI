
import { useState } from "react";
import DatePicker from "react-datepicker"; // Kalender
import { format } from "date-fns"; // För att hantera datumformat
import "react-datepicker/dist/react-datepicker.css"; // Kalender CSS
import emailjs from "@emailjs/browser"; // För att skicka mejl
import "./Bokning.css";

function Bokning() {
  const [selectedDate, setSelectedDate] = useState(null); // Vald datum
  const [selectedPackage, setSelectedPackage] = useState("");
  const [price, setPrice] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const packages = {
    "Standard": "10,000 SEK",
    "Premium": "15,000 SEK",
    "Exclusive": "20,000 SEK"
  };

  // Uppdaterar paketval och pris
  const handlePackageChange = (event) => {
    const selected = event.target.value;
    setSelectedPackage(selected);
    setPrice(packages[selected] || "");
  };

  // Uppdaterar formulärfält
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Uppdaterar datum utan att modifiera det
  const handleDateChange = (date) => {
    setSelectedDate(date); // Sätt det valda datumet
  };

  // Skickar e-post med bokningsinformation via EmailJS
  const sendEmail = (event) => {
    event.preventDefault();

    const templateParams = {
      date: format(selectedDate, "yyyy-MM-dd"), // Formaterar datumet till yyyy-MM-dd
      package: selectedPackage,
      price: price,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        "your_service_id",
        "your_template_id",
        templateParams,
        "your_public_key"
      )
      .then((response) => {
        console.log("Email sent!", response.status, response.text);
        alert("Bokningen har skickats!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Något gick fel, försök igen.");
      });
  };

  return (
    <div className="bokning-page">
      <h1>BOKNING</h1>

      {/* Kalender */}
      <div className="calendar">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()} // Gör det omöjligt att välja tidigare datum än idag
          maxDate={new Date().setFullYear(new Date().getFullYear() + 1)} // Val från nuvarande datum och ett år framåt
          dateFormat="yyyy-MM-dd" // Format på datumet
          inline
        />
      </div>

      {/* Bokningsformulär */}
      <form className="booking-form" onSubmit={sendEmail}>
        <label>Datum</label>
        <input type="text" value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ''} readOnly />

        <label>Välj paket</label>
        <select onChange={handlePackageChange}>
          <option value="">Välj paket</option>
          {Object.keys(packages).map((pkg) => (
            <option key={pkg} value={pkg}>{pkg}</option>
          ))}
        </select>

        <label>Pris</label>
        <input type="text" value={price} readOnly />

        <label>Förnamn</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />

        <label>Efternamn</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />

        <label>Meddelande (Optional)</label>
        <textarea name="message" value={formData.message} onChange={handleInputChange} rows="4"></textarea>

        <button type="submit">Boka</button>
      </form>
    </div>
  );
}

export default Bokning;
