/** @jsxImportSource @emotion/react */

import React from "react";
import {CiShoppingCart} from "react-icons/ci";
import {ui} from "../../LayoutPage";
import IconMaterial from "./IconMaterial";


const IconCart = (props:any) => {
        // @ts-ignore
        return <IconMaterial color={ui.colorMain} size={24} icon={CiShoppingCart} {...props}  />
};
export default IconCart
