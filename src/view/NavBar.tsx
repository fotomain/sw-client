/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import IconCart from "./core/lib/IconCart";
import React, {useRef} from "react";

import CartView from "./cart/CartView";

import {CiGlobe} from "react-icons/ci";
import IconMaterial from "./core/lib/IconMaterial";
import useClickOut from "./core/functions";
import {useDispatch, useSelector} from "react-redux";
import {makeOpenCartView, uiSlice} from "../redux/ui/uiSlice";
import {useNavigate} from "react-router";
import MenuDesktop from "./MenuDesktop";
import InputSearchNavBar from "./product/InputSearchNavBar";


const NavBar = (props:any) => {

    const dialogRef = useRef(null);

    const uiState = useSelector((state:any) => state.uiState );

    useClickOut(dialogRef,uiState.makeOpenCartView,
        ()=>{
            console.log("v1-3")
            dispatch(uiSlice.actions.setValue({
                key:makeOpenCartView,
                value: false,
            }))
        },
        "iconCart1"
    );

    const cartStateGlobal = useSelector((state:any) => state.cartState );
    // console.log("cartStateGlobal8",cartStateGlobal)

    const dispatch = useDispatch();

    const navigate = useNavigate()

    return <nav
        css={css`
            position: fixed;
            z-index: 200;
            background-color: white;
            width: 100vw;
            height: 8vh;
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
            background-color: transparent;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        `}>
            <IconMaterial color={uiState.colorPrimary} size={32} icon={CiGlobe}
                          onClick={() => {
                              navigate(`/home`)
                          }}
            />
        </div>


        <MenuDesktop/>

        <InputSearchNavBar/>

        {/*<div>isEmpty{JSON.stringify(cartStateGlobal.isEmpty)}</div>*/}


        <button
            data-testid='cart-btn'
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
                id={'iconCart1'} // for OutClick
                color={(cartStateGlobal.isEmpty) ? 'grey' : uiState.colorPrimary}

                onClick={(e:any) => {

                    e.stopPropagation()

                    if (cartStateGlobal.isEmpty) return
                    console.log("uiState.makeOpenCartView1", uiState.makeOpenCartView)

                    if(uiState.makeOpenCartView) {
                        console.log("v1-1")
                        dispatch(uiSlice.actions.setValue({
                            key: makeOpenCartView,
                            value: false,
                        }))
                    }
                    else {
                        console.log("v1-2")
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
                        id={'iconBubble1'}
                        css={css`
                            position: absolute;
                            background-color: fuchsia;
                            width: auto;
                            //width: 1rem;
                            //top: -.5rem;
                            //right: -0.6rem;
                            font-size: .8rem;
                            top: -.9rem;
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
                        <div>{cartStateGlobal?.cartArray?.cart_lines?.length}&nbsp;</div>
                        <div>{(1 === cartStateGlobal?.cartArray?.cart_lines?.length) ? 'item' : 'items'}</div>
                    </div>
                }


            </div>

        </button>

        <div data-testid='cart-overlay'>
        <dialog open={uiState.makeOpenCartView}
                ref={dialogRef}
                css={css`
                    position: absolute;
                    z-index: 20;
                    
                    //TODO params1
                    width: 250px;
                    min-width: 250px;
                    background-color: white;
                    // - width of IconCart - shift of the tip

                    //params1 NavBar
                    top: 70px;
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
        </div>

    </nav>

}

export default NavBar;
