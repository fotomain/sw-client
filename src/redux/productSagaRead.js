
import {fork, call, put, takeEvery} from "redux-saga/effects";


import {productActions, productsRead, productsSlice} from "./productsSlice";

const THIS_SAGA_ENTITY='products'
function* workFetch(params){
    console.log('params1',params.payload)
    const apiResponse = yield call(()=>fetch("https://api.thecatapi.com/v1/breeds"));
    const data = yield apiResponse.json()
        console.log('data1',data)
    let result =[]
    const filterName = params.payload?.filter?.name
    if(filterName){
        result = data.filter(el=>{
            return -1!==el.name.indexOf(filterName)
        })
    }
    else{
        result = data.slice(0,10)
    }
    console.log("=== workFetch1",result)
    //=== TIMEOUT for (let i = 0; i < 1000_000_000; i++) {}
    yield put(productActions.readSuccess(result))
}

function* watchSaga(){
    console.log("THIS_SAGA_ENTITY1",THIS_SAGA_ENTITY)
    yield takeEvery(productActions.read, workFetch)
}

export const productSagaRead = [
    fork(watchSaga)
]
