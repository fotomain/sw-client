
import {fork,  put, takeEvery} from "redux-saga/effects";
import {productActions} from "./productSlice";


function* workFetch(params){

    yield put(productActions.createStart(params))

    // yield delay(1000) ///if delay -> input works
    yield put(productActions.productCreateSuccess(params.payload))
}

function* watchSaga(){
    console.log("watchSaga catCreate")
    yield takeEvery(productActions.create, workFetch)
}

export const productSagaCreate = [
    fork(watchSaga)
]
