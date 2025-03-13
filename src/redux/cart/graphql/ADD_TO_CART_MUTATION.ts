import {objectToArray} from "../../../database/generator/objectToArray";

export const ADD_TO_CART_MUTATION =(params?:any)=> {

   console.log("params1 ===",params)

   let cart_guid="cc6bb519-f811-11ef-a13a-55e370885b2f"

   if(params.cart_guid) cart_guid = params.cart_guid;
   if(!cart_guid) throw new Error("Error 1598 - cart_guid not found");

   let product=null
   if(params.product) product = params.product;

   if(!product) throw new Error("Error 1599 - Product not found");

   let qty=1
   if(params.qty) qty = params.qty;

   let options=[]
   if(params.optionsSelected) {
      options = objectToArray({array:params.optionsSelected})
      console.log("options1",options)
   }

   let optionsStr=""

   // {attribute_id:801,option_id:80001},
   // {attribute_id:802,option_id:80002},
   // {attribute_id:803,option_id:80005}

   if(options){
      for (let i = 0; i < options.length; i++) {
         const o = options[i]
         optionsStr = optionsStr + `{ attribute_id:${o.key},option_id:${o.value} } , `
      }
      console.log("optionsStr1",optionsStr)
   }

   return  `

    mutation  {
        addToCart(cartParams:{
                cart_guid:"${cart_guid}",
                qty:`+qty+`,
                product_id:${product.product_id},,
                product_has_options:1,
                product_options:[
                 ${optionsStr}
                ]

            }
        ){
            cart_guid
            cart_total
            cart_lines {
                cart_line_id
                product_id
                qty
                price
                total_line
                
                product_has_options
                
                product_object {
                    product_id
                    name
                    price
                    sku
                    
                    gallery {
                       url_order
                       url_path
                    }
                    
                      attributes {
                         id 
                         name                                        
                             attributeOptions { 
                                 id
                                 name
                                 displayValue
                             } 
                     }

                }
                
                product_options {
                    attribute_id
                    option_id
                }
            }
        }
    }


   `};
