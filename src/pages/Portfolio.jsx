import { Link } from "react-router-dom";
import "./Portfolio.css"; // ✅ Se till att denna fil finns!
import ImageCarousel from "../components/ImageCarousel";

function Portfolio() {
  const categories = [
    { name: "Bröllop", image: "/images/Bröllop.jpg", alt: "bröllop", link: "/brollop" },
    { name: "Förlovning", image: "/images/Förlovning.jpg", link: "/forlovning" },
    { name: "Familj", image: "/images/Familj.jpg", link: "/familj" },
    { name: "Barn", image: "/images/Barn.jpg", link: "/barn" },
    { name: "Modell", image: "/images/Modell.jpg", link: "/modell" },
    { name: "Event", image: "/images/Event.jpg", link: "/event" },
  ];

  return (
    <div className="portfolio">
      <h1>PORTFOLIO</h1>
      <ImageCarousel />

      <div className="portfolio-grid">
        {categories.map((item, index) => (
          <Link to={item.link} key={index} className="portfolio-item">
            <img src={item.image} alt={item.name} />
            <div className="portfolio-text">{item.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
