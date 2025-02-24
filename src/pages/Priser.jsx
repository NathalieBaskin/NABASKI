import { Link, useLocation } from "react-router-dom";
import "./Priser.css";

function Priser() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category") || "brollop"; // Default till bröllop

  const packages = {
    brollop: [
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
    ],
    forlovning: [
      {
        name: "Lyx",
        description: "Upp till 3 timmar. Vad ingår? Upp till 75st redigerade bilder levererade via wetransfer och ett lösenordsskyddat galleri att dela med nära och kära, 5st utskrivna bilder (10x13) och 1st inramad förstoring (30x40)",
        price: "8 000 SEK",
        photographyType: "Förlovning"
      },
      {
        name: "Standard",
        description: "Upp till 2 timmar. Vad ingår? Upp till 50st redigerade bilder levererade via wetransfer och ett lösenordsskyddat galleri att dela med nära och kära",
        price: "6 000 SEK",
        photographyType: "Förlovning"
      },
      {
        name: "Enkel",
        description: "Upp till 1 timme. Vad ingår? Upp till 25st redigerade bilder levererade via wetransfer och ett lösenordsskyddat galleri att dela med nära och kära",
        price: "4 000 SEK",
        photographyType: "Förlovning"
      }
    ]
  };

  const selectedPackages = packages[category] || packages.brollop; // Välj rätt paket baserat på kategori
  const categoryName = category === "forlovning" ? "Förlovning" : "Bröllop";

  return (
    <div className="priser-page">
      <h1>PRISER</h1>
      <h2>{categoryName}</h2>

      <div className="package-container">
        {selectedPackages.map((pkg, index) => (
          <div key={index} className="package">
            <h3>{pkg.name}</h3>
            <p>{pkg.description}</p>
            <p><strong>Pris: {pkg.price}</strong></p>
            <Link
              to={`/bokning?typ=${encodeURIComponent(pkg.photographyType)}&paket=${encodeURIComponent(pkg.name)}&pris=${encodeURIComponent(pkg.price)}&category=${encodeURIComponent(category)}`}
              className="bokning-btn"
            >
              Bokning
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Priser;
