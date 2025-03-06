import {ADD_TO_CART_MUTATION} from "../../redux/graphql/ADD_TO_CART_MUTATION";
import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import IconBasic from "./IconBasic";
import {MdOutlineAddShoppingCart, MdRemove} from "react-icons/md";
import ButtonCircle from "./ButtonCircle";
import React from "react";


const addToCart = (props:any) => {

    const {product, optionsSelected}=props;

  return <>
      <ButtonCircle

          productIndex={props.productIndex}

          onClick={() => {

              const q = ADD_TO_CART_MUTATION({
                  cart_guid:"cc6bb519-f811-11ef-a13a-55e370885b2f",
                  qty: 1,
                  product:product,
                  optionsSelected:optionsSelected,
              })
              console.log("product1 ===",product)
              console.log("cardState.optionsSelected",optionsSelected)


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
          <IconBasic size={24} icon={MdOutlineAddShoppingCart}/>
      </ButtonCircle>
  </>
}

export default addToCart;
