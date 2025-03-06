/** @jsxImportSource @emotion/react */
import {ADD_TO_CART_MUTATION} from "../redux/ADD_TO_CART_MUTATION";
import {fetchGraphQL} from "../database/generator/fetchGraphQL";
import React from "react";
import {ui} from "./HomePage";

import { css, jsx } from '@emotion/react';
import ButtonCircle from "./ButtonCircle";

const ProductCardAddToCart = (props:any) => {

    const {cardState, setCardState} = props;

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
          <ButtonCircle

              productIndex={props.productIndex}

                   onClick={() => {

                       setCardState((prevState: any) => {
                           return {
                               ...prevState,
                               qty: prevState.qty + 1
                           }
                       })

                       const q = ADD_TO_CART_MUTATION()
                       // console.log("q1",q)

                       fetchGraphQL({
                           entityName: 'ADD_TO_CART_MUTATION',
                           setDataCallback: (d: any) => {
                               console.log('=== ADD_TO_CART_MUTATION response ', d)
                               // setData((prevState) => { return{ ...prevState,
                               //     cartItems: d?.data?.cart?.items
                               // }})
                           },
                           gqlRequest: q
                       })

                   }}

              >
                  +
          </ButtonCircle>

          <div css={css`
              font-size: 20px;
              color: var(--colorMain) ;
              padding-left: 20px;
              padding-right: 20px;
          `}>
               {cardState.qty}
          </div>

          {/*button minus*/}
          <ButtonCircle

              productIndex={props.productIndex}

                   onClick={() => {

                       setCardState((prevState: any) => {
                           return {
                               ...prevState,
                               qty: (-1 === (prevState.qty - 1)) ? 0 : prevState.qty - 1
                           }
                       })


                       const q = ADD_TO_CART_MUTATION({qty: -1})
                       // console.log("q1",q)

                       fetchGraphQL({
                           entityName: 'ADD_TO_CART_MUTATION',
                           setDataCallback: (d: any) => {
                               console.log('=== ADD_TO_CART_MUTATION response ', d)
                               // setData((prevState) => { return{ ...prevState,
                               //     cartItems: d?.data?.cart?.items
                               // }})
                           },
                           gqlRequest: q
                       })

                   }}
              >
                  -
              </ButtonCircle>
      </div>
  )
}

export default ProductCardAddToCart;
