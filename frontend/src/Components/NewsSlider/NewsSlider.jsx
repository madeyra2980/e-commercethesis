import React, { useEffect, useState } from "react";
import SliderContent from "./SliderContent";
import Dots from "./Dots";
import "./Slider.css";

function Slider() {
  const [sliderImages, setSliderImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/news");
        const data = await response.json();
        const dataMap = data.map(item => ({ url: item.image }));
        setSliderImages(dataMap);
      } catch (error) {
        console.error("Ошибка при получении изображений для слайдера:", error);
      }
    };

    fetchData();

  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex =>
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
  
    return () => clearInterval(interval);
  }, [sliderImages]);

  console.log(sliderImages); 

  return (
    <div className="slider-container">
      {sliderImages && sliderImages.length > 0 && (
        <>
          <SliderContent activeIndex={activeIndex} sliderImages={sliderImages} />
          <Dots activeIndex={activeIndex} sliderImages={sliderImages} onClick={index => setActiveIndex(index)} />
        </>
      )}
    </div>
  );
  
}

export default Slider;
