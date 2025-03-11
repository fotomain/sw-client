import {ADD_TO_CART_MUTATION} from "../../redux/cart/graphql/ADD_TO_CART_MUTATION";
import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import IconMaterial from "../core/universal/IconMaterial";
import {MdOutlineAddShoppingCart, MdRemove} from "react-icons/md";
import ButtonCircle from "../core/universal/ButtonCircle";
import React from "react";
import {cartSlice} from "../../redux/cart/cartSlice";
import {useDispatch} from "react-redux";


const AddToCart = (props:any) => {

    const {product, optionsSelected}=props;

    const dispatch = useDispatch();

  return <>
      <ButtonCircle

          productIndex={props.productIndex}

          onClick={() => {

              dispatch(cartSlice.actions.create({
                  cart_guid:"cc6bb519-f811-11ef-a13a-55e370885b2f",
                  qty: 1,
                  product:product,
                  optionsSelected:optionsSelected,
              }))

              // const q = ADD_TO_CART_MUTATION({
              //     cart_guid:"cc6bb519-f811-11ef-a13a-55e370885b2f",
              //     qty: 1,
              //     product:product,
              //     optionsSelected:optionsSelected,
              // })
              // console.log("product1 ===",product)
              // console.log("cardState.optionsSelected",optionsSelected)
              //
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
          <IconMaterial size={24} icon={MdOutlineAddShoppingCart}/>
      </ButtonCircle>
  </>
}

export default AddToCart;
