
import {initialData} from "./database/initialData";
import {dividerClasses} from "@mui/material";


const DataJsonAnalyser = () => {

    const data:any=initialData
    // console.log('products1',data['products'])

    const workArray:any[] = []
    const attributesCatalog:any= {}
    for (const k in data) {
        const el:any = data[k]
        console.log('el1',el)
        workArray.push(el)
    }

    for (const i in workArray[1]) {
        // const atr:any = data[a]
        const obj = workArray[1][i];
        for (const k in obj) {
            attributesCatalog[k]=1
        }
    }

    // console.log('workArray',workArray)
    // console.log('attributesCatalog',attributesCatalog)


    let products = workArray[1]

    products = [
        {
            id:'iPhone',
            name:'iPhone',
            attributes:[{id:"Color"},{id:"Capacity"},{id:"Operational system"}]
        },
        {
            id:'Samsung',
            name:'Samsung',
            attributes:[{id:"Color"},{id:"Capacity"},{id:"Operational system"}]
        }
        ,...products
    ]
    console.log("=== products   ",products)

    console.log("INSERT INTO product_entity VALUES( sku, tproductId, has_options, id, comment ) ( ")
    for (let i = 0; i < products.length ; i++) {
        const el = products[i]
        console.log(
            101 + i ," , ",
            101 + i ,",",
            1 ,",",
            el.id ,",",
            el.name
        )
    }
    console.log(");")

    let options_plan:any = {}
    for (let i = 0; i < products.length ; i++) {
        const product_id = (101 + i).toString()
        const el = products[i]
        console.log(
            el.attributes
        )


        const catalog_options:any={
            'Color': 801,
            'Capacity':802,
            'OS iPhpne':803,
            'OS Samsung':804,
            'Size':805,
            'With USB 3 ports':808,
            'Touch ID in keyboard':809,
        }

        let catalog_options_values_text:any = {}
        catalog_options_values_text[801] = {}
        catalog_options_values_text[801][80101] = {value:'#44FF03',id:'Green', displayValue:'Green'};
        catalog_options_values_text[801] = {}
        catalog_options_values_text[801][80102] = {value:'#44FF03',id:'Cyan', displayValue:'Cyan'};
        catalog_options_values_text[801] = {}
        catalog_options_values_text[801][80103] = {value:'#030BFF',id:'Blue', displayValue:'Blue'};
        catalog_options_values_text[801] = {}
        catalog_options_values_text[801][80104] = {value:'#030BFF',id:'Black', displayValue:'Black'};
        catalog_options_values_text[801] = {}
        catalog_options_values_text[801][80105] = {value:'#FFFFFF',id:'White', displayValue:'White'};

        catalog_options_values_text[802] = {}
        catalog_options_values_text[802][80201] = {value:'512GB',id:'512GB', displayValue:'512GB'};
        catalog_options_values_text[802] = {}
        catalog_options_values_text[802][80203] = {value:'1T',id:'1T', displayValue:'1T'};


        // console.log("=== catalog_options_values_text",catalog_options_values_text[801][80101])


        options_plan[product_id] = {};

        console.log('found1 █████████ product_id', product_id)

        if(el.attributes) {
            for (let j = 0; j < el.attributes.length; j++) {
                const attribute:any = el.attributes[j]
                options_plan[product_id][attribute.id] = 1

                // ==== INSERT entity_options_plan
                const option_id = catalog_options[attribute.id]
                console.log("INSERT INTO entity_options_plan VALUES( product_id, option_entity_id  ) ( ")
                console.log(
                    product_id ," , ",
                    catalog_options[option_id]
                )
                console.log(");")

                console.log("==== items1 ", attribute.items)

                console.log("INSERT INTO entity_options_vector_id VALUES( entity_id,product_id, option_entity_id  ) ( ")
                for (let k = 0; k < attribute?.items?.length ; k++) {
                    const option_value=attribute.items[k]
                    // console.log("==== items ", attribute.items[k])
                    const item = attribute.items[k]

                    let optionValueData = {}
                    const workArrayY=Array.from(Object.keys(catalog_options_values_text))
                    for (const keyY of workArrayY) {
                        const y = catalog_options_values_text[keyY]
                        // console.log('found1 Y',y)
                        const workArrayX=Array.from(Object.keys(y))
                        for (const keyX of workArrayX) {
                            if(item.value===y[keyX].value) {
                                console.log('found1 X', y[keyX])
                                console.log('found1 keyY keyX ', keyY, keyX, y[keyX].value)
                                console.log('found1 -- ', catalog_options_values_text[keyY][keyX])
                                optionValueData = y[keyX]
                            }
                        }
                    }

                    // const option_value_data:any = catalog_options_values_text[option_id]
                    //
                    // // console.log( "out1", product_id, option_value_data )
                    // if(undefined!==option_value_data)
                    //     console.log( "out2", product_id, option_id, option_value_data.value, option_value_data.displayValue,  )
                    // else{
                    //     console.warn( '=== out1 no data for option_id ', option_id)
                    // }


                }
                console.log(");")

            }
        }}

    console.log("=== options_plan",
        options_plan
    )


    return(
        <div>
            <div>GetKeys</div>
            <div style={{color:'red'}}>number of products {products.length}</div>
            {products.map((itemProduct: any, productI: number) => {

                const {attributes,gallery,prices,...productInSelf} = itemProduct

                return <div key={productI}>
                    <div style={{color:'red'}} >====================== ({itemProduct.name})</div>
                </div>

            })}

        </div>
    )
}

export default DataJsonAnalyser;
