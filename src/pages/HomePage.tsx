import React, {useState} from "react";
import ProductsGallery from "./ProductsGallery";
import DataJsonAnalyser from "../DataJsonAnalyser";
import DataJsonGenerator from "../database/generator/DataJsonGenerator";

export let ui:any={};
ui.colorMain="var(--colorMain)";
ui.oolorCardBackground=[
    'var(--YellowHorse)',
    'var(--TinySweetBlue)',
    'var(--Green8)',
    'var(--CreamyLightTan)',
    'var(--PinkiePie)',
    'var(--GreenThumb)',
    'var(--BlueUnderling)',
    'var(--PinkyRing)',
    'var(--EggYellows)',
];

export const HomePage = () => {

    return (
        <>
            {/*<div>HomePage1</div>*/}
            <ProductsGallery/>
            {/*<DataJsonAnalyser/>*/}
            {/*<DataJsonGenerator/>*/}
        </>
    );
};
