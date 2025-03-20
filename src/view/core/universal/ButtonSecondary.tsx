import React from "react";
import ButtonBasic from "./ButtonBasic";

import {useSelector} from "react-redux";

const ButtonSecondary = (props:any) => {
    const uiState = useSelector((state:any) => state.uiState );
    return(<>
        <ButtonBasic {...props}
                     backgroundColor="white"
                     borderColor={uiState.colorPrimary}
                     color={uiState.colorPrimary}
        />
    </>)
}
export default ButtonSecondary
