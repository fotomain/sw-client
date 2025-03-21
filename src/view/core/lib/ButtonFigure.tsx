/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";


import React from "react";
import {useSelector} from "react-redux";

const ButtonFigure = (props:any) => {

    const uiState = useSelector((state:any) => state.uiState );

    const {productIndex,square,...other} = props;
    let color="white"
    let shadow="white"
    // if(productIndex){
    //     color = uiState.colorCardBackground[productIndex%9]
    //     shadow = uiState.colorCardBackground[productIndex%9]
    // }


  return(<>
      <div
          css={css`
                display:flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
              
                cursor: pointer;
              
                color:${color};
                background-color: ${uiState.colorPrimary};

                border-radius: ${(props.square)?'1px':'50%'};
                box-shadow: 0px 0px 0px 2px ${shadow},0px 0px 0px 4px ${uiState.colorPrimary};
                /*box-shadow: 0px 0px 0px 10px red, 0px 0px 0px 20px green, 0px 0px 0px 30px yellow, 0px 0px 0px 40px pink;*/
                width: 20px;
                height:20px;
            `}
          {...other}
      >
          {props.children}
      </div>
  </>)
}
export default ButtonFigure;
