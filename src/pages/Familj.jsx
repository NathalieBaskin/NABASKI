import "./Familj.css";  // Se till att CSS-filen också har stor bokstav

const imagePaths = [
    "/images/_uaE4xfK.jpeg", "/images/2.jpg", "/images/3.jpg",
    "/images/4.jpg", "/images/5.jpg", "/images/6q4AmPm6.jpeg",
    "/images/7.jpg", "/images/8.jpg",
    "/images/10.jpg", "/images/11.jpg", "/images/14.jpg",
    "/images/38.1.jpg", "/images/42.jpg", "/images/46.jpg",
    "/images/65.jpg", "/images/71.jpg", "/images/79.jpg",
    "/images/96.jpg", "/images/Bella-6.jpg", "/images/Bella-15.jpg",
    "/images/f.jpg", "/images/Familj-1.jpg", "/images/Familj-5.jpg",
    "/images/Familj-6.jpg", "/images/Familj-16.jpg", "/images/fs.jpg",
    "/images/gm.jpg", "/images/img_2440.jpg", "/images/IMG_4870.JPG",
    "/images/IMG_7600.JPG"
  ];
  

function Familj() {
  return (
    <div className="familj-page">
      <h1 className="familj-title">FAMILJ</h1>

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
          <img key={index} src={src} alt="familj" />
        ))}
      </div>
    </div>
  );
}

export default Familj;
