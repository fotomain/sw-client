import {objectToArray} from "../../database/generator/objectToArray";

export const CREATE_ORDER_MUTATION =(params?:any)=> {

   console.log("CREATE_ORDER_MUTATION params9 ===",params)

   let cart_guid="cc6bb519-f811-11ef-a13a-55e370885b2f"

   return  `

    mutation  {
        createOrder(cartParams:{
                cart_guid:"${cart_guid}"                
            }
        )
    }


   `};
