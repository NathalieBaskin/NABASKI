import { useState, useEffect } from "react";
import "./Brollop.css";

function Brollop() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/portfolio/brollop");
        const data = await response.json();
        setImages(data);
      } catch (err) {
        console.error("Fel vid hämtning av bröllopsbilder:", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="brollop-page">
      <h1 className="brollop-title">BRÖLLOP</h1>

      <div className="button-links">
        <a href="/portfolio" className="btn">PORTFOLIO</a>
        <a href="/priser" className="btn">PRISER</a>
        <a href="/bokning" className="btn">BOKNING</a>
        <a href="/kundgalleri" className="btn">KUNDGALLERI</a>
      </div>

      <div className="image-grid">
        {images.length > 0 ? (
          images.map((img, index) => (
            <img key={index} src={`http://localhost:8000${img.image_url}`} alt="Bröllop" />
          ))
        ) : (
          <p>Inga bilder tillgängliga för denna kategori.</p>
        )}
      </div>
    </div>
  );
}

export default Brollop;
