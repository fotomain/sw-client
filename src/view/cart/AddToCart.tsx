/** @jsxImportSource @emotion/react */


import IconMaterial from "../core/universal/IconMaterial";
import {MdOutlineAddShoppingCart, MdRemove} from "react-icons/md";
import ButtonFigure from "../core/universal/ButtonFigure";
import React from "react";
import {cartSlice} from "../../redux/cart/cartSlice";
import {useDispatch} from "react-redux";


const AddToCart = (props:any) => {

    const {product, optionsSelected}=props;

    const dispatch = useDispatch();

  return <>
      <ButtonFigure

          productIndex={props.productIndex}

          onClick={() => {

              dispatch(cartSlice.actions.create({
                  qty: 1,
                  product:product,
                  optionsSelected:optionsSelected,
              }))

          }}
      >
          <IconMaterial size={24} icon={MdOutlineAddShoppingCart}/>
      </ButtonFigure>
  </>
}

export default AddToCart;
