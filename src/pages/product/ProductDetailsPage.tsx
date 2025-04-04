/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import React, {useEffect, useState} from "react";

import SliderBasic from "../../core/slider/SliderBasic";

import ProductCardOptions from "./lib/ProductCardOptions";
import {useDispatch, useSelector} from "react-redux";

import {cartSlice} from "../../redux/cart/cartSlice";
import {makeOpenCartView, uiSlice} from "../../redux/ui/uiSlice";

import {useLocation} from "react-router-dom";
import OutOfStockText from "./card/OutOfStockText";
import {WrapOutOfStock} from "./card/ProductCardForGalleryImage";

export const forCart = 'forCart'
export const forPDP = 'forPDP'

const WrapCTA = (uiState: any, cardState: any, product: any) => {
    return css`
        cursor: pointer;
        pointer-events: auto;
        opacity: ${((!product.inStock) || (100 > cardState.percentOfOptionsSelected)) ? 0.5 : 1};
        align-self: flex-end;
        width: 100%;
        color: white;
        gap: 4px;
        flex-direction: row;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        //params1
        height: 60px;
        background-color: ${uiState.colorPrimary};
        border: none;
    `
}

const ProductDetailsPage = (props: any) => {

    const routerParams = useLocation();

    const {product, productIndex} = (routerParams) ? routerParams.state : props;

    const [cardState, setCardState] = useState({
        optionsSelected: {},
        optionsAll: {},
        optionsArray: [],
        qty: 0,
        slideNumber: 0,
        percentOfOptionsSelected: 0,
    })

    const dispatch = useDispatch();
    const uiState = useSelector((state: any) => state.uiState);

    const slidesContent = []

    for (let i = 0; i < product?.gallery.length; i++) {
        slidesContent.push({urls: product.gallery[i].url_path});
    }

    const productsState = useSelector((state: any) => state.productsState);
    const productSelectedOptions = productsState.productsOptionsArray[productIndex];

    useEffect(() => {
        if (undefined === productSelectedOptions) {

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
                //=== IF DEFAULT SELECTED
                // const option0 = product.attributes[i].attributeOptions
                // optionsSelected[product.attributes[i].id]=option0[0].id;
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
    }, [product.attributes, productSelectedOptions]); //productSelectedOptions


    const numberOfSelected = Object.keys(cardState.optionsSelected).length

    useEffect(() => {

        const percentOfOptionsSelected: number = numberOfSelected / product.attributes.length * 100
        setCardState((prevState: any) => {
            return {
                ...prevState,
                percentOfOptionsSelected: percentOfOptionsSelected,
            }
        })

    }, [numberOfSelected, product.attributes.length]);

    return <>

        <div css={css`
            // NavBar
            padding-top: 145px;
            max-width: 1200px;
            width: 100%;
            gap: 80px;
            flex-direction: row;
            display: flex;
        `}>
            <div
                id={'images-left1'}
                css={css`
                    width: 55vw;
                    //params1
                    height: 100%;
                    gap: 12px;
                    flex-direction: row;
                    display: flex;
                    justify-content: start;
                    //background-color: lightcyan;
                `}
            >
                <div
                    css={css`
                        width: 20%;
                        height: auto;
                        //background-color: lightcyan;
                        gap: 4px;
                        flex-direction: column;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        overflow-y: auto;
                        scroll-behavior: smooth;

                    `}
                >
                    {slidesContent.map((item: any, ii) => {
                        return <button key={ii} css={css` border: none;
                            background-color: transparent`}
                                       onClick={() => {

                                           setCardState((prevState: any) => {
                                               return {
                                                   ...prevState,
                                                   slideNumber: ii,
                                               }
                                           })

                                       }}
                        >
                            <img
                                css={css`
                                    width: auto;
                                    height: 60px;
                                `}
                                src={item.urls} alt=""
                            />
                        </button>
                    })}
                </div>
                <div
                    data-testid='product-gallery'
                    css={css`
                        width: 80%;
                        //height: 50vh;
                        //params2 
                        //display: flex; flex-direction: column; 
                        //background-color: lightcyan;
                        position: relative;
                    `}
                >
                    <SliderBasic

                        slidesContent={slidesContent}
                        // autoPlay={true}
                        autoPlayInterval={3500}
                        style={{
                            width: '500px',
                            height: '500px',
                            backgroundColor: "white",
                            // backgroundColor:"red",
                        }}
                        slideNumber={cardState.slideNumber}
                    />

                    {(product.inStock) ? null :
                        <div
                            id={'out222'}
                            css={css`${WrapOutOfStock};
                                margin-left: 50%;
                                transform: translateX(-50%);
                            `}
                        >
                            <OutOfStockText/>
                        </div>
                    }

                </div>
            </div>

            <div
                css={css`
                    width: 30vw;
                    height: 100%;

                    gap: 4px;
                    flex-direction: column;
                    display: flex;
                    justify-content: space-between;
                    //params1
                    //height: 500px;
                    align-items: start;
                    min-width: 300px;
                    //background-color: lightpink;
                `}
            >
                <div style={{fontSize: '28px', width: '100%'}}>{product.name}</div>

                <ProductCardOptions
                    addTestData={forPDP}
                    cardState={cardState}
                    setCardState={setCardState}
                />

                <div css={css` width: 100%; `}>

                    <div css={css` padding-bottom: 14px;  `}>
                        <div style={{
                            paddingBottom: '12px',
                            fontWeight: 'bold', fontSize: '16px', width: '100%'
                        }}>PRICE
                        </div>
                        <div style={{fontWeight: 'bold', fontSize: '18px', width: '100%'}}>${product.price}</div>
                    </div>

                    <button

                        disabled={(!product.inStock) || (product.inStock && 100 > cardState.percentOfOptionsSelected) ? true : false}

                        data-testid='add-to-cart'

                        css={WrapCTA(uiState, cardState, product)}
                        onClick={() => {

                            // if(!product.inStock) {
                            //     window.alert("Product Out of Stock...")
                            //     return
                            // }

                            if (100 < cardState.percentOfOptionsSelected) {
                                window.alert("not all options selected!")
                                return
                            }

                            dispatch(cartSlice.actions.create({
                                qty: 1,
                                product: product,
                                optionsSelected: cardState.optionsSelected,
                            }))

                            dispatch(uiSlice.actions.setValue({
                                key: makeOpenCartView,
                                value: true,
                            }))

                        }}
                    >
                        ADD TO CART
                    </button>
                    <div
                        data-testid='product-description'
                        css={css`
                            align-self: flex-end;
                            width: auto;
                            height: auto;
                            max-height: 100px;
                            border: 1px solid #ccc;
                            padding-top: 4px;
                            padding-bottom: 4px;
                            overflow-y: auto;
                            scroll-behavior: smooth;
                            border: none;
                        `}
                        dangerouslySetInnerHTML={{__html: product.description.trim()}}
                    />
                </div>

            </div>

        </div>
    </>
}

export default ProductDetailsPage;
