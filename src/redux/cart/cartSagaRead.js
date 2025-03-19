
import {select, fork, call, put, takeEvery} from "redux-saga/effects";

import {fetchGraphQL} from "../../database/generator/fetchGraphQL";

import {READ_CART_QUERY} from "./graphql/READ_CART_QUERY";
import {cartActions} from "./cartSlice";

const THIS_SAGA_ENTITY='cart'
function* workFetch(params){
    console.log('params1',params.payload)
    // const apiResponse = yield call(()=>fetch("https://api.thecatapi.com/v1/breeds"));

    const stateCall = (state) => state.cartState
    const currentState = yield select(stateCall)

    let workParams     = {...params.payload,cart_guid:currentState.cartGUID}
    if(params.payload.cart_guid){
        workParams              = {...params.payload,cart_guid:params.payload.cart_guid}
    }

    if(""===workParams.cart_guid) return

    const q= READ_CART_QUERY(workParams)

    console.log("q01",q)

    const apiResponse1 = yield call(()=> fetchGraphQL({
        entityName:'READ_CART_QUERY',
        gqlRequest:q
    }))

    console.log("=== READ_CART_QUERY apiResponse1",apiResponse1)
    let apiResponse = apiResponse1

    // const apiResponse = yield call(()=>
    //     fetch(
    //         "https://api.thecatapi.com/v1/breeds"
    //     ));

    const data_json = yield apiResponse1.json()

    console.log('READ_CART_QUERY data',data_json)

    if(data_json.errors){

        yield put(cartActions.createCart({}))
        return

    }

    const data = data_json.data?.query

    // const data = yield apiResponse.json()
    //     console.log('data0',data)

    let result =[]
    const filterName = params.payload?.filter?.name
    if(filterName){
        result = data.filter(el=>{
            return -1!==el.name.indexOf(filterName)
        })
    }
    else{
        result = data //.slice(0,10)
    }

    if(
        params.payload.cart_guid
        &&
        data.cart_guid === params.payload.cart_guid
    ){
        yield put(cartActions.setCartGUID(data.cart_guid))
    }

    yield put(cartActions.readSuccess(result))

}

function* watchSaga(){
    console.log("THIS_SAGA_ENTITY1",THIS_SAGA_ENTITY)
    yield takeEvery(cartActions.read, workFetch)
}

export const cartSagaRead = [
    fork(watchSaga)
]
