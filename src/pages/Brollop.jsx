import "./Brollop.css";

const imagePaths = [
  "/images/wedding1.jpg", "/images/wedding2.jpg", "/images/wedding3.jpg",
  "/images/wedding4.jpg", "/images/wedding5.jpg", "/images/wedding6.jpg",
  "/images/wedding7.jpg",  "/images/wedding9.jpg",
  "/images/wedding10.jpg", "/images/wedding11.jpg", "/images/wedding12.jpg",
  "/images/wedding14.jpg"
];

function Brollop() {
  return (
    <div className="brollop-page">
      {/* ✅ Videon ligger i en egen container för full bredd */}

      <h1 className="brollop-title">BRÖLLOP</h1>

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
          <img key={index} src={src} alt="bröllop" />
        ))}
      </div>
    </div>
  );
}

export default Brollop;
