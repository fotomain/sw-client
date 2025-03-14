/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {css} from "@emotion/react";
import ProductCardForGalleryImage from "./ProductCardForGalleryImage";
import ProductCardForGalleryTexts from "./ProductCardForGalleryTexts";


const ProductCardForGallery = (props:any) => {

    const {product,productIndex} = props;

    const productsState = useSelector((state:any) => state.productsState );
    let productSelectedOptions = productsState.productsOptionsArray[productIndex];

    const [cardState, setCardState] = useState({
    })

    const [cardHover, setCardHover] = useState(false)

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

        >

            <ProductCardForGalleryImage  {...props} cardHover={cardHover} />

            <ProductCardForGalleryTexts  {...props} />

        </div>

    )
}

export default ProductCardForGallery;
