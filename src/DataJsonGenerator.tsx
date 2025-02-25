
import {initialData} from "./database/initialData";
import {dividerClasses} from "@mui/material";

// "▄▄▄▄"
const option_type='text'


const DataJsonGenerator = () => {

    const dataProducts:any=initialData

    // console.log('products1',data['products'])

    const workArray:any[] = []
    const productPropeties:any= {}
    for (const k in dataProducts) {
        const el:any = dataProducts[k]
        console.log('el1',el)
        workArray.push(el)
    }

    let productsArray:any=workArray[1]
    for (const i in productsArray) {
        // const atr:any = data[a]
        const obj = productsArray[i];
        for (const k in obj) {
            productPropeties[k]=1
        }
    }

    console.log('productsArray',productsArray)
    console.log('productPropeties',productPropeties)


    const productsNew = [
        {
            id:'iPhone',
            name:'iPhone',
            attributes: {items: [{id: "Color"}, {id: "Capacity"}, {id: "Operational system"}]},
            prices:[{amount:777,currency: {label:"USD"}}]
        },
        {
            id:'Samsung',
            name:'Samsung',
            attributes: {items: [{id: "Color"}, {id: "Capacity"}, {id: "Operational system"}]},
            prices:[{amount:888,currency: {label:"USD"}}]
        }
    ]

    productsArray=[...productsNew,...productsArray]

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

            const loopItems = (parentStr:string, itemsArray:any,level:number,levelsTotal:number)=> {
                if(level<(levelsTotal)) {
                    for (let i = 0; i < itemsArray[level].length ; i++) {
                        // let ss=""; for (let ll = 0; ll < level; ll++) {ss=ss+"==="};
                        // console.log(ss,' level ',level, itemsArray[level][i])
                            loopItems(parentStr +" --- "+itemNames[level]+" --- "+ itemsArray[level][i].value,itemsArray, level + 1, levelsTotal)
                    }
                }else{
                    let ss=""; for (let ll = 0; ll < level; ll++) {ss=ss+"==="};
                    console.log(ss,' level ',level, parentStr)
                }
            }

            loopItems('',allItems,0,attributes.length)
        }

    }



    return(
        <div>
            <div>GetKeys</div>


            {workArray.map((itemProduct: any, productI: number) => {

                const {attributes,gallery,prices,...productInSelf} = itemProduct

                return <div key={productI}>
                    <div style={{color:'red'}} >====================== ({itemProduct.name})</div>
                </div>

            })}

        </div>
    )
}

export default DataJsonGenerator;
