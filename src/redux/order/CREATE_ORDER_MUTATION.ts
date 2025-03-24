
export const CREATE_ORDER_MUTATION =(params?:any)=> {

   return  `

    mutation  {
        createOrder(cartParams:{
                cart_guid:"${params.cart_guid}"                
            }
        )
    }


   `};
