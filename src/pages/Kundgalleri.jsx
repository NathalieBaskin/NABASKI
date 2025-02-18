import { useState, useEffect } from 'react';

function Kundgalleri() {
  const [galleries, setGalleries] = useState([]);

  // Hämta alla gallerier när sidan laddas
  useEffect(() => {
    fetch("http://localhost:5000/api/galleries")
      .then(response => response.json())
      .then(data => setGalleries(data.galleries))
      .catch(error => console.error('Error fetching galleries:', error));
  }, []);

  return (
    <div className="kundgalleri-page">
      <h1>Kundgalleri</h1>
      <div className="galleri-grid">
        {galleries.length === 0 ? (
          <p>Inga gallerier tillgängliga</p>
        ) : (
          galleries.map((gallery, index) => (
            <div key={index} className="galleri-item">
              <h3>{gallery.name}</h3>
              <div className="image-grid">
                {gallery.images.map((image, idx) => (
                  <img key={idx} src={image} alt={`Gallery Image ${idx + 1}`} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Kundgalleri;
