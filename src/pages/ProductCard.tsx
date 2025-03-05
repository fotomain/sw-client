import {Button} from "@mui/material";
import {ADD_TO_CART_MUTATION} from "../redux/ADD_TO_CART_MUTATION";
import {fetchGraphQL} from "../database/generator/fetchGraphQL";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const ProductCard = (props:any) => {

    const {product,productIndex} = props;

    const productsState = useSelector((state:any) => state.productsState );
    let productSelectedOptions = productsState.productsOptionsArray[productIndex];

    const [cardState, setCardState] = useState({
        optionsSelected:{}
    })

    console.log("productSelectedOptions1",productSelectedOptions)

    useEffect(() => {
        if(undefined===productSelectedOptions){
            console.log("product",product)
            let optionsSelected:any = {}
            for (let i = 0; i < product.attributes.length; i++) {
                const options = product.attributes[i].attributeOptions
                console.log("====== attributeOptions1",options)
                optionsSelected[product.attributes[i].id]=options[0].id;
            }
            console.log("optionsSelected1",optionsSelected)
            setCardState((prevState)=>{
                return {...prevState, optionsSelected:optionsSelected}
            })
        }
    }, [productSelectedOptions]);

    // productsOptionsArray

  return(<>
      {/*<div>Card</div>*/}
      <div style={{
          paddingBottom: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'start',
          alignItems: 'center'
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
              <div style={{
                  paddingBottom: '4px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
              }}>
                  <Button
                      variant={"contained"}
                      onClick={() => {


                          const q = ADD_TO_CART_MUTATION()
                          // console.log("q1",q)

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
                      +
                  </Button>
                  <Button
                      variant={"contained"}
                      onClick={() => {

                          const q = ADD_TO_CART_MUTATION({qty: -1})
                          // console.log("q1",q)

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
                      -
                  </Button>
              </div>
          </div>
          <div>{JSON.stringify(cardState.optionsSelected)}</div>
      </div>
  </>)
}

export default ProductCard;
