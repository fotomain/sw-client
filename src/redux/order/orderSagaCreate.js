
import {delay, select, fork, call, put, takeEvery} from "redux-saga/effects";

import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import {CREATE_ORDER_MUTATION} from "./CREATE_ORDER_MUTATION";
import {orderActions} from "./orderSlice";
import {cartActions} from "../cart/cartSlice";


function* workFetch(params){
    // console.log('params.payload1',params.payload)

    yield put(orderActions.createStart(params))

    console.log('=== order_ Create params1',params)

    console.log('=== delay1 start',params)

    const stateCall = (state) => state.cartState
    const currentState = yield select(stateCall)

    const q= CREATE_ORDER_MUTATION({...params.payload,cart_guid:currentState.cartGUID})

    console.log('=== q9 start',q)

    const apiResponse1 = yield call(()=> fetchGraphQL({
        entityName:'CREATE_ORDER_MUTATION',
        gqlRequest:q
    }))

    console.log("=== CREATE_ORDER_MUTATION apiResponse1",apiResponse1)
    const data_json = yield apiResponse1.json()
    const data = data_json.data

    const resCreate = JSON.parse(data?.createOrder)
    console.log('=== CREATE_ORDER_MUTATION finish resCreate',resCreate)
    console.log('=== CREATE_ORDER_MUTATION3 finish resCreate',resCreate.operation_status)
    if(200===resCreate?.operation_status){
        localStorage.removeItem("cartID")
        yield put(cartActions.deleteCart({cart_guid:currentState.cartGUID}))
        yield put(cartActions.createCart({}))
    }
    yield put(orderActions.createSuccess(resCreate))
}

function* watchSaga(){
    console.log("watchSaga catCreate9")
    yield takeEvery(orderActions.create, workFetch)
}

export const orderSagaCreate = [
    fork(watchSaga)
]
