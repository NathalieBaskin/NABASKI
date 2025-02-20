import { useState, useEffect } from "react";
import "./Kundgalleri.css";

function KundGalleri() {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [showGallery, setShowGallery] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/galleries");
      const data = await res.json();
      setGalleries(data.galleries || []);
    } catch (err) {
      console.error("Fel vid hämtning av gallerier:", err);
    }
  };

  const handleGalleryClick = (gallery) => {
    setSelectedGallery(gallery);
    setPasswordInput("");
    setShowGallery(false);
    setError("");
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === selectedGallery.password) {
      setShowGallery(true);
    } else {
      setError("Fel lösenord!");
    }
  };

  return (
    <div>
      {!showGallery && <h1>Kundgalleri</h1>} {/* FIX: Rubriken visas endast på översiktssidan */}

      {!showGallery ? (
        <div className="gallery-container">
          {galleries.map((gallery) => (
            <div key={gallery.id} className="gallery-card">
              <h2>{gallery.name}</h2>
              <img
                src={`http://localhost:5000${gallery.representativeImage}`}
                alt="Galleri bild"
                width="200"
                className="clickable-image"
                onClick={() => handleGalleryClick(gallery)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="image-gallery">
          <h2>{selectedGallery.name}</h2>
          <div className="image-grid">
            {selectedGallery.images
              .filter(img => img !== selectedGallery.representativeImage)
              .map((image, index) => (
                <img key={index} src={`http://localhost:5000${image}`} alt={`Bild ${index + 1}`} width="200" />
              ))
            }
          </div>
          <button onClick={() => setShowGallery(false)}>Tillbaka</button>
        </div>
      )}

      {selectedGallery && !showGallery && (
        <div className="modal-overlay">
          <div className="password-modal">
            <h2>{selectedGallery.name}</h2>
            <p>Detta galleri är lösenordsskyddat</p>
            <input 
              type="password" 
              value={passwordInput} 
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Ange lösenord"
            />
            <button onClick={handlePasswordSubmit}>Se galleri</button>
            <button onClick={() => setSelectedGallery(null)}>Avbryt</button>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default KundGalleri;
