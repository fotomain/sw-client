/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";

import {useSelector} from "react-redux";
import {forCart, forPDP} from "../ProductDetailsPage";

const SelectOptionColor = (props: any) => {

    const {optionsSet} = props;

    const uiState = useSelector((state: any) => state.uiState);


    return <>

        {optionsSet?.option_items && optionsSet.option_items.map((optionItem: any, j: number) => {

            let testText1 = ""
            if (forCart === props.addTestData) {
                testText1 = "cart-item-attribute-" + optionsSet?.option_header.name.toLowerCase() + "-" + optionItem.name
            } else if (forPDP === props.addTestData) {
                testText1 = "product-attribute-" + optionsSet?.option_header.name.toLowerCase() + "-" + optionItem.value
            }

            return <div style={{paddingLeft: '4px', paddingRight: '4px', cursor: 'pointer'}} key={j}
                        css={css`
                            gap: 8px;
                            border: 2px solid ${(optionItem.id === props.cardState.optionsSelected[optionsSet?.option_header.id]) ? uiState.colorPrimary : 'white'};
                            padding: ${(optionItem.id === props.cardState.optionsSelected[optionsSet?.option_header.id]) ? 4 : 0}px;
                        `}
            >
                {/*<div>{JSON.stringify(optionItem.id === props.cardState.optionsSelected[optionsSet?.option_header.id])}</div>*/}
                <div
                    data-testid={testText1}
                    css={css`
                        width: ${props.cartMode ? '15px' : '20px'};
                        height: ${props.cartMode ? '15px' : '20px'};
                        background-color: ${optionItem.name};
                    `}
                    onClick={() => {

                        if (props.readOnly) return

                        props.setCardState((prevState: any) => {


                            let op = prevState.optionsSelected;
                            op[optionsSet?.option_header.id] = optionItem.id;
                            return {
                                ...prevState,
                                optionsSelected: op,
                            }
                        })


                    }}>
                </div>
            </div>

        })}

    </>
}

export default SelectOptionColor;
