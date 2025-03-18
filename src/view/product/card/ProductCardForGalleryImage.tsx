/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {css} from "@emotion/react";
import IconCart from "../../core/universal/IconCart";
import {ui} from "../../LayoutPage";
import {cartSlice} from "../../../redux/cart/cartSlice";
import {makeOpenCartView, uiSlice} from "../../../redux/ui/uiSlice";
import OutOfStock from "./OutOfStock";

export const WrapOutOfStock = css`
    position: absolute;
    z-index: 55;
    top: 50%;
    transform: translate(0, -50%);
    background-color: black;
    color: white;
    opacity: 0.4;
    padding: 12px;
`

const ProductCardForGalleryImage = (props:any) => {

    const {product,productIndex} = props;

    const dispatch = useDispatch();

    return(

        <div css={css`
            z-index: 10;
            width: 30vw;
            height: 30vw;
            flex-direction: column;
            display: flex;
            justify-content: space-between;
            align-items: center;
            //border: 1px dodgerblue solid;
            position: relative;
        `}
        >

            <img
                id={'img111'}
                css={css`
                    position: absolute;
                    z-index: 11;
                    width: auto;
                    height: 100%;
                `}
                src={product?.gallery[0]?.url_path}
            />


            {(product.inStock)?null:
                <div
                    css={css` position: absolute;
                        z-index: 50;
                        width: 100%;
                        height: 100%;
                        background-color: black;
                        opacity: 0.2;
                    `}
                >
                </div>
            }

            {(product.inStock) ? null :
                <div
                    id={'out111'}
                    css={WrapOutOfStock}
                >
                    <OutOfStock/>
                </div>
            }

            {(!(product.inStock && props.cardHover)) ? null :
                <div
                    id={'quick-add111'}
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

                            let optionsSelected:any = {}
                            for (let i = 0; i < product.attributes.length; i++) {
                                const {attributeOptions, ...h} = product.attributes[i]
                                console.log("attributeOptions1",attributeOptions)
                                console.log("attributeOptions1",h)

                                optionsSelected[h.id] = attributeOptions[0].id
                            }

                            console.log("attributeOptions1",optionsSelected)

                            dispatch(cartSlice.actions.create({
                                cart_guid:"cc6bb519-f811-11ef-a13a-55e370885b2f",
                                qty: 1,
                                product:product,
                                optionsSelected:optionsSelected,
                            }))

                            dispatch(uiSlice.actions.setValue({
                                key:makeOpenCartView,
                                value: true,
                            }))


                        }}
                    />
                </div>
            }

        </div>

    )
}

export default ProductCardForGalleryImage;
