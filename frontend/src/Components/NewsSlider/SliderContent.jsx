import React from "react";

function SliderContent({ activeIndex, sliderImages }) {
  return (
    <section>
      {sliderImages.map((slide, index) => (
        <div
          key={index}
          className={index === activeIndex ? "slides active" : "inactive"}
        >
          <img className="slide-image" src={slide.url} alt="" />
        </div>
      ))}
    </section>
  );
}

export default SliderContent;
