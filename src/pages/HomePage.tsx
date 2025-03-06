import React, {useState} from "react";
import ProductsGallery from "./ProductsGallery";
import DataJsonAnalyser from "../DataJsonAnalyser";
import DataJsonGenerator from "../database/generator/DataJsonGenerator";
import CartView from "./CartView";

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

    return (
        <>
            <CartView/>
            {/*<div>HomePage1</div>*/}
            <ProductsGallery/>
            {/*<DataJsonAnalyser/>*/}
            {/*<DataJsonGenerator/>*/}
        </>
    );
};
