import { useState, useEffect } from "react";
import "./Event.css"; 
import ImageModal from "../components/ImageModal";

function Event() {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

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

     <div className="image-grid">
                  {images.length > 0 ? (
                    images.map((img, index) => (
                      <img 
                        key={index} 
                        src={`http://localhost:8000${img.image_url}`} 
                        alt="
                        Event" 
                        onClick={() => setSelectedIndex(index)} // 🔹 Nu kan man klicka på bilden
                      />
                    ))
                  ) : (
                    <p>Inga bilder tillgängliga för denna kategori.</p>
                  )}
                </div>
          
                {/* 🔹 Flytta `ImageModal` inuti `return` */}
                <ImageModal images={images} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
              </div>
            );
          }
          
          export default Event;
          