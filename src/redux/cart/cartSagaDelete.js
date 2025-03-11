
import {delay, fork, call, put, takeEvery} from "redux-saga/effects";

import {cartActions} from "./cartSlice";
import {READ_CART_QUERY} from "./graphql/READ_CART_QUERY";
import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import {ADD_TO_CART_MUTATION} from "./graphql/ADD_TO_CART_MUTATION";
import {DELETE_CART_LINE_QUERY} from "./graphql/DELETE_CART_LINE_QUERY";


function* workFetch(params){
    // console.log('params.payload1',params.payload)

    yield put(cartActions.createStart(params))

    console.log('=== DELETE_CART_LINE_QUERY start',params)

    const q= DELETE_CART_LINE_QUERY(params.payload)

    console.log('=== DELETE_CART_LINE_QUERY q ',q)

    const apiResponse1 = yield call(()=> fetchGraphQL({
        entityName:'DELETE_CART_LINE_QUERY',
        gqlRequest:q
    }))

    console.log("=== DELETE_CART_LINE_QUERY apiResponse1",apiResponse1)
    const data_json = yield apiResponse1.json()
    const data = data_json.data.deleteCartLine

    console.log('=== DELETE_CART_LINE_QUERY finish resJson',data)

    yield put(cartActions.cartDeleteSuccess(data))
}

function* watchSaga(){
    console.log("watchSaga catCreate")
    yield takeEvery(cartActions.delete, workFetch)
}

export const cartSagaDelete = [
    fork(watchSaga)
]
