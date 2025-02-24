import React, {useState} from "react";
import ProductsGallery from "./ProductsGallery";
import DataJsonAnalyser from "../DataJsonAnalyser";
import DataJsonGenerator from "../DataJsonGenerator";

export const HomePage = () => {

    return (
        <>
            <div>HomePage</div>
            {/*<ProductsGallery/>*/}
            {/*<DataJsonAnalyser/>*/}
            <DataJsonGenerator/>
        </>
    );
};
