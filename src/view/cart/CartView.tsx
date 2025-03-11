/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {ui} from "../HomePage";

import ButtonPrimary from "../core/universal/ButtonPrimary";
import ButtonSecondary from "../core/universal/ButtonSecondary";

import {READ_CART_QUERY} from "../../redux/cart/graphql/READ_CART_QUERY";
import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import {css} from "@emotion/react";
import {useDispatch, useSelector} from "react-redux";
import {cartSlice} from "../../redux/cart/cartSlice";
import CartLine from "./CartLine";

const CartView = () => {

    const [cartState, setCartState] = useState({
        cartItems:[],
        qty:0,
    })


    const dispatch = useDispatch();

    const cartStateGlobal = useSelector((state:any) => state.cartState );

    console.log('cartStateGlobal2',cartStateGlobal)


    useEffect(() => {
        console.log("dispatch1")
        dispatch(cartSlice.actions.read({cart_guid:'XXX'}))
    }, []);


    // useEffect(() => {
    //
    //     // console.log("cartStateGlobal1",cartStateGlobal)
    //     if(cartStateGlobal?.cartArray?.cart_lines) {
    //         setCartState((prevState: any) => {
    //             return {
    //                 ...prevState,
    //                 cartItems: [...cartStateGlobal.cartArray.cart_lines]
    //             }
    //         })
    //     }
    // }, [cartStateGlobal?.cartArray?.cart_lines]);


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
          {(cartStateGlobal?.cartArray?.cart_lines && cartStateGlobal?.cartArray?.cart_lines.length > 0) && cartStateGlobal?.cartArray?.cart_lines.map( (cartLine:any, lineI:number)=> {

              return <div css={css` 
                  width: 100%; padding-right: 10px; padding-left: 10px;
                  height: auto;
                  gap:10px;
                  display: flex; flex-direction: column;
                `}
                  key={cartLine.cart_line_id}
              >
                  <CartLine
                      product={cartLine.product_object}
                      cartLine={cartLine}
                      cartState={cartState}
                      setCartState={setCartState}
                  />
              </div>

                  // return <div css={css` min-width: 250px `} key={cartLine.cart_line_id}>
                  //
                  // <div>{cartLine.product_object?.name} {cartLine.cart_line_id}</div>
                  //
                  //
                  // </div>
                  })}


                  <div
                      css={css` width: 100%;
                          justify-content: space-between;
                          align-items: center;
                          display: flex;
                          flex-direction: row `}
                  >
                      <ButtonSecondary
                          onClick={() => {
                              console.log("Close1")
                          }}
                      >
                          Close
                      </ButtonSecondary>

                      <ButtonPrimary
                          onClick={() => {
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


// return <div>
//     {JSON.stringify(cartStateGlobal?.cartArray?.cart_lines[lineI].product_object?.name)}
//     <div style={{
//         display: 'flex',
//         flexDirection: 'row',
//         alignContent: 'center',
//         alignItems: 'center',
//         // minWidth: '200px',
//         maxWidth: '200px',
//         // border: '1px solid green',
//     }}>
//         <ButtonCircle style={{
//             width: "22px", height: "22px",
//             backgroundColor: 'transparent', color: ui.colorMain
//         }}
//                       onClick={() => {
//
//                           dispatch(cartSlice.actions.delete({
//                               cart_guid: 'cc6bb519-f811-11ef-a13a-55e370885b2f',
//                               cart_line_id: cartLine.cart_line_id,
//                           }))
//
//
//                       }}
//         >
//
//
//             <IconMaterial size={18} icon={MdClose}/>
//
//         </ButtonCircle>
//     </div>
// </div>
