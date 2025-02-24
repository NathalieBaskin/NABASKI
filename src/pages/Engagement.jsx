import { useState, useEffect } from "react";
import "./Engagement.css"; // Se till att CSS-filen också har stor bokstav

function Engagement() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/portfolio/forlovning");
        const data = await response.json();
        setImages(data);
      } catch (err) {
        console.error("Fel vid hämtning av förlovningsbilder:", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="forlovning-page">
      <h1 className="forlovning-title">FÖRLOVNING</h1>

      {/* Knapp-länkar */}
      <div className="button-links">
        <a href="/portfolio" className="btn">PORTFOLIO</a>
        <a href="/priser?category=forlovning" className="btn">PRISER</a>
        <a href="/bokning?category=forlovning" className="btn">BOKNING</a>
        <a href="/kundgalleri" className="btn">KUNDGALLERI</a>
      </div>

      {/* Bildgalleri */}
      <div className="image-grid">
        {images.length > 0 ? (
          images.map((img, index) => (
            <img key={index} src={`http://localhost:8000${img.image_url}`} alt="Förlovning" />
          ))
        ) : (
          <p>Inga bilder tillgängliga för denna kategori.</p>
        )}
      </div>
    </div>
  );
}

export default Engagement;
