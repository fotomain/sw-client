
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import CartLineQtyPlusMinus from "../cart/CartLineQtyPlusMinus";
import {ui} from "../HomePage";

import { MdAdd } from "react-icons/md";
import AddToCart from "../cart/AddToCart";
import ProductCardOptions from "./ProductCardOptions";
import {css} from "@emotion/react";


const ProductCard = (props:any) => {

    const {product,productIndex} = props;

    const productsState = useSelector((state:any) => state.productsState );
    let productSelectedOptions = productsState.productsOptionsArray[productIndex];

    const [cardState, setCardState] = useState({
        optionsSelected:{},
        optionsAll:{},
        optionsArray:[],
        qty:0,
    })

    // console.log("productSelectedOptions1",productSelectedOptions)

    useEffect(() => {
        if(undefined===productSelectedOptions){
            // console.log("product",product)
            let optionsAll:any = {}
            let optionsSelected:any = {}
            let optionsArray:any[] = []
            for (let i = 0; i < product.attributes.length; i++) {
                optionsAll[product.attributes[i].id] = product.attributes[i]
                const {attributeOptions, ...h} = product.attributes[i]
                optionsArray.push({
                    option_header:h,
                    option_items:product.attributes[i].attributeOptions,
                })
                const option0 = product.attributes[i].attributeOptions
                // console.log("====== attributeOptions1",option0)
                optionsSelected[product.attributes[i].id]=option0[0].id;
            }
            // console.log("optionsSelected1",optionsSelected)
            // console.log("optionsArray",optionsArray)
            setCardState((prevState:any)=>{return {...prevState,
                    optionsSelected:optionsSelected,
                    optionsAll:optionsAll,
                    optionsArray:optionsArray
            }})
        }
    }, []); //productSelectedOptions

    // productsOptionsArray

    let IMAGES:any=[]

    // let IMAGES = [
    //     { url: 'https://lmt-web.mstatic.lv/eshop/28913/conversions/2-samsung-galaxy-s25-s931-icy-blue-860.webp', alt: "Car One" },
    //     { url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-a50/freeform/storage-d-0905.png', alt: "Car Two" },
    //     { url: 'https://images.samsung.com/is/image/samsung/lv-galaxy-a50-sm-a505fzkse40--Black-308536043?$330_330_JPG$', alt: "Car Three" },
    // ]

    for (let i = 0; i < product?.gallery.length; i++) {
        IMAGES.push({url:product.gallery[i].url_path, alt:product.gallery[i].url_path});
    }


    return(<>
      {/*<div>Card</div>*/}
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'start',
          alignItems: 'center',
          backgroundColor: ui.oolorCardBackground[productIndex % 9],
      }}>

          <div css={css` width: 150px;
              height: 150px`}>
          </div>

          {/*<img style={{width: '100px', height: '100px'}} src={product?.gallery[0]?.url_path}/>*/}

          <div style={{
              paddingBottom: '4px',
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center'
          }}>
              <div style={{width: '30px'}}>{product.product_id}</div>
              <div style={{width: '20px'}}></div>
              <div style={{width: '250px'}}>{product.name}</div>
              <div style={{width: '25px'}}>{product.price}</div>

              <AddToCart
                  product={product}
                  optionsSelected={cardState.optionsSelected}
                  productIndex={productIndex}
              />


          </div>

          <ProductCardOptions
              cardState={cardState}
              setCardState={setCardState}
          />

          <div>{JSON.stringify(cardState.optionsSelected)}</div>
      </div>
  </>)
}

export default ProductCard;
