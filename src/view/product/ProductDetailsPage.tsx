/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import React, {useEffect, useState} from "react";

import SliderBasic from "../core/slider/SliderBasic";
import {ui} from "../HomePage";
import ProductCardOptions from "./ProductCardOptions";
import {useDispatch, useSelector} from "react-redux";
import {alpha} from "@mui/material";
import {cartSlice} from "../../redux/cart/cartSlice";

const ProductDetailsPage = (props:any) => {

    const {product,productIndex} = props;

    const [cardState, setCardState] = useState({
        optionsSelected:{},
        optionsAll:{},
        optionsArray:[],
        qty:0,
        slideNumber:0,
        percernOfOptionsSelected:0,
    })

    const dispatch = useDispatch();

    const slidesContent=[]

    for (let i = 0; i < product?.gallery.length; i++) {
        slidesContent.push({urls:product.gallery[i].url_path});
    }

    const productsState = useSelector((state:any) => state.productsState );
    const productSelectedOptions = productsState.productsOptionsArray[productIndex];

    useEffect(() => {
        if(undefined===productSelectedOptions){
            // console.log("product",product)
            let optionsAll:any = {}
            let optionsSelected:any = {}
            let optionsArray:any[] = []
            for (let i = 0; i < product.attributes.length; i++) {
                optionsAll[product.attributes[i].id] = product.attributes[i]
                const {attributeOptions, ...h} = product.attributes[i]
                optionsArray.push({
                    option_header:h,
                    option_items:product.attributes[i].attributeOptions,
                })
                //=== DEFAULT SELECTED
                // const option0 = product.attributes[i].attributeOptions
                // console.log("====== attributeOptions1",option0)
                // optionsSelected[product.attributes[i].id]=option0[0].id;
            }
            console.log("optionsSelected1",optionsSelected)
            // console.log("optionsArray",optionsArray)

            setCardState((prevState:any)=>{return {...prevState,
                optionsSelected:optionsSelected,
                optionsAll:optionsAll,
                optionsArray:optionsArray,
            }})
        }
    }, []); //productSelectedOptions


    useEffect(() => {

        const percernOfOptionsSelected:number = Object.keys(cardState.optionsSelected).length / product.attributes.length * 100
        // console.log("percernOfOptionsSelected1",percernOfOptionsSelected)
        setCardState((prevState:any)=>{return {...prevState,
            percernOfOptionsSelected:percernOfOptionsSelected,
        }})

    }, [Object.keys(cardState.optionsSelected).length]);

    return <>
        {/*slideNumber {cardState.slideNumber} */}
        {/*    optionsSelected {JSON.stringify(cardState?.optionsSelected)}*/}
        {/*    % of Selected {cardState.percernOfOptionsSelected}*/}
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
              height: 100%;
              gap:12px; flex-direction: row; display: flex;
              justify-content: start;
              //background-color: lightcyan;
          `}
      >
              <div
                  css={css`
                      width: 20%;
                      height: auto;
                      //background-color: lightcyan;
                      gap:4px; flex-direction: column; display: flex;
                      justify-content: center;
                      align-items: center;
                      
                      overflow-y: auto;
                      scroll-behavior: smooth;

                  `}
              >
                  {slidesContent.map((item:any,ii)=>{
                      return <button key={ii} css={css` border: none; background-color: transparent`}
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
                              src={item.urls} alt=""
                          />
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
                height: 100%;

                gap: 4px;
                flex-direction: column;
                display: flex;
                justify-content: space-between;
                align-items: start;

                //background-color: lightpink;

            `}
        >
            <div style={{fontSize: '28px', width: '100%'}}>{product.name}</div>

            <ProductCardOptions
                cardState={cardState}
                setCardState={setCardState}
            />

            <div css={css` width: 100%; `}>

                <div css={css` padding-bottom: 14px;  `}>
                    <div style={{ paddingBottom:'12px',
                        fontWeight:'bold',fontSize: '16px', width: '100%'}}>PRICE</div>
                    <div style={{fontWeight:'bold',fontSize: '18px', width: '100%'}}>${product.price}</div>
                </div>


                <div
                    css={css`
                        pointer-events:auto;
                        opacity: ${(100>cardState.percernOfOptionsSelected)?0.5:1};
                        align-self: flex-end;
                        width: 100%;
                        color: white;
                        gap: 4px;
                        flex-direction: row;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        user-select: none;
                        //params1
                        height: 60px;
                        background-color: ${ui.colorMain};
                        border: none;
                    `}
                    onClick={()=>{
                        console.log("ADD TO CART1")

                        if(100<cardState.percernOfOptionsSelected) {
                            window.alert("not all options selected!")
                            return
                        }

                        dispatch(cartSlice.actions.create({
                            cart_guid:"cc6bb519-f811-11ef-a13a-55e370885b2f",
                            qty: 1,
                            product:product,
                            optionsSelected:cardState.optionsSelected,
                        }))


                    }}
                >
                    ADD TO CART
                </div>
                <div
                    css={css`
                        align-self: flex-end;
                        width: auto;
                        height: auto;
                        max-height: 100px;
                        border: 1px solid #ccc;
                        padding-top: 4px;
                        padding-bottom: 4px;
                        overflow-y: auto;
                        scroll-behavior: smooth;

                    `}
                    dangerouslySetInnerHTML={{__html: product.description.trim()}}
                />
            </div>

        </div>

    </div>
    </>
}

export default ProductDetailsPage;
