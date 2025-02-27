
import {initialData} from "./database/initialData";

import {productsNew} from "./generator/productsNew";
import {objectToArray} from "./generator/objectToArray";

// "▄▄▄▄"
const option_type='text'

const DataJsonGenerator = () => {

    const dataProducts:any=initialData

    let catalog_options_values_text:any[]=[]
    let option_value_attributes:any[]=[]
    let catalog_options:any[]=[]

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

    let optionHeader:any={}

    console.log('productsArray1 ',productsArray)

    let attribute_id=801
    let attributeData:any = {}
    for (let p = 0; p < productsArray.length; p++) {

        const attribute = productsArray[p].attributes
        if(attribute){
            for (let a1 = 0; a1 < attribute.length; a1++) {
                // console.log('attributes[a1]1',attribute[a1])
                const newData = {attribute_id: attribute_id,...attribute[a1]}
                attributeData[attribute[a1].id]= newData
                attribute_id++
                productsArray[p].attributes[a1]= newData
            }
        } //if(attributes){
    }

    let option_id = 80000
    attributeData = objectToArray({array:attributeData})
    for (let i = 0; i < attributeData.length; i++) {
        attributeData[i]= {...attributeData[i].value}
        console.log('sql1 items attributeData',attributeData[i].items)
        for (let j = 0; j < attributeData[i].items.length ; j++) {
            // console.log('sql1 items attributeData',attributeData[i].items[j])
            option_id++
            attributeData[i].items[j] = {option_id,...attributeData[i].items[j]}
        }
    }

    const arrayToObject = (p:any) => {
        let result:any={}
        for (let i = 0; i < p.array.length; i++) {
            let elI:any = p.array[i]
            console.log("elI1",elI)
            result[elI[p.keyName]] = elI
        }
        return result
    }

    console.log('sql1 attributeData',attributeData)
    attributeData = arrayToObject({keyName:'name',array:attributeData})

    // sql catalog_products
    console.log('sql1 productsArray',productsArray)
    console.log('sql1 attributeData',attributeData)


    // TODO gallery

    return(
        <div>
            <div>███████ ALL </div>

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
                    return <div key={productN}>
                        {iProduct.attributes && iProduct.attributes.map((iAttribute: any, attributeN: number) => {
                            return <div key={attributeN}>
                                {/*{iProduct.product_id}, {iAttribute.attribute_id},*/}
                                {/*otuput from prepared data*/}
                                {attributeData[iAttribute.id].items.map((iItem: any, itemN: number) => {
                                    return <div>
                                        {/*<div key={itemN}>*/}
                                        {/*    {iProduct.name}, {iProduct.product_id}, {iAttribute.attribute_id}, {iItem.option_id}*/}
                                        {/*</div>*/}

                                        <div>INSERT INTO catalog_product_entity_text ( entity_id, attribute_id, value
                                            )
                                            VALUES (
                                        </div>
                                        <div>
                                            {iProduct.product_id}, {iAttribute.attribute_id}, {iItem.option_id}
                                        </div>
                                        <div>);</div>
                                    </div>

                                })}

                            </div>
                        })}
                    </div>
                })}

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
