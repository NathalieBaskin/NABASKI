import { useState, useEffect } from "react";
import "./Modell.css"; 
import ImageModal from "../components/ImageModal";

function Modell() {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/portfolio/modell");
        const data = await response.json();
        setImages(data);
      } catch (err) {
        console.error("Fel vid hämtning av bilder:", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="modell-page">
      <h1 className="modell-title">MODELL</h1>

      <div className="button-links">
        <a href="/portfolio" className="btn">PORTFOLIO</a>
        <a href="/priser?category=modell" className="btn">PRISER</a>

      </div>

     <div className="image-grid">
                  {images.length > 0 ? (
                    images.map((img, index) => (
                      <img 
                        key={index} 
                        src={`http://localhost:8000${img.image_url}`} 
                        alt="Modell" 
                        onClick={() => setSelectedIndex(index)} 
                      />
                    ))
                  ) : (
                    <p>Inga bilder tillgängliga för denna kategori.</p>
                  )}
                </div>
          
               
                <ImageModal images={images} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
              </div>
            );
          }
          
          export default Modell;
          