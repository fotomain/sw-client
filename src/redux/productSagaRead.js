
import {fork, call, put, takeEvery} from "redux-saga/effects";


import {productActions, productsRead, productsSlice} from "./productsSlice";
import {fetchGraphQL} from "../database/generator/fetchGraphQL";
import {READ_PRODUCTS_QUERY} from "./READ_PRODUCTS_QUERY";

const THIS_SAGA_ENTITY='products'
function* workFetch(params){
    console.log('params1',params.payload)
    // const apiResponse = yield call(()=>fetch("https://api.thecatapi.com/v1/breeds"));

    const q= READ_PRODUCTS_QUERY()

    const apiResponse1 = yield call(()=> fetchGraphQL({
        entityName:'READ_PRODUCTS_QUERY',
        setDataCallback:(d)=>{
            console.log('=== READ_PRODUCTS_QUERY response ',d?.data?.cart?.items)//
            // setData((prevState) => { return{ ...prevState,
            //     cartItems: d?.data?.cart?.items
            // }})
        },
        gqlRequest:q

    }))

    console.log("=== apiResponse1",apiResponse1)

    const apiResponse = yield call(()=>
        fetch(
            "https://api.thecatapi.com/v1/breeds"
        ));

    const data1 = yield apiResponse1.json()
    console.log('data1',data1.data.query)

    const data = yield apiResponse.json()
        console.log('data0',data)

    let result =[]
    const filterName = params.payload?.filter?.name
    if(filterName){
        result = data.filter(el=>{
            return -1!==el.name.indexOf(filterName)
        })
    }
    else{
        result = data.slice(0,10)
    }
    console.log("=== workFetch1",result)
    //=== TIMEOUT for (let i = 0; i < 1000_000_000; i++) {}
    yield put(productActions.readSuccess(result))
}

function* watchSaga(){
    console.log("THIS_SAGA_ENTITY1",THIS_SAGA_ENTITY)
    yield takeEvery(productActions.read, workFetch)
}

export const productSagaRead = [
    fork(watchSaga)
]
