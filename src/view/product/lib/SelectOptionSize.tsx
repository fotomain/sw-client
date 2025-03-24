/** @jsxImportSource @emotion/react */

import {useSelector} from "react-redux";
import {forCart, forPDP} from "../ProductDetailsPage";

const SelectOptionSize=(props:any)=>{

    const {optionsSet}=props;
    const uiState = useSelector((state:any) => state.uiState );



    return <>

        {optionsSet?.option_items && optionsSet.option_items.map((optionItem: any, j: number) => {


            let testText1 = ""
            if(forCart===props.addTestData){
                testText1 = "cart-item-attribute-"+optionsSet?.option_header.name.toLowerCase()
                testText1=testText1.replaceAll(" ","-")
            } else if(forPDP===props.addTestData){
                testText1="product-attribute-"+optionsSet?.option_header.name.toLowerCase()+"-"+optionItem.value
            }

            let suffixSelected = + (optionItem.id === props.cardState.optionsSelected[optionsSet?.option_header.id])?"-selected":""


            return <div id="div1"
                        data-testid={testText1+suffixSelected}

                        style={{paddingLeft:'4px',paddingRight:'4px',}} key={(optionsSet?.option_header.name+"-"+optionItem.id).replaceAll(" ","-")}
                        onClick={()=>{

                            if(props.readOnly) return

                            props.setCardState((prevState:any)=>{
                                let op = prevState.optionsSelected;
                                op[optionsSet?.option_header.id]=optionItem.id;
                                return {...prevState,
                                    optionsSelected:op,
                                }})


                        }}
            >
                <div style={{
                    borderRadius:'5px',
                    border:`solid ${uiState.colorPrimary} 1px`,
                    padding:(props.cartMode)?'2px':'5px',
                    cursor:'pointer',
                    backgroundColor:(optionItem.id === props.cardState.optionsSelected[optionsSet?.option_header.id])?uiState.colorPrimary:'transparent',
                    color:(optionItem.id === props.cardState.optionsSelected[optionsSet?.option_header.id])?'white':'green',
                    fontSize:(props.cartMode)?'12px':'18px',
                }}

                >
                    {optionItem.displayValue}
                </div>
            </div>

        })}

    </>
}

export default SelectOptionSize;
