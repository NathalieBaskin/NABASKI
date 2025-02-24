import "./Barn.css";  // Se till att CSS-filen också har stor bokstav

const imagePaths = [
    "/images/1.jpg", "/images/barn.jpg", "/images/30.jpg",
    "/images/97.jpg", "/images/2021-02-11-17.56.19-1-1.jpg",
    "/images/Bella-12.jpg", "/images/df.jpg", "/images/dhdfgh.jpg", "/images/IMG_0148.jpg", "/images/img_2336-3.jpg",
    "/images/img_2346.jpg", "/images/img_2426.jpg", "/images/img_2433.JPEG",
    "/images/IMG_3739klar.jpg", "/images/IMG_3743klar1.jpg",
    "/images/IMG_7614.JPG", "/images/jhkl.jpg", "/images/in.jpg",
    "/images/Photo-2022-05-07-13-57-42.jpg", "/images/Photo-2022-05-07-13-59-55.jpg",
    "/images/Yolina-6.jpg", "/images/Yolina-20.jpg"
  ];
  
  

function Barn() {
  return (
    <div className="barn-page">
      <h1 className="barn-title">BARN</h1>

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
          <img key={index} src={src} alt="barn" />
        ))}
      </div>
    </div>
  );
}

export default Barn;
