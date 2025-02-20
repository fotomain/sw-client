import { all } from 'redux-saga/effects';
import {productSagaRead} from "./productSagaRead";
import {productSagaCreate} from "./productsSagaCreate";
import {productSagaDelete} from "./productSagaDelete";

export default function* rootSaga() {
	yield all([
		...productSagaCreate,
		...productSagaRead,
		...productSagaDelete
	]);
}
