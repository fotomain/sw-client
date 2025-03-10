import React from "react";
import ButtonBasic from "./ButtonBasic";
import {ui} from "../../HomePage";

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
