import React from "react";

function Dots({ activeIndex, onClick, sliderImages }) {
  return (
    <div className="all-dots">
      {sliderImages.map((slide, index) => (
        <span
          key={index}
          className={`dot ${activeIndex === index ? "active-dot" : ""}`}
          onClick={() => onClick(index)} // Вызываем обработчик клика с индексом слайда
        ></span>
      ))}
    </div>
  );
}

export default Dots;
