
export const ADD_TO_CART_MUTATION =(params={qty:1})=> { return  `                            
                           
    mutation  {
        addToCart(cartParams:{
                cart_guid:"cc6bb519-f811-11ef-a13a-55e370885b2f",
                qty:`+params.qty+`,
                product_id:103,
                product_has_options:1,
                product_options:[
                    {attribute_id:801,option_id:80001},
                    {attribute_id:802,option_id:80002},
                    {attribute_id:803,option_id:80005}
                ]        
                               
            }
           
        ){
            cart_guid
            cart_total 
            cart_lines {
                cart_line_id
                product_id
                qty
                product_has_options
                product_options {
                    attribute_id
                    option_id
                }
            }
        }
    }
    
                                
   `};
