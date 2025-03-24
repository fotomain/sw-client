
import {fork, call, put, takeEvery} from "redux-saga/effects";

import {productActions} from "./productSlice";
import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import {READ_PRODUCTS_QUERY} from "./READ_PRODUCTS_QUERY";

const THIS_SAGA_ENTITY='products'
function* workFetch(params){

    let q= READ_PRODUCTS_QUERY(params.payload);

    const apiResponse1 = yield call(()=> fetchGraphQL({
        entityName:'READ_PRODUCTS_QUERY',
        gqlRequest:q
    }))

    const data_json = yield apiResponse1.json()
    const data = data_json.data.query

    let result = data

    yield put(productActions.readSuccess(result))

}

function* watchSaga(){
    console.log("THIS_SAGA_ENTITY1",THIS_SAGA_ENTITY)
    yield takeEvery(productActions.read, workFetch)
}

export const productSagaRead = [
    fork(watchSaga)
]
