/** @jsxImportSource @emotion/react */
import {ui} from "../../HomePage";

const SelectOptionSize=(props:any)=>{
    console.log("option0 props1",props)
    const {optionsSet}=props;
    return <>

        {optionsSet?.option_items && optionsSet.option_items.map((optionItem: any, j: number) => {

            return <div id="div1" style={{paddingLeft:'4px',paddingRight:'4px',}} key={(optionsSet?.option_header.name+"-"+optionItem.id).replaceAll(" ","-")}
                        onClick={()=>{
                            console.log("=== option1 ",optionsSet?.option_header.name, optionsSet?.option_header.id ," value ", optionItem.id)

                            props.setCardState((prevState:any)=>{
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

export default SelectOptionSize;
