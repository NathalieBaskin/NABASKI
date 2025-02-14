import { Link } from "react-router-dom";
import "./Portfolio.css";
import ImageCarousel from "../components/ImageCarousel";

const categories = [
  { name: "Bröllop", image: "/images/Brollop.jpg", alt: "Bröllop", link: "/brollop" },
  { name: "Förlovning", image: "/images/Förlovning.jpg", alt: "Förlovning", link: "/forlovning" },
  { name: "Familj", image: "/images/Familj.jpg", alt: "Familj", link: "/familj" },
  { name: "Barn", image: "/images/Barn.jpg", alt: "Barn", link: "/barn" },
  { name: "Modell", image: "/images/Modell.jpg", alt: "Modell", link: "/modell" },
  { name: "Event", image: "/images/Event.jpg", alt: "Event", link: "/event" },
];

function Portfolio() {
  return (
    <div className="portfolio">
      <h1>PORTFOLIO</h1>
      <ImageCarousel />

      <div className="portfolio-grid">
        {categories.map((item, index) => (
          <Link to={item.link} key={index} className="portfolio-item">
            <img src={item.image} alt={item.alt} />
            <div className="portfolio-text">{item.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
