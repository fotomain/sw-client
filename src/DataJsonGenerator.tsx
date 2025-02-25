
import {initialData} from "./database/initialData";
import {dividerClasses} from "@mui/material";
import {productsNew} from "./generator/productsNew";
import {objectToArray} from "./generator/objectToArray";

// "▄▄▄▄"
const option_type='text'


const DataJsonGenerator = () => {

    const dataProducts:any=initialData

    let option_id_array:any[]=[]
    let option_id_last_index=80000
    let sql_entity_options_set_values:any[]=[]
    let sql_entity_options_set_header:any={}

    let entity_options_set_id =500

    const workArray:any[] = []
    const productPropeties:any= {}
    for (const k in dataProducts) {
        const el:any = dataProducts[k]
        console.log('el1',el)
        workArray.push(el)
    }

    let productsArray:any=workArray[1]
    productsArray=[...productsNew,...productsArray]
    let nProduct=1
    for (const i in productsArray) {

        productsArray[i].product_id=100 + nProduct
        productsArray[i].sku=productsArray[i].product_id
        nProduct++
        const obj = productsArray[i];
        for (const k in obj) {
            productPropeties[k]=1
        }
    }

    console.log('productsArray',productsArray)
    console.log('productPropeties',productPropeties)

    console.log('productsArray',productsArray)


    for (let p = 0; p < productsArray.length; p++) {
        // === INSERT1 product_entity
    }

    for (let p = 0; p < productsArray.length; p++) {
        const attributes = productsArray[p].attributes
        if(attributes){
            for (let a = 0; a < attributes.length; a++) {
                // === INSERT2 entity_options_plan
            }
        }
    }

    let allItems:any[] =[]
    let itemNames:any[] =[]

    for (let p = 0; p < productsArray.length; p++) {

        allItems=[] // 1 product
        itemNames=[] // 1 product

        const attributes = productsArray[p].attributes
        if(attributes){
            for (let a1 = 0; a1 < attributes.length; a1++) {
                allItems[a1]=[]
                for (let i = 0; i < attributes[a1].items.length; i++) {
                    allItems[a1][i] = attributes[a1].items[i]
                    itemNames[a1]=attributes[a1].id
                }
            }
        }

        console.log('=== allItems ',allItems)

        if(allItems.length>0){

            const loopItems = (onTarget:any,parents:any,parentStr:string, itemsArray:any,level:number,levelsTotal:number)=> {
                if(level<(levelsTotal)) {
                    for (let i = 0; i < itemsArray[level].length ; i++) {
                        // let ss=""; for (let ll = 0; ll < level; ll++) {ss=ss+"==="};
                        // console.log(ss,' level ',level, itemsArray[level][i])
                            parents[level]={optionName:itemNames[level], value:itemsArray[level][i].value}
                            loopItems(onTarget,parents,parentStr +" --- "+itemNames[level]+" --- "+ itemsArray[level][i].displayValue
                                ,itemsArray, level + 1, levelsTotal
                            )
                    }
                }else{
                    let ss=""; for (let ll = 0; ll < level; ll++) {ss=ss+"==="};
                    console.log(ss,' level ',level, parentStr, parents)
                    onTarget({product:productsArray[p], options:parents, parentStr})
                }
            }

            const option_id = (p:any) => {
                if(option_id_array[p.value]){

                }
                else{
                    option_id_last_index = option_id_last_index + 1;
                    option_id_array[p.value] = {
                        option_id:option_id_last_index,
                        option_name: p.optionName ,
                        option_value:p.value
                    };
                }

                return option_id_array[p.value].option_id;
            }

            let parents:any[]=[]
            const onTarget = (params:any) => {
                console.log("███████ onTarget",entity_options_set_id, params.product.prices, params)
                entity_options_set_id = entity_options_set_id + 1

                for (let i = 0; i < params.options.length ; i++) {
                    sql_entity_options_set_values.push({
                        entity_options_set_id,
                        product_id:params.product.product_id,
                        option_id:option_id(params.options[i]),
                    })
                }

                sql_entity_options_set_header[entity_options_set_id]={
                    entity_options_set_id,
                    product_id:params.product.product_id,
                    prices:params.product.prices,
                    slug:params.parentStr.toLowerCase().replaceAll(" --- ","-").replace(/ /g, '-').replace(/[^\w-]+/g, '')
                }

            }

            loopItems(onTarget, parents,'',allItems,0,attributes.length)
        }

    }

    console.log('sql1',option_id_array)

    let obj:any[] = option_id_array
    const keys:string[] = Object.keys(obj)
    const result:any[]=[]
    for (let i = 0; i < keys.length; i++) {
        const kk:any=keys[i]
        result[i] = obj[kk];
    }

    let optionValuesArray = result
    console.log('sql1 optionValuesArray ',optionValuesArray)
    let option_names:any ={}
    let inc1=0
    for (let i = 0; i < optionValuesArray.length; i++) {
        if(!option_names[optionValuesArray[i].option_name]) {
            option_names[optionValuesArray[i].option_name] = 801 + inc1
            inc1++
        }
    }

    console.log('sql1',option_names)

    for (let i = 0; i < optionValuesArray.length; i++) {
        optionValuesArray[i].option_id=option_names[optionValuesArray[i].option_name]
    }


    // sql catalog_products
    console.log('sql1 productsArray',productsArray)
    // sql catalog_options
    console.log('sql1 catalog_options',option_names)
    // sql60 catalog_options_values_text
    console.log('sql1 catalog_options_values_text',optionValuesArray)
    // sql sql_entity_options_set_values
    console.log('sql1 sql_entity_options_set_values',sql_entity_options_set_values)
    // sql sql_entity_options_set_header
    // console.log('sql1 sql_entity_options_set_header',sql_entity_options_set_header)
    sql_entity_options_set_header = objectToArray(sql_entity_options_set_header)
    console.log("sql_entity_options_set_header",sql_entity_options_set_header)
    // result1.map((element:any) => {
    //     console.log("element",element)
    // })

    return(
        <div>
            <div>███████ products</div>

            <div>DELETE FROM product_entity WHERE 1; </div>
            {productsArray.map((iProduct: any, productI: number) => {
                return <div key={productI}>
                    {/*<div style={{color: 'red'}}>====================== {iProduct.product_id} {iProduct.name}</div>*/}
                    <div>INSERT INTO product_entity ( product_id, sku, has_options, inStock, comment ) VALUES (</div>
                    <div>{iProduct.product_id} , {iProduct.product_id} , {(iProduct.attributes.length == 0) ? 0 : 1}, 1 , '{iProduct.name}'
                    </div>
                    <div>);</div>
                </div>
            })}

        </div>
    )
}

export default DataJsonGenerator;
