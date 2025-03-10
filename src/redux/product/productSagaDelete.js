
import {delay, fork, call, put, takeEvery} from "redux-saga/effects";
import {productActions} from "./productSlice";


function* workFetch(params){
    // console.log('params.payload1',params.payload)

    yield put(productActions.deleteStart(params))

    console.log('=== product_ Create params1',params)

    console.log('=== delay3 start')
    console.log('=== delay3 input working OK')
    yield delay(5000) ///if delay -> input works
    console.log('=== delay3 finish')

    let apiResponse =null;

    // const apiResponse = yield call(()=>apiExecute(params));

    yield put(productActions.productDeleteSuccess(params.payload))
}

function* watchSaga(){
    console.log("watchSaga catCreate")
    yield takeEvery(productActions.delete, workFetch)
}

export const productSagaDelete = [
    fork(watchSaga)
]
