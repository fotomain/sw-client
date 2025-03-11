/** @jsxImportSource @emotion/react */
import {ADD_TO_CART_MUTATION} from "../../redux/cart/graphql/ADD_TO_CART_MUTATION";
import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import React from "react";
import {ui} from "../HomePage";

import { css, jsx } from '@emotion/react';
import ButtonCircle from "../core/universal/ButtonCircle";
import {MdAdd, MdRemove} from "react-icons/md";

import IconMaterial from "../core/universal/IconMaterial";
import {cartSlice} from "../../redux/cart/cartSlice";
import {useDispatch} from "react-redux";


const CartLineQtyPlusMinus = (props:any) => {

    const dispatch = useDispatch();

  return(
      <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          // minWidth: '200px',
          maxWidth: '200px',
          // border: '1px solid green',
      }}>

          {/*button plus*/}
          <ButtonCircle style={{width: "22px", height: "22px", backgroundColor:'transparent', color:ui.colorMain}}

              productIndex={props.productIndex}

                   onClick={() => {


                       dispatch(cartSlice.actions.create({
                           cart_guid:"cc6bb519-f811-11ef-a13a-55e370885b2f",
                           qty: 1,
                           product:props.product_object,
                           optionsSelected:props.product_options,
                       }))

                       // const q = ADD_TO_CART_MUTATION({
                       //     cart_guid:"cc6bb519-f811-11ef-a13a-55e370885b2f",
                       //     qty: 1,
                       //     product:props.product_object,
                       //     optionsSelected:props.product_options,
                       // })
                       //
                       // fetchGraphQL({
                       //     entityName: 'ADD_TO_CART_MUTATION',
                       //     setDataCallback: (d: any) => {
                       //         console.log('=== ADD_TO_CART_MUTATION response ', d)
                       //         // setData((prevState) => { return{ ...prevState,
                       //         //     cartItems: d?.data?.cart?.items
                       //         // }})
                       //     },
                       //     gqlRequest: q
                       // })

                   }}
          >

              <IconMaterial size={24} icon={MdAdd}/>

          </ButtonCircle>

          <div css={css`
              width: 40px;
              font-size: 16px;
              color: var(--colorMain) ;
              padding-left: 20px;
              padding-right: 20px;
              display: flex; flex-direction: row; justify-content: center;
          `}>
               {props.qty}
          </div>

          {/*button minus*/}
          <ButtonCircle style={{width: "22px", height: "22px", backgroundColor:'transparent', color:ui.colorMain}}

              productIndex={props.productIndex}

                   onClick={() => {

                       dispatch(cartSlice.actions.create({
                           cart_guid:"cc6bb519-f811-11ef-a13a-55e370885b2f",
                           qty: -1,
                           product:props.product_object,
                           optionsSelected:props.product_options,
                       }))

                       // const q = ADD_TO_CART_MUTATION({
                       //     cart_guid:"cc6bb519-f811-11ef-a13a-55e370885b2f",
                       //     qty: -1,
                       //     product:props.product_object,
                       //     optionsSelected:props.product_options,
                       // })
                       //
                       // fetchGraphQL({
                       //     entityName: 'ADD_TO_CART_MUTATION',
                       //     setDataCallback: (d: any) => {
                       //         console.log('=== ADD_TO_CART_MUTATION response ', d)
                       //         // setData((prevState) => { return{ ...prevState,
                       //         //     cartItems: d?.data?.cart?.items
                       //         // }})
                       //     },
                       //     gqlRequest: q
                       // })

                   }}
              >
                    <IconMaterial size={24} icon={MdRemove}/>
              </ButtonCircle>
      </div>
  )
}

export default CartLineQtyPlusMinus;
