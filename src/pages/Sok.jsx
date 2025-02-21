import { useLocation, useNavigate } from 'react-router-dom'; // Lägg till useNavigate för navigation

const images = [
  { name: "Bröllop", image: "/images/Brollop.jpg", alt: "Bröllop" },
  { name: "Bröllop", image: "/images/wedding2.jpg", alt: "Bröllop" },
  { name: "Bröllop", image: "/images/wedding3.jpg", alt: "Bröllop" },
  { name: "Bröllop", image: "/images/wedding4.jpg", alt: "Bröllop" },
  { name: "Bröllop", image: "/images/wedding5.jpg", alt: "Bröllop" },
  { name: "Bröllop", image: "/images/wedding6.jpg", alt: "Bröllop" },
  { name: "Bröllop", image: "/images/wedding7.jpg", alt: "Bröllop" },
  { name: "Bröllop", image: "/images/wedding8.jpg", alt: "Bröllop" },
  { name: "Bröllop", image: "/images/wedding9.jpg", alt: "Bröllop" },
  { name: "Bröllop", image: "/images/wedding10.jpg", alt: "Bröllop" },
  { name: "Bröllop", image: "/images/wedding11.jpg", alt: "Bröllop" },
  { name: "Bröllop", image: "/images/wedding12.jpg", alt: "Bröllop" },  
  { name: "Bröllop", image: "/images/wedding13.jpg", alt: "Bröllop" },
  { name: "Bröllop", image: "/images/wedding14.jpg", alt: "Bröllop" },
  { name: "Förlovning", image: "/images/Forlovning.jpg", alt: "Förlovning" },
  { name: "Familj", image: "/images/Familj.jpg", alt: "Familj" },
  { name: "Barn", image: "/images/Barn.jpg", alt: "Barn" },
  { name: "Modell", image: "/images/Modell.jpg", alt: "Modell" },
  { name: "Event", image: "/images/Event.jpg", alt: "Event" }
];

function Sok() {
  const location = useLocation();  
  const navigate = useNavigate(); // Används för att navigera vid klick

  const searchParams = new URLSearchParams(location.search);  
  const query = searchParams.get("q")?.toLowerCase() || "";  

  // Filtrerar bilder baserat på queryn (alt-texter)
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
              <img 
                src={img.image} 
                alt={img.alt} 
                onClick={() => navigate("/brollop")} // Navigera till /brollop vid klick
                style={{ cursor: "pointer" }} // Gör muspekaren till en klickbar hand
              />
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
