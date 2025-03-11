import React, { useEffect, useState } from "react";
import SliderSlides from "./SliderSlides";
import Dots from "./Dots";
import Arrows from "./Arrows";
import "./slider.css";

function SliderBasic(props) {

  const [activeIndex, setActiveIndex] = useState(0);

    const len = props.slidesContent.length - 1;

    useEffect(() => {
        // console.log("=== setActiveIndex",props.slideNumber)
        setActiveIndex(props.slideNumber);
    },[props.slideNumber]);

  //autoPlay
  useEffect(() => {

      let interval
      if(props.autoPlay) {
          interval = setInterval(() => {
              setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
          }, props.autoPlayInterval);
      }

    return () => {
        if(props.autoPlay) {
            clearInterval(interval)
        }
    };
  }, [activeIndex]);

  return (
      <div className="slider-container"
           style={{width: "600px", backgroundColor: 'red', ...props.style}}
      >
          {/*activeIndex {activeIndex}*/}
          <SliderSlides activeIndex={activeIndex} slidesContent={props.slidesContent}/>

          <Arrows
            prevSlide={() =>
              setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
            }
            nextSlide={() =>
              setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
            }
          />

          {props.dots &&
              <Dots
                  activeIndex={activeIndex}
                  slidesContent={props.slidesContent}
                  onclick={(activeIndex) => setActiveIndex(activeIndex)}
              />
          }
      </div>
  );
}

export default SliderBasic;
