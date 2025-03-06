import {MdOutlineShoppingCart, MdRemove} from "react-icons/md";
import IconBasic from "./core/IconBasic";
import React, {useState} from "react";
import {ui} from "./HomePage";
import ButtonBasic from "./core/ButtonBasic";
import ButtonPrimary from "./core/ButtonPrimary";
import ButtonSecondary from "./core/ButtonSecondary";
import {ADD_TO_CART_MUTATION} from "../redux/graphql/ADD_TO_CART_MUTATION";
import {READ_CART_QUERY} from "../redux/graphql/READ_CART_QUERY";
import {fetchGraphQL} from "../database/generator/fetchGraphQL";

const CartView = () => {

    const [cartState, setCartState] = useState({
        cartItems:[]
    })

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
              return <div key={i}>
                  <div>{cartLine.product_object.name} {cartLine.qty} </div>
              </div>
          })}

      </div>


  </>)
}

export default CartView;
