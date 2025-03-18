/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {ui} from "../LayoutPage";

import ButtonPrimary from "../core/universal/ButtonPrimary";
import ButtonSecondary from "../core/universal/ButtonSecondary";

import {READ_CART_QUERY} from "../../redux/cart/graphql/READ_CART_QUERY";
import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import {css} from "@emotion/react";
import {useDispatch, useSelector} from "react-redux";
import {cartSlice} from "../../redux/cart/cartSlice";
import CartLine from "./CartLine";
import {makeOpenCartView, uiSlice} from "../../redux/ui/uiSlice";
import {MdRefresh} from "react-icons/md";
import IconMaterial from "../core/universal/IconMaterial";
import {orderSlice} from "../../redux/order/orderSlice";

const CartView = () => {

    const [cartState, setCartState] = useState({
        cartItems:[],
        qty:0,
    })


    const dispatch = useDispatch();

    const cartStateGlobal = useSelector((state:any) => state.cartState );

    console.log('cartStateGlobal2',cartStateGlobal)


    useEffect(() => {
        console.log("dispatch1")
        dispatch(cartSlice.actions.read({cart_guid:'XXX'}))
    }, []);


    return(<>

        <div style={{
            overflowY:'auto',
            maxHeight:'90vh',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'start',
            alignItems: 'center',
            // backgroundColor: ui.oolorBackgroundMain,
        }}>


            {/*<div>{JSON.stringify(cartState.cartItems)}</div>*/}
            {(cartStateGlobal?.cartArray?.cart_lines && cartStateGlobal?.cartArray?.cart_lines.length > 0) && cartStateGlobal?.cartArray?.cart_lines.map((cartLine: any, lineI: number) => {

                return <div css={css`
                    width: 100%;
                    //height: auto;
                    display: flex;
                    flex-direction: column;
                    //justify-content: space-between;
                    //debug background-color: red;
                    //debug border: 1px blue solid;
                `}
                            key={cartLine.cart_line_id}
                >

                    <CartLine
                        product={cartLine.product_object}
                        cartLine={cartLine}
                        cartState={cartState}
                        setCartState={setCartState}
                    />

                </div>

                // return <div css={css` min-width: 250px `} key={cartLine.cart_line_id}>
                //
                // <div>{cartLine.product_object?.name} {cartLine.cart_line_id}</div>
                //
                //
                // </div>
            })}

            <div
                css={css`
                    width: 100%;
                    padding-top: 12px;
                    justify-content: space-between;
                    align-items: center;
                    display: flex;
                    flex-direction: row
                `}
            >
                <div>Total:</div>
                <div>${(!cartStateGlobal?.cartArray?.cart_total)?0:cartStateGlobal?.cartArray?.cart_total}</div>
            </div>

            <div
                css={css`
                    width: 100%;
                    margin-top: 12px;
                    justify-content: space-between;
                    align-items: center;
                    display: flex;
                    flex-direction: row `
                }
            >

                <ButtonPrimary
                    style={{ borderRadius:0, padding: '12px', width: '100%'}}
                    onClick={() => {

                        if(cartStateGlobal?.isEmpty) {
                            window.alert("Cart is empty...")
                            return
                        }

                        dispatch(uiSlice.actions.setValue({
                            key:makeOpenCartView,
                            value: false,
                        }))

                        dispatch(orderSlice.actions.create({
                            cart_guid:"cc6bb519-f811-11ef-a13a-55e370885b2f"
                        }))

                    }}

                >
                    PLACE ORDER
                </ButtonPrimary>

            </div>

        </div>


    </>)
}

export default CartView;


// return <div>
//     {JSON.stringify(cartStateGlobal?.cartArray?.cart_lines[lineI].product_object?.name)}
//     <div style={{
//         display: 'flex',
//         flexDirection: 'row',
//         alignContent: 'center',
//         alignItems: 'center',
//         // minWidth: '200px',
//         maxWidth: '200px',
//         // border: '1px solid green',
//     }}>
//         <ButtonFigure style={{
//             width: "22px", height: "22px",
//             backgroundColor: 'transparent', color: ui.colorMain
//         }}
//                       onClick={() => {
//
//                           dispatch(cartSlice.actions.delete({
//                               cart_guid: 'cc6bb519-f811-11ef-a13a-55e370885b2f',
//                               cart_line_id: cartLine.cart_line_id,
//                           }))
//
//
//                       }}
//         >
//
//
//             <IconMaterial size={18} icon={MdClose}/>
//
//         </ButtonFigure>
//     </div>
// </div>
