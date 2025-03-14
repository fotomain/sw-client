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


export let ui:any={};
ui.colorMain="var(--colorMain)";
ui.oolorBackgroundMain="var(--oolorBackgroundMain)";
ui.oolorCardBackground=[
    'var(--YellowHorse)',
    'var(--TinySweetBlue)',
    'var(--PinkiePie)',
    'var(--Green8)',
    'var(--CreamyLightTan)',
    'var(--GreenThumb)',
    'var(--BlueUnderling)',
    'var(--PinkyRing)',
    'var(--EggYellows)',
];



export const HomePage = () => {

    const [navState, setNavState] = useState({
        makeCartViewOpen: false,
    })


    const uiState = useSelector((state:any) => state.uiState );

    return (
        <div css={css` justify-content:space-between; align-items:center; flex-direction: column; `}>

                {/*global tests*/}
                {/*<div>{JSON.stringify(uiState.makeOpenCartView)}</div>*/}

            <NavBar navState={navState} setNavState={setNavState}   />

            <div css={css` z-index: 10;
                position: relative`}>

                <ProductsGallery/>

                {uiState.makeOpenCartView &&
                    <div
                        id={"shadow1"}
                        css={css` 
                        z-index: 20;
                        position: absolute; width:100vw; 
                        height: 100%;
                        min-height: 100vh;
                        top:0;left: 0;
                        background-color: ${(uiState.makeOpenCartView) ? 'black' : 'transparent'};
                        opacity:0.5;
                    `}
                    >
                    </div>
                }


            </div>


            {/*<div>HomePage1</div>*/}

            {/*<DataJsonAnalyser/>*/}

        </div>
    );
};
