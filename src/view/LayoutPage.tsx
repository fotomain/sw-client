/** @jsxImportSource @emotion/react */

import React, {useState} from "react";
import ProductsGallery from "./product/ProductsGallery";

import { CiShoppingCart } from "react-icons/ci";

import CartView from "./cart/CartView";

import {css} from "@emotion/react";
import {MdOutlineShoppingCart, MdShoppingCart, MdShoppingCartCheckout} from "react-icons/md";
import IconMaterial from "./core/universal/IconMaterial";
import IconCart from "./core/universal/IconCart";
import NavBar from "./NavBar";
import DataJsonGenerator from "../database/generator/DataJsonGenerator";
import {useSelector} from "react-redux";
import {Outlet, Route, Routes} from "react-router-dom";
import ProductDetailsPage from "./product/ProductDetailsPage";
import SpinnerFast from "./SpinnerFast";



export const LayoutPage = (params:any) => {

    const uiState = useSelector((state:any) => state.uiState );
    const cartState = useSelector((state:any) => state.cartState );

    const productsState = useSelector((state:any) => state.productsState );
    const isReading = useSelector((state:any) => state.productsState.isReading);

    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            min-height: 100vh;
        `}
        >

            {/*global tests*/}
            {/*<div css={css` margin-top: 150px`}>*/}
                {/*<div>{JSON.stringify(cartState.cartGUID)}</div>*/}
                {/*<div>{JSON.stringify(uiState.makeOpenCartView)}</div>*/}
                {/*<div css={css` margin-top: 80px`}>products N {productsState.productsArray.length}</div>*/}
                {/*<div css={css` margin-top: 80px`}>isReading {JSON.stringify(isReading)}</div>*/}
            {/*</div>*/}

            <NavBar/>

            {(!isReading) ? null :
                <div css={css` 
                        //top: 45vh;
                        //left: 50vw;
                        top:0;
                        height: 100vh;
                        width: 100vw;
                        justify-content:center; align-items:center; display: flex; flex-direction: row;
                        //transform: translate(-50%);
                        z-index: 300;
                        position: absolute;
                        background-color: transparent;
                        `}
                >
                    <SpinnerFast/>
                </div>
            }

            <div css={css` 
                z-index: 10;
                position: relative`}>

                <main>
                    <Outlet/> {/* Content specific to the route will be rendered here */}
                </main>

                {uiState.makeOpenCartView &&
                    <div
                        id={"shadow1"}
                        css={css`
                            z-index: 200;
                            position: absolute;
                            width: 100vw;
                            height: 100%;
                            min-height: 100vh;
                            top:0;
                            background-color: ${(uiState.makeOpenCartView) ? 'black' : 'transparent'};
                            opacity: 0.5;
                        `}
                    >
                    </div>
                }


            </div>


            <footer css={css`
                justify-self: end;
                flex-direction: row;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                padding: 25px;
                background-color: black;
                color: white;
            `}>
                Copyright by foto888999@gmail.com
            </footer>

            {/*<div>HomePage1</div>*/}

            {/*<DataJsonAnalyser/>*/}

        </div>
    );
};
