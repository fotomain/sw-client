import React from "react";
import ButtonBasic from "./ButtonBasic";
import {ui} from "../../LayoutPage";

const ButtonSecondary = (props:any) => {
    return(<>
        <ButtonBasic {...props}
                     backgroundColor="white"
                     borderColor={ui.colorMain}
                     color={ui.colorMain}
        />
    </>)
}
export default ButtonSecondary
