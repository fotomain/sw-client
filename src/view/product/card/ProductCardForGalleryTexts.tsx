/** @jsxImportSource @emotion/react */

import React, {useState} from "react";
import {useSelector} from "react-redux";

import {css} from "@emotion/react";


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
