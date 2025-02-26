import { useState, useEffect } from "react";
import "./Barn.css"; // Se till att CSS-filen också har stor bokstav

function Barn() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/portfolio/barn");
        const data = await response.json();
        setImages(data);
      } catch (err) {
        console.error("Fel vid hämtning av bilder:", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="barn-page">
      <h1 className="barn-title">BARN</h1>

      {/* Knapp-länkar */}
      <div className="button-links">
        <a href="/portfolio" className="btn">PORTFOLIO</a>
        <a href="/priser?category=barn" className="btn">PRISER</a>
        <a href="/bokning?category=barn" className="btn">BOKNING</a>
        <a href="/kundgalleri" className="btn">KUNDGALLERI</a>
      </div>

      {/* Bildgalleri */}
      <div className="image-grid">
        {images.length > 0 ? (
          images.map((img, index) => (
            <img key={index} src={`http://localhost:8000${img.image_url}`} alt="Barn" />
          ))
        ) : (
          <p>Inga bilder tillgängliga för denna kategori.</p>
        )}
      </div>
    </div>
  );
}

export default Barn;
