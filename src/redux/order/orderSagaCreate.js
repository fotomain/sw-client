
import {delay, select, fork, call, put, takeEvery} from "redux-saga/effects";

import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import {CREATE_ORDER_MUTATION} from "./CREATE_ORDER_MUTATION";
import {orderActions} from "./orderSlice";


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

    console.log('=== CREATE_ORDER_MUTATION finish resJson',data)

    yield put(orderActions.createSuccess(data))
}

function* watchSaga(){
    console.log("watchSaga catCreate9")
    yield takeEvery(orderActions.create, workFetch)
}

export const orderSagaCreate = [
    fork(watchSaga)
]
