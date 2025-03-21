
export const capitalizeFirstLetter = (s:any)=> {
    return String(s).charAt(0).toUpperCase() + String(s).slice(1);
}

export const READ_PRODUCTS_QUERY =(params:any)=> {

    let category_name=''
    if(params.category_name){ category_name=capitalizeFirstLetter(params.category_name) }

    return  `                            
                            {
                                query: readProducts${category_name} (
                                    orderBy:"price ASC, name DESC",
                                    filters: { product_id: "1", inStock: false , option_id_set:[111,222,333]}
                                ) 
                                 {                                     
                                    product_id 
                                    name
                                    has_options
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
                                                value
                                            } 
                                    }
                                }
                            }
                      `};
