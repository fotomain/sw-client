/** @jsxImportSource @emotion/react */

import React from "react";

import {css} from "@emotion/react";

const ProductCardForGalleryTexts = (props: any) => {

    const {product} = props;

    return (

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

            <div css={css` align-self: start;
                margin-top: 6px;
                font-weight: lighter; `}>{product.name}</div>
            <div css={css` align-self: start;
                margin-top: 6px;
                margin-bottom: 6px;  `}>${product.price.toFixed(2)}</div>

        </div>

    )
}

export default ProductCardForGalleryTexts;
