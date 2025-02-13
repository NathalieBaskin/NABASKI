import  { useState } from "react";
import DatePicker from "react-datepicker"; 
import { format } from "date-fns"; 
import "react-datepicker/dist/react-datepicker.css"; 
import "./Bokning.css";

function Bokning() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedType, setSelectedType] = useState(""); // För att hålla koll på valt fotograferingstyp
  const [selectedPackage, setSelectedPackage] = useState(""); // För att hålla koll på valt paket
  const [price, setPrice] = useState(""); // För att hålla koll på priset
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  
  const [bookedDate, setBookedDate] = useState(null); // Håller koll på bokade datum

  const photographyTypes = [
    "Bröllop", "Förlovning", "Familj", "Barn", "Modell", "Event"
  ];

  const packages = {
    "Standard": "10,000 SEK",
    "Premium": "15,000 SEK",
    "Exclusive": "20,000 SEK"
  };

  const handlePackageChange = (event) => {
    const selected = event.target.value;
    setSelectedPackage(selected);
    // Dynamiskt uppdatera pris baserat på paket
    if (selected === "Standard") {
      setPrice("10,000 SEK");
    } else if (selected === "Premium") {
      setPrice("15,000 SEK");
    } else if (selected === "Exclusive") {
      setPrice("20,000 SEK");
    } else {
      setPrice("");
    }
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBooking = () => {
    setBookedDate(selectedDate); // Spara bokade datumet
    setSelectedDate(null); // Rensa det valda datumet så det inte kan bokas
  };

  // Inaktivera det bokade datumet i kalendern
  const isDateBooked = (date) => {
    return bookedDate && format(date, "yyyy-MM-dd") === format(bookedDate, "yyyy-MM-dd");
  };

  return (
    <div className="bokning-page">
      <h1>BOKNING</h1>

      {/* Kalender */}
      <div className="calendar">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          maxDate={new Date().setFullYear(new Date().getFullYear() + 1)}
          dateFormat="yyyy-MM-dd"
          inline
          dayClassName={(date) => isDateBooked(date) ? "booked-date" : undefined}
        />
      </div>

      {/* Bokningsformulär */}
      <form className="booking-form">
        <label>Datum</label>
        <input type="text" value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : 'Datum inte valt'} readOnly />

        <label>Välj fotograferingstyp</label>
        <select value={selectedType} onChange={handleTypeChange}> {/* Värdet sätts här */}
          <option value="">Välj typ av fotografering</option>
          {photographyTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <label>Välj paket</label>
        <select value={selectedPackage} onChange={handlePackageChange}>
          <option value="">Välj paket</option>
          {Object.keys(packages).map((pkg) => (
            <option key={pkg} value={pkg}>{pkg}</option>
          ))}
        </select>

        <label>Pris</label>
        <input type="text" value={price} readOnly />

        <label>Förnamn</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />

        <label>Efternamn</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />

        <label>Meddelande (Optional)</label>
        <textarea name="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows="4"></textarea>

        <button type="button" onClick={handleBooking}>Boka</button>
      </form>
    </div>
  );
}

export default Bokning;
