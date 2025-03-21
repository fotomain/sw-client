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

    const [cardHover, setCardHover] = useState(false)

    const navigate = useNavigate()

    return(
        <div
            data-testid={'product-'+product.name.replaceAll(" ","-").toLowerCase()}
            css={css`
            z-index: 80;
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

             onMouseMove={()=>{
                 if(!cardHover) //after return from CartView
                    setCardHover(true)
             }}

             onClick={(e:any)=> {
                 // e.preventDefault();
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
