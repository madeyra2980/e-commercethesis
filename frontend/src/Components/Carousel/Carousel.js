import React, { useState, useEffect } from 'react';
import './Carousel.css';
const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images =  ['Assets/1.jpg', 'Assets/2.jpg', 'Assets/3.jpg']

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 4000); 

    return () => {
      clearInterval(intervalId); 
    };
  }, []); 

  return (
    <div className="slider">
      <div className="slide-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={index === currentIndex ? "slide active" : "slide"}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
