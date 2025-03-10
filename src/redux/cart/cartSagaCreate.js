
import {delay, fork, call, put, takeEvery} from "redux-saga/effects";

import {cartActions} from "./cartSlice";
import {READ_CART_QUERY} from "./READ_CART_QUERY";
import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import {ADD_TO_CART_MUTATION} from "./ADD_TO_CART_MUTATION";


function* workFetch(params){
    // console.log('params.payload1',params.payload)

    yield put(cartActions.createStart(params))

    console.log('=== product_ Create params1',params)

    console.log('=== delay1 start',params)

    const q= ADD_TO_CART_MUTATION(params.payload)

    const apiResponse1 = yield call(()=> fetchGraphQL({
        entityName:'ADD_TO_CART_MUTATION',
        gqlRequest:q
    }))

    console.log("=== apiResponse1",apiResponse1)
    const data_json = yield apiResponse1.json()
    const data = data_json.data.addToCart

    console.log('=== delay1 finish resJson',data)

    yield put(cartActions.cartCreateSuccess(data))
}

function* watchSaga(){
    console.log("watchSaga catCreate")
    yield takeEvery(cartActions.create, workFetch)
}

export const cartSagaCreate = [
    fork(watchSaga)
]
