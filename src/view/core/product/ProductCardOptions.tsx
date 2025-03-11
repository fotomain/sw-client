/** @jsxImportSource @emotion/react */

import React from "react";
import {css} from "@emotion/react";
import {ui} from "../../HomePage";

const ProductCardOptions = (props:any) => {

    const {cardState,setCardState} = props;

    const SelectOptionColor=(props:any)=>{
        // console.log("props1",props)
        const {optionsSet}=props;
        return <>

            {optionsSet?.option_items && optionsSet.option_items.map((optionItem: any, j: number) => {

                return <div style={{paddingLeft:'4px',paddingRight:'4px', cursor:'pointer'}} key={j}>
                    <div
                        // style={{ borderRadius:'5', border:'solid green 1px', padding:'5px', }}
                        css={css` width: 20px; height: 20px; background-color:${optionItem.name} `}
                         onClick={()=>{
                             console.log("=== option ",optionsSet?.option_header.name, optionsSet?.option_header.id ," value ", optionItem.id)

                             setCardState((prevState:any)=>{
                                 let op = prevState.optionsSelected;
                                 op[optionsSet?.option_header.id]=optionItem.id;
                                 return {...prevState,
                                     optionsSelected:op,
                                 }})


                         }}>
                        {/*{optionItem.displayValue}*/}
                    </div>
                </div>

            })}

        </>
    }
    const SelectOptionSize=(props:any)=>{
        console.log("option0 props1",props)
        const {optionsSet}=props;
        return <>

            {optionsSet?.option_items && optionsSet.option_items.map((optionItem: any, j: number) => {

                return <div id="div1" style={{paddingLeft:'4px',paddingRight:'4px',}} key={(optionsSet?.option_header.name+"-"+optionItem.id).replaceAll(" ","-")}
                            onClick={()=>{
                                console.log("=== option1 ",optionsSet?.option_header.name, optionsSet?.option_header.id ," value ", optionItem.id)

                                setCardState((prevState:any)=>{
                                    let op = prevState.optionsSelected;
                                    op[optionsSet?.option_header.id]=optionItem.id;
                                    return {...prevState,
                                        optionsSelected:op,
                                    }})


                            }}
                >
                    <div style={{ borderRadius:'5px', border:`solid ${ui.colorMain} 1px`, padding:'5px', cursor:'pointer'}}

                    >
                        {optionItem.displayValue}
                    </div>
                </div>

            })}

        </>
    }

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
                  <div>{optionsSet?.option_header.name}</div>
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
