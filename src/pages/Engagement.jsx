import "./Engagement.css";  // Se till att CSS-filen också har stor bokstav

const imagePaths = [
  "/images/eng1.jpeg", "/images/eng2.JPG", "/images/eng3.JPEG",
  "/images/eng4.JPG", "/images/eng5.jpeg", "/images/eng6.jpg",
  "/images/eng7.jpg", "/images/eng9.jpg",
  "/images/eng10.jpg"
];

function Engagement() {
  return (
    <div className="forlovning-page">
      <h1 className="forlovning-title">FÖRLOVNING</h1>

      {/* Knapp-länkar */}
      <div className="button-links">
        <a href="/portfolio" className="btn">PORTFOLIO</a>
        <a href="/priser" className="btn">PRISER</a>
        <a href="/bokning" className="btn">BOKNING</a>
        <a href="/kundgalleri" className="btn">KUNDGALLERI</a>
      </div>

      {/* Bildgalleri */}
      <div className="image-grid">
        {imagePaths.map((src, index) => (
          <img key={index} src={src} alt="förlovning" />
        ))}
      </div>
    </div>
  );
}

export default Engagement;
