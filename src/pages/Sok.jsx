import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Sok.css";
import ImageModal from "../components/ImageModal"; // <-- Här importeras ImageModal

function Sok() {
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q")?.toLowerCase() || "";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/searchImages?q=${query}`);
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtning av bilder.");
        }
        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query]);

  return (
    <div className="sok-page">
      <h1 className='soktitel'>Sökresultat för {query}</h1>

      {loading && <p>Laddar bilder...</p>}
      {error && <p style={{ color: "red" }}>Fel: {error}</p>}

      {!loading && !error && (
        <div className="image-grid">
          {images.length > 0 ? (
            images.map((img, index) => (
              <div key={index} className="image-item" onClick={() => setSelectedIndex(index)}>
                <img src={`http://localhost:8000${img.image_url}`} alt={img.name} />
              </div>
            ))
          ) : (
            <p>Inga resultat hittades.</p>
          )}
        </div>
      )}

      {/* Här används nu ImageModal */}
      <ImageModal
        images={images}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </div>
  );
}

export default Sok;
