
import {initialData} from "./database/initialData";
import {dividerClasses} from "@mui/material";


const DataJsonAnalyser = () => {

    const data:any=initialData
    console.log('products1',data['products'])

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

    console.log('workArray',workArray)
    console.log('attributesCatalog',attributesCatalog)

    let sqlProductsAttributes='';
    let sqlProducts='';

    const products = workArray[1]

    for (let i = 0; i < products.length ; i++) {
        const el = products[i]
        console.log("",101 + i ,el.name)
    }

    return(
        <div>
            <div>GetKeys</div>
            <div style={{color:'red'}}>number of products {products.length}</div>
            {products.map((itemProduct: any, productI: number) => {

                const {attributes,gallery,prices,...productInSelf} = itemProduct

                let sql_attribute_options_table = '';
                const productIdNumber = productI + 1
                const productName = itemProduct.name
                const productId = itemProduct.id;
                let sqlInsertAttributeSet = '';

                sqlProducts = sqlProducts + ' ' +
                  "INSERT INTO `products_table`(`id`, `name`, `inStock`, `description`, `category`, `brand`) " +
                    "VALUES ('"+itemProduct.id+"','"+itemProduct.name+"','"+((itemProduct.inStock)?1:0).toString()+"','"+itemProduct.description+"','"+itemProduct.category+"','"+itemProduct.brand+"'); "


                return <div key={productId}>
                    <div style={{color:'red'}} >====================== ({productIdNumber}) - - - {productId} ==== {productName}</div>

                    <div>===== {itemProduct.category} {itemProduct.brand}</div>
                    <div>======== {itemProduct.id} </div>
                    <div>================================</div>
                    <div>======== {JSON.stringify(productInSelf)} </div>
                    <div>======== {JSON.stringify(prices)} </div>
                    <div>======== {JSON.stringify(gallery[0])} </div>
                    {Array.from(attributes).map((k: any) => {
                        let setId = k.id;

                        sqlInsertAttributeSet = sqlInsertAttributeSet +
                            "INSERT INTO `attribute_set_table`(" +
                            "`attributeSetId`, `attributeSetName`) " +
                            "VALUES ('" + setId + "','" + k.name + "' )" +
                            " ON DUPLICATE KEY UPDATE attributeSetId = '" + setId + "';"

                        return (<div key={k.id}>
                            <div>- - - - - - - - - - - - {k.id}</div>
                            <div>{JSON.stringify(k)}</div>
                            <div>{k.name}</div>
                            <div>{k.type}</div>

                            {/*<div>{JSON.stringify(k.items)}</div>*/}
                            <br/>
                            {Array.from(k.items).map((attribute: any, attributeIndex: number) => {

                                const sqlInsertOption =
                                    "INSERT INTO `attribute_options_table`(" +
                                    "`attributeSetId`, `attributeOptionId`, `displayValue`, `value`) " +
                                    "VALUES ('" + setId + "','" + attribute.id + "', '" + attribute.displayValue + "' , '" + attribute.value + "' )" +
                                    " ON DUPLICATE KEY UPDATE attributeSetId = '" + setId + "' , attributeOptionId = '" + attribute.id + "'  ;"

                                // console.log(sqlInsertOption)

                                sql_attribute_options_table = sql_attribute_options_table + sqlInsertOption

                                let sqlProductsAttribute = "INSERT INTO `products_attributes`(`productId`, `attributeSetId`, `attributeOptionId`) VALUES ('" + itemProduct.id + "','" + setId + "','" + attribute.id + "') " +
                                    " ON DUPLICATE KEY UPDATE productId = '" + itemProduct.id + "' , attributeSetId = '" + setId + "' , attributeOptionId = '" + attribute.id + "' ;"

                                sqlProductsAttributes = sqlProductsAttributes + ` ` + sqlProductsAttribute

                                return (<div key={attributeIndex}>
                                    {/*<div>{sqlProductsAttribute}</div>*/}
                                    {/*<div>{sqlInsertOption}</div>*/}
                                    {/*<div>{JSON.stringify(attribute)}</div>*/}
                                </div>)
                            })}

                        </div>)
                    })}
                    {/*<div>{JSON.stringify(itemProduct['attributes'])}  </div>*/}

                    {/*<div>******************** sqlInsertAttributeSet</div>*/}
                    {/*<div>{sqlInsertAttributeSet}</div>*/}
                    <div>******************** sql_attribute_options_table</div>
                    <div>{sql_attribute_options_table}</div>
                </div>

            })}
            {/*<div>******************** sqlProductsAttributes</div>*/}
            {/*<div>{sqlProductsAttributes}</div>*/}
            {/*<div>******************** sqlProducts</div>*/}
            {/*<div>{sqlProducts}</div>*/}
        </div>
    )
}

export default DataJsonAnalyser;
