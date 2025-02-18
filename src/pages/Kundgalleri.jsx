import { useState, useEffect } from "react";
import "./Kundgalleri.css";

function Kundgalleri() {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  useEffect(() => {
    // Hämta gallerier från backend
    fetch("http://localhost:5000/api/galleries")
      .then((response) => response.json())
      .then((data) => setGalleries(data.galleries))
      .catch((error) => console.error("Error fetching galleries:", error));
  }, []);

  const openGallery = (gallery) => {
    setSelectedGallery(gallery);  // Sätt det valda galleriet
    setPassword("");  // Nollställ lösenordet
    setError("");  // Nollställ felmeddelanden
    setIsPasswordCorrect(false);  // Se till att lösenordet inte är korrekt i början
  };

  const handlePasswordSubmit = () => {
    if (password === selectedGallery.password) {
      setIsPasswordCorrect(true); // Om lösenordet är korrekt, visa galleriet
    } else {
      setError("Fel lösenord, försök igen!");  // Om lösenordet är fel, visa felmeddelande
    }
  };

  const closeGallery = () => {
    setSelectedGallery(null);  // Stäng popup
  };

  return (
    <div className="kundgalleri-page">
      <h1>Kundgalleri</h1>
      <div className="galleri-grid">
        {galleries.map((gallery, index) => (
          <div key={index} className="galleri-item">
            {/* Visa den representativa bilden */}
            <img
              src={gallery.representativeImage}
              alt={gallery.name}
              onClick={() => openGallery(gallery)} // Öppna galleri vid klick
            />
            <p>{gallery.name}</p>
          </div>
        ))}
      </div>

      {/* Visa popup om ett galleri är valt */}
      {selectedGallery && !isPasswordCorrect && (
        <div className="gallery-popup">
          <div className="popup-content">
            <h2>{selectedGallery.name}</h2>
            <p>Detta galleri är lösenordsskyddat.</p>
            <input
              type="password"
              placeholder="Ange lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <div className="popup-buttons">
              <button onClick={handlePasswordSubmit}>Ange lösenord</button>
              <button onClick={closeGallery}>Avbryt</button>
            </div>
          </div>
        </div>
      )}

      {/* Visa bilder om lösenordet är korrekt */}
      {selectedGallery && isPasswordCorrect && (
        <div className="gallery-images">
          <div className="image-grid">
            {selectedGallery.images.map((image, index) => (
              <img key={index} src={image} alt={`Galleri bild ${index + 1}`} />
            ))}
          </div>
          <button onClick={closeGallery}>Stäng</button>
        </div>
      )}
    </div>
  );
}

export default Kundgalleri;
