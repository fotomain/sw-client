
import { all } from 'redux-saga/effects';

import {productSagaRead} from "./product/productSagaRead";
import {productSagaCreate} from "./product/productSagaCreate";
import {productSagaDelete} from "./product/productSagaDelete";

import {cartSagaRead} from "./cart/cartSagaRead";
import {cartSagaCreate} from "./cart/cartSagaCreate";
import {cartSagaDelete} from "./cart/cartSagaDelete";
import {categorySagaRead} from "./category/categorySagaRead";
import {orderSagaCreate} from "./order/orderSagaCreate";
import {cartSagaCreateCart} from "./cart/cartSagaCreateCart";
import {cartSagaDeleteCart} from "./cart/cartSagaDeleteCart";

export default function* rootSaga() {
	yield all([
		...productSagaCreate,
		...productSagaRead,
		...productSagaDelete,
		...cartSagaCreate,
		...cartSagaRead,
		...cartSagaDelete,
		...categorySagaRead,
		...orderSagaCreate,
		...cartSagaCreateCart,
		...cartSagaDeleteCart,
	]);
}
