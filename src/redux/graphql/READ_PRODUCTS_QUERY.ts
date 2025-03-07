
export const READ_PRODUCTS_QUERY =()=> { return  `                            
                            {
                                query: readProducts (
                                    orderBy:"price ASC, name DESC",
                                    filters: { product_id: "1", inStock: false , option_id_set:[111,222,333]}
                                ) 
                                 { 
                                    product_id 
                                    name
                                    price
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
                      `};
