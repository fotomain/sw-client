/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import IconCart from "../../core/lib/IconCart";
import React, {useRef} from "react";

import CartView from "../cart/CartView";
import useClickOut from "../../core/functions";
import {useDispatch, useSelector} from "react-redux";
import {makeOpenCartView, uiSlice} from "../../redux/ui/uiSlice";

import MenuDesktop from "./MenuDesktop";
import InputSearchNavBar from "./InputSearchNavBar";
import Logo from "./Logo";


const NavBar = (props: any) => {

    const dialogRef = useRef(null);

    const uiState = useSelector((state: any) => state.uiState);

    useClickOut(dialogRef, uiState.makeOpenCartView,
        () => {

            dispatch(uiSlice.actions.setValue({
                key: makeOpenCartView,
                value: false,
            }))
        },
        ["iconCart1", "iconBubble1", "iconBubble2"]
    );

    const cartStateGlobal = useSelector((state: any) => state.cartState);

    const dispatch = useDispatch();

    return <nav
        css={css`
            position: fixed;
            z-index: 200;
            background-color: white;
            width: 100vw;
            height: 8vh;
            min-height: 70px; //params125 see <dialog
            //padding-left: 80px;
            //padding-right: 88px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            //background-color: red;

        `}
    >

        <div css={css`
            margin-left: 24px;
        `}>
            <Logo/>
        </div>

        <MenuDesktop/>

        <InputSearchNavBar/>

        <button
            data-testid='cart-btn'
            //params1
            // disabled={cartStateGlobal.isEmpty}

            css={css` position: relative;
                border: none;
                background-color: transparent;
                cursor: pointer;
                margin-right: 24px;
            `}

            color={(cartStateGlobal.isEmpty) ? 'grey' : uiState.colorPrimary}

        >

            <IconCart
                id={'iconCart1'} // for ClickOut
                color={(cartStateGlobal.isEmpty) ? 'grey' : uiState.colorPrimary}

                onClick={(e: any) => {

                    //=== PROBLEM if (cartStateGlobal.isEmpty) return

                    if (uiState.makeOpenCartView) {

                        dispatch(uiSlice.actions.setValue({
                            key: makeOpenCartView,
                            value: false,
                        }))
                    } else {

                        dispatch(uiSlice.actions.setValue({
                            key: makeOpenCartView,
                            value: true,
                        }))
                    }

                }}/>

            <div css={css`
                right: 2rem;
                top: -1px;
                position: absolute;
            `}>

                {(cartStateGlobal.isEmpty) ? null :
                    <div
                        css={css`
                            z-index: 210;
                            position: absolute;
                            background-color: fuchsia;
                            width: auto;
                            //width: 1rem;
                            //top: -.5rem;
                            //right: -0.6rem;
                            font-size: .8rem;
                            top: -1.05rem;
                            right: -2rem;
                            padding-top: 2px;
                            padding-bottom: 2px;
                            padding-left: 5px;
                            padding-right: 5px;
                            height: 1rem;
                            border-radius: 50px;
                            color: white;
                            display: flex;
                            flex-direction: row;
                            justify-content: start;
                            align-items: center;
                        `}
                        onClick={() => {

                            dispatch(uiSlice.actions.setValue({
                                key: makeOpenCartView,
                                value: !uiState.makeOpenCartView,
                            }))

                        }}
                    >
                        <div id={'iconBubble1'}>{cartStateGlobal?.cartArray?.cart_lines?.length}&nbsp;</div>
                        <div
                            id={'iconBubble2'}>{(1 === cartStateGlobal?.cartArray?.cart_lines?.length) ? 'item' : 'items'}</div>
                    </div>
                }

            </div>

        </button>

        <dialog open={uiState.makeOpenCartView}
                id={'dialog1'}
                data-testid='cart-overlay'
                ref={dialogRef}
                css={css`
                    position: absolute;
                    //z-index: 20;

                    //TODO params1
                    width: 250px;
                    min-width: 250px;
                    background-color: white;
                    // - width of IconCart - shift of the tip

                    //params1 NavBar
                    top: 65px; //params125 see <nav
                    margin-right: 0;
                    //transform: translate(100%);
                    //margin-right: calc(100% - 24px - 0.6rem);

                    border: none;
                    animation: fadein .5s ease-in forwards;

                    @keyframes fadein {
                        0% {
                            opacity: 0;
                        }
                        100% {
                            opacity: 1;
                        }
                    }
                `}
        >

            <CartView/>

        </dialog>

    </nav>

}

export default NavBar;
