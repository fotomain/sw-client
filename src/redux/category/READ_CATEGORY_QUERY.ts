
export const READ_CATEGORY_QUERY =(params:any)=> { return  `

{
    query: readCategories 
    (
        orderBy:"price ASC, name DESC",
        filters: { product_id: "1", inStock: false , option_id_set:[111,222,333]}
        )
    {
        name        
        category_id
        display_name                    
    }
    
}

`}
