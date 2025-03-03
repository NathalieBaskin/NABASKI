import { Link, useLocation } from "react-router-dom";
import "./Priser.css";

function Priser() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category") || "brollop"; 

  const packages = {
    brollop: [
      {
        name: "Small",
        description: "Förberedelser, vigsel, porträtt, gästfotografering, mingel, middag och fest, upp till 10 timmar. Vad ingår? Upp till 500st redigerade bilder levererade via wetransfer och USB, kortare video, lösenordsskyddat galleri att dela med nära och kära, 10st utskrivna bilder (10x13) och 1st inramad förstoring (40x60)",
        price: "18 000 SEK",
        photographyType: "Bröllop"
      },
      {
        name: "Medium",
        description: "Förberedelser, vigsel, porträtt och gästfotografering, upp till 5 timmar. Vad ingår? Upp till 100st redigerade bilder levererade via wetransfer och ett lösenordsskyddat galleri att dela med nära och kära",
        price: "12 000 SEK",
        photographyType: "Bröllop"
      },
      {
        name: "Large",
        description: "Vigsel & porträtt, upp till 2 timmar. Vad ingår? Upp till 50st redigerade bilder levererade via wetransfer och ett lösenordsskyddat galleri att dela med nära och kära",
        price: "5000 SEK",
        photographyType: "Bröllop"
      }
    ],
    forlovning: [
      {
        name: "Small",
        description: "Upp till 2 timmar med 1-2 fotoplatser i näravstånd.",
        price: "2 000 SEK",
        photographyType: "Förlovning"
      },
      {
        name: "Medium",
        description: "Upp till 4 timmar med 2-4 fotoplatser i näravstånd.",
        price: "3 500 SEK",
        photographyType: "Förlovning"
      }
    ],
    familj: [
      {
        name: "Small",
        description: "Upp till 2 timmar. Passar för familj på 2-4 personer/gravidfoto med 1-2 fotoplatser i näravstånd.",
        price: "3 000 SEK",
        photographyType: "Familj"
      },
      {
        name: "Medium",
        description: "Upp till 4 timmar. Passar för familj på 4-6 med 2-4 fotoplatser i näravstånd.",
        price: "4 500 SEK",
        photographyType: "Familj"
      }
    ],
    barn: [
      {
        name: "barn",
        description: "Upp till 3 timmar. Vad ingår? Upp till 75st redigerade bilder levererade via wetransfer och ett lösenordsskyddat galleri att dela med nära och kära, 5st utskrivna bilder (10x13) och 1st inramad förstoring (30x40)",
        price: "8 000 SEK",
        photographyType: "Barn"
      },
      {
        name: "1 barn",
        description: "1 timme.",
        price: "1500 SEK",
        photographyType: "Barn"
      },
      {
        name: "2 barn",
        description: "Upp till 2 timmar.",
        price: "2500 SEK",
        photographyType: "Barn"
      },
      {
        name: "3 barn",
        description: "Upp till 3 timmar.",
        price: "4000 SEK",
        photographyType: "Barn"
      }
    ],
    modell: [
      {
        name: "1 person",
        description: "2 timmar",
        price: "2000 SEK",
        photographyType: "Modell"
      },
      {
        name: "2 personer",
        description: "Upp timmar 4 timmar",
        price: "4500 SEK",
        photographyType: "Modell"
      },
      {
        name: "3-4 personer",
        description: "Upp till 4 timmar",
        price: "6000 SEK",
        photographyType: "Modell"
      }
    ],
    event: [
      {
        name: "Event - Small",
        description: "Upp till 3 timmar.",
        price: "4 000 SEK",
        photographyType: "Event"
      },
      {
        name: "Event - Medium",
        description: "Upp till 6 timmar",
        price: "10 000 SEK",
        photographyType: "Event"
      },
      {
        name: "Event - Large",
        description: "Upp till 8 timmar",
        price: "13 000 SEK",
        photographyType: "Event"
      }
    ]
  };

  const selectedPackages = packages[category] || packages.brollop; 
  let categoryName = "Bröllop";

  if (category === "forlovning") {
    categoryName = "Förlovning";
  } else if (category === "familj") {
    categoryName = "Familj";
  } else if (category === "barn") {
      categoryName = "Barn";
  } else if (category === "modell") {
      categoryName = "Modell";
  } else if (category === "event") {
      categoryName = "Event";
  }

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
