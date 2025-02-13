import { Link } from "react-router-dom";
import "./ImageLinks.css";


const imageLinks = [
  { name: "Bröllop", image: "/images/wedding.jpg", link: "/brollop" },
  { name: "Förlovning", image: "/images/engagement.jpg", link: "/forlovning" },
  { name: "Familj", image: "/images/family.jpg", link: "/familj" },
  { name: "Barn", image: "/images/children.jpg", link: "/barn" },
  { name: "Modell", image: "/images/model.jpg", link: "/modell" },
  { name: "Event", image: "/images/event.jpg", link: "/event" },
];

function ImageLinks() {
  return (
    <div className="image-links-grid">
      {imageLinks.map((item, index) => (
        <Link to={item.link} key={index} className="image-link">
          <img src={item.image} alt={item.name} />
          <div className="image-text">{item.name}</div>
        </Link>
      ))}
    </div>
  );
}

export default ImageLinks;
