
import { select, fork, call, put, takeEvery} from "redux-saga/effects";

import {cartActions} from "./cartSlice";

import {fetchGraphQL} from "../../api/fetchGraphQL";
import {ADD_TO_CART_MUTATION} from "./graphql/ADD_TO_CART_MUTATION";


function* workFetch(params){

    yield put(cartActions.createStart(params))

    const stateCall = (state) => state.cartState
    const currentState = yield select(stateCall)

    const q= ADD_TO_CART_MUTATION({...params.payload,cart_guid:currentState.cartGUID})

    const apiResponse1 = yield call(()=> fetchGraphQL({
        entityName:'ADD_TO_CART_MUTATION',
        gqlRequest:q
    }))

    const data_json = yield apiResponse1.json()
    const data = data_json.data.addToCart

    yield put(cartActions.createSuccess(data))
}

function* watchSaga(){
    yield takeEvery(cartActions.create, workFetch)
}

export const cartSagaCreate = [
    fork(watchSaga)
]
