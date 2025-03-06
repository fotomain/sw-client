import {MdOutlineShoppingCart, MdRemove} from "react-icons/md";
import IconBasic from "./core/IconBasic";
import React from "react";
import {ui} from "./HomePage";
import ButtonBasic from "./core/ButtonBasic";
import ButtonPrimary from "./core/ButtonPrimary";
import ButtonSecondary from "./core/ButtonSecondary";
import {ADD_TO_CART_MUTATION} from "../redux/graphql/ADD_TO_CART_MUTATION";
import {READ_CART_QUERY} from "../redux/graphql/READ_CART_QUERY";
import {fetchGraphQL} from "../database/generator/fetchGraphQL";

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
                  console.log("refresh1")
                    const q = READ_CART_QUERY({
                        cart_guid:'222'
                    })

                fetchGraphQL({
                    entityName: 'READ_CART_QUERY',
                    setDataCallback: (d: any) => {
                        console.log('=== READ_CART_QUERY response ', d?.data?.query)
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

      </div>


  </>)
}

export default CartView;
