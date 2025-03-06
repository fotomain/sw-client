/** @jsxImportSource @emotion/react */

import {
    MdClose,
    MdOutlineAddShoppingCart,
    MdOutlineDelete,
    MdOutlineDeleteOutline,
    MdOutlineShoppingCart,
    MdRemove
} from "react-icons/md";
import IconMaterial from "../core/IconBasic";
import React, {useState} from "react";
import {ui} from "../HomePage";
import ButtonBasic from "../core/ButtonBasic";
import ButtonPrimary from "../core/ButtonPrimary";
import ButtonSecondary from "../core/ButtonSecondary";
import {ADD_TO_CART_MUTATION} from "../../redux/graphql/ADD_TO_CART_MUTATION";
import {READ_CART_QUERY} from "../../redux/graphql/READ_CART_QUERY";
import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import CartLineQtyPlusMinus from "../core/CartLineQtyPlusMinus";
import ButtonCircle from "../core/ButtonCircle";
import {css} from "@emotion/react";
import {DELETE_CART_LINE_QUERY} from "../../redux/graphql/DELETE_CART_LINE_QUERY";

const CartView = () => {

    const [cartState, setCartState] = useState({
        cartItems:[],
        qty:0,
    })

    return(<>

      <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'start',
          alignItems: 'center',
          backgroundColor: ui.oolorBackgroundMain,
      }}>
          <IconMaterial color={ui.colorMain} size={24} icon={MdOutlineShoppingCart}/>
          <ButtonPrimary
            onClick={()=>{
                  console.log("refresh1")
                    const q = READ_CART_QUERY({
                        cart_guid:'222'
                    })

                fetchGraphQL({
                    entityName: 'READ_CART_QUERY',
                    setDataCallback: (d: any) => {
                        console.log('=== READ_CART_QUERY response ', d?.data?.query)
                        setCartState((prevState:any)=>{return {...prevState,
                            cartItems:[...d?.data?.query.cart_lines]
                        }})
                        // setData((prevState) => { return{ ...prevState,
                        //     cartItems: d?.data?.cart?.items
                        // }})
                    },
                    gqlRequest: q
                })

            }}

          >
              Refresh
          </ButtonPrimary>

          <ButtonSecondary
              onClick={()=>{
                  console.log("refresh1")}}
          >
              Close
          </ButtonSecondary>



          {/*<div>{JSON.stringify(cartState.cartItems)}</div>*/}
          {(cartState.cartItems && cartState.cartItems.length > 0) && cartState.cartItems.map( (cartLine:any, i)=>{
              return <div css={css` min-width: 200px `} key={i}>
                  <div>{cartLine.product_object.name} {cartLine.cart_line_id}</div>

                  <div css={css` flex-direction:row; justify-content:space-between; display:flex; `}>

                      <ButtonCircle style={{width: "22px", height: "22px"}}
                                    onClick={() => {

                                        const q=DELETE_CART_LINE_QUERY({
                                            cart_guid:'cc6bb519-f811-11ef-a13a-55e370885b2f',
                                            cart_line_id:cartLine.cart_line_id,
                                        })

                                        fetchGraphQL({
                                            entityName: 'DELETE_CART_LINE_QUERY',
                                            setDataCallback: (d: any) => {
                                                console.log('=== DELETE_CART_LINE_QUERY response ', d)
                                                // setData((prevState) => { return{ ...prevState,
                                                //     cartItems: d?.data?.cart?.items
                                                // }})
                                            },
                                            gqlRequest: q
                                        })

                                    }}
                      >


                          <IconMaterial size={18} icon={MdClose}/>

                      </ButtonCircle>

                      <CartLineQtyPlusMinus
                          qty={cartLine.qty}
                          product_object={cartLine.product_object}
                          product_options={cartLine.product_options}
                          cartState={cartState} setCartState={setCartState}
                      />
                  </div>

              </div>
          })}

      </div>


    </>)
}

export default CartView;
