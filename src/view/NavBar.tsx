/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import IconCart from "./core/universal/IconCart";
import React, {useEffect, useRef, useState} from "react";

import CartView from "./lib/CartView";
import {ui} from "./HomePage";
import {CiGlobe, CiShoppingCart} from "react-icons/ci";
import IconMaterial from "./core/universal/IconMaterial";

const NavBar = (props:any) => {

    const {navState, setNavState} = props;

    const wrapperRef = useRef(null);


    function useClickOut(ref:any) {
        useEffect(() => {

            function handleClickOutside(event:any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    console.log('navState.makeCartViewOpen1',navState.makeCartViewOpen)
                    if(navState.makeCartViewOpen)
                    {
                        // alert("outside of me!");
                        setNavState((prevState: any) => {
                            return {
                                ...prevState,
                                makeCartViewOpen: false
                            }
                        })
                    }
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {

                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref,navState.makeCartViewOpen]);
    }

    useClickOut(wrapperRef);

    return <div
        css={css`
            background-color: white;
            width: 100vw;
            height: 5vh;
            padding-left: 12px;
            padding-right: 12px;
            display: flex;
            flex-direction:row;
            justify-content: space-between;
            align-items: center;

            //background-color: red;

        `}
    >
        <div css={css` background-color: transparent `}><p>
            <IconMaterial color={ui.colorMain} size={36} icon={CiGlobe}  />
        </p></div>

        <div css={css` position: relative;
            border: none;
            background-color: red;
            cursor: pointer;
        `}
        >

            <div css={css`
                right: 1rem;
                top: -12px;
                position: absolute;
            `}>
                <IconCart onClick={() => {
                    console.log("setCartViewOpen=true")
                    setNavState((prevState: any) => {
                        return {
                            ...prevState,
                            makeCartViewOpen: !prevState.makeCartViewOpen
                        }
                    })
                    // setCartViewOpen=true
                }}/>

                <div
                    css={css`
                    position: absolute;
                    background-color: fuchsia;
                    width: 1rem;
                    height: 1rem;
                    border-radius: 50px;
                    top: -.5rem;
                    right: -0.6rem;
                    color: white;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                `}>
                    1
                </div>

                <dialog open={navState.makeCartViewOpen}
                        ref={wrapperRef}
                        css={css` 
                            position: absolute; 
                            z-index: 20;
                            //TODO 
                            width: 25vw;
                            min-width: 300px;
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

                    {/*<div>line 1</div>*/}
                    {/*<div>line 1</div>*/}
                    {/*<div>line 1</div>*/}
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
