
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import CartLineQtyPlusMinus from "../core/CartLineQtyPlusMinus";
import {ui} from "../HomePage";

import { MdAdd } from "react-icons/md";
import AddToCart from "../core/AddToCart";

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

    console.log("productSelectedOptions1",productSelectedOptions)

    useEffect(() => {
        if(undefined===productSelectedOptions){
            console.log("product",product)
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
                console.log("====== attributeOptions1",option0)
                optionsSelected[product.attributes[i].id]=option0[0].id;
            }
            console.log("optionsSelected1",optionsSelected)
            console.log("optionsArray",optionsArray)
            setCardState((prevState:any)=>{return {...prevState,
                    optionsSelected:optionsSelected,
                    optionsAll:optionsAll,
                    optionsArray:optionsArray
            }})
        }
    }, []); //productSelectedOptions

    // productsOptionsArray

  return(<>
      {/*<div>Card</div>*/}
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'start',
          alignItems: 'center',
          backgroundColor: ui.oolorCardBackground[productIndex%9],
      }}>

          <img style={{width: '100px', height: '100px'}} src={product.image}/>

          <div style={{
              paddingBottom: '4px',
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center'
          }}>
              <div style={{width: '100px'}}>{product.id}</div>
              <div style={{width: '20px'}}></div>
              <div style={{width: '250px'}}>{product.name}</div>

              <AddToCart
                  product={product}
                  optionsSelected={cardState.optionsSelected}
                  productIndex={productIndex}
              />


          </div>
          <div>{JSON.stringify(cardState.optionsSelected)}</div>
          {/*<div>{JSON.stringify(cardState.optionsArray)}</div>*/}
          {/*optionsArray*/}
          {0!==cardState.optionsArray.length && cardState.optionsArray.map((optionsSet:any,i)=>{
              return(
                  <div key={i}>
                      <h4>{optionsSet?.option_header.name}</h4>
                      <div style={{
                          paddingBottom: '4px',
                          display: 'flex',
                          flexDirection: 'row',
                          alignContent: 'center',
                          alignItems: 'center',
                          flexWrap:'wrap',
                      }}>

                          {optionsSet.option_items.map((optionItem: any, j: number) => {
                              return <div style={{paddingLeft:'4px',paddingRight:'4px',}} key={j}>
                                  <div style={{ borderRadius:'50%', border:'solid green 1px', padding:'5px', cursor:'pointer'}}
                                      onClick={()=>{
                                      console.log("=== option ",optionsSet?.option_header.name, optionsSet?.option_header.id ," value ", optionItem.id)

                                          setCardState((prevState:any)=>{
                                              let op = prevState.optionsSelected;
                                              op[optionsSet?.option_header.id]=optionItem.id;
                                              return {...prevState,
                                              optionsSelected:op,
                                          }})


                                  }}>
                                      {optionItem.displayValue}
                                  </div>
                              </div>
                          })}

                      </div>
                  </div>
              )
          })}
      </div>
  </>)
}

export default ProductCard;
