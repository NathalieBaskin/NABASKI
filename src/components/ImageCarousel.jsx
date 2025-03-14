import { useState, useEffect, useRef } from "react";
import "./ImageCarousel.css";

const images = [
  "/images/highlight1.jpg", "/images/highlight2.jpg", "/images/highlight3.jpg",
  "/images/highlight4.jpg", "/images/highlight5.jpg", "/images/highlight6.jpg",
  "/images/highlight7.jpg", "/images/highlight8.jpg",
  "/images/highlight10.jpg", "/images/highlight11.jpg", "/images/highlight12.jpg",
  "/images/highlight13.jpg", "/images/highlight14.jpg", "/images/highlight15.jpg",
  "/images/highlight16.jpg", "/images/highlight17.jpg", "/images/highlight18.jpg", "/images/Barn.jpg", "/images/j.jpg", "/images/dd.jpg", "/images/2.jpg"
];

const slides = [];
for (let i = 0; i < images.length; i += 3) {
  slides.push(images.slice(i, i + 3));
}


const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const carouselWrapperRef = useRef(null);
  const transitionRef = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const wrapper = carouselWrapperRef.current;
    if (!wrapper) return;

    if (currentIndex === extendedSlides.length - 1) {
      transitionRef.current = false;
      setTimeout(() => {
        setCurrentIndex(1);
        transitionRef.current = true;
      }, 50);
    } else if (currentIndex === 0) {
      transitionRef.current = false;
      setTimeout(() => {
        setCurrentIndex(extendedSlides.length - 2);
        transitionRef.current = true;
      }, 50);
    }
  }, [currentIndex]);

  return (
    <div className="carousel-container">
      <div
        className="carousel-wrapper"
        ref={carouselWrapperRef}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: transitionRef.current ? "transform 1s ease-in-out" : "none",
        }}
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