
import {initialData} from "../initialData";

import {productsNew} from "./productsNew";
import {objectToArray} from "./objectToArray";
import {fetchGraphQL} from "./fetchGraphQL";

// "▄▄▄▄"

const DataJsonGenerator = () => {

    const dataProducts:any=initialData

    const workArray:any[] = []
    const productPropeties:any= {}
    for (const k in dataProducts) {
        const el:any = dataProducts[k]
        // console.log('el1',el)
        workArray.push(el)
    }

    const productsArray:any=[...workArray[1],...productsNew]

    // productsArray=[...productsArray,...productsNew]

    console.log("productsArray0",productsArray)
    // return <></>

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

    console.log('productsArray1 ',productsArray)

    //return <></>

    let attribute_id=801
    let attributeDataObject:any = {}
    for (let p = 0; p < productsArray.length; p++) {

        const attribute = productsArray[p].attributes
        if(attribute){
            //STAGE1 classify === new id
            for (let a1 = 0; a1 < attribute.length; a1++) {
                console.log('attributes[a1]1',attribute[a1])
                if(!attributeDataObject[attribute[a1].id]) {
                    const newData = {attribute_id: attribute_id,...attribute[a1]}
                    attributeDataObject[attribute[a1].id] = newData
                    attribute_id++
                }
                else {
                    // + new items
                    const newItems = productsArray[p].attributes[a1].items
                    for (let i = 0; i < newItems.length; i++) {
                        const indexExist = attributeDataObject[attribute[a1].id].items.findIndex((el:any)=>{
                            return el.id === newItems[i].id
                        })
                        if(-1===indexExist){
                            console.log("indexExist1",indexExist,newItems[i].id)
                            attributeDataObject[attribute[a1].id].items.push({...newItems[i]})
                        }

                    }
                }
                // productsArray[p].attributes[a1]= attributeDataObject[attribute[a1].id]
            }

            //STAGE2 write to producr
            // for (let i = 0; i < productsArray[p].attributes.length; i++) {
            //
            //     let currentLine = productsArray[p].attributes[i]
            //     console.log("currentLine1",currentLine)
            //     for (let j = 0; j < currentLine.items.length; j++) {
            //         let optionJ=currentLine.items[j]
            //         const catalogOption = attributeDataObject[currentLine.id].items.find((el:any)=>{
            //             return optionJ.id === el.id
            //         })
            //         if(catalogOption){
            //             currentLine.items[j].option_id=catalogOption.id
            //             // console.log("catalogOption1",catalogOption)
            //         }
            //         else{
            //             throw Error("ERROR 1008 catalogOption1 not found")
            //         }
            //     }
            // }


        } //if(attributes){
    }

    console.log('productsArray2 ',productsArray)
    console.log('attributeDataObject1 ',attributeDataObject)


    let option_id = 80000
    attributeDataObject = objectToArray({array:attributeDataObject})
    for (let i = 0; i < attributeDataObject.length; i++) {
        attributeDataObject[i]= {...attributeDataObject[i].value}
        // console.log('sql1 items attributeDataObject',attributeDataObject[i].items)
        for (let j = 0; j < attributeDataObject[i].items.length ; j++) {
            // console.log('sql1 items attributeDataObject',attributeDataObject[i].items[j])
            option_id++
            attributeDataObject[i].items[j] = {option_id,...attributeDataObject[i].items[j]}
        }
    }

    const arrayToObject = (p:any) => {
        let result:any={}
        for (let i = 0; i < p.array.length; i++) {
            let elI:any = p.array[i]
            // console.log("elI1",elI)
            result[elI[p.keyName]] = elI
        }
        return result
    }

    // console.log('sql1 attributeDataObject',attributeDataObject)
    attributeDataObject = arrayToObject({keyName:'name',array:attributeDataObject})
    let attributeDataArray = objectToArray({array:attributeDataObject})
    for (let i = 0; i < attributeDataArray.length; i++) {
        attributeDataArray[i]={...attributeDataArray[i].value}
    }

    console.log('sql1 productsArray5 final ',productsArray)
    console.log('sql1 attributeDataObject final',attributeDataObject)
    console.log('sql1 attributeDataArray',attributeDataArray)


    // TODO gallery

    return(
        <div>
            <div>███████ ALL</div>

            <div>
                <div style={{flexDirection:"row",gap:"24px",display:"flex"}}>

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

                    <button style={{padding: '10px', backgroundColor: 'lightcyan'}} onClick={() => {

                        const READ_PRODUCTS_QUERY = `                            
                            {
                                query: readProducts (
                                    orderBy:"price ASC, name DESC",
                                    filters: { product_id: "1", inStock: false , option_id_set:[111,222,333]}
                                ) 
                                 { 
                                    id name
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
                      `;

                        fetchGraphQL({
                            entityName:'READ_PRODUCTS_QUERY',
                            setDataCallback:(d:any)=>{
                                console.log('=== READ_PRODUCTS_QUERY response ',d?.data?.cart?.items)//
                                // setData((prevState) => { return{ ...prevState,
                                //     cartItems: d?.data?.cart?.items
                                // }})
                            },
                            gqlRequest:READ_PRODUCTS_QUERY

                        })
                        // console.log('res1', res)
                        // navigator.clipboard.writeText(res);
                    }}
                    >
                        GRAPHQL TEST LOCAL
                    </button>
                </div>

            </div>


            <div>███████ price_list</div>

            <button style={{padding: '20px', backgroundColor: 'lightgreen'}} onClick={() => {
                const el = document.getElementById("sql5");
                if (el) {
                    console.log(el.innerText)
                    navigator.clipboard.writeText(el.innerText);
                }
            }}
            >
                COPY price_list
            </button>

            <div id={'sql5'}>
                <div>DELETE FROM price_list WHERE 1;</div>

                {productsArray.map((iProduct: any, productN: number) => {
                    return <div key={productN}>
                        {iProduct.prices && iProduct.prices.map((iPrice: any, priceN: number) => {
                            return <div key={priceN}>
                                        <div>INSERT INTO price_list ( entity_id, price, currency_id )
                                            VALUES (
                                        </div>
                                        <div>
                                            {iProduct.product_id}, {iPrice.amount}, '{iPrice.currency.label}'
                                        </div>
                                        <div>);</div>
                                    </div>
                        })}
                    </div>
                })}

            </div>


                <div>███████ attribute_entity</div>

                <button style={{padding: '20px', backgroundColor: 'lightgreen'}} onClick={() => {
                    const el = document.getElementById("sql4");
                    if (el) {
                        console.log(el.innerText)
                        navigator.clipboard.writeText(el.innerText);
                    }
                }}
                >
                    COPY attribute_entity
                </button>

                <div id={'sql4'}>
                    <div>DELETE FROM attribute_entity WHERE 1;</div>

                    {attributeDataArray.map((iAttribute: any, aIndex) => {
                        return <div key={aIndex}>

                            <div>INSERT INTO attribute_entity ( attribute_id, attribute_name
                                )
                                VALUES (
                            </div>
                            <div>
                                {iAttribute.attribute_id}, '{iAttribute.name}'
                            </div>
                            <div>);</div>

                        </div>
                    })}

                    <div>SELECT * FROM attribute_entity ORDER BY attribute_id ;</div>

                </div>

                <div>███████ attribute_options</div>

                <button style={{padding: '20px', backgroundColor: 'lightgreen'}} onClick={() => {
                    const el = document.getElementById("sql3");
                    if (el) {
                        console.log(el.innerText)
                        navigator.clipboard.writeText(el.innerText);
                    }
                }}
                >
                    COPY attribute_options
                </button>

                <div id={'sql3'}>

                    <div>DELETE FROM attribute_options WHERE 1;</div>

                    {attributeDataArray.map((iAttribute: any) => {
                        return iAttribute.items.map((iItem: any, itemN: number) => {
                            return <div key={itemN}>
                                {/*<div key={itemN}>*/}
                                {/*    {iProduct.name}, {iProduct.product_id}, {iAttribute.attribute_id}, {iItem.option_id}*/}
                                {/*</div>*/}

                                <div>INSERT INTO attribute_options ( attribute_id, option_id, value, displayValue, id
                                    )
                                    VALUES (
                                </div>
                                <div>
                                    {iAttribute.attribute_id}, {iItem.option_id}, '{iItem.value}', '{iItem.displayValue}',
                                    '{iItem.id}'
                                </div>
                                <div>);</div>

                            </div>

                        })
                    })}

                    <div>SELECT * FROM attribute_options ORDER BY attribute_id, option_id ;</div>

                </div>


                <div>███████ catalog_product_entity_text</div>

                <button style={{padding: '20px', backgroundColor: 'lightgreen'}} onClick={() => {
                    const el = document.getElementById("sql2");
                    if (el) {
                        console.log(el.innerText)
                        navigator.clipboard.writeText(el.innerText);
                    }
                }}
                >
                    COPY catalog_product_entity_text
                </button>
                <div id={'sql2'}>

                    <div>DELETE FROM catalog_product_entity_text WHERE 1;</div>

                    {productsArray.map((iProduct: any, productN: number) => {

                        console.log("=============== find1  optionValue1",iProduct.name, iProduct.product_id)

                        return <div key={productN}>
                            {iProduct.attributes && iProduct.attributes.map((iAttribute: any, attributeN: number) => {
                                return <div key={attributeN}>
                                    {/*{iProduct.product_id}, {iAttribute.attribute_id},*/}
                                    {/*otuput from prepared data*/}
                                    {iAttribute.items.map((iItem: any, itemN: number) => {


                                        const attribute_id = attributeDataObject[iAttribute.id].attribute_id
                                        const optionsArray = attributeDataObject[iAttribute.id].items
                                        console.log("========================= find1",attribute_id, iItem.id, optionsArray)
                                        // TODO find iItem.id in optionsArray !!!
                                        const optionValue = optionsArray.find((el:any)=>{
                                            return el.id === iItem.id
                                        })
                                        console.log("========== find1  optionValue1",optionValue.option_id)

                                        return <div key={itemN}>
                                            {/*<div key={itemN}>*/}
                                            {/*    {iProduct.name}, {iProduct.product_id}, {iAttribute.attribute_id}, {iItem.option_id}*/}
                                            {/*</div>*/}

                                            <div>INSERT INTO catalog_product_entity_text ( entity_id, attribute_id,
                                                value
                                                )
                                                VALUES (
                                            </div>
                                            <div>
                                                {iProduct.product_id}, {attribute_id}, {optionValue.option_id}
                                            </div>
                                            <div>);</div>
                                        </div>

                                    })}

                                </div>
                            })}
                        </div>
                    })}

                    <div>SELECT * FROM catalog_product_entity_text ;</div>

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
                            <div>INSERT INTO product_entity ( product_id, sku, has_options, inStock, name ) VALUES (
                            </div>
                            <div>{iProduct.product_id} , {iProduct.product_id} , {(iProduct.attributes.length === 0) ? 0 : 1},
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
