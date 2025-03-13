/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import IconCart from "./core/universal/IconCart";
import React, {useEffect, useRef, useState} from "react";

import CartView from "./cart/CartView";
import {ui} from "./HomePage";
import {CiGlobe} from "react-icons/ci";
import IconMaterial from "./core/universal/IconMaterial";
import useClickOut from "./core/functions";
import {useDispatch, useSelector} from "react-redux";
import {uiSlice} from "../redux/ui/uiSlice";


const NavBar = (props:any) => {

    const {navState, setNavState} = props;

    const dialogRef = useRef(null);

    const uiState = useSelector((state:any) => state.uiState );

    useClickOut(dialogRef,uiState.makeOpenCartView,
        ()=>{
            dispatch(uiSlice.actions.setValue({
                key:"makeOpenCartView",
                value: false,
            }))
        },
        "iconCart1"
    );

    const cartStateGlobal = useSelector((state:any) => state.cartState );

    // useEffect(() => {
    //     console.log('cartStateGlobal?.cartArray?.cart_lines1',cartStateGlobal?.cartArray?.cart_lines)
    // }, [cartStateGlobal?.cartArray?.cart_lines]);

    //============== makeCartViewOpen
    //============== makeCartViewOpen
    //============== makeCartViewOpen
    const dispatch = useDispatch();

    console.log("uiState1",uiState)

    return <div
        css={css`
            position: fixed;
            z-index: 200;
            background-color: white;
            width: 100vw;
            height: 6vh;
            padding-left: 12px;
            padding-right: 12px;
            display: flex;
            flex-direction:row;
            justify-content: space-between;
            align-items: center;

            //background-color: red;

        `}
    >
        <div css={css` background-color: transparent
            flex-direction: row;
            justify-content: center;
            align-items: center;
        `}>
            <IconMaterial  color={ui.colorMain} size={32} icon={CiGlobe}  />
        </div>

        <div css={css` position: relative;
            border: none;
            //background-color: red;
            cursor: pointer;
        `}
        >

            <div css={css`
                right: 4rem;
                top: -12px;
                position: absolute;
            `}>
                <IconCart

                    id={'iconCart1'}
                    onClick={() => {
                    console.log("setCartViewOpen1")

                        dispatch(uiSlice.actions.setValue({
                            key:"makeOpenCartView",
                            value: !uiState.makeOpenCartView,
                        }))

                }}/>

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
                    onClick={()=>{

                        dispatch(uiSlice.actions.setValue({
                            key:"makeOpenCartView",
                            value: !uiState.makeOpenCartView,
                        }))

                    }}
                >
                    <div>{cartStateGlobal?.cartArray?.cart_lines?.length}</div>
                    <div>{(1===cartStateGlobal?.cartArray?.cart_lines?.length)?' item':'items'}</div>
                </div>

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
                            margin-right: calc(100% - 24px - 0.6rem); 
                            
                            border: none;
                            animation: fadein .5s ease-in forwards;

                            @keyframes fadein{
                                0%{
                                    opacity:0;
                                }
                                100%{
                                    opacity:1;
                                    //background-color: green;
                                }
                            }
                        `}
                >

                    <CartView/>

                </dialog>


            </div>

        </div>


        {/*<div css={css` position: relative;*/}
        {/*    border: none;*/}
        {/*    background-color: transparent;*/}
        {/*    cursor: pointer;  `}>*/}

        {/*<button css={css` position: relative;*/}
        {/*    border: none;*/}
        {/*    background-color: transparent;*/}
        {/*        cursor: pointer;  `}*/}
        {/*            data-testid='cart-btn'*/}
        {/*    >*/}
        {/*        <IconCart onClick={() => {*/}
        {/*            console.log("setCartViewOpen=true")*/}
        {/*            setNavState((prevState: any) => {*/}
            {/*                return {*/}
            {/*                    ...prevState,*/}
            {/*                    makeCartViewOpen: !prevState.makeCartViewOpen*/}
            {/*                }*/}
            {/*            })*/}
            {/*            // setCartViewOpen=true*/}
            {/*        }}/>*/}
            {/*        <div css={css` background-color: fuchsia;*/}
            {/*            position: absolute;*/}
            {/*            width: 1rem;*/}
            {/*            height: 1rem;*/}
            {/*            border-radius: 50px;*/}
            {/*            top: -.5rem;*/}
            {/*            right: -0.6rem;*/}
            {/*            color: white;*/}
            {/*            display: flex;*/}
            {/*            flex-direction: row;*/}
            {/*            justify-content: center;*/}
            {/*            align-items: center;*/}
            {/*        `}>*/}
            {/*            1*/}
            {/*        </div>*/}
            {/*    </button>*/}
            {/*    <dialog open={navState.makeCartViewOpen} onClose={() => {*/}
            {/*    }}*/}
            {/*            css={css` z-index: 20;*/}
            {/*                width: 25vw;*/}
            {/*                background-color: white `}*/}
            {/*    >*/}
            {/*        <div>line 1</div>*/}
            {/*        <div>line 1</div>*/}
            {/*        <div>line 1</div>*/}
            {/*    </dialog>*/}
            {/*</div>*/}

        </div>

        }

        export default NavBar;
