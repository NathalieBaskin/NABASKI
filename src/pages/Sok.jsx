import { useLocation } from "react-router-dom";
import "./Sok.css";

const images = [
  { name: "Bröllop", image: "/images/Brollop.jpg", alt: "Bröllop" },
  { name: "Förlovning", image: "/images/Forlovning.jpg", alt: "Förlovning" },
  { name: "Familj", image: "/images/Familj.jpg", alt: "Familj" },
  { name: "Barn", image: "/images/Barn.jpg", alt: "Barn" },
  { name: "Modell", image: "/images/Modell.jpg", alt: "Modell" },
  { name: "Event", image: "/images/Event.jpg", alt: "Event" },
];

function Sok() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const filteredImages = images.filter((img) =>
    img.alt.toLowerCase().includes(query)
  );

  console.log("Sökquery:", query);
  console.log("Filtrerade bilder:", filteredImages);

  return (
    <div className="sok-page">
      <h1>Sökresultat för {query}</h1>
      <div className="image-grid">
        {filteredImages.length > 0 ? (
          filteredImages.map((img, index) => (
            <div key={index} className="image-item">
              <img src={img.image} alt={img.alt} /> {/* 🚀 Ta bort process.env.PUBLIC_URL */}
              <p>{img.alt}</p>
            </div>
          ))
        ) : (
          <p>Inga resultat hittades.</p>
        )}
      </div>
    </div>
  );
}

export default Sok;
