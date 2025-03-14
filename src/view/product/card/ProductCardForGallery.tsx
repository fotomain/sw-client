/** @jsxImportSource @emotion/react */

import {NavigateOptions, Router, useNavigate} from "react-router";

import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {css} from "@emotion/react";
import ProductCardForGalleryImage from "./ProductCardForGalleryImage";
import ProductCardForGalleryTexts from "./ProductCardForGalleryTexts";
import { createSearchParams } from "react-router-dom";


const ProductCardForGallery = (props:any) => {

    const {product,productIndex} = props;


    const productsState = useSelector((state:any) => state.productsState );
    let productSelectedOptions = productsState.productsOptionsArray[productIndex];

    const [cardState, setCardState] = useState({
    })

    const [cardHover, setCardHover] = useState(false)

    const navigate = useNavigate()

    return(
        <div css={css`
            width: 30vw;
            height: auto;
            flex-direction: column; display: flex;
            justify-content: space-between;
            align-items: center;
            //border: 1px dodgerblue solid;
        `}
             onMouseEnter={()=>{
                 console.log("onMouseEnter1");
                 setCardHover(true)
             }}

             onMouseLeave={()=>{
                 setCardHover(false)
             }}

             onClick={()=> {
                 navigate(`/product`,
                     { state: {product: product, productIndex:productIndex} } as NavigateOptions
                 )
             }}

        >

            <ProductCardForGalleryImage  {...props} cardHover={cardHover} />

            <ProductCardForGalleryTexts  {...props} />

        </div>

    )
}

export default ProductCardForGallery;
