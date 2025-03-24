
import {fork, call, put, takeEvery} from "redux-saga/effects";

import {cartActions} from "./cartSlice";

import {fetchGraphQL} from "../../api/fetchGraphQL";

import {CREATE_CART_MUTATION} from "./graphql/CREATE_CART_MUTATION";


function* workFetch(params){

    yield put(cartActions.createCartStart(params))

    const q= CREATE_CART_MUTATION(params.payload)

    const apiResponse1 = yield call(()=> fetchGraphQL({
        entityName:'CREATE_CART_MUTATION',
        gqlRequest:q
    }))

    const data_json = yield apiResponse1.json()
    const data = data_json.data.createCart.cart_guid

    localStorage.setItem("cartID", data)

    yield put(cartActions.createCartSuccess(data))
}

function* watchSaga(){
    yield takeEvery(cartActions.createCart, workFetch)
}

export const cartSagaCreateCart = [
    fork(watchSaga)
]
