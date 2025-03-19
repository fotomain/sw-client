import {objectToArray} from "../../database/generator/objectToArray";

export const CREATE_ORDER_MUTATION =(params?:any)=> {

   // console.log("CREATE_ORDER_MUTATION params9 ===",params)

   return  `

    mutation  {
        createOrder(cartParams:{
                cart_guid:"${params.cart_guid}"                
            }
        )
    }


   `};
