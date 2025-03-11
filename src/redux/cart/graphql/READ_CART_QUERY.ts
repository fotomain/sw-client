


export const READ_CART_QUERY =(params:any)=> { return  `

{
    query: readCart(cartParams:{
        cart_guid:"cc6bb519-f811-11ef-a13a-55e370885b2f"
    }){
        
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
            }
    }
}


`};
