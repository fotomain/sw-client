/** @jsxImportSource @emotion/react */

import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {css} from "@emotion/react";
import IconCart from "../../../core/lib/IconCart";

import {cartSlice} from "../../../redux/cart/cartSlice";
import {makeOpenCartView, uiSlice} from "../../../redux/ui/uiSlice";
import OutOfStockText from "./OutOfStockText";

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

const ProductCardForGalleryImage = (props: any) => {

    const {product} = props;

    const dispatch = useDispatch();

    const uiState = useSelector((state: any) => state.uiState);

    return (

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
                alt={'image-' + product.name.replaceAll(" ", "-")}
                css={css`
                    position: absolute;
                    z-index: 11;
                    width: auto;
                    //TODO params1
                    max-width: 500px;
                    height: 100%;
                `}
                src={product?.gallery[0]?.url_path}
            />


            {(product.inStock) ? null :
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
                    <OutOfStockText/>
                </div>
            }

            {(!(product.inStock && props.cardHover)) ? null :
                <div
                    id={'quick-add111'}
                    css={css`
                        position: absolute;
                        z-index: 50;
                        margin-left: 70%;
                        margin-top: 85%;
                    `}
                >
                    <IconCart
                        color={'white'}
                        css={css` padding: 10px;
                            border-radius: 50px;
                            background-color: ${uiState.colorPrimary}`}
                        onClick={(e: any) => {
                            e.stopPropagation()


                            let optionsSelected: any = {}
                            for (let i = 0; i < product.attributes.length; i++) {
                                const {attributeOptions, ...h} = product.attributes[i]

                                optionsSelected[h.id] = attributeOptions[0].id
                            }

                            dispatch(cartSlice.actions.create({
                                qty: 1,
                                product: product,
                                optionsSelected: optionsSelected,
                            }))

                            dispatch(uiSlice.actions.setValue({
                                key: makeOpenCartView,
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
