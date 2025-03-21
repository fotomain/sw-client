/** @jsxImportSource @emotion/react */

import React from "react";

import IconMaterial from "./IconMaterial";
import {MdSearch} from "react-icons/md";
import {useSelector} from "react-redux";


const IconSearch = (props:any) => {
        const uiState = useSelector((state:any) => state.uiState );
        // @ts-ignore
        return <IconMaterial color={uiState.colorPrimary} size={24} icon={MdSearch} {...props}  />
};
export default IconSearch
