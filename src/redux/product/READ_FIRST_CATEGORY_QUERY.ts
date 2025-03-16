export const READ_FIRST_CATEGORY_QUERY =()=> { return  `

{
    query: readFirstCategory 
    (
        orderBy:"price ASC, name DESC",
        filters: { product_id: "1", inStock: false , option_id_set:[111,222,333]}
        )
    {
        name
        categories {
            category_id
            name
            order_in_interface            
        }
        products {            
            product_id 
            name
            price
            brand
            inStock
            category                                                                                                             
            description
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

`};
