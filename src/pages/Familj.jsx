import { useState, useEffect } from "react";
import "./Familj.css"; // Se till att CSS-filen också har stor bokstav

function Familj() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/portfolio/familj");
        const data = await response.json();
        setImages(data);
      } catch (err) {
        console.error("Fel vid hämtning av bilder:", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="familj-page">
      <h1 className="familj-title">FAMILJ</h1>

      {/* Knapp-länkar */}
      <div className="button-links">
        <a href="/portfolio" className="btn">PORTFOLIO</a>
        <a href="/priser?category=familj" className="btn">PRISER</a>
        <a href="/bokning?category=familj" className="btn">BOKNING</a>
        <a href="/kundgalleri" className="btn">KUNDGALLERI</a>
      </div>

      {/* Bildgalleri */}
      <div className="image-grid">
        {images.length > 0 ? (
          images.map((img, index) => (
            <img key={index} src={`http://localhost:8000${img.image_url}`} alt="Familj" />
          ))
        ) : (
          <p>Inga bilder tillgängliga för denna kategori.</p>
        )}
      </div>
    </div>
  );
}

export default Familj;
