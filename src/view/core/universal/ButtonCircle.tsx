/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import {ui} from "../../HomePage";
import {MdAdd} from "react-icons/md";
import React from "react";

const ButtonCircle = (props:any) => {

    const {productIndex,...other} = props;
    let color="white"
    let shadow="white"
    if(productIndex){
        color = ui.oolorCardBackground[productIndex%9]
        shadow = ui.oolorCardBackground[productIndex%9]
    }

  return(<>
      <div
          css={css`
                display:flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
              
                cursor: pointer;
              
                color:${color};
                background-color: #4ABF77;

                border-radius: 50%;
                box-shadow: 0px 0px 0px 2px ${shadow},0px 0px 0px 4px #4ABF77;
                /*box-shadow: 0px 0px 0px 10px red, 0px 0px 0px 20px green, 0px 0px 0px 30px yellow, 0px 0px 0px 40px pink;*/
                width: 40px;
                height:40px;
            `}
          {...other}
      >
          {props.children}
      </div>
  </>)
}
export default ButtonCircle;
