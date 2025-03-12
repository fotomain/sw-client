


export const DELETE_CART_LINE_QUERY =(params:any)=> { return  `

mutation {
        deleteCartLine(cartParams:{
              
              cart_guid:"${params.cart_guid}",
              cart_line_id:${params.cart_line_id}
            
          }
          
        ){
            cart_guid
            cart_total 
            cart_lines {
                cart_line_id
                product_id
                qty
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
