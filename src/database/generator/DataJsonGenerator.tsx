
import {initialData512GForTests} from "../initialData-512G-for-tests";

import {productsNew} from "./productsNew";
import {objectToArray} from "./objectToArray";
import {fetchGraphQL} from "../../api/fetchGraphQL";

// "▄▄▄▄"

const DataJsonGenerator = () => {

    const dataStart:any=initialData512GForTests
    const arrayData:any= []
    for (const k in dataStart) {
        const el:any = dataStart[k]
        arrayData.push(el)
    }



    const arrayStart:any=[...arrayData[1],...productsNew]

    console.log("arrayStart1",arrayStart)



    let option_id_=80000
    const arrayResult:any =[...arrayStart]
    const attribute_entity:any={}
    for (let i = 0; i < arrayResult.length; i++) {
        arrayResult[i].product_id=100+1+i
        for (let j = 0; j < arrayResult[i].attributes.length; j++) {
            const attJ= arrayResult[i].attributes[j]
            const options = arrayResult[i].attributes[j].items
            for (let k = 0; k < options.length; k++) {
                const o = options[k]
                // console.log("=== ",arrayResult[i].product_id, attJ.id, o.id)
                if(!attribute_entity[attJ.id]) {
                    attribute_entity[attJ.id] = {items: []}
                }
                else{
                }

                const optionExist = attribute_entity[attJ.id].items.find((it:any)=>{
                    return it.id===o.id
                })
                if(!optionExist){
                    option_id_++
                    attribute_entity[attJ.id].items = [...attribute_entity[attJ.id].items, {option_id:option_id_, ...o}]
                }
            }
        }
    }

    let attribute_id_=800
    for (const k in attribute_entity) {
        const en:any = attribute_entity[k]
        attribute_id_++
        en.attribute_id=attribute_id_
        en.name=k
        en.id=k
    }



    for (let i = 0; i < arrayResult.length; i++) {
        for (let j = 0; j < arrayResult[i].attributes.length; j++) {
            const attJ= arrayResult[i].attributes[j]
                attJ.attribute_id=attribute_entity[attJ.id].attribute_id
            const options = attJ.items
            for (let k = 0; k < options.length; k++) {
                const o = options[k]
                const where = attribute_entity[attJ.id].items
                const what = o.id
                // console.log("where what",where, what)
                const oCatalogData:any = where.find((el:any) =>  el.id === what)

                // console.log("oCatalogData1",oCatalogData)

                o.option_id=oCatalogData.option_id
            }
        }
    }


    let attributeDataArray = objectToArray({array:attribute_entity})
    for (let i = 0; i < attributeDataArray.length; i++) {
        attributeDataArray[i]={...attributeDataArray[i].value}
    }

    console.log("attribute_entity1",attribute_entity)
    console.log("arrayResult1",arrayResult)
    console.log("attributeDataArray1",attributeDataArray)


    // TODO gallery

    return(
        <div>
            <div>███████ ALL</div>

            <div>
                <div style={{flexDirection: "row", gap: "24px", display: "flex"}}>

                    <button style={{padding: '10px', backgroundColor: 'lightcyan'}} onClick={() => {
                        let res = ''
                        for (let i = 0; i < 10; i++) {
                            const el = document.getElementById("sql" + i);
                            if (el) {
                                res = res + el.innerText
                            }
                        }
                        // console.log('res1', res)
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
                            entityName: 'READ_PRODUCTS_QUERY',
                            setDataCallback: (d: any) => {
                                console.log('=== READ_PRODUCTS_QUERY response ', d?.data?.cart?.items)//
                                // setData((prevState) => { return{ ...prevState,
                                //     cartItems: d?.data?.cart?.items
                                // }})
                            },
                            gqlRequest: READ_PRODUCTS_QUERY

                        })
                        // console.log('res1', res)
                        // navigator.clipboard.writeText(res);
                    }}
                    >
                        GRAPHQL TEST LOCAL
                    </button>
                </div>

            </div>


            <div>███████ product_gallery</div>

            <button style={{padding: '20px', backgroundColor: 'lightgreen'}} onClick={() => {
                const el = document.getElementById("sql6");
                if (el) {
                    console.log(el.innerText)
                    navigator.clipboard.writeText(el.innerText);
                }
            }}
            >
                COPY product_gallery
            </button>


            <div id={'sql6'}>
                <div>DELETE FROM product_gallery WHERE 1;</div>

                {arrayResult.map((iProduct: any, productN: number) => {
                    return <div key={productN}>
                        {iProduct.gallery && iProduct.gallery.map((iUrlItem: any, itemN: number) => {
                            return <div key={itemN}>
                                <div>INSERT INTO product_gallery ( entity_id, url_order, url_path )
                                    VALUES (
                                </div>
                                <div>
                                    {iProduct.product_id}, {itemN}, '{iUrlItem}'
                                </div>
                                <div>);</div>
                            </div>
                        })}
                    </div>
                })}
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

                {arrayResult.map((iProduct: any, productN: number) => {
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
                            {iAttribute.attribute_id}, '{iAttribute.id}'
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

                {arrayResult.map((iProduct: any, productN: number) => {

                 // console.log("=============== find1  optionValue1", iProduct.product_id, iProduct.attributes)

                    return <div key={productN}>
                        {iProduct.attributes && iProduct.attributes.map((iAttribute: any, attributeN: number) => {
                            return <div key={attributeN}>
                                {/*{iProduct.product_id}, {iAttribute.attribute_id},*/}
                                {/*otuput from prepared data*/}
                                {iAttribute.items.map((optionItem: any, itemN: number) => {

                                    return <div key={itemN}>
                                        {/*<div key={itemN}>*/}
                                        {/*    {iProduct.name}, {iProduct.product_id}, {iAttribute.attribute_id}, {optionItem.option_id}*/}
                                        {/*</div>*/}

                                        <div>INSERT INTO catalog_product_entity_text ( entity_id, attribute_id,
                                            value
                                            )
                                            VALUES (
                                        </div>
                                        <div>
                                            {iProduct.product_id}, {iAttribute.attribute_id}, {optionItem.option_id}
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
                {arrayResult.map((iProduct: any, productI: number) => {
                    return <div key={productI}>
                        {/*<div style={{color: 'red'}}>====================== {iProduct.product_id} {iProduct.name}</div>*/}
                        <div>INSERT INTO product_entity ( product_id, sku, has_options, inStock, name, description, category, brand ) VALUES (
                        </div>
                        <div>{
                            iProduct.product_id} ,
                            {iProduct.product_id} ,
                            {(iProduct.attributes.length === 0) ? 0 : 1},
                            1 ,
                            '{iProduct.name}',
                            '{iProduct.description}',
                            '{iProduct.category}',
                            '{iProduct.brand}'
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
