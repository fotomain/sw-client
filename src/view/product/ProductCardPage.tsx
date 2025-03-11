/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import React, {useState} from "react";

import SliderBasic from "../core/slider/SliderBasic";
import {ui} from "../HomePage";

const ProductCardPage = (props:any) => {

    const {product,productIndex} = props;

    const [cardState, setCardState] = useState({
        optionsSelected:{},
        optionsAll:{},
        optionsArray:[],
        qty:0,
        slideNumber:0,
    })

    const slidesContent=[]

    for (let i = 0; i < product?.gallery.length; i++) {
        slidesContent.push({urls:product.gallery[i].url_path});
    }

    return <>
        {/*slideNumber {cardState.slideNumber} */}
    <div css={css`
      max-width: 1200px;
      width: 100%;
      gap: 80px;
      flex-direction: row;
      display: flex;
  `}>
      <div
          id={'images'}
          css={css`
              width: 55vw;
              //params1
              height: 40vw;
              gap:12px; flex-direction: row; display: flex;
              justify-content: start;
              background-color: lightcyan;
          `}
      >
              <div
                  css={css`
                      width: 20%;
                      height: auto;
                      background-color: #61dafb;
                      gap:4px; flex-direction: column; display: flex;
                      justify-content: start;
                      align-items: center;
                      
                      overflow-y: auto;
                      scroll-behavior: smooth;

                  `}
              >
                  {slidesContent.map((item:any,ii)=>{
                      return <button key={ii} css={css``}
                          onClick={()=>{

                              setCardState((prevState:any)=>{return {...prevState,
                                  slideNumber:ii,
                              }})

                          }}
                        >
                          <img
                              css={css`
                                  width: auto;
                                  height: 60px;
                              `}
                              src={item.urls} alt=""/>
                      </button>
                  })}
              </div>
              <div
                  css={css`
                      width: 80%;
                      //height: 50vh;
                      //params2 
                      //display: flex; flex-direction: column; 
                      background-color: lightgreen;
                  `}
              >
                  <SliderBasic
                      slidesContent={slidesContent}
                      // autoPlay={true}
                      autoPlayInterval={3500}
                      style={{
                          width:'500px',
                          height:'500px',
                          backgroundColor:"white",
                          // backgroundColor:"red",
                      }}
                      slideNumber={cardState.slideNumber}
                  />

              </div>
      </div>

      <div
          css={css`
              width: 30vw;
              height: 20vw;
              background-color: lightpink;
          `}
      >
          <div style={{width: '250px'}}>{product.name}</div>
          <div style={{width: '25px'}}>{product.price}</div>
      </div>

  </div>
  </>
}

export default ProductCardPage;
