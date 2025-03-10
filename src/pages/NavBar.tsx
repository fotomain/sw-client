/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import IconCart from "./core/universal/IconCart";
import React, {useState} from "react";

const NavBar = (props:any) => {

    const {navState, setNavState} = props;

    return <div
        css={css`
                background-color: white;
                width:100vw; height: 5vh; 
                padding-left: 12px;
                padding-right: 12px;
                display: flex; flex-direction: row-reverse; justify-content: space-between; align-items: center;
                
            `}
    >
        <div css={css` background-color: lightgreen `}><p>Logo</p></div>

        <div css={css` position: relative; border: none; background-color: transparent; cursor: pointer;  `} >

            <button css={css` position: relative; border: none; background-color: transparent; cursor: pointer;  `}
                    data-testid='cart-btn'
            >
                <IconCart onClick={()=>{
                    console.log("setCartViewOpen=true")
                    setNavState((prevState:any)=>{return {...prevState,
                        makeCartViewOpen:!prevState.makeCartViewOpen
                    }})
                    // setCartViewOpen=true
                }} />
                <div css={css` background-color: fuchsia; position: absolute;
                    width: 1rem; height: 1rem;
                    border-radius: 50px;
                    top:-.5rem; right:-0.6rem;
                    color:white;
                    display: flex; flex-direction: row; justify-content: center;align-items: center;
                `}>
                    1
                </div>
            </button>
            <dialog open={navState.makeCartViewOpen} onClose={()=>{}}
                    css={css` z-index:20; width:25vw; background-color:white `}
            >
                <div>line 1</div>
                <div>line 1</div>
                <div>line 1</div>
            </dialog>
        </div>

    </div>

}

export default NavBar;
