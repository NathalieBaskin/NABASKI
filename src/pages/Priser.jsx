import { Link } from "react-router-dom";
import "./Priser.css";

function Priser() {
  const packages = [
    {
      name: "Stora paketet",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      price: "20 000 SEK",
      image: "/images/stora-paketet.jpg"
    },
    {
      name: "Medium paketet",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      price: "15 000 SEK",
      image: "/images/medium-paketet.jpg"
    }
  ];

  return (
    <div className="priser-page">
      <h1>PRISER</h1>
      <h2>Bröllop</h2>

      <div className="package-container">
        {packages.map((pkg, index) => (
          <div key={index} className="package">
            <img src={pkg.image} alt={pkg.name} />
            <h3>{pkg.name}</h3>
            <p>{pkg.description}</p>
            <p><strong>Pris: {pkg.price}</strong></p>
            <Link to={`/bokning?paket=${encodeURIComponent(pkg.name)}&pris=${encodeURIComponent(pkg.price)}`} className="bokning-btn">
              Bokning
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Priser;
