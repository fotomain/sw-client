
import {fork, call, put, takeEvery} from "redux-saga/effects";


import {productActions, productsRead, productSlice} from "./productSlice";
import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import {READ_PRODUCTS_QUERY} from "./READ_PRODUCTS_QUERY";
import {READ_FIRST_CATEGORY_QUERY} from "./READ_FIRST_CATEGORY_QUERY";

const THIS_SAGA_ENTITY='products'
function* workFetch(params){
    // console.log('params1',params.payload)

    let q= READ_PRODUCTS_QUERY(params.payload);

    const apiResponse1 = yield call(()=> fetchGraphQL({
        entityName:'READ_PRODUCTS_QUERY',
        gqlRequest:q
    }))

    const data_json = yield apiResponse1.json()
    const data = data_json.data.query
    // console.log('data0',data)

    let result = data

    // console.log('result0',result)

    const filterName = params.payload?.filter?.name
    if(filterName){
        result = result.filter(el=>{
            return -1!==el.name.indexOf(filterName)
        })
    }

    // console.log('result1',result)

    yield put(productActions.setCategories(data[0].categories))
    yield put(productActions.readSuccess(result))

}

function* watchSaga(){
    console.log("THIS_SAGA_ENTITY1",THIS_SAGA_ENTITY)
    yield takeEvery(productActions.read, workFetch)
}

export const productSagaRead = [
    fork(watchSaga)
]
