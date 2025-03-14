/** @jsxImportSource @emotion/react */

import React from "react";
import {css} from "@emotion/react";
import {ui} from "../LayoutPage";
import SelectOptionColor from "./lib/SelectOptionColor";
import SelectOptionSize from "./lib/SelectOptionSize";

const ProductCardOptions = (props:any) => {

    const {cardState,setCardState} = props;


    const OptionsViewArray:any = {
        "Color":SelectOptionColor,
        "Size":SelectOptionSize
    }

    const OptionsView = (params:any) =>{
        // console.log("params.optionsSet?.option_header1",params.optionsSet)
        let Ret = OptionsViewArray[params.optionsSet?.option_header.name]
        if(undefined===Ret) Ret=OptionsViewArray['Size']
        // console.log("Ret1",Ret)
        return <Ret {...params} />;
    }

  return <>
      {/*<div>{JSON.stringify(cardState.optionsArray)}</div>*/}
      {/*optionsArray*/}
      {0!==cardState.optionsArray.length && cardState.optionsArray.map((optionsSet:any,i:number)=>{
          return(
              <div key={i}
                   css={css` 
                      //debug background-color: #ffdc6a;   
                  `}
              >
                  <div css={css` 
                      margin-bottom: ${props.cartMode?'2px':'12px'};  
                      font-size: ${props.cartMode?'12px':'18px'};  
                  `}>
                      {optionsSet?.option_header.name}
                  </div>

                  <div style={{
                      paddingBottom: props.cartMode?'0px':'4px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                      flexWrap:'wrap',
                  }}>

                      <OptionsView

                          readOnly={props.readOnly}
                          cartMode={props.cartMode}

                              optionsSet={optionsSet}
                              cardState={cardState}
                              setCardState={setCardState}

                      />


                  </div>
              </div>
          )
      })}

  </>
}

export default ProductCardOptions;
