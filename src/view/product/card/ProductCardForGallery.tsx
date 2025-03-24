/** @jsxImportSource @emotion/react */

import {NavigateOptions, useNavigate} from "react-router";

import React, {useState} from "react";

import {css} from "@emotion/react";
import ProductCardForGalleryImage from "./ProductCardForGalleryImage";
import ProductCardForGalleryTexts from "./ProductCardForGalleryTexts";


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
