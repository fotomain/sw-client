/** @jsxImportSource @emotion/react */


import {css} from "@emotion/react";
import React, {useEffect, useState} from "react";
import ButtonFigure from "../core/universal/ButtonFigure";

import {cartSlice} from "../../redux/cart/cartSlice";
import IconMaterial from "../core/universal/IconMaterial";
import {MdClose} from "react-icons/md";
import CartLineQtyPlusMinus from "./CartLineQtyPlusMinus";
import {useDispatch, useSelector} from "react-redux";
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

    const [imageHover, setImageHover] = useState(false)

    const {cartLine, cartState, setCartState} = props

    // console.log("222 cartLine.product_options1",cartLine.product_options)

    const objSelected:any = {}
    for (let i = 0; i < cartLine.product_options.length; i++) {
        const el=cartLine.product_options[i]
        objSelected[el.attribute_id] = el.option_id.toString()
    }
    // console.log("555 objSelected",objSelected)

    const [cardState, setCardState] = useState({
        optionsSelected: {},
        optionsAll: {},
        optionsArray: [],
        qty: 0,
        slideNumber: 0,
        percentOfOptionsSelected: 0,
    })

    useEffect(() => {
        console.log("product8", product)
        if (product.attributes) {


            let optionsAll: any = {}
            // let optionsSelected: any = {}
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
                    optionsSelected: objSelected,
                    optionsAll: optionsAll,
                    optionsArray: optionsArray,
                }
            })
        }
    }, []); //productSelectedOptions

    const uiState = useSelector((state:any) => state.uiState );

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
                height: auto;
            padding-bottom: 24px;
        `}
    >
        <div
            css={css`
            width: 100%;
                height: auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 12px;
                //debug background-color: #f2b1d8;
        `}
        >
        <div css={css`
            width: 100%;
                height: auto;
            display: flex;
            flex-direction: column;
            justify-content: start;
            gap: 4px;
                //debug background-color: #f2b1d8;
        `}
        >
            <div css={css`font-size: 14px;  `}>{cartLine.product_object?.name}</div>
            <div css={css`font-size: 12px;  `}>${cartLine.total_line}</div>

            <ProductCardOptions
                readOnly
                cartMode
                cardState={cardState}
                setCardState={setCardState}
            />


        </div>
            <div
                css={css`
                    width: auto;
                    display: flex;
                    flex-direction: column;
                    justify-content: start;
                    margin-top: 4px;
                    //debug background-color: lightgray;
                `}
            >
            <CartLineQtyPlusMinus
                qty={cartLine.qty}
                product_object={cartLine.product_object}
                product_options={optionsToKeyValue(cartLine.product_options)}
                cartState={cartState} setCartState={setCartState}
            />
            </div>
        </div>

        <div
            id={'dd0'}
            css={css`
            width: 10%;
            height: auto;
            flex: 1;    
            display: flex;
            //flex-direction: column;
            //justify-content: space-between;
            //gap: 12px;
            background-color: blue;
        `}
        >
            {/*<CartLineQtyPlusMinus*/}
            {/*    qty={cartLine.qty}*/}
            {/*    product_object={cartLine.product_object}*/}
            {/*    product_options={optionsToKeyValue(cartLine.product_options)}*/}
            {/*    cartState={cartState} setCartState={setCartState}*/}
            {/*/>*/}

        </div>


        <div css={css`
            width: 45%;
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
            //gap: 12px;
            //background-color: #8bf0ba;
            position: relative;
        `}
             onMouseEnter={()=>{
                 setImageHover(true)
             }}
             onMouseLeave={()=>{
                 setImageHover(false)
             }}
        >
            {cartLine?.product_object?.gallery &&
                <img
                    css={css`
                        width: auto;
                        max-width: 98%;
                        height: 80px;
                  `}
                    src={cartLine?.product_object?.gallery[0].url_path} alt=""
                />
            }


            {imageHover && <ButtonFigure style={{
                position: 'absolute',
                top:"50%",
                right:"50%",
                transform:"translate(50%, 0)",
                width: "22px", height: "22px",
                backgroundColor: uiState.colorPrimary,
                color: 'white'
            }}
                          onClick={() => {

                              dispatch(cartSlice.actions.delete({
                                  cart_line_id: cartLine.cart_line_id,
                              }))


                          }}
            >

                <IconMaterial size={18} icon={MdClose}/>

            </ButtonFigure>
            }

        </div>
    </div>
}


export default CartLine


