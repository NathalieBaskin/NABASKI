import { useState } from "react";
import "./Kundgalleri.css";

const galleries = [
  { name: "Jonas och Felicia", image: "/images/gallery1.jpg", password: "jonasfelicia" },
  { name: "Ebba", image: "/images/gallery2.jpg", password: "ebba123" },
  { name: "Johan och Steffi", image: "/images/gallery3.jpg", password: "johansteffi" },
  { name: "Saga", image: "/images/gallery4.jpg", password: "saga456" },
  { name: "Emma och Sofie", image: "/images/gallery5.jpg", password: "emmaofie" },
  { name: "Erik", image: "/images/gallery6.jpg", password: "erikpass" },
];

function Kundgalleri() {
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Funktion för att öppna popup
  const openGallery = (gallery) => {
    setSelectedGallery(gallery);
    setPassword("");
    setError("");
  };

  // Funktion för att verifiera lösenord
  const checkPassword = () => {
    if (password === selectedGallery.password) {
      alert(`Lösenordet är korrekt! Nu kan du se galleriet för ${selectedGallery.name}`);
      setSelectedGallery(null); // Stänger popup
    } else {
      setError("Fel lösenord, försök igen!");
    }
  };

  return (
    <div className="kundgalleri-page">
      <h1>Kundgalleri</h1>
      <div className="galleri-grid">
        {galleries.map((gallery, index) => (
          <div key={index} className="galleri-item" onClick={() => openGallery(gallery)}>
            <img src={gallery.image} alt={gallery.name} />
            <p>{gallery.name}</p>
          </div>
        ))}
      </div>

      {/* Popup för lösenord */}
      {selectedGallery && (
        <div className="popup">
          <div className="popup-content">
            <h2>{selectedGallery.name}</h2>
            <p>Detta galleri är lösenordsskyddat</p>
            <input
              type="password"
              placeholder="Ange lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <div className="popup-buttons">
              <button onClick={checkPassword}>Ange lösenord</button>
              <button onClick={() => setSelectedGallery(null)}>Avbryt</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Kundgalleri;
