/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import {ui} from "../../HomePage";

const SelectOptionColor=(props:any)=>{
    // console.log("props11",props)
    const {optionsSet}=props;
    return <>

        {optionsSet?.option_items && optionsSet.option_items.map((optionItem: any, j: number) => {

            return <div style={{paddingLeft:'4px',paddingRight:'4px', cursor:'pointer'}} key={j}
                css={css`
                    gap:8px;
                    border: 2px solid ${(optionItem.id === props.cardState.optionsSelected[optionsSet?.option_header.id])?ui.colorMain:'white'}  ;
                    padding: ${(optionItem.id === props.cardState.optionsSelected[optionsSet?.option_header.id])?4:0}px ;
                `}
            >
                {/*<div>{JSON.stringify(optionItem.id === props.cardState.optionsSelected[optionsSet?.option_header.id])}</div>*/}
                <div
                    // style={{ borderRadius:'5', border:'solid green 1px', padding:'5px', }}
                    css={css`  width: 20px; height: 20px; background-color:${optionItem.name};
                    `}
                    onClick={()=>{
                        // console.log("=== option ",optionsSet?.option_header.name, optionsSet?.option_header.id ," value ", optionItem.id)

                        props.setCardState((prevState:any)=>{
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

export default SelectOptionColor;
