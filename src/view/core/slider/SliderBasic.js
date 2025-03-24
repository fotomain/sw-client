import React, { useEffect, useState } from "react";
import SliderSlides from "./SliderSlides";
import Dots from "./Dots";
import Arrows from "./Arrows";
import "./slider.css";

function SliderBasic(props) {

  const [activeIndex, setActiveIndex] = useState(0);

    const len = props.slidesContent.length - 1;

    useEffect(() => {

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
  }, [activeIndex,len,props.autoPlay,props.autoPlayInterval]);

  return (
      <div className="slider-container"
           style={{position:'relative',width: "600px", backgroundColor: 'red',
               ...props.style
            }}
      >
          {/*activeIndex {activeIndex}*/}
          <SliderSlides activeIndex={activeIndex} slidesContent={props.slidesContent}/>

          {/*<div style={{position:'absolute',top:'50%',}}>*/}
          <Arrows
            prevSlide={() =>
              setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
            }
            nextSlide={() =>
              setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
            }
          />
          {/*</div>*/}

          {props.dots &&
              <Dots
                  activeIndex={activeIndex}
                  slidesContent={props.slidesContent}
                  onClick={(activeIndex) => setActiveIndex(activeIndex)}
              />
          }

      </div>
  );
}

export default SliderBasic;
