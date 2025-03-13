/** @jsxImportSource @emotion/react */


import {css} from "@emotion/react";
import React, {useEffect, useState} from "react";
import ButtonFigure from "../core/universal/ButtonFigure";
import {ui} from "../HomePage";
import {cartSlice} from "../../redux/cart/cartSlice";
import IconMaterial from "../core/universal/IconMaterial";
import {MdClose} from "react-icons/md";
import CartLineQtyPlusMinus from "./CartLineQtyPlusMinus";
import {useDispatch} from "react-redux";
import ProductCardOptions from "../product/ProductCardOptions";


const optionsToKeyValue = (p:any) => {
    const res:any = {}
    for (let i = 0; i < p.length; i++) {
        res[p[i].attribute_id] = p[i].option_id
    }
    return res
}




const CartLine = (props:any) => {


    const {product} = props;


    const dispatch = useDispatch();


    const {cartLine, cartState, setCartState} = props


    const [cardState, setCardState] = useState({
        optionsSelected: {},
        optionsAll: {},
        optionsArray: [],
        qty: 0,
        slideNumber: 0,
        percernOfOptionsSelected: 0,
    })

    useEffect(() => {
        console.log("product8", product)
        if (product.attributes) {


            let optionsAll: any = {}
            let optionsSelected: any = {}
            let optionsArray: any[] = []
            for (let i = 0; i < product.attributes.length; i++) {
                optionsAll[product.attributes[i].id] = product.attributes[i]
                const {attributeOptions, ...h} = product.attributes[i]
                optionsArray.push({
                    option_header: h,
                    option_items: product.attributes[i].attributeOptions,
                })
            }


            setCardState((prevState: any) => {
                return {
                    ...prevState,
                    optionsSelected: optionsSelected,
                    optionsAll: optionsAll,
                    optionsArray: optionsArray,
                }
            })
        }
    }, []); //productSelectedOptions

    return <div
        key={cartLine.cart_line_id}
        css={css`
            gap:2px;
            align-items: center;
            justify-content: space-between;
            display: flex;
            flex-direction: row;
            max-width: 300px;
            width: 100%;
            padding-bottom: 12px;
        `}
    >
        <div css={css`
            width: 45%;
            display: flex;
            flex-direction: column;
            justify-content: start;
            gap: 12px;
            background-color: #f2b1d8;
        `}

        >
            <div>{cartLine.product_object?.name}</div>
            <div>${cartLine.total_line}</div>

            <ProductCardOptions
                readOnly
                cardState={cardState}
                setCardState={setCardState}
            />


        </div>


        <div css={css`
            width: 10%;
            display: flex;
            flex-direction: column;
            justify-content: start;
            gap: 12px;
            background-color: #fef6dd;
        `}
        >
            <CartLineQtyPlusMinus
                qty={cartLine.qty}
                product_object={cartLine.product_object}
                product_options={optionsToKeyValue(cartLine.product_options)}
                cartState={cartState} setCartState={setCartState}
            />

        </div>


        <div css={css`
            width: 45%;
            display: flex;
            flex-direction: column;
            justify-content: start;
            gap: 12px;
            background-color: #8bf0ba;
        `}
        >
            {cartLine?.product_object?.gallery &&
                <img
                    css={css`
                      width: auto;
                      height: 80px;
                  `}
                    src={cartLine?.product_object?.gallery[0].url_path} alt=""
                />
            }
        </div>
    </div>
}


export default CartLine


