import { all } from 'redux-saga/effects';
import {productSagaRead} from "./product/productSagaRead";
import {productSagaCreate} from "./product/productSagaCreate";
import {productSagaDelete} from "./product/productSagaDelete";
import {cartSagaRead} from "./cart/cartSagaRead";

export default function* rootSaga() {
	yield all([
		...productSagaCreate,
		...productSagaRead,
		...productSagaDelete,
		...cartSagaRead
	]);
}
