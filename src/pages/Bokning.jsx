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
  const initialCategory = searchParams.get("category") || "brollop"; 

  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [bookedDates, setBookedDates] = useState([]); 

  
  const [selectedType] = useState(initialType); 
  const [selectedPackage] = useState(initialPackage); 
  const [price] = useState(initialPrice); 
  const [selectedCategory] = useState(initialCategory); 


  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/bookings");
        const data = await response.json();
        
        const dates = data.map(booking => booking.date);
        setBookedDates(dates);
      } catch (error) {
        console.error("Fel vid hämtning av bokade datum:", error);
      }
    };

    fetchBookedDates();
  }, []); 

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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
      date: format(selectedDate, "yyyy-MM-dd"),
      message: formData.message,
      category: selectedCategory 
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
        setBookedDates([...bookedDates, format(selectedDate, "yyyy-MM-dd")]); 
        setSelectedDate(null); 
        setFormData({ firstName: "", lastName: "", email: "", message: "" }); 
      } else {
        alert("Bokningen misslyckades: " + result.error);
      }
    } catch (error) {
      console.error("Fel vid bokning:", error);
      alert("Något gick fel. Försök igen.");
    }
  };


  const isDateBooked = (date) => {
    return bookedDates.includes(format(date, "yyyy-MM-dd"));
  };

  return (
    <div className="bokning-page">
      <h1>BOKNING</h1>

 
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

     
      <form className="booking-form">
        <label>Datum</label>
        <input type="text" value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : 'Datum inte valt'} readOnly />

        <label>Välj fotograferingstyp</label>
        <input type="text" value={selectedType} readOnly />

        <label>Välj paket</label>
        <input type="text" value={selectedPackage} readOnly />

        <label>Pris</label>
        <input type="text" value={price} readOnly />

        <label>Kategori</label>
        <input type="text" value={selectedCategory} readOnly />

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
