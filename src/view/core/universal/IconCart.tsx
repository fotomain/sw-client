/** @jsxImportSource @emotion/react */

import React from "react";
import {CiShoppingCart} from "react-icons/ci";

import IconMaterial from "./IconMaterial";
import {useSelector} from "react-redux";


const IconCart = (props:any) => {
        const uiState = useSelector((state:any) => state.uiState );
        // @ts-ignore
        return <IconMaterial color={uiState.colorPrimary} size={24} icon={CiShoppingCart} {...props}  />
};
export default IconCart
