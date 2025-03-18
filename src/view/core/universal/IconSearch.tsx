/** @jsxImportSource @emotion/react */

import React from "react";
import {CiShoppingCart} from "react-icons/ci";
import {ui} from "../../LayoutPage";
import IconMaterial from "./IconMaterial";
import {MdSearch} from "react-icons/md";


const IconSearch = (props:any) => {
        // @ts-ignore
        return <IconMaterial color={ui.colorMain} size={24} icon={MdSearch} {...props}  />
};
export default IconSearch
