/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";


import React from "react";
import {useSelector} from "react-redux";

const ButtonBasic = (props:any) => {

    const uiState = useSelector((state:any) => state.uiState );

    let {color,backgroundColor,borderColor,...other} = props;
    if(!color) {
        color = "white"
    }
    if(!backgroundColor) {
        backgroundColor = uiState.colorPrimary
    }
    if(!borderColor) {
        borderColor = backgroundColor
    }

  return(<>
      <button
          {...other}
          css={css`
                cursor: pointer;
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
