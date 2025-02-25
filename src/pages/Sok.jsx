import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Sok() {
  const location = useLocation();
  const navigate = useNavigate();

  const [images, setImages] = useState([]); // Håller dynamiskt laddade bilder
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q")?.toLowerCase() || "";

  // Hämta bilder dynamiskt från vårt API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Uppdatera här till rätt API-url
        const response = await fetch(`http://localhost:8000/api/searchImages?q=${query}`); // Rätt endpoint
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtning av bilder.");
        }
        const data = await response.json();
        setImages(data); // Sätter bilder från API
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query]);

  // Filtrera bilder baserat på sökningen med "name"
  const filteredImages = images.filter((img) =>
    img.name.toLowerCase().includes(query)
  );

  return (
    <div className="sok-page">
      <h1 className='soktitel'>Sökresultat för {query}</h1>

      {loading && <p>Laddar bilder...</p>}
      {error && <p style={{ color: "red" }}>Fel: {error}</p>}

      {!loading && !error && (
        <div className="image-grid">
          {filteredImages.length > 0 ? (
            filteredImages.map((img, index) => (
              <div key={index} className="image-item">
                <img 
                  src={`http://localhost:8000${img.image_url}`} // Använd korrekt URL för att visa bilder
                  alt={img.name}
                  onClick={() => navigate("/brollop")}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))
          ) : (
            <p>Inga resultat hittades.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Sok;
