
import {delay, fork, call, put, takeEvery} from "redux-saga/effects";

import {cartActions} from "./cartSlice";
import {READ_CART_QUERY} from "./graphql/READ_CART_QUERY";
import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import {ADD_TO_CART_MUTATION} from "./graphql/ADD_TO_CART_MUTATION";
import {CREATE_CART_MUTATION} from "./graphql/CREATE_CART_MUTATION";


function* workFetch(params){
    // console.log('params.payload1',params.payload)

    yield put(cartActions.createCartStart(params))

    console.log('=== product_ Create params1',params)

    console.log('=== delay1 start',params)

    const q= CREATE_CART_MUTATION(params.payload)

    const apiResponse1 = yield call(()=> fetchGraphQL({
        entityName:'CREATE_CART_MUTATION',
        gqlRequest:q
    }))

    console.log("=== CREATE_CART_MUTATION apiResponse1",apiResponse1)
    const data_json = yield apiResponse1.json()
    const data = data_json.data.createCart.cart_guid

    console.log('=== CREATE_CART_MUTATION finish resJson',data)

    localStorage.setItem("cartID", data)

    yield put(cartActions.createCartSuccess(data))
}

function* watchSaga(){
    console.log("watchSaga catCreate")
    yield takeEvery(cartActions.createCart, workFetch)
}

export const cartSagaCreateCart = [
    fork(watchSaga)
]
