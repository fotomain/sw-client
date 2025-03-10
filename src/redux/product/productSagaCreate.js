
import {delay, fork, call, put, takeEvery} from "redux-saga/effects";
import {productActions} from "./productSlice";


function* workFetch(params){
    // console.log('params.payload1',params.payload)

    yield put(productActions.createStart(params))

    console.log('=== product_ Create params1',params)

    console.log('=== delay1 start')
    console.log('=== delay1 input working OK')
    yield delay(1000) ///if delay -> input works
    console.log('=== delay1 finish')

    let apiResponse =null;

    // const apiResponse = yield call(()=>apiExecute(params));

    yield put(productActions.productCreateSuccess(params.payload))
}

function* watchSaga(){
    console.log("watchSaga catCreate")
    yield takeEvery(productActions.create, workFetch)
}

export const productSagaCreate = [
    fork(watchSaga)
]
