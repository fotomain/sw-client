/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import {ui} from "../../HomePage";
import {MdAdd} from "react-icons/md";
import React from "react";

const ButtonBasic = (props:any) => {

    let {color,backgroundColor,borderColor,...other} = props;
    if(!color) {
        color = "white"
    }
    if(!backgroundColor) {
        backgroundColor = ui.colorMain
    }
    if(!borderColor) {
        borderColor = backgroundColor
    }

  return(<>
      <button
          {...other}
          css={css`
                display:flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;

                border-radius: 50px;               
                border: 1px solid ${borderColor};
              
                color:${color};
                background-color: ${backgroundColor};

                width: 80px;
                height:40px;

            `}
      >
          {props.children}
      </button>
  </>)
}
export default ButtonBasic;
