import { useState, useEffect } from "react";
import "./ImageCarousel.css";

const images = [
  "/images/highlight1.jpg", "/images/highlight2.jpg", "/images/highlight3.jpg",
  "/images/highlight4.jpg", "/images/highlight5.jpg", "/images/highlight6.jpg",
  "/images/highlight7.jpg", "/images/highlight8.jpg", "/images/highlight9.jpg",
  "/images/highlight10.jpg", "/images/highlight11.jpg", "/images/highlight12.jpg",
  "/images/highlight13.jpg", "/images/highlight14.jpg", "/images/highlight15.jpg",
  "/images/highlight16.jpg", "/images/highlight17.jpg", "/images/highlight18.jpg"
];

// Skapa grupper om 3 bilder
const slides = [];
for (let i = 0; i < images.length; i += 3) {
  slides.push(images.slice(i, i + 3));
}

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 < slides.length ? prevIndex + 1 : 0
      );
    }, 10000); // Byter bildset var 5:e sekund

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel-images">
        {slides[currentIndex].map((image, index) => (
          <img key={index} src={image} alt="Highlight" className="carousel-image" />
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;
