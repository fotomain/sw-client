/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import CartLineQtyPlusMinus from "../cart/CartLineQtyPlusMinus";
import {ui} from "../HomePage";

import { MdAdd } from "react-icons/md";
import AddToCart from "../cart/AddToCart";
import ProductCardOptions from "./ProductCardOptions";
import {css} from "@emotion/react";
import IconCart from "../core/universal/IconCart";


const ProductCardForGallery = (props:any) => {

    const {product,productIndex} = props;

    const productsState = useSelector((state:any) => state.productsState );
    let productSelectedOptions = productsState.productsOptionsArray[productIndex];

    const [cardState, setCardState] = useState({
        imageHover:false,
    })

    return(

        <div css={css`
            width: 30vw;
            height: 30vw;
            flex-direction: column;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px dodgerblue solid;
            position: relative;
        `}
        >

            <img
                css={css`
                    z-index: 40;
                    width: auto;
                    height: 100%;
                `}
                src={product?.gallery[0]?.url_path}
            />

                {/*<div*/}
                {/*    css={css` position: absolute;*/}
                {/*        z-index: 50;*/}
                {/*        width: 100%;*/}
                {/*        height: 100%;*/}
                {/*        background-color: gray;*/}
                {/*        opacity: 0.5;*/}
                {/*    `}*/}
                {/*>*/}
                {/*</div>*/}


            <div css={css` align-self: start `}>{product.name}</div>
            <div css={css` align-self: start `}>${product.price}</div>
            {/*/!*<div css={css` align-self: start `}>{JSON.stringify(product.inStock)}</div>*!/*/}

            {(!product.inStock) ? null :
                <div
                    css={css` position: absolute;
                        z-index: 50;
                        margin-left: 80%;
                        margin-top: 85%;
                    `}
                >
                    <IconCart
                        color={'white'}
                        css={css` padding: 10px;
                            border-radius: 50px;
                            background-color: ${ui.colorMain}`}
                        onClick={() => {
                            console.log("setCartViewOpen=true")
                        }}
                    />
                </div>
            }

            {(!product.inStock) &&
                <>
                    {/*<div css={css` position: absolute;*/}
                    {/*    z-index: 50;*/}
                    {/*    margin-left: -50%;*/}
                    {/*    margin-top: 50%;*/}
                    {/*    width: 40px;*/}
                    {/*    height: 40px;*/}
                    {/*    background-color: fuchsia;*/}
                    {/*    border-radius: 50px;*/}
                    {/*    color: white;*/}
                    {/*    justify-content:center; align-items:center; flex-direction:row; display: flex;*/}
                    {/*`}*/}
                    {/*>*/}
                    {/*    O*/}
                    {/*</div>*/}

                    <div
                        css={css` position: absolute;
                            z-index: 50;
                            margin-left: 50%;
                            margin-top: 50%;
                            transform: translate(-75%);
                            background-color: white;
                            opacity: 0.5;
                        `}
                    >
                        <div>OUT OF STOCK</div>
                    </div>
                </>
            }

        </div>

    )
}

export default ProductCardForGallery;
