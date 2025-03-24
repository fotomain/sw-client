
import {select, fork, call, put, takeEvery} from "redux-saga/effects";

import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import {CREATE_ORDER_MUTATION} from "./CREATE_ORDER_MUTATION";
import {orderActions} from "./orderSlice";
import {cartActions} from "../cart/cartSlice";


function* workFetch(params){

    yield put(orderActions.createStart(params))

    const stateCall = (state) => state.cartState
    const currentState = yield select(stateCall)

    const q= CREATE_ORDER_MUTATION({...params.payload,cart_guid:currentState.cartGUID})

    const apiResponse1 = yield call(()=> fetchGraphQL({
        entityName:'CREATE_ORDER_MUTATION',
        gqlRequest:q
    }))

    const data_json = yield apiResponse1.json()
    const data = data_json.data

    const resCreate = JSON.parse(data?.createOrder)

    if(200===resCreate?.operation_status){
        localStorage.removeItem("cartID")
        yield put(cartActions.deleteCart({cart_guid:currentState.cartGUID}))
        yield put(cartActions.createCart({}))
    }
    yield put(orderActions.createSuccess(resCreate))
}

function* watchSaga(){
    yield takeEvery(orderActions.create, workFetch)
}

export const orderSagaCreate = [
    fork(watchSaga)
]
