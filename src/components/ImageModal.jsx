import PropTypes from "prop-types"; // Lägg till detta!
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./ImageModal.css"; 

function ImageModal({ images, selectedIndex, setSelectedIndex }) {
  if (!images || images.length === 0 || selectedIndex === null) return null;

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="modal-overlay">
      <button className="close-btn" onClick={() => setSelectedIndex(null)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <button className="prev-btn" onClick={handlePrev}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <img className="modal-image" src={`http://localhost:8000${images[selectedIndex].image_url}`} alt="Förstorad bild" />
      <button className="next-btn" onClick={handleNext}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
}

// ✅ Lägg till PropTypes för att säkerställa rätt typer!
ImageModal.propTypes = {
  images: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  setSelectedIndex: PropTypes.func.isRequired,
};

export default ImageModal;
