import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./Bokning.css";

function Bokning() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialType = searchParams.get("typ") || "";
  const initialPackage = searchParams.get("paket") || "";
  const initialPrice = searchParams.get("pris") || "";

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedType, setSelectedType] = useState(initialType); // Fotograferingstyp
  const [selectedPackage, setSelectedPackage] = useState(initialPackage); // Paket
  const [price, setPrice] = useState(initialPrice); // Pris
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [bookedDates, setBookedDates] = useState([]); // Håller koll på bokade datum

  const photographyTypes = [
    "Bröllop", "Förlovning", "Familj", "Barn", "Modell", "Event"
  ];

  const packages = {
    "Standard": "10,000 SEK",
    "Premium": "15,000 SEK",
    "Exclusive": "20,000 SEK"
  };

  // Uppdatera valda värden om de skickas via URL
  useEffect(() => {
    if (initialType) setSelectedType(initialType);
    if (initialPackage) setSelectedPackage(initialPackage);
    if (initialPrice) setPrice(initialPrice);
  }, [initialType, initialPackage, initialPrice]);

  const handlePackageChange = (event) => {
    const selected = event.target.value;
    setSelectedPackage(selected);
    setPrice(packages[selected] || "");
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Skicka bokning till backend
  const handleBooking = async () => {
    if (!selectedDate) {
      alert("Välj ett datum innan du bokar.");
      return;
    }

    const bookingData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      photographyType: selectedType,
      selectedPackage,
      price,
      date: format(selectedDate, "yyyy-MM-dd"), // Använder direkt format
      message: formData.message
    };

    console.log("Skickar bokning:", bookingData);

    try {
      const response = await fetch("http://localhost:8000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Bokning genomförd!");
        setBookedDates([...bookedDates, format(selectedDate, "yyyy-MM-dd")]); // Lägg till datumet direkt
        setSelectedDate(null); // Rensa valt datum
        setFormData({ firstName: "", lastName: "", email: "", message: "" }); // Rensa formuläret
      } else {
        alert("Bokningen misslyckades: " + result.error);
      }
    } catch (error) {
      console.error("Fel vid bokning:", error);
      alert("Något gick fel. Försök igen.");
    }
  };

  // Inaktivera redan bokade datum
  const isDateBooked = (date) => {
    return bookedDates.includes(format(date, "yyyy-MM-dd"));
  };

  // Funktion för att visa tooltip och rödmarkera bokade datum
  const getDayClassName = (date) => {
    return isDateBooked(date) ? "booked-date" : undefined;
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
          dayClassName={getDayClassName} // Lägg till denna rad för att rödmarkera bokade datum
        />
      </div>

      {/* Bokningsformulär */}
      <form className="booking-form">
        <label>Datum</label>
        <input type="text" value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : 'Datum inte valt'} readOnly />

        <label>Välj fotograferingstyp</label>
        <select value={selectedType} onChange={handleTypeChange}>
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
