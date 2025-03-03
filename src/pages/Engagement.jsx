import { useState, useEffect } from "react";
import "./Engagement.css"; 
import ImageModal from "../components/ImageModal";

function Engagement() {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

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

      <div className="button-links">
        <a href="/portfolio" className="btn">PORTFOLIO</a>
        <a href="/priser?category=forlovning" className="btn">PRISER</a>
  
    
      </div>

      <div className="image-grid">
             {images.length > 0 ? (
               images.map((img, index) => (
                 <img 
                   key={index} 
                   src={`http://localhost:8000${img.image_url}`} 
                   alt="Förlovning" 
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
     
     export default Engagement;
     