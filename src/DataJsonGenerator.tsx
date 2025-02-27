
import {initialData} from "./database/initialData";

import {productsNew} from "./generator/productsNew";
import {objectToArray} from "./generator/objectToArray";

// "▄▄▄▄"
const option_type='text'

const DataJsonGenerator = () => {

    const dataProducts:any=initialData

    let catalog_options_values_text:any[]=[]
    let option_id_last_index=80000
    let sql_entity_options_set_values:any[]=[]
    let sql_entity_options_set_header:any={}
    let option_value_attributes:any[]=[]

    let entity_options_set_id =500

    const workArray:any[] = []
    const productPropeties:any= {}
    for (const k in dataProducts) {
        const el:any = dataProducts[k]
        console.log('el1',el)
        workArray.push(el)
    }

    let productsArray:any=workArray[1]
    productsArray=[...productsArray,...productsNew]
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

    console.log('productPropeties',productPropeties)


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
    let optionHeader:any={}
    let itemsDetails:any=[]

    console.log('productsArray1 ',productsArray)

    for (let p = 0; p < productsArray.length; p++) {

        allItems=[] // 1 product
        itemNames=[] // 1 product


        const attributes = productsArray[p].attributes
        if(attributes){
            for (let a1 = 0; a1 < attributes.length; a1++) {
                console.log('attributes[a1]1',attributes[a1])
                //00 optionHeader[attributes[a1].id+"-@-"+attributes[a1].type]= {type:attributes[a1].type, id:attributes[a1].id}
                optionHeader[attributes[a1].id]= {type:attributes[a1].type, id:attributes[a1].id}
                allItems[a1]=[]
                for (let i = 0; i < attributes[a1].items.length; i++) {
                    allItems[a1][i] = attributes[a1].items[i]
                    itemNames[a1]=attributes[a1].id
                    itemsDetails.push({option_name:attributes[a1].id,details:attributes[a1].items[i]})
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
                            console.log(ss,' level_ ',level, parentStr, parents)
                            onTarget({product:productsArray[p], options:parents, parentStr})
                        }
                    }

                    const option_id = (p:any) => {
                        if(catalog_options_values_text[p.value]){

                        }
                        else{
                            console.log('=== option data',p)
                            option_id_last_index = option_id_last_index + 1;
                            catalog_options_values_text[p.value] = {
                                option_id:option_id_last_index,
                                option_name: p.optionName ,
                                // option_type: p.type,
                                option_value:p.value
                            };
                        }
                        return catalog_options_values_text[p.value].option_id;
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
        } //if(attributes){

    }

    console.log('sql1 catalog_options_values_text ',catalog_options_values_text)

    catalog_options_values_text=objectToArray({array:catalog_options_values_text})


    // let optionValuesArray = catalog_options_values_text
    // console.log('sql1 optionValuesArray ',optionValuesArray)
    let catalog_options:any ={}
    let inc1=0
    for (let i = 0; i < catalog_options_values_text.length; i++) {
        if(!catalog_options[catalog_options_values_text[i].value.option_name]) {
            const newIndex = 801 + inc1
            catalog_options[catalog_options_values_text[i].value.option_name] = newIndex
            catalog_options_values_text[i].value.option_entity_id = newIndex
            inc1++
        }
        else{
            catalog_options_values_text[i].value.option_entity_id = catalog_options[catalog_options_values_text[i].value.option_name]
        }
    }

    for (let i = 0; i < catalog_options_values_text.length; i++) {
        catalog_options_values_text[i] = {...catalog_options_values_text[i].value}
    }

    catalog_options_values_text = catalog_options_values_text.sort((a,b) => a.option_entity_id - b.option_entity_id)

    // sql catalog_products
    console.log('sql1 productsArray',productsArray)
    // sql catalog_options
    console.log('sql1 --- ',catalog_options)
    catalog_options = objectToArray({array:catalog_options})
    console.log('sql1 --- catalog_options',catalog_options)
    console.log('sql1 --- optionHeader',optionHeader)
    // sql60 catalog_options_values_text
    console.log('sql1 catalog_options_values_text',catalog_options_values_text)

    console.log("itemsDetails1",itemsDetails)
    for (let i = 0; i < catalog_options_values_text.length; i++) {
        const el1 = catalog_options_values_text[i]
        for (let j = 0; j < itemsDetails.length; j++) {
            const el2 = itemsDetails[j]
            if(el1.option_name===el2.option_name){
                // console.log('el1.option_name ',el1.option_name, catalog_options)
                // const oIndex = catalog_options.findIndex((el:any)=>{
                //     return el.key===el1.option_name
                // })
                // console.log("oIndex1",oIndex)
                    if(el1.option_value===el2.details.value){
                        console.log("found111",el2.details)
                        option_value_attributes.push({option_id:el1.option_id,attribute_name:'displayValue', attribute_value:el2.details.displayValue})
                        option_value_attributes.push({option_id:el1.option_id,attribute_name:'value', attribute_value:el2.details.value})
                        option_value_attributes.push({option_id:el1.option_id,attribute_name:'id', attribute_value:el2.details.id})
                    }

            }
        }
    }

    // sql option_value_attributes
    console.log('sql1 option_value_attributes',option_value_attributes)

    // sql sql_entity_options_set_values
    console.log('sql1 sql_entity_options_set_values',sql_entity_options_set_values)
    // sql sql_entity_options_set_header
    // console.log('sql1 sql_entity_options_set_header',sql_entity_options_set_header)
    sql_entity_options_set_header = objectToArray({array:sql_entity_options_set_header, keyInteger:true})
    console.log("sql_entity_options_set_header",sql_entity_options_set_header)

    // TODO gallery

    return(
        <div>
            <div>███████ catalog_options_values_text</div>

            <div>
                <button style={{padding: '10px', backgroundColor: 'lightcyan'}} onClick={() => {
                    let res = ''
                    for (let i = 0; i < 10; i++) {
                        const el = document.getElementById("sql" + i);
                        if (el) {
                            res = res + el.innerText
                        }
                    }
                    console.log('res1', res)
                    navigator.clipboard.writeText(res);

                }}
                >
                    COPY All
                </button>
            </div>


            <div>███████ option_value_attributes</div>
            <button style={{padding: '20px', backgroundColor: 'lightgreen'}} onClick={() => {
                const el = document.getElementById("sql4");
                if (el) {
                    console.log(el.innerText)
                    navigator.clipboard.writeText(el.innerText);
                }
            }}
            >
                COPY option_value_attributes
            </button>

            <div id={'sql4'}>
                <div>DELETE FROM option_value_attributes WHERE 1;</div>
                {option_value_attributes.map((el: any, elI: number) => {
                    return <div key={elI}>
                        <div>INSERT INTO option_value_attributes ( option_id, attribute_name, attribute_value )
                            VALUES (
                        </div>
                        <div>{el.option_id}, '{el.attribute_name}', '{el.attribute_value}'</div>
                        <div>);</div>
                    </div>
                })}
                <div>SELECT * FROM option_value_attributes ORDER BY option_entity_id, option_id ;</div>
            </div>

            <div>███████ catalog_options_values_text</div>
            <button style={{padding: '20px', backgroundColor: 'lightgreen'}} onClick={() => {
                const el = document.getElementById("sql3");
                if (el) {
                    console.log(el.innerText)
                    navigator.clipboard.writeText(el.innerText);
                }
            }}
            >
                COPY catalog_options_values_text
            </button>

            <div id={'sql3'}>

                <div>DELETE FROM catalog_options_values_text WHERE 1;</div>
                {catalog_options_values_text.map((el: any, elI: number) => {
                    return <div key={elI}>


                        <div>INSERT INTO catalog_options_values_text ( option_entity_id, option_id, comment )
                            VALUES (
                        </div>
                        <div>{el.option_entity_id}, {el.option_id}, '{el.option_value}'</div>
                        <div>);</div>
                    </div>
                })}
                <div>SELECT * FROM catalog_options_values_text ORDER BY option_entity_id, option_id ;</div>


            </div>

            <div>███████ catalog_options</div>

            <button style={{padding: '20px', backgroundColor: 'lightgreen'}} onClick={() => {
                const el = document.getElementById("sql2");
                if (el) {
                    console.log(el.innerText)
                    navigator.clipboard.writeText(el.innerText);
                }
            }}
            >
                COPY catalog_options
            </button>
            <div id={'sql2'}>

                <div>DELETE FROM catalog_options WHERE 1;</div>
                {catalog_options.map((el: any, elI: number) => {
                    return <div key={elI}>


                        <div>INSERT INTO catalog_options ( option_entity_id, option_entity_name, option_entity_type
                            )
                            VALUES (
                        </div>
                        <div>{el.value}, '{el.key}', '{optionHeader[el.key].type}'</div>
                        <div>);</div>
                    </div>
                })}
                <div>SELECT * FROM catalog_options ;</div>

            </div>


            <div>███████ products</div>
            <button style={{padding: '20px', backgroundColor: 'lightgreen'}} onClick={() => {
                const el = document.getElementById("sql1");
                if (el) {
                    console.log(el.innerText)
                    navigator.clipboard.writeText(el.innerText);
                }
            }}
            >
                COPY Products
            </button>
            <div id={'sql1'}>
                <div>DELETE FROM product_entity WHERE 1;</div>
                {productsArray.map((iProduct: any, productI: number) => {
                    return <div key={productI}>
                        {/*<div style={{color: 'red'}}>====================== {iProduct.product_id} {iProduct.name}</div>*/}
                        <div>INSERT INTO product_entity ( product_id, sku, has_options, inStock, comment ) VALUES (
                        </div>
                        <div>{iProduct.product_id} , {iProduct.product_id} , {(iProduct.attributes.length == 0) ? 0 : 1},
                            1 , '{iProduct.name}'
                        </div>
                        <div>);</div>
                    </div>
                })}
                <div>SELECT * FROM product_entity ;</div>
            </div>

        </div>
    )
}

export default DataJsonGenerator;
