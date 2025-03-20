
import {delay, select, fork, call, put, takeEvery} from "redux-saga/effects";

import {cartActions} from "./cartSlice";

import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import {ADD_TO_CART_MUTATION} from "./graphql/ADD_TO_CART_MUTATION";


function* workFetch(params){
    console.log('params.payload101-1',params.payload)
    yield put(cartActions.createStart(params))

    const stateCall = (state) => state.cartState
    const currentState = yield select(stateCall)

    const q= ADD_TO_CART_MUTATION({...params.payload,cart_guid:currentState.cartGUID})

    console.log("q22",q)

    const apiResponse1 = yield call(()=> fetchGraphQL({
        entityName:'ADD_TO_CART_MUTATION',
        gqlRequest:q
    }))

    console.log("=== ADD_TO_CART_MUTATION apiResponse1",apiResponse1)
    const data_json = yield apiResponse1.json()
    // console.log("=== ADD_TO_CART_MUTATION apiResponse1",data_json)
    console.log('=== ADD_TO_CART_MUTATION finish data_json',data_json)
    const data = data_json.data.addToCart


    yield put(cartActions.createSuccess(data))
}

function* watchSaga(){
    console.log("watchSaga catCreate")
    yield takeEvery(cartActions.create, workFetch)
}

export const cartSagaCreate = [
    fork(watchSaga)
]
