import {css} from "@emotion/react";
import IconCart from "../core/universal/IconCart";
import React from "react";

const ButtonOpen = (props:any) => {

    const {navState, setNavState} = props

    return <div css={css` position: relative;

        border: none;
        background-color: red;
        cursor: pointer;
    `}
    >

        <div css={css` top: -16px;
            position: absolute;
            background-color: #61dafb`}>
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

            <div css={css` background-color: fuchsia;
                position: absolute;
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

        </div>

    </div>


}
export default ButtonOpen
