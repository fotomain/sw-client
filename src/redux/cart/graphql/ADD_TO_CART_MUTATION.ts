import {objectToArray} from "../../../database/generator/objectToArray";

export const ADD_TO_CART_MUTATION =(params?:any)=> {

   let cart_guid=""

   if(params.cart_guid) cart_guid = params.cart_guid;
   if(""===cart_guid) throw new Error("Error 1598 - cart_guid not found");

   let product=null
   if(params.product) product = params.product;

   if(!product) throw new Error("Error 1599 - Product not found");

   let qty=1
   if(params.qty) qty = params.qty;

   let options=[]
   if(params.optionsSelected) {
      options = objectToArray({array:params.optionsSelected})
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

   }

   return  `

    mutation  {
        addToCart(cartParams:{
                cart_guid:"${cart_guid}",
                qty:`+qty+`,
                product_id:${product.product_id},
                product_has_options:${product.has_options},
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
                               
                
                product_object {
                    product_id
                    name
                    price
                    sku
                    has_options
                    
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
                                 value
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
