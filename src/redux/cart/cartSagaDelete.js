
import {select, fork, call, put, takeEvery} from "redux-saga/effects";

import {cartActions} from "./cartSlice";

import {fetchGraphQL} from "../../api/fetchGraphQL";

import {DELETE_CART_LINE_QUERY} from "./graphql/DELETE_CART_LINE_QUERY";


function* workFetch(params){

    yield put(cartActions.deleteStart(true))

    const stateCall = (state) => state.cartState
    const currentState = yield select(stateCall)

    const q= DELETE_CART_LINE_QUERY({...params.payload,cart_guid:currentState.cartGUID})

    const apiResponse1 = yield call(()=> fetchGraphQL({
        entityName:'DELETE_CART_LINE_QUERY',
        gqlRequest:q
    }))

    const data_json = yield apiResponse1.json()
    const data = data_json.data.deleteCartLine

    yield put(cartActions.deleteSuccess(data))
}

function* watchSaga(){
    yield takeEvery(cartActions.delete, workFetch)
}

export const cartSagaDelete = [
    fork(watchSaga)
]
