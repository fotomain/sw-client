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

    // const generatorMode = true
    const generatorMode = false

    return (
        <div css={css` justify-content:space-between; align-items:center; flex-direction: column; `}>

            {generatorMode && <DataJsonGenerator/>}

            {!generatorMode && <>
            <NavBar navState={navState} setNavState={setNavState}   />

            <div css={css` z-index: 10;
                position: relative`}>

                {/*<CartView/>*/}
                <ProductsGallery/>

                {navState.makeCartViewOpen &&
                    <div css={css` 
                        z-index: 20;
                        position: absolute; width:100vw; height: 100vh;
                        top:0;left: 0;
                        background-color: ${(navState.makeCartViewOpen) ? 'black' : 'transparent'};
                        opacity:0.5;
                    `}
                    >
                    </div>
                }

            </div>
            </>}


            {/*<div>HomePage1</div>*/}

            {/*<DataJsonAnalyser/>*/}

        </div>
    );
};
