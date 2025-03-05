import React, {useState} from "react";
import ProductsGallery from "./ProductsGallery";
import DataJsonAnalyser from "../DataJsonAnalyser";
import DataJsonGenerator from "../database/generator/DataJsonGenerator";

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
