
import {fork, call, put, takeEvery} from "redux-saga/effects";
import {cartActions} from "./cartSlice";
import {fetchGraphQL} from "../../api/fetchGraphQL";
import {DELETE_CART_MUTATION} from "./graphql/DELETE_CART_MUTATION";


function* workFetch(params){

    yield put(cartActions.deleteCartStart(params))

    console.log('===  deleteCartStart params1',params)

    //=== strong from params - before new cart create
    const q= DELETE_CART_MUTATION({...params.payload})

    const apiResponse1 = yield call(()=> fetchGraphQL({
        entityName:'DELETE_CART_MUTATION',
        gqlRequest:q
    }))

    console.log("=== DELETE_CART_MUTATION1 apiResponse1",apiResponse1)
    const data_json = yield apiResponse1.json()
    console.log("=== DELETE_CART_MUTATION1 apiResponse1",data_json)
    const data = data_json.data?.deleteCart

    console.log('=== DELETE_CART_MUTATION finish resJson',data)

    yield put(cartActions.deleteCartSuccess(data))
}

function* watchSaga(){
    console.log("watchSaga catCreate")
    yield takeEvery(cartActions.deleteCart, workFetch)
}

export const cartSagaDeleteCart = [
    fork(watchSaga)
]
