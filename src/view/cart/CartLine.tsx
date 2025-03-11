/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import React from "react";
import ButtonCircle from "../core/universal/ButtonCircle";
import {ui} from "../HomePage";
import {cartSlice} from "../../redux/cart/cartSlice";
import IconMaterial from "../core/universal/IconMaterial";
import {MdClose} from "react-icons/md";
import CartLineQtyPlusMinus from "./CartLineQtyPlusMinus";
import {useDispatch} from "react-redux";

const optionsToKeyValue = (p:any) => {
    const res:any = {}
    for (let i = 0; i < p.length; i++) {
        res[p[i].attribute_id] = p[i].option_id
    }
    return res
}


const CartLine = (props:any) => {

    const dispatch = useDispatch();

    const {cartLine,cartState,setCartState} = props

  return <div css={css` 
      min-width: 350px;
      display: flex; flex-direction: column;
      justify-content: start;
      gap: 12px;
  `}
      key={cartLine.cart_line_id}
  >

      <div
          css={css`
              align-items:center;justify-content:space-between; display: flex; flex-direction: row;
              max-width: 300px;
              width: 100%;
          `}
      >
          <div>{cartLine.product_object?.name}</div>
          <img
              css={css`
                  width: auto;
                  height: 60px;
              `}
              src={cartLine?.product_object?.gallery[0].url_path} alt=""
          />
      </div>


      {/*delete button*/}
      <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'space-between',
          alignItems: 'center',
          // minWidth: '200px',
          // minWidth: '200px',
          maxWidth: '300px',
              width: '100%',
              // border: '1px solid green',
          }}>

              <div>
              <ButtonCircle style={{
                  width: "22px", height: "22px",
                  backgroundColor: 'transparent',
                  color: ui.colorMain
              }}
                            onClick={() => {

                                dispatch(cartSlice.actions.delete({
                                    cart_guid: 'cc6bb519-f811-11ef-a13a-55e370885b2f',
                                    cart_line_id: cartLine.cart_line_id,
                                }))


                            }}
              >

                  <IconMaterial size={18} icon={MdClose}/>

              </ButtonCircle>
              </div>

          <div
            style={{flex:1, display: 'flex', flexDirection: 'row', justifyContent:"center",alignItems: 'center'}}
             // css={css`
             //  flex: 1;
             //  //width: 100%;
             //  //flex-direction: row;
             //  //justify-content: space-around;
             //    `}
          >
              <div>
                  id {cartLine.cart_line_id}
              </div>
              <div>/</div>
              <div>
                  sku {cartLine?.product_object?.sku}
              </div>
          </div>

          <CartLineQtyPlusMinus
              qty={cartLine.qty}
              product_object={cartLine.product_object}
              product_options={optionsToKeyValue(cartLine.product_options)}
              cartState={cartState} setCartState={setCartState}
          />

          </div>

  </div>
}

export default CartLine
