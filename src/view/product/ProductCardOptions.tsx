/** @jsxImportSource @emotion/react */

import React from "react";
import {css} from "@emotion/react";
import {ui} from "../HomePage";
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
              <div key={i}>
                  <div css={css` margin-bottom:12px; `}>{optionsSet?.option_header.name}</div>
                  <div style={{
                      paddingBottom: '4px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                      flexWrap:'wrap',
                  }}>

                      <OptionsView

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
