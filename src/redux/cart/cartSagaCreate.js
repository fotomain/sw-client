
import {delay, select, fork, call, put, takeEvery} from "redux-saga/effects";

import {cartActions} from "./cartSlice";
import {READ_CART_QUERY} from "./graphql/READ_CART_QUERY";
import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import {ADD_TO_CART_MUTATION} from "./graphql/ADD_TO_CART_MUTATION";


function* workFetch(params){
    // console.log('params.payload1',params.payload)
    yield put(cartActions.createStart(params))

    const stateCall = (state) => state.cartState
    const currentState = yield select(stateCall)

    const q= ADD_TO_CART_MUTATION({...params.payload,cart_guid:currentState.cartGUID})

    const apiResponse1 = yield call(()=> fetchGraphQL({
        entityName:'ADD_TO_CART_MUTATION',
        gqlRequest:q
    }))

    console.log("=== ADD_TO_CART_MUTATION apiResponse1",apiResponse1)
    const data_json = yield apiResponse1.json()
    const data = data_json.data.addToCart

    console.log('=== ADD_TO_CART_MUTATION finish resJson',data)

    yield put(cartActions.createSuccess(data))
}

function* watchSaga(){
    console.log("watchSaga catCreate")
    yield takeEvery(cartActions.create, workFetch)
}

export const cartSagaCreate = [
    fork(watchSaga)
]
