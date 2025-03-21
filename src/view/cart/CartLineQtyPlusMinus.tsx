/** @jsxImportSource @emotion/react */

import React from "react";

import { css } from '@emotion/react';
import ButtonFigure from "../core/lib/ButtonFigure";
import {MdAdd, MdRemove} from "react-icons/md";

import IconMaterial from "../core/lib/IconMaterial";
import {cartSlice} from "../../redux/cart/cartSlice";
import {useDispatch, useSelector} from "react-redux";


const CartLineQtyPlusMinus = (props:any) => {

    const dispatch = useDispatch();

    const uiState = useSelector((state:any) => state.uiState );

  return(
      <div
          id={'dd1'}
          style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          // minWidth: '200px',
          maxWidth: '40px',
          height: '100%',
          // border: '1px solid green',
      }}>

          {/*button plus*/}
          <ButtonFigure square={true} style={{
              width: "18px", height: "18px",
              backgroundColor:'white',
              color:uiState.colorPrimary
          }}

                        data-testid='cart-item-amount-increase'

                        productIndex={props.productIndex}

                        onClick={() => {


                       dispatch(cartSlice.actions.create({
                           qty: 1,
                           product:props.product_object,
                           optionsSelected:props.product_options,
                       }))

                   }}
          >

              <IconMaterial size={16} icon={MdAdd}/>

          </ButtonFigure>

          <div
              data-testid='cart-item-amount'
              css={css`
                  //width: 40px;
                  font-size: 1rem;
                  color: var(--colorMain) ;
                  //padding-left: 20px;
                  //padding-right: 20px;
                  display: flex; flex-direction: row; justify-content: center;
                  background-color: white;
              `}
          >
               {props.qty}
          </div>

          {/*button minus*/}
          <ButtonFigure square={true} style={{
              width: "18px", height: "18px",
              backgroundColor:'white', color:uiState.colorPrimary
          }}

                        data-testid='cart-item-amount-decrease'

                        productIndex={props.productIndex}

                        onClick={() => {

                       dispatch(cartSlice.actions.create({
                           qty: -1,
                           product:props.product_object,
                           optionsSelected:props.product_options,
                       }))

                   }}
              >
                    <IconMaterial size={18} icon={MdRemove}/>
              </ButtonFigure>
      </div>
  )
}

export default CartLineQtyPlusMinus;
