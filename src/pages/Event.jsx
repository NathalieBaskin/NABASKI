import { useState, useEffect } from "react";
import "./Event.css"; // Se till att CSS-filen också har stor bokstav

function Event() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/portfolio/event");
        const data = await response.json();
        setImages(data);
      } catch (err) {
        console.error("Fel vid hämtning av förlovningsbilder:", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="event-page">
      <h1 className="event-title">EVENT</h1>

      {/* Knapp-länkar */}
      <div className="button-links">
        <a href="/portfolio" className="btn">PORTFOLIO</a>
        <a href="/priser?category=event" className="btn">PRISER</a>
        <a href="/bokning?category=event" className="btn">BOKNING</a>
        <a href="/kundgalleri" className="btn">KUNDGALLERI</a>
      </div>

      {/* Bildgalleri */}
      <div className="image-grid">
        {images.length > 0 ? (
          images.map((img, index) => (
            <img key={index} src={`http://localhost:8000${img.image_url}`} alt="Event" />
          ))
        ) : (
          <p>Inga bilder tillgängliga för denna kategori.</p>
        )}
      </div>
    </div>
  );
}

export default Event;
//TODO: Fyll på med bilder