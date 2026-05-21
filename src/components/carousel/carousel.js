import './carousel.css';
import  carousel1  from '../../assets/carousel/carousel1.jpg';
import  carousel2  from '../../assets/carousel/carousel2.jpg';
import  carousel3  from '../../assets/carousel/carousel3.jpg';
import { useEffect, useState } from 'react';

export default function Carousel() {
  const images = [carousel1, carousel2, carousel3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carousel">
      <button
        type="button"
        className="carousel-control carousel-control-prev"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        &#10094;
      </button>

      <img src={images[currentIndex]} alt={`Carousel slide ${currentIndex + 1}`} />

      <button
        type="button"
        className="carousel-control carousel-control-next"
        onClick={goToNext}
        aria-label="Next slide"
      >
        &#10095;
      </button>

      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}