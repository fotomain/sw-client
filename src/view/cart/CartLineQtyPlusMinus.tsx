/** @jsxImportSource @emotion/react */
import {ADD_TO_CART_MUTATION} from "../../redux/cart/graphql/ADD_TO_CART_MUTATION";
import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import React from "react";
import {ui} from "../HomePage";

import { css, jsx } from '@emotion/react';
import ButtonFigure from "../core/universal/ButtonFigure";
import {MdAdd, MdRemove} from "react-icons/md";

import IconMaterial from "../core/universal/IconMaterial";
import {cartSlice} from "../../redux/cart/cartSlice";
import {useDispatch} from "react-redux";


const CartLineQtyPlusMinus = (props:any) => {

    const dispatch = useDispatch();

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
          <ButtonFigure square style={{
              width: "18px", height: "18px",
              backgroundColor:'white',
              color:ui.colorMain
          }}

                        productIndex={props.productIndex}

                        onClick={() => {


                       dispatch(cartSlice.actions.create({
                           cart_guid:"cc6bb519-f811-11ef-a13a-55e370885b2f",
                           qty: 1,
                           product:props.product_object,
                           optionsSelected:props.product_options,
                       }))

                   }}
          >

              <IconMaterial size={16} icon={MdAdd}/>

          </ButtonFigure>

          <div css={css`
              //width: 40px;
              font-size: 1rem;
              color: var(--colorMain) ;
              //padding-left: 20px;
              //padding-right: 20px;
              display: flex; flex-direction: row; justify-content: center;
              background-color: white;
          `}>
               {props.qty}
          </div>

          {/*button minus*/}
          <ButtonFigure square style={{
              width: "18px", height: "18px",
              backgroundColor:'white', color:ui.colorMain
          }}

                        productIndex={props.productIndex}

                        onClick={() => {

                       dispatch(cartSlice.actions.create({
                           cart_guid:"cc6bb519-f811-11ef-a13a-55e370885b2f",
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
