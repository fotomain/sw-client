
import {fork, call, put, takeEvery} from "redux-saga/effects";


import {productActions, productsRead, productSlice} from "../product/productSlice";
import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import {READ_PRODUCTS_QUERY} from "../product/READ_PRODUCTS_QUERY";
import {READ_CART_QUERY} from "./READ_CART_QUERY";
import {cartActions} from "./cartSlice";

const THIS_SAGA_ENTITY='cart'
function* workFetch(params){
    console.log('params1',params.payload)
    // const apiResponse = yield call(()=>fetch("https://api.thecatapi.com/v1/breeds"));

    const q= READ_CART_QUERY()

    const apiResponse1 = yield call(()=> fetchGraphQL({
        entityName:'READ_CART_QUERY',
        gqlRequest:q
    }))

    console.log("=== apiResponse1",apiResponse1)
    let apiResponse = apiResponse1

    // const apiResponse = yield call(()=>
    //     fetch(
    //         "https://api.thecatapi.com/v1/breeds"
    //     ));

    const data_json = yield apiResponse1.json()
    const data = data_json.data.query
    console.log('data',data)

    // const data = yield apiResponse.json()
    //     console.log('data0',data)

    let result =[]
    const filterName = params.payload?.filter?.name
    if(filterName){
        result = data.filter(el=>{
            return -1!==el.name.indexOf(filterName)
        })
    }
    else{
        result = data //.slice(0,10)
    }
    yield put(cartActions.readSuccess(result))
}

function* watchSaga(){
    console.log("THIS_SAGA_ENTITY1",THIS_SAGA_ENTITY)
    yield takeEvery(cartActions.read, workFetch)
}

export const cartSagaRead = [
    fork(watchSaga)
]
