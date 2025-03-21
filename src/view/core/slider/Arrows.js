/** @jsxImportSource @emotion/react */

import React from "react";
import {MdArrowBackIosNew} from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import IconMaterial from "../lib/IconMaterial";
import {ui} from "../../LayoutPage";
import {css} from "@emotion/react";

function Arrows({ prevSlide, nextSlide }) {
  return (
    <>
           <IconMaterial
               onClick={prevSlide}
               css={css`  
                  color: transparent;
                  cursor: pointer;
                  z-index: 100;
                  position: absolute;
                  top: 50%;
                  padding: .5rem;
                  background-color: gray;
                  user-select: none;
              `}
               color={'white'} size={24} icon={MdArrowBackIosNew}
           />

        <IconMaterial
            onClick={prevSlide}
            css={css`  
                  right: 0;
                  color: transparent;
                  cursor: pointer;
                  z-index: 100;
                  position: absolute;
                  top: 50%;
                  padding: .5rem;
                  background-color: gray;
                  user-select: none;
              `}
            color={'white'} size={24} icon={MdArrowForwardIos}
        />
        {/*&#10095;*/}
    </>
  );
}

export default Arrows;
