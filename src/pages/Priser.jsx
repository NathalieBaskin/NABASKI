import { Link } from "react-router-dom";
import "./Priser.css";

function Priser() {
  const packages = [
    {
      name: "Stora paketet",
      description: "Förberedelser, vigsel, porträtt, gästfotografering, mingel, middag och fest, upp till 10 timmar. Vad ingår? Upp till 500st redigerade bilder levererade via wetransfer och USB, kortare video, lösenordsskyddat galleri att dela med nära och kära, 10st utskrivna bilder (10x13) och 1st inramad förstoring (40x60)",
      price: "18 000 SEK",
      photographyType: "Bröllop"
    },
    {
      name: "Mellan paketet",
      description: "Förberedelser, vigsel, porträtt och gästfotografering, upp till 5 timmar. Vad ingår? Upp till 100st redigerade bilder levererade via wetransfer och ett lösenordsskyddat galleri att dela med nära och kära",
      price: "12 000 SEK",
      photographyType: "Bröllop"
    },
    {
      name: "Lilla paketet",
      description: "Vigsel & porträtt, upp till 2 timmar. Vad ingår? Upp till 50st redigerade bilder levererade via wetransfer och ett lösenordsskyddat galleri att dela med nära och kära",
      price: "5000 SEK",
      photographyType: "Bröllop"
    }
  ];

  return (
    <div className="priser-page">
      <h1>PRISER</h1>
      <h2>Bröllop</h2>

      <div className="package-container">
        {packages.map((pkg, index) => (
          <div key={index} className="package">
    
            <h3>{pkg.name}</h3>
            <p>{pkg.description}</p>
            <p><strong>Pris: {pkg.price}</strong></p>
            <Link to={`/bokning?typ=${encodeURIComponent(pkg.photographyType)}&paket=${encodeURIComponent(pkg.name)}&pris=${encodeURIComponent(pkg.price)}`} className="bokning-btn">
              Bokning
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Priser;
