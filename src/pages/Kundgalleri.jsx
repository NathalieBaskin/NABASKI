import { useState, useEffect } from "react";
import "./Kundgalleri.css";

function KundGalleri() {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [showGallery, setShowGallery] = useState(false);
  const [error, setError] = useState("");

  const fetchGalleries = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/galleries");
      const data = await res.json();
      setGalleries(data.galleries || []);
    } catch (error) {
      console.error("Fel vid hämtning av gallerier:", error);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  const handleGalleryClick = async (gallery) => {
    setSelectedGallery(gallery);
    setPasswordInput("");
    setShowGallery(false);
    setError("");
  };

  const handlePasswordSubmit = async () => {
    if (passwordInput === selectedGallery.password) {
      setShowGallery(true);
    } else {
      setError("Fel lösenord!");
    }
  };

  return (
    <div>
      <h1>Kundgalleri</h1>
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

      {selectedGallery && !showGallery && (
        <div className="password-modal">
          <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
          <button onClick={handlePasswordSubmit}>Se galleri</button>
          {error && <p className="error">{error}</p>}
        </div>
      )}

      {showGallery && selectedGallery && (
        <div className="image-gallery">
          {selectedGallery.images.filter(img => img !== selectedGallery.representativeImage).map((image, index) => (
            <img key={index} src={`http://localhost:5000${image}`} alt={`Bild ${index + 1}`} width="200" />
          ))}
        </div>
      )}
    </div>
  );
}

export default KundGalleri;
