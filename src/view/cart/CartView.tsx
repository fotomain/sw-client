/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";


import ButtonPrimary from "../core/universal/ButtonPrimary";
import {css} from "@emotion/react";
import {useDispatch, useSelector} from "react-redux";
import {cartSlice} from "../../redux/cart/cartSlice";
import CartLine from "./CartLine";
import {makeOpenCartView, uiSlice} from "../../redux/ui/uiSlice";
import {orderSlice} from "../../redux/order/orderSlice";

const CartView = () => {

    const [cartState, setCartState] = useState({
        cartItems:[],
        qty:0,
    })


    const dispatch = useDispatch();

    const cartStateGlobal = useSelector((state:any) => state.cartState );
    const orderState = useSelector((state:any) => state.orderState );

    console.log('cartStateGlobal2',cartStateGlobal)


    useEffect(() => {
        if(cartStateGlobal.isEmpty) {
            dispatch(cartSlice.actions.read({}))
        }
    }, [cartStateGlobal.cartGUID]);

    useEffect(() => {
        if(0!==orderState.momentCreated){
            console.log("orderState1",orderState?.orderArray?.order_header[0]?.cart_id)
            window.alert("Order successfully created! SQL order_header.cart_id = "+orderState?.orderArray?.order_header[0]?.cart_id)
        }
    }, [orderState.momentCreated]);


    return(<>

        <div style={{
            overflowY:'auto',
            maxHeight:'90vh',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'start',
            alignItems: 'center',

        }}>


            {/*<div>{JSON.stringify(cartState.cartItems)}</div>*/}
            {(!cartStateGlobal.isEmpty && cartStateGlobal?.cartArray?.cart_lines && cartStateGlobal?.cartArray?.cart_lines.length > 0) && cartStateGlobal?.cartArray?.cart_lines.map((cartLine: any, lineI: number) => {

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

                        dispatch(orderSlice.actions.create({}))

                    }}
                >
                    PLACE ORDER
                </ButtonPrimary>

            </div>

        </div>

    </>)
}

export default CartView;


