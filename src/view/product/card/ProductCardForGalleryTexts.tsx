/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import CartLineQtyPlusMinus from "../../cart/CartLineQtyPlusMinus";
import {ui} from "../../HomePage";

import { MdAdd } from "react-icons/md";
import AddToCart from "../../cart/AddToCart";
import ProductCardOptions from "../ProductCardOptions";
import {css} from "@emotion/react";
import IconCart from "../../core/universal/IconCart";
import ProductCardForGalleryImage from "./ProductCardForGalleryImage";


const ProductCardForGalleryTexts = (props:any) => {

    const {product,productIndex} = props;

    const productsState = useSelector((state:any) => state.productsState );
    let productSelectedOptions = productsState.productsOptionsArray[productIndex];

    const [cardState, setCardState] = useState({
        imageHover:false,
    })

    return(

        <div css={css`
            width: 30vw;
            height: auto;
            flex-direction: column;
            display: flex;
            justify-content: space-between;
            align-items: center;
            //border: 1px dodgerblue solid;

        `}
        >

            <div css={css` align-self: start `}>{product.name}</div>
            <div css={css` align-self: start `}>${product.price}</div>

        </div>

    )
}

export default ProductCardForGalleryTexts;
