/** @jsxImportSource @emotion/react */

import {
    MdClose,
    MdOutlineShoppingCart,
} from "react-icons/md";
import IconMaterial from "../core/universal/IconMaterial";
import React, {useEffect, useState} from "react";
import {ui} from "../HomePage";

import ButtonPrimary from "../core/universal/ButtonPrimary";
import ButtonSecondary from "../core/universal/ButtonSecondary";

import {READ_CART_QUERY} from "../../redux/cart/READ_CART_QUERY";
import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import CartLineQtyPlusMinus from "../core/cart/CartLineQtyPlusMinus";
import ButtonCircle from "../core/universal/ButtonCircle";
import {css} from "@emotion/react";
import {DELETE_CART_LINE_QUERY} from "../../redux/graphql/DELETE_CART_LINE_QUERY";
import {productSlice} from "../../redux/product/productSlice";
import {useDispatch, useSelector} from "react-redux";
import {cartSlice} from "../../redux/cart/cartSlice";

const CartView = () => {

    const [cartState, setCartState] = useState({
        cartItems:[],
        qty:0,
    })

    const optionsToKeyValue = (p:any) => {
        const res:any = {}
        for (let i = 0; i < p.length; i++) {
            res[p[i].attribute_id] = p[i].option_id
        }
        return res
    }

    const cartStateGlobal = useSelector((state:any) => state.cartState );

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("dispatch1")
        dispatch(cartSlice.actions.read({cart_guid:'XXX'}))
    }, []);


    useEffect(() => {

        console.log("cartStateGlobal1",cartStateGlobal)
        if(cartStateGlobal?.cartArray?.cart_lines) {
            setCartState((prevState: any) => {
                return {
                    ...prevState,
                    cartItems: [...cartStateGlobal.cartArray.cart_lines]
                }
            })
        }
    }, [cartStateGlobal]);



    return(<>

      <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'start',
          alignItems: 'center',
          backgroundColor: ui.oolorBackgroundMain,
      }}>

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


          {/*<div>{JSON.stringify(cartState.cartItems)}</div>*/}
          {(cartState.cartItems && cartState.cartItems.length > 0) && cartState.cartItems.map( (cartLine:any, i)=>{
              return <div css={css` min-width: 250px `} key={i}>
                  <div>{cartLine.product_object.name} {cartLine.cart_line_id}</div>

                  {/*border:1px solid red;*/}
                  <div css={css`  
                      flex-direction:row; align-content:start; justify-content:space-between; display:flex; `}>

                      {/*delete button*/}

                      <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignContent: 'center',
                          alignItems: 'center',
                          // minWidth: '200px',
                          maxWidth: '200px',
                          // border: '1px solid green',
                      }}>
                      <ButtonCircle style={{width: "22px", height: "22px",
                          backgroundColor:'transparent', color:ui.colorMain}}
                                    onClick={() => {

                                        const q = DELETE_CART_LINE_QUERY({
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
                      </div>


                      <p>sku {cartLine.product_object.sku}</p>

                      <CartLineQtyPlusMinus
                          qty={cartLine.qty}
                          product_object={cartLine.product_object}
                          product_options={optionsToKeyValue(cartLine.product_options)}
                          cartState={cartState} setCartState={setCartState}
                      />
                  </div>

              </div>
          })}



              <div
                  css={css` width:100%; justify-content:space-between; align-items:center; display:flex; flex-direction: row `}
              >
                  <ButtonSecondary
                      onClick={()=>{
                          console.log("Close1")}}
                  >
                      Close
                  </ButtonSecondary>

                  <ButtonPrimary
                      onClick={()=>{
                          console.log("Order1")
                      }}

                  >
                      Order
                  </ButtonPrimary>

          </div>

      </div>


    </>)
}

export default CartView;
