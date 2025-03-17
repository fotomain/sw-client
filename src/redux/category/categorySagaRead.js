
import {fork, call, put, takeEvery} from "redux-saga/effects";

import {fetchGraphQL} from "../../database/generator/fetchGraphQL";
import {cartActions} from "../cart/cartSlice";
import {READ_CATEGORY_QUERY} from "./READ_CATEGORY_QUERY";
import {categoryActions} from "./categorySlice";

const THIS_SAGA_ENTITY='category'
function* workFetch(params){
    console.log('params1',params.payload)
    // const apiResponse = yield call(()=>fetch("https://api.thecatapi.com/v1/breeds"));

    const q= READ_CATEGORY_QUERY()

    const apiResponse1 = yield call(()=> fetchGraphQL({
        entityName:'READ_CATEGORY_QUERY',
        gqlRequest:q
    }))

    console.log("=== apiResponse2",apiResponse1)
    let apiResponse = apiResponse1

    const data_json = yield apiResponse1.json()
    const data = data_json.data.query
    console.log('data2',data)

    yield put(categoryActions.readSuccess(data))
}

function* watchSaga(){
    console.log("THIS_SAGA_ENTITY1",THIS_SAGA_ENTITY)
    yield takeEvery(categoryActions.read, workFetch)
}

export const categorySagaRead = [
    fork(watchSaga)
]
