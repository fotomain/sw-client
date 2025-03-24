/** @jsxImportSource @emotion/react */

import React from "react";
import {css} from "@emotion/react";

import SelectOptionColor from "./lib/SelectOptionColor";
import SelectOptionSize from "./lib/SelectOptionSize";
import {forCart, forPDP} from "./ProductDetailsPage";

const ProductCardOptions = (props:any) => {

    const {cardState,setCardState} = props;

    const OptionsViewArray:any = {
        "Color":SelectOptionColor,
        "Size":SelectOptionSize
    }

    const OptionsView = (params:any) =>{

        let Ret = OptionsViewArray[params.optionsSet?.option_header.name]
        if(undefined===Ret) Ret=OptionsViewArray['Size']

        return <Ret {...params} />;
    }


  return <>
      {/*<div>{JSON.stringify(cardState.optionsArray)}</div>*/}
      {/*optionsArray*/}
      {0!==cardState.optionsArray.length && cardState.optionsArray.map((optionsSet:any,i:number)=>{

          let testText1=""
          if(forCart===props.addTestData)
          {
              testText1="cart-item-attribute-"+optionsSet?.option_header.name.toLowerCase()
          } else if(forPDP===props.addTestData){
              testText1="product-attribute-"+optionsSet?.option_header.name.toLowerCase()
          }

          return(
              <div key={i}
                   css={css` 
                      //debug background-color: #ffdc6a;   
                  `}
                   data-testid={testText1}
              >
                  <div css={css` 
                      margin-bottom: ${props.cartMode?'2px':'12px'};  
                      font-size: ${props.cartMode?'12px':'18px'};  
                  `}
                  >
                      {optionsSet?.option_header.name}
                  </div>

                  <div style={{
                      paddingBottom: props.cartMode?'0px':'4px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                      flexWrap:'wrap',
                  }}
                  >

                      <OptionsView

                          addTestData={props.addTestData}
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
