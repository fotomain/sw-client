


export const DELETE_CART_MUTATION =(params:any)=> { return  `

mutation {
        deleteCart(
            cartParams:{
                cart_guid:"`+params.cart_guid+`"
            }
        )  
    }
`};
