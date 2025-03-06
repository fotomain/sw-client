import {MdOutlineShoppingCart, MdRemove} from "react-icons/md";
import IconBasic from "./core/IconBasic";
import React from "react";
import {ui} from "./HomePage";
import ButtonBasic from "./core/ButtonBasic";
import ButtonPrimary from "./core/ButtonPrimary";
import ButtonSecondary from "./core/ButtonSecondary";

const CartView = () => {
  return(<>

      <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'start',
          alignItems: 'center',
          backgroundColor: ui.oolorBackgroundMain,
      }}>
          <IconBasic color={ui.colorMain} size={24} icon={MdOutlineShoppingCart}/>
          <ButtonPrimary
              onClick={()=>{
                  console.log("refresh1")}}
          >Refresh</ButtonPrimary>
          <ButtonSecondary
              onClick={()=>{
                  console.log("refresh1")}}
          >Close</ButtonSecondary>
      </div>


  </>)
}

export default CartView;
