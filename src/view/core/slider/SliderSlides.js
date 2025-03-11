import React from "react";

function SliderSlides({ activeIndex, slidesContent }) {
  return (
    <section>
      {slidesContent.map((slide, index) => {

        return (
        <div
          key={index}
          style={{ visibility:(index === activeIndex)?"visible":"hidden",justifyContent:"center",flexDirection:"row", display:"flex"}}
        >
          <img className="slide-image"  src={slide.urls} alt="" />
          <h2 className="slide-title">{slide.title}</h2>
          <h3 className="slide-text">{slide.description}</h3>
        </div>
      )})}
    </section>
  );
}

export default SliderSlides;
