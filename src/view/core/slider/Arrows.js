import React from "react";

function Arrows({ prevSlide, nextSlide }) {
  return (
    <div>
      <span
          className="prev"
          style={{userSelect:"none",color:'white',backgroundColor:'gray'}}
          onClick={prevSlide}
      >
        &#10094;
      </span>
        {/*&#10094;*/}
      <span
          className="next"
          style={{userSelect:"none",color:'white',backgroundColor:'gray'}}
          onClick={nextSlide}>
          &#10095;
      </span>
        {/*&#10095;*/}
    </div>
  );
}

export default Arrows;
