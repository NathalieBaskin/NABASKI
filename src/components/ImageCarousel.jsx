import { useState, useEffect, useRef } from "react";
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

// Lägg till en kopia av första och sista sliden för att skapa loop-effekt
const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1); // Starta vid första "riktiga" sliden
  const carouselWrapperRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === extendedSlides.length - 1) {
      setTimeout(() => {
        if (carouselWrapperRef.current) {
          carouselWrapperRef.current.style.transition = "none";
          setCurrentIndex(1);
        }
      }, 500);
    }
    if (currentIndex === 0) {
      setTimeout(() => {
        if (carouselWrapperRef.current) {
          carouselWrapperRef.current.style.transition = "none";
          setCurrentIndex(extendedSlides.length - 2);
        }
      }, 500);
    } else {
      if (carouselWrapperRef.current) {
        carouselWrapperRef.current.style.transition = "transform 0.5s ease-in-out";
      }
    }
  }, [currentIndex]);

  return (
    <div className="carousel-container">
      <div
        className="carousel-wrapper"
        ref={carouselWrapperRef}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {extendedSlides.map((slide, index) => (
          <div key={index} className="carousel-slide">
            {slide.map((image, imageIndex) => (
              <img key={imageIndex} src={image} alt="Highlight" className="carousel-image" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;